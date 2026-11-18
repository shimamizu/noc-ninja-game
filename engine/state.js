import {initialPatrol,transitionPatrol} from './cases.js?v=guided-v7';
export function initialState(content){
  return {view:content.cases?.length?'briefing':'content-error',patrol:initialPatrol(content.cases),restartConfirmation:false};
}
export function transition(state,event,content){
  if(!state||!event||typeof event.type!=='string')return state;
  if(state.restartConfirmation){
    if(event.type==='cancel-restart')return {...state,restartConfirmation:false};
    if(event.type==='confirm-restart')return initialState(content);
    return state;
  }
  if(event.type==='restart'&&['briefing','challenge','session-summary'].includes(state.view))return {...state,restartConfirmation:true};
  return transitionPatrol(state,event,content.cases);
}
