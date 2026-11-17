import {dispatchTests} from './dispatch.test.js';
import {test,assert} from './harness.js';
import {interfaceOutputTests} from './interface-output.test.js';
import {linkTimelineTests} from './link-timeline.test.js';
import {errorMacTests} from './error-mac.test.js';
import {validateContent,validIPv6,loadContent} from '../engine/content.js';
import {clone} from './fixtures.js';
import {evaluate} from '../engine/rules.js';
import {initialState,transition,summary,currentRound} from '../engine/state.js';
let content;
export function contentTests(data){content=data;interfaceOutputTests(data);errorMacTests(data);linkTimelineTests(data);dispatchTests(data);
 test('Complete reviewed curriculum validates',()=>{const r=validateContent(content);assert(r.content,JSON.stringify(r.errors));});
 const defects={generic:d=>d.sources[0].applicability={platforms:['Arista']},subnet:d=>d.levels[0].rounds[0].topology.devices[1].interfaces[0].ipv6Address='2001:db8:52::1/126',malformed:d=>d.levels[0].rounds[0].topology.devices[0].interfaces=[null],version:d=>d.schemaVersion=1,levels:d=>d.levels.pop(),rounds:d=>d.levels[0].rounds.pop(),pending:d=>d.levels[0].rounds[0].review.status='pending',source:d=>d.sources[0].review.status='pending',stale:d=>d.sources[0].review.contentRevision='old',output:d=>d.levels[0].rounds[0].commandOutputs[0].review.contentRevision='old',revision:d=>d.levels[0].rounds[0].contentRevision='old',duplicate:d=>d.sources.push(clone(d.sources[0])),optic:d=>d.levels[0].rounds[0].topology.devices[0].interfaces[0].optic.model='wrong',ipv6:d=>d.levels[0].rounds[0].topology.devices[0].interfaces[0].ipv6Address='::::/129',limit:d=>d.levels[0].rounds[0].topology.devices[0].interfaces[0].optic.referenceLimits.rx_power.low_alarm=-10,ambiguous:d=>{const r=d.levels[0].rounds[0];r.choices.push({...clone(r.choices[0]),id:'copy'});},missing:d=>d.levels[0].rounds[0].observations=[],mapping:d=>d.levels[0].rounds[0].observations.light[0].outputIds=['unknown'],history:d=>d.levels[2].rounds[0].observations.history[0].historyComplete=false};
 for(const [name,edit] of Object.entries(defects)) test(`Content rejects ${name}`,()=>{const d=clone(content);edit(d);const r=validateContent(d);assert(!r.content);assert(r.errors.length>0);});
 test('Actual six-round curriculum completes with correct independent choices',()=>{
   let state=transition(initialState(content),{type:'begin'},content);
   for(let n=1;n<=6;n++){
     state=transition(state,{type:'select',choiceId:['crcIncreasing','opticalIssue','linkFlapping','crcIncreasing','opticalIssue','linkFlapping'][n-1]},content);
     state=transition(state,{type:'submit'},content);
     assert(state.progress[currentRound(state,content).id].completed);
     const before=JSON.stringify(state);state=transition(state,{type:'submit'},content);assert(JSON.stringify(state)===before);
     state=transition(state,{type:'next'},content);
     if(n<6)assert(state.view==='challenge');
   }
   assert(state.view==='session-summary'&&summary(state,content).completed===6&&summary(state,content).attempts===6);
 });
 test('Every incident exposes the same five tools at both endpoints',()=>{for(const r of content.levels.flatMap(l=>l.rounds)){assert(r.commandOutputs.filter(o=>o.toolVisible!==false).length===10);for(const id of ['leaf-gw1','spine-gw1'])assert(r.commandOutputs.filter(o=>o.deviceId===id&&o.toolVisible!==false).map(o=>o.kind).join(',')==='status,port-status,optics,counters,history');assert(!('conditionType' in r));assert(r.choices.map(c=>c.label).join(',')==='Light levels,CRC / errors,Link flapping');}});
 test('Actual curriculum rejects every alternative category',()=>{const expected=['crcIncreasing','opticalIssue','linkFlapping','crcIncreasing','opticalIssue','linkFlapping'];content.levels.flatMap(l=>l.rounds).forEach((r,n)=>{for(const c of r.choices)assert(evaluate(r,{choiceId:c.id}).status===(c.id===expected[n]?'correct':'incorrect'));});});
 test('Displayed authored numbers agree with structured readings and counters',()=>{for(const r of content.levels.flatMap(l=>l.rounds)){for(const o of r.observations.light){const output=r.commandOutputs.find(v=>v.id===o.interfaceId+'-optics');const rows=output.text.split('\n').filter(line=>line.startsWith('Et'));assert(rows.length===4);rows.forEach((line,n)=>assert(Number(line.trim().split(/\s+/)[5])===o.opticalReadings[n].value));}for(const o of r.observations.counters)for(const snap of o.snapshots){const output=r.commandOutputs.find(v=>snap.outputIds.includes(v.id)&&['status','interface-snapshot'].includes(v.kind));assert(output.text.includes(`${snap.count} input errors, ${snap.count} CRC`));assert(output.text.includes(`is ${snap.operationalState}, line protocol is ${snap.operationalState}`));}}});
 test('Each endpoint has distinct healthy transceiver telemetry without changing optical faults',()=>{
  for(const r of content.levels.flatMap(l=>l.rounds)){
   const rows=id=>r.commandOutputs.find(o=>o.id===id+'-optics').text.split('\n').filter(l=>l.startsWith('Et')).map(l=>l.trim().split(/\s+/).slice(1,6).map(Number));
   const a=rows('a'),b=rows('b');
   for(let lane=0;lane<4;lane++){
    assert(a[lane].every((value,column)=>value!==b[lane][column]));
    // Distinct normal readings must not introduce another alarm or imply optical gain.
    for(const row of [a[lane],b[lane]]){assert(row[0]>0&&row[0]<55);assert(row[1]>3.1&&row[1]<3.5);assert(row[2]>25&&row[2]<75);if(r.id==='L3-R1'&&row===a[lane])assert(row[3]<-9);else assert(row[3]>-7&&row[3]<2.3);if(row[4]>-13.7)assert(row[4]<2.3);}
    assert(a[lane][4]<=b[lane][3]&&b[lane][4]<=a[lane][3]);
   }
  }
  assert(content.levels[0].rounds[1].observations.light[0].opticalReadings.every(o=>o.value===-30));
  assert(content.levels[2].rounds[0].observations.light[1].opticalReadings.every(o=>o.value<-15.7&&o.value!==-30));
 });
 test('Validated content is frozen' ,()=>assert(Object.isFrozen(validateContent(clone(content)).content)));
 test('Same-mechanic replacement requires data only',()=>{const d=clone(content),r=d.levels[1].rounds[1];const snap=r.observations.counters[0].snapshots[1];snap.count=160;snap.errorCounters.FCS=160;snap.errorCounters.Rx=160;for(const id of snap.outputIds){const out=r.commandOutputs.find(o=>o.id===id);out.text=out.text.replaceAll('145','160');}assert(validateContent(d).content);const pending=clone(d);pending.levels[1].rounds[1].review.status='pending';assert(!validateContent(pending).content);});
}
for(const addr of ['2001:db8::1/64','2001:db8::/127','::/0','::ffff:192.0.2.1/128'])test(`IPv6 accepts ${addr}`,()=>assert(validIPv6(addr)));
for(const addr of ['hello:world/64','1::2::3/64','::1/129','::1/-1','1:2:3/64','::gg/64','::ffff:999.2.3.4/64'])test(`IPv6 rejects ${addr}`,()=>assert(!validIPv6(addr)));

test('Loader catches network failure',async()=>{const r=await loadContent('test',async()=>{throw new Error('offline')});assert(!r.content&&r.errors[0].code==='load-failed');});
test('Loader catches HTTP failure',async()=>{const r=await loadContent('test',async()=>({ok:false,status:404}));assert(!r.content&&r.errors[0].code==='load-failed');});
test('Loader catches malformed JSON',async()=>{const r=await loadContent('test',async()=>({ok:true,json:async()=>{throw new Error('bad JSON')}}));assert(!r.content&&r.errors[0].code==='invalid-json');});
test('Loader rejects malformed nested records without throwing',()=>{const r=validateContent({schemaVersion:1,contentRevision:'x',sources:[null],levels:[null,null,null]});assert(!r.content&&r.errors.length>0);});
