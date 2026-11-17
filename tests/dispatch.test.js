import {test,assert,equal} from './harness.js';
import {technicianDispatch} from '../engine/dispatch.js';
import {evaluate} from '../engine/rules.js';
import {clone,domain} from './fixtures.js';
import {targetAtPoint} from '../ui/aim.js';
export function dispatchTests(content){
 const rounds=content.levels.flatMap(l=>l.rounds),categories=['crcIncreasing','opticalIssue','linkFlapping','crcIncreasing','opticalIssue','linkFlapping'];
 test('Six independent technician destinations follow the owner runbook',()=>{rounds.forEach((r,i)=>{const plan=technicianDispatch(r,categories[i]);equal(plan.status,'ready');equal(plan.interfaceId,['a','b','a','b','a','a'][i]);assert(plan.message.includes(plan.endpoint));});});
 test('Receive CRC diagnosis and optic replacement identify opposite endpoints',()=>{const r=rounds[0];equal(evaluate(r,{choiceId:'crcIncreasing'}).expected.interfaceId,'b');equal(technicianDispatch(r,'crcIncreasing').interfaceId,'a');});
 test('A cleared current Remote Fault still uses observed assertions during flaps',()=>{const r=rounds[5];equal(r.observations.history[0].macSnapshots.at(-1).rows[3].state,'False');equal(technicianDispatch(r,'linkFlapping').interfaceId,'a');});
 test('Flapping without directional corroboration has no invented destination',()=>{equal(technicianDispatch(domain('linkFlapping'),'linkFlapping').status,'insufficient');});
 test('Historical cumulative fault counts alone do not locate the optic',()=>{const r=clone(rounds[5]);r.observations.history[0].macSnapshots.forEach(s=>s.rows[3].state='False');equal(technicianDispatch(r,'linkFlapping').status,'insufficient');});
 test('Conflicting replacement clues do not silently prefer one rule',()=>{const r=clone(rounds[0]);r.observations.history[1].macSnapshots.at(-1).rows[1].state='linkDown';r.observations.history[1].macSnapshots.at(-1).rows[3].state='True';equal(technicianDispatch(r,'crcIncreasing').status,'conflicting');});
 test('Corroborating receive errors do not hide a synchronized flap diagnosis',()=>{const r=clone(rounds[5]),s=r.observations.counters[1].snapshots;s[1].count=s[0].count+10;equal(evaluate(r,{choiceId:'linkFlapping'}).status,'correct');equal(evaluate(r,{choiceId:'crcIncreasing'}).status,'incorrect');equal(technicianDispatch(r,'linkFlapping').interfaceId,'a');});
 test('Bad transmitter and peer receive light describe one optical path',()=>{equal(evaluate(rounds[4],{choiceId:'opticalIssue'}).status,'correct');equal(technicianDispatch(rounds[4],'opticalIssue').interfaceId,'a');});
 test('Tx alarm boundaries are strict, and invalid Tx cannot grade',()=>{
  for(const [value,expected] of [[-9,'content-error'],[3.3,'content-error'],[-9.01,'correct'],[3.31,'correct'],[null,'content-error']]){
   const r=domain('opticalIssue');r.observations.light[0].opticalReadings.forEach(x=>x.value=.42);r.observations.light[0].txReadings=[1,2,3,4].map(n=>({channel:String(n),metric:'tx_power',unit:'dBm',value}));equal(evaluate(r,{choiceId:'opticalIssue'}).status,expected);
  }
 });
}
const boxes=[{id:'light',left:10,right:90,top:10,bottom:90},{id:'errors',left:110,right:190,top:10,bottom:90},{id:'flaps',left:210,right:290,top:10,bottom:90}];
test('Drag hit testing selects the actual target under the pointer',()=>{equal(targetAtPoint(50,40,boxes),'light');equal(targetAtPoint(150,40,boxes),'errors');equal(targetAtPoint(250,40,boxes),'flaps');});
test('Dragging through gaps, below targets or invalid coordinates cancels the throw',()=>{for(const [x,y] of [[100,40],[150,200],[-10,40],[NaN,40]])equal(targetAtPoint(x,y,boxes),null);});
