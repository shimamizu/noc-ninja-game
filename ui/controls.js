import {bindAim} from './aim.js?v=guided-v7';
export function bindControls(dispatch,reload){
  const app=document.querySelector('#app');
  bindAim(app,dispatch);
  app.addEventListener('click',e=>{
    const b=e.target.closest('button[data-action]');if(!b||b.disabled)return;
    const type=b.dataset.action;
    if(type==='reload'){reload();return;}
    dispatch({type,outputId:b.dataset.outputId,caseId:b.dataset.caseId});
  });
  const dialog=document.querySelector('#restart-dialog');
  document.querySelector('#cancel-restart').addEventListener('click',()=>dispatch({type:'cancel-restart'}));
  document.querySelector('#confirm-restart').addEventListener('click',()=>dispatch({type:'confirm-restart'}));
  dialog.addEventListener('cancel',e=>{e.preventDefault();dispatch({type:'cancel-restart'});});
}
