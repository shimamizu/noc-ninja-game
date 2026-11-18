// Hit testing is independent of pointer type and never chooses an answer.
export function targetAtPoint(x,y,targets){
 if(!Number.isFinite(x)||!Number.isFinite(y))return null;
 return targets.find(t=>{const rx=(t.right-t.left)/2,ry=(t.bottom-t.top)/2;return rx>0&&ry>0&&((x-t.left-rx)/rx)**2+((y-t.top-ry)/ry)**2<=1;})?.id||null;
}
export function bindAim(root,dispatch){
 let drag=null,keyboardDrag=null;
 const hit=(x,y,arena)=>targetAtPoint(x,y,[...arena.querySelectorAll('.target')].map(t=>({id:t.dataset.choiceId,...Object.fromEntries(['left','right','top','bottom'].map(k=>[k,t.querySelector('.target-board').getBoundingClientRect()[k]]))})));
 const clearKeyboard=()=>{
  if(!keyboardDrag)return;
  keyboardDrag.arena.querySelectorAll('.drag-aimed').forEach(t=>t.classList.remove('drag-aimed'));
  keyboardDrag.arena.querySelector('.drag-readout').textContent='Grab the shuriken. Drag onto a target. Release to throw.';
  keyboardDrag=null;
 };
 const clear=()=>{
  if(!drag)return;
  const finished=drag;drag=null;
  finished.shuriken.style.transform='';finished.shuriken.classList.remove('dragging');
  finished.arena.classList.remove('is-dragging');
  finished.arena.querySelectorAll('.drag-aimed').forEach(t=>t.classList.remove('drag-aimed'));
  finished.arena.querySelector('.aim-path')?.removeAttribute('d');
  finished.arena.querySelector('.drag-readout').textContent='Grab the shuriken. Drag onto a target. Release to throw.';
  if(finished.shuriken.hasPointerCapture(finished.id))finished.shuriken.releasePointerCapture(finished.id);
 };
 root.addEventListener('pointerdown',e=>{
  const shuriken=e.target.closest('.shuriken-handle');if(!shuriken||shuriken.disabled||e.button!==0||drag)return;
  e.preventDefault();clearKeyboard();const arena=shuriken.closest('.arena'),hand=shuriken.getBoundingClientRect();
  drag={id:e.pointerId,shuriken,arena,x:e.clientX,y:e.clientY,handX:hand.left+hand.width/2,handY:hand.top+hand.height/2,target:null};shuriken.setPointerCapture(e.pointerId);shuriken.classList.add('dragging');arena.classList.add('is-dragging');
 });
 root.addEventListener('pointermove',e=>{
  if(!drag||e.pointerId!==drag.id)return;e.preventDefault();
  const a=drag.arena.getBoundingClientRect();
  const targets=[...drag.arena.querySelectorAll('.target')].map(t=>({id:t.dataset.choiceId,...Object.fromEntries(['left','right','top','bottom'].map(k=>[k,t.querySelector('.target-board').getBoundingClientRect()[k]]))}));
  drag.target=targetAtPoint(e.clientX+drag.handX-drag.x,e.clientY+drag.handY-drag.y,targets);
  drag.shuriken.style.transform=`translate(-50%,-50%) translate(${e.clientX-drag.x}px,${e.clientY-drag.y}px)`;
  drag.arena.querySelectorAll('.target').forEach(t=>t.classList.toggle('drag-aimed',t.dataset.choiceId===drag.target));
  const path=drag.arena.querySelector('.aim-path');path?.setAttribute('d',`M ${drag.handX-a.left} ${drag.handY-a.top} L ${e.clientX-a.left} ${e.clientY-a.top}`);
  drag.arena.querySelector('.drag-readout').textContent=drag.target?'Release to throw at '+drag.arena.querySelector(`[data-choice-id="${drag.target}"] strong`).textContent:'Drag to an answer target • release elsewhere to cancel';
 });
 root.addEventListener('pointerup',e=>{
  if(!drag||e.pointerId!==drag.id)return;
  const target=hit(e.clientX+drag.handX-drag.x,e.clientY+drag.handY-drag.y,drag.arena);clear();
  if(target){dispatch({type:'select',answerId:target});dispatch({type:'submit'});}
 });
 root.addEventListener('pointercancel',e=>{if(drag?.id===e.pointerId)clear();});
 root.addEventListener('lostpointercapture',e=>{if(drag?.id===e.pointerId)clear();});
 root.addEventListener('keydown',e=>{
  if(e.key==='Escape'){if(drag||keyboardDrag)e.preventDefault();clear();clearKeyboard();return;}
  if(!e.target.matches('.shuriken-handle')||e.target.disabled||drag)return;
  // Keyboard users perform the same pick-up, move, drop sequence on the shuriken.
  if(e.key===' '||e.key==='Enter'){
   e.preventDefault();if(e.repeat)return;
   if(!keyboardDrag){keyboardDrag={arena:e.target.closest('.arena'),index:-1};keyboardDrag.arena.querySelector('.drag-readout').textContent='Shuriken picked up. Use arrow keys to move to A, B or C; Space to drop; Escape to cancel.';return;}
   const target=[...keyboardDrag.arena.querySelectorAll('.target')][keyboardDrag.index]?.dataset.choiceId;
   clearKeyboard();if(target){dispatch({type:'select',answerId:target});dispatch({type:'submit'});}return;
  }
  if(keyboardDrag&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){
   e.preventDefault();const targets=[...keyboardDrag.arena.querySelectorAll('.target')],back=['ArrowLeft','ArrowUp'].includes(e.key);
   keyboardDrag.index=keyboardDrag.index<0?(back?targets.length-1:0):(keyboardDrag.index+(back?-1:1)+targets.length)%targets.length;
   targets.forEach((t,i)=>t.classList.toggle('drag-aimed',i===keyboardDrag.index));
   keyboardDrag.arena.querySelector('.drag-readout').textContent='Over target '+targets[keyboardDrag.index].querySelector('strong').textContent+'. Space to drop; Escape to cancel.';
  }
 });
 root.addEventListener('focusout',e=>{if(e.target.matches('.shuriken-handle'))clearKeyboard();});

}

// Measure the hand and chosen board after rendering so every viewport gets an exact flight path.
export function animateThrow(root){
 const shot=root.querySelector('.projectile');if(!shot)return;
 if(root.ownerDocument.defaultView.matchMedia('(prefers-reduced-motion: reduce)').matches){shot.remove();return;}
 const arena=shot.closest('.arena'),hand=arena.querySelector('.shuriken-handle'),
  board=[...arena.querySelectorAll('.target')].find(t=>t.dataset.choiceId===shot.dataset.choiceId)?.querySelector('.target-board');
 if(!hand||!board){shot.remove();return;}
 const bounds=arena.getBoundingClientRect(),start=hand.getBoundingClientRect(),end=board.getBoundingClientRect();
 for(const [name,value] of Object.entries({
  'start-x':start.left+start.width/2-bounds.left-arena.clientLeft,
  'start-y':start.top+start.height/2-bounds.top-arena.clientTop,
  'target-x':end.left+end.width/2-bounds.left-arena.clientLeft,
  'target-y':end.top+end.height/2-bounds.top-arena.clientTop
 }))shot.style.setProperty('--'+name,value+'px');
 arena.classList.add('is-throwing');
 const finish=()=>{arena.classList.remove('is-throwing');shot.remove();};
 shot.addEventListener('animationend',finish,{once:true});
 shot.addEventListener('animationcancel',finish,{once:true});
}
