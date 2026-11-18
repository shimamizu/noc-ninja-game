// Hit testing is independent of pointer type and never chooses the diagnosis.
export function targetAtPoint(x,y,targets){
 if(!Number.isFinite(x)||!Number.isFinite(y))return null;
 return targets.find(t=>x>=t.left&&x<=t.right&&y>=t.top&&y<=t.bottom)?.id||null;
}
export function bindAim(root,dispatch){
 let drag=null;
 const hit=(x,y,arena)=>targetAtPoint(x,y,[...arena.querySelectorAll('.target')].map(t=>({id:t.dataset.choiceId,...Object.fromEntries(['left','right','top','bottom'].map(k=>[k,t.getBoundingClientRect()[k]]))})));
 const clear=()=>{
  if(!drag)return;
  drag.ninja.style.transform='';drag.ninja.classList.remove('dragging');
  drag.arena.classList.remove('is-dragging');
  drag.arena.querySelectorAll('.drag-aimed').forEach(t=>t.classList.remove('drag-aimed'));
  drag.arena.querySelector('.aim-path')?.removeAttribute('d');
  if(drag.ninja.hasPointerCapture(drag.id))drag.ninja.releasePointerCapture(drag.id);
  drag=null;
 };
 root.addEventListener('pointerdown',e=>{
  const ninja=e.target.closest('.ninja-handle');if(!ninja||ninja.disabled||e.button!==0||drag)return;
  e.preventDefault();const arena=ninja.closest('.arena');
  drag={id:e.pointerId,ninja,arena,x:e.clientX,y:e.clientY,target:null};ninja.setPointerCapture(e.pointerId);ninja.classList.add('dragging');arena.classList.add('is-dragging');
 });
 root.addEventListener('pointermove',e=>{
  if(!drag||e.pointerId!==drag.id)return;e.preventDefault();
  const a=drag.arena.getBoundingClientRect();
  const targets=[...drag.arena.querySelectorAll('.target')].map(t=>({id:t.dataset.choiceId,...Object.fromEntries(['left','right','top','bottom'].map(k=>[k,t.getBoundingClientRect()[k]]))}));
  drag.target=targetAtPoint(e.clientX,e.clientY,targets);
  drag.ninja.style.transform=`translate(${Math.max(-a.width/2+55,Math.min(a.width/2-55,e.clientX-drag.x))}px,${Math.max(-a.height+130,Math.min(12,e.clientY-drag.y))}px)`;
  drag.arena.querySelectorAll('.target').forEach(t=>t.classList.toggle('drag-aimed',t.dataset.choiceId===drag.target));
  const path=drag.arena.querySelector('.aim-path');path?.setAttribute('d',`M ${a.width/2} ${a.height-70} L ${e.clientX-a.left} ${e.clientY-a.top}`);
  drag.arena.querySelector('.drag-readout').textContent=drag.target?'Release to throw at '+drag.arena.querySelector(`[data-choice-id="${drag.target}"] strong`).textContent:'Drag to an answer target • release elsewhere to cancel';
 });
 root.addEventListener('pointerup',e=>{
  if(!drag||e.pointerId!==drag.id)return;
  const target=hit(e.clientX,e.clientY,drag.arena);clear();
  if(target){dispatch({type:'select',choiceId:target});dispatch({type:'submit'});}else root.querySelector('.drag-readout')?.replaceChildren(document.createTextNode('Grab the ninja. Drag onto a target. Release to throw.'));
 });
 root.addEventListener('pointercancel',clear);
 root.addEventListener('lostpointercapture',()=>{if(drag)clear();});
 root.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&drag){e.preventDefault();clear();return;}
  if(!e.target.matches('.ninja-handle'))return;
  const inputs=[...root.querySelectorAll('input[name="diagnosis"]')];
  if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const i=inputs.findIndex(i=>i.checked),n=i<0?(e.key==='ArrowLeft'?inputs.length-1:0):(i+(e.key==='ArrowLeft'?-1:1)+inputs.length)%inputs.length;dispatch({type:'select',choiceId:inputs[n].value});}
  if(e.key==='Enter'||e.key===' '){e.preventDefault();dispatch({type:'submit'});}
 });
}
