import {loadContent} from './engine/content.js';
import {initialState,transition,currentRound} from './engine/state.js';
import {explain} from './engine/feedback.js';
import {render,focusView} from './ui/render.js';
import {bindControls} from './ui/controls.js';
let content=null,state={view:'loading'},errors=[],loading=false,restartInvoker=null;
const dialog=document.querySelector('#restart-dialog');
const announce=text=>{document.querySelector('#announcement').textContent=text;};
async function load(){
  if(loading)return;loading=true;content=null;state={view:'loading'};render(null,state);
  const loaded=await loadContent();content=loaded.content;errors=loaded.errors;state=content?initialState(content):{view:'content-error'};loading=false;render(content,state,errors);focusView();
}
function dispatch(event){
  if(!content)return;
  const before=state;if(event.type==='restart')restartInvoker=document.activeElement?.id;
  state=transition(state,event,content);if(state===before)return;
  if(state.restartConfirmation){if(!dialog.open)dialog.showModal();document.querySelector('#cancel-restart').focus();return;}
  if(dialog.open)dialog.close();
  if(state.view==='content-error')errors=[{levelId:content.levels[state.levelIndex].id,roundId:currentRound(state,content).id,message:'The diagnostic evidence is inconsistent. Reload after correcting the content.'}];
  render(content,state,errors,event.type==='submit'&&['correct','incorrect'].includes(state.feedback?.result.status));
  if(event.type==='cancel-restart'){document.getElementById(restartInvoker)?.focus();return;}
  if(before.view!==state.view||before.roundIndex!==state.roundIndex||before.levelIndex!==state.levelIndex||event.type==='confirm-restart'){announce('');focusView();}
  if(event.type==='submit'&&state.feedback){const round=currentRound(state,content);announce(explain(state.feedback.result,round,round.choices.find(c=>c.id===state.feedback.choiceId)));if(state.feedback.result.status==='invalid-input')document.querySelector('input[name="diagnosis"]')?.focus();if(state.feedback.result.status==='correct')document.querySelector('#next')?.focus({preventScroll:true});}
  if(event.type==='help'){const h=currentRound(state,content).hints.find(h=>h.id===state.activeHelpId);if(h)announce(h.text);}
}
bindControls(dispatch,load);load();
