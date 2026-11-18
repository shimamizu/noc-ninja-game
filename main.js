import {loadCases,currentCase,caseReport} from './engine/cases.js?v=guided-v7';
import {initialState,transition} from './engine/state.js?v=guided-v7';
import {render,focusView} from './ui/render.js?v=guided-v7';
import {bindControls} from './ui/controls.js?v=guided-v7';
let content=null,state={view:'loading'},errors=[],loading=false,restartInvoker=null;
const dialog=document.querySelector('#restart-dialog');
const announce=text=>{document.querySelector('#announcement').textContent=text;};
async function load(){
  if(loading)return;
  loading=true;content=null;state={view:'loading'};render(null,state);
  const loaded=await loadCases();
  content=loaded.errors.length?null:{cases:loaded.cases};errors=loaded.errors;
  state=content?initialState(content):{view:'content-error'};
  loading=false;render(content,state,errors);focusView();
}
function dispatch(event){
  if(!content)return;
  if(event.type==='download-handoff'){
    if(state.restartConfirmation||!['challenge','session-summary'].includes(state.view))return;
    const c=event.caseId?content.cases.find(c=>c.id===event.caseId):currentCase(state,content);
    const report=c&&caseReport(c,state.patrol.progress[c.id]);if(!report)return;
    const url=URL.createObjectURL(new Blob([report],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');
    a.href=url;a.download=`noc-ninja-${c.id}-handoff.txt`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return;
  }
  const before=state;if(event.type==='restart')restartInvoker=document.activeElement?.id;
  state=transition(state,event,content);if(state===before)return;
  if(state.restartConfirmation){if(!dialog.open)dialog.showModal();document.querySelector('#cancel-restart').focus();return;}
  if(dialog.open)dialog.close();
  render(content,state,errors,event.type==='submit'&&state.view==='challenge'&&['correct','incorrect'].includes(state.patrol.progress[currentCase(state,content).id].questions[currentCase(state,content).questions[state.patrol.questionIndex].id].feedback?.status));
  if(event.type==='cancel-restart'){document.getElementById(restartInvoker)?.focus();return;}
  if(before.view!==state.view||before.patrol.caseIndex!==state.patrol.caseIndex||event.type==='confirm-restart'){announce('');focusView();}
  if(state.view==='challenge'){
    const c=currentCase(state,content),q=c.questions[state.patrol.questionIndex],p=state.patrol.progress[c.id].questions[q.id];
    if(event.type==='submit'&&p.feedback){
      announce(p.feedback.text);
      const target=p.feedback.status==='invalid'?'#shuriken-handle':p.completed?(state.patrol.questionIndex<c.questions.length-1?'#question-next':document.querySelector('#reveal:enabled')?'#reveal':'#patrol-feedback'):'#patrol-feedback';
      document.querySelector(target)?.focus({preventScroll:true});
    }
    if(event.type==='question-next')document.querySelector('#case-question-title')?.focus();
    if(event.type==='hint')announce(q.explanation);
    if(event.type==='reveal'){announce(c.outcome.summary+' '+c.outcome.limits);document.querySelector('#case-outcome-title')?.focus();}
  }
}
bindControls(dispatch,load);load();
