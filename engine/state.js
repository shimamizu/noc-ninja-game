import {initialPatrol,transitionPatrol} from './cases.js?v=guided-v20';
// Fisher–Yates runs once per session; stable IDs keep grading independent of positions.
export function shuffled(items,random=Math.random){
  const result=[...items];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
}
export function initialState(content,random=Math.random){
  const sessionCases=Object.freeze(shuffled(content.cases||[],random).map(c=>Object.freeze({...c,
    questions:Object.freeze(shuffled(c.questions,random).map(q=>Object.freeze({...q,options:Object.freeze(shuffled(q.options,random))})))
  })));
  return {view:content.cases?.length?'briefing':'content-error',sessionCases,patrol:initialPatrol(sessionCases),restartConfirmation:false};
}
export function transition(state,event,content,random=Math.random){
  if(!state||!event||typeof event.type!=='string')return state;
  if(state.restartConfirmation){
    if(event.type==='cancel-restart')return {...state,restartConfirmation:false};
    if(event.type==='confirm-restart')return initialState(content,random);
    return state;
  }
  if(event.type==='restart'&&['briefing','challenge','session-summary'].includes(state.view))return {...state,restartConfirmation:true};
  return transitionPatrol(state,event,state.sessionCases||content.cases);
}
