import {bindAim} from './aim.js?v=guided-v17';
export function bindControls(dispatch,reload){
  const app=document.querySelector('#app');
  bindAim(app,dispatch);
  app.addEventListener('change',e=>{
    if(!['capture-endpoint','capture-command'].includes(e.target.id))return;
    dispatch({type:'choose-capture',focusId:e.target.id,selection:{endpointId:app.querySelector('#capture-endpoint').value,commandId:app.querySelector('#capture-command').value,observationId:'incident'}});
  });
  app.addEventListener('click',e=>{
    const b=e.target.closest('button[data-action]');if(!b||b.disabled)return;
    const type=b.dataset.action;
    if(type==='reload'){reload();return;}
    dispatch({type,outputId:b.dataset.outputId,caseId:b.dataset.caseId,...(b.dataset.commandId?{selection:{endpointId:b.dataset.endpointId,commandId:b.dataset.commandId,observationId:b.dataset.observationId}}:{})});
  });
  const dialog=document.querySelector('#restart-dialog');
  document.querySelector('#cancel-restart').addEventListener('click',()=>dispatch({type:'cancel-restart'}));
  document.querySelector('#confirm-restart').addEventListener('click',()=>dispatch({type:'confirm-restart'}));
  dialog.addEventListener('cancel',e=>{e.preventDefault();dispatch({type:'cancel-restart'});});
}
