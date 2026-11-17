import {evaluate} from './rules.js';
export function initialState(content){
  return {view:'briefing',levelIndex:0,roundIndex:0,selection:null,inspectedOutputIds:[],activeOutputId:null,activeHelpId:null,feedback:null,restartConfirmation:false,progress:Object.fromEntries(content.levels.flatMap(l=>l.rounds.map(r=>[r.id,{attempts:0,completed:false,assistanceIds:[],assistedAtCompletion:false}])))};
}
export function currentRound(state,content){return content.levels[state.levelIndex]?.rounds[state.roundIndex];}
export function summary(state,content,levelIndex=null){
  const levels=levelIndex===null?content.levels:[content.levels[levelIndex]];
  const rounds=levels.flatMap(l=>l.rounds.map(r=>({id:r.id,...state.progress[r.id]})));
  return {rounds,completed:rounds.filter(r=>r.completed).length,attempts:rounds.reduce((n,r)=>n+r.attempts,0),assisted:rounds.filter(r=>r.completed&&r.assistedAtCompletion).length,unassisted:rounds.filter(r=>r.completed&&!r.assistedAtCompletion).length};
}
export function transition(state,event,content){
  if(!state||!event)return state;
  if(state.restartConfirmation){if(event.type==='cancel-restart')return {...state,restartConfirmation:false};if(event.type==='confirm-restart')return initialState(content);return state;}
  if(event.type==='restart'&&['briefing','challenge','session-summary'].includes(state.view))return {...state,restartConfirmation:true};
  if(state.view==='briefing'&&event.type==='begin')return {...state,view:'challenge',selection:null,feedback:null,activeOutputId:currentRound(state,content).commandOutputs[0]?.id||null};
  if(state.view!=='challenge')return state;
  const round=currentRound(state,content),progress=state.progress[round.id];
  if(event.type==='inspect'&&round.commandOutputs.some(o=>o.id===event.outputId))return {...state,activeOutputId:event.outputId,inspectedOutputIds:[...new Set([...state.inspectedOutputIds,event.outputId])]};
  if(event.type==='select'&&!progress.completed&&round.choices.some(c=>c.id===event.choiceId))return {...state,selection:event.choiceId};
  if(event.type==='help'){
    const next=round.hints[progress.assistanceIds.length];
    const id=event.helpId||next?.id;
    if(progress.assistanceIds.includes(id))return {...state,activeHelpId:id};
    if(progress.completed||!next||id!==next.id)return state;
    return {...state,activeHelpId:id,progress:{...state.progress,[round.id]:{...progress,assistanceIds:[...progress.assistanceIds,id]}}};
  }
  if(event.type==='submit'&&!progress.completed){
    const result=evaluate(round,{choiceId:state.selection||''});
    const feedback={choiceId:state.selection,result};
    if(result.status==='content-error')return {...state,view:'content-error',feedback};
    if(result.status==='invalid-input')return {...state,feedback};
    return {...state,feedback,progress:{...state.progress,[round.id]:{...progress,attempts:progress.attempts+1,completed:result.status==='correct',assistedAtCompletion:result.status==='correct'&&progress.assistanceIds.length>0}}};
  }
  if(event.type==='next'&&progress.completed){
    if(state.roundIndex===0)return {...state,roundIndex:1,selection:null,feedback:null,activeHelpId:null,activeOutputId:content.levels[state.levelIndex].rounds[1].commandOutputs[0]?.id||null,inspectedOutputIds:[]};
    if(state.levelIndex<content.levels.length-1)return {...state,levelIndex:state.levelIndex+1,roundIndex:0,selection:null,feedback:null,activeHelpId:null,activeOutputId:content.levels[state.levelIndex+1].rounds[0].commandOutputs[0]?.id||null,inspectedOutputIds:[]};
    return {...state,view:'session-summary',selection:null,feedback:null};
  }
  return state;
}
