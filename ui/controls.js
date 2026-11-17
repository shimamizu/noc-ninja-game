import {bindAim} from './aim.js';
export function bindControls(dispatch,reload){
  bindAim(document.querySelector('#app'),dispatch);
  document.querySelector('#app').addEventListener('click',e=>{
    const b=e.target.closest('button[data-action]');if(!b||b.disabled)return;
    const type=b.dataset.action;if(type==='submit')return;
    if(type==='reload'){reload();return;}
    dispatch({type,outputId:b.dataset.outputId,helpId:b.dataset.helpId});
  });
  document.querySelector('#app').addEventListener('change',e=>{if(e.target.matches('input[name="diagnosis"]'))dispatch({type:'select',choiceId:e.target.value});});
  document.querySelector('#app').addEventListener('submit',e=>{if(e.target.id==='diagnosis-form'){e.preventDefault();dispatch({type:'submit'});}});
  const dialog=document.querySelector('#restart-dialog');
  document.querySelector('#cancel-restart').addEventListener('click',()=>dispatch({type:'cancel-restart'}));
  document.querySelector('#confirm-restart').addEventListener('click',()=>dispatch({type:'confirm-restart'}));
  dialog.addEventListener('cancel',e=>{e.preventDefault();dispatch({type:'cancel-restart'});});
}
