import {test,assert,equal} from './harness.js';
import {bindAim,animateThrow,targetAtPoint} from '../ui/aim.js?v=guided-v17';

// Small event fixture: exercise pointer ownership, release hit testing and cleanup
// without depending on a browser's timing or the diagnostic state machine.
function fixture(reduced=false){
 const events={},sent=[],classes=()=>({add(){},remove(){},toggle(){}});
 const rect=(left,top,width,height)=>({left,top,width,height,right:left+width,bottom:top+height});
 const path={setAttribute(name,value){this[name]=value;},removeAttribute(name){delete this[name];}},readout={};
 const board={getBoundingClientRect:()=>rect(120,80,80,80)};
 const targets=['a','b','c'].map((id,i)=>({dataset:{choiceId:id},classList:classes(),querySelector:s=>s==='strong'?{textContent:id.toUpperCase()}:i?{getBoundingClientRect:()=>rect(240+i*100,80,80,80)}:board}));
 const arena={classList:classes(),clientLeft:1,clientTop:1,getBoundingClientRect:()=>rect(100,50,320,400),
  querySelectorAll:()=>targets,querySelector:s=>s==='.aim-path'?path:s==='.drag-readout'?readout:s==='.shuriken-handle'?star:{textContent:'Answer A'}};
 const star={disabled:false,style:{},classList:classes(),closest:s=>s==='.arena'?arena:star,matches:s=>s==='.shuriken-handle',
  getBoundingClientRect:()=>rect(270,320,44,44),setPointerCapture(id){this.capture=id;},hasPointerCapture(id){return this.capture===id;},
  releasePointerCapture(id){this.capture=null;events.lostpointercapture({pointerId:id});}};
 const shot={dataset:{choiceId:'a'},style:{setProperty(name,value){this[name]=value;}},closest:()=>arena,
  addEventListener(name,fn){this[name]=fn;},remove(){this.removed=true;}};
 const inputs=['a','b','c'].map(value=>({value,checked:false}));
 const root={ownerDocument:{defaultView:{matchMedia:()=>({matches:reduced})}},querySelector:()=>shot,querySelectorAll:()=>inputs,
  addEventListener(name,fn){events[name]=fn;}};
 bindAim(root,event=>{sent.push(event);if(event.type==='select')inputs.forEach(i=>i.checked=i.value===event.answerId);});
 const fire=(type,extra={})=>events[type]({target:star,pointerId:1,button:0,clientX:292,clientY:342,preventDefault(){},...extra});
 return {root,star,shot,path,readout,sent,fire};
}

test('Dragging moves the shuriken and aims from its original hand position',()=>{
 const f=fixture();f.fire('pointerdown');f.fire('pointermove',{clientX:160,clientY:120});
 equal(f.star.style.transform,'translate(-50%,-50%) translate(-132px,-222px)');
 equal(f.path.d,'M 192 292 L 60 70');equal(f.sent,[]);
});
test('Release location selects a target even without a final pointermove; submits once',()=>{
 const f=fixture();f.fire('pointerdown');f.fire('pointerup',{clientX:160,clientY:120});
 f.fire('pointerup',{clientX:160,clientY:120});
 equal(f.sent,[{type:'select',answerId:'a'},{type:'submit'}]);equal(f.star.style.transform,'');
});
test('Off-target release, Escape and pointer cancellation reset without throwing',()=>{
 for(const cancellation of ['pointerup','pointercancel','lostpointercapture','Escape']){
  const f=fixture();f.fire('pointerdown');f.fire('pointermove',{clientX:160,clientY:120});
  if(cancellation==='Escape')f.fire('keydown',{key:'Escape'});else f.fire(cancellation);
  f.fire('pointerup',{clientX:160,clientY:120});
  equal(f.sent,[]);equal(f.star.style.transform,'');assert(!f.path.d);assert(f.readout.textContent.startsWith('Grab the shuriken.'));
 }
});
test('A second touch cannot cancel or submit the active drag',()=>{
 const f=fixture();f.fire('pointerdown');f.fire('pointercancel',{pointerId:2});
 f.fire('pointerup',{pointerId:2,clientX:160,clientY:120});equal(f.sent,[]);
 f.fire('pointerup',{clientX:160,clientY:120});equal(f.sent.length,2);
});
test('Keyboard drag requires pickup, movement and drop; completed control is inert',()=>{
 const f=fixture();f.fire('keydown',{key:'ArrowRight'});equal(f.sent,[]);
 f.fire('keydown',{key:' '});f.fire('keydown',{key:'ArrowRight'});f.fire('keydown',{key:'ArrowRight'});equal(f.sent,[]);
 f.fire('keydown',{key:' '});equal(f.sent,[{type:'select',answerId:'b'},{type:'submit'}]);
 f.star.disabled=true;f.fire('keydown',{key:' '});f.fire('pointerdown');f.fire('pointerup',{clientX:160,clientY:120});equal(f.sent.length,2);
});
test('Keyboard pickup/drop without movement and Escape never submit',()=>{
 for(const cancel of ['Escape',' ','focusout']){
  const f=fixture();f.fire('keydown',{key:' '});
  if(cancel!==' ')f.fire('keydown',{key:'ArrowRight'});
  if(cancel==='focusout')f.fire('focusout');else f.fire('keydown',{key:cancel});
  equal(f.sent,[]);
 }
});
test('Circular targets reject corner and below-circle drops',()=>{
 const t=[{id:'a',left:120,right:200,top:80,bottom:160}];
 equal(targetAtPoint(160,120,t),'a');equal(targetAtPoint(121,81,t),null);equal(targetAtPoint(160,170,t),null);equal(targetAtPoint(NaN,120,t),null);
 const f=fixture();f.fire('pointerdown');f.fire('pointerup',{clientX:160,clientY:180});equal(f.sent,[]);
});
test('An edge grip lands using the visible shuriken center',()=>{
 const f=fixture();f.fire('pointerdown',{clientX:272,clientY:322});f.fire('pointerup',{clientX:140,clientY:100});
 equal(f.sent,[{type:'select',answerId:'a'},{type:'submit'}]);
});
test('Throw animation uses measured hand and board centers and cleans up on completion',()=>{
 const f=fixture();animateThrow(f.root);
 equal(['--start-x','--start-y','--target-x','--target-y'].map(k=>f.shot.style[k]),['191px','291px','59px','69px']);
 assert(!f.shot.removed);f.shot.animationend();assert(f.shot.removed);
});
test('Reduced motion skips the flying projectile',()=>{
 const f=fixture(true);animateThrow(f.root);assert(f.shot.removed);assert(!f.shot.animationend);
});
