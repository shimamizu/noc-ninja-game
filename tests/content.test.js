import {test,assert} from './harness.js';
import {validateContent,validIPv6,loadContent} from '../engine/content.js';
import {clone} from './fixtures.js';
import {evaluate} from '../engine/rules.js';
import {initialState,transition,summary,currentRound} from '../engine/state.js';
let content;
export function contentTests(data){content=data;
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
 test('Every incident exposes all four tools at both endpoints',()=>{for(const r of content.levels.flatMap(l=>l.rounds)){assert(r.commandOutputs.length===8);for(const id of ['leaf-gw1','spine-gw1'])assert(r.commandOutputs.filter(o=>o.deviceId===id).map(o=>o.kind).join(',')==='status,optics,counters,history');assert(!('conditionType' in r));assert(r.choices.map(c=>c.label).join(',')==='Light levels,CRC / errors,Link flapping');}});
 test('Actual curriculum rejects every alternative category',()=>{const expected=['crcIncreasing','opticalIssue','linkFlapping','crcIncreasing','opticalIssue','linkFlapping'];content.levels.flatMap(l=>l.rounds).forEach((r,n)=>{for(const c of r.choices)assert(evaluate(r,{choiceId:c.id}).status===(c.id===expected[n]?'correct':'incorrect'));});});
 test('Displayed authored numbers agree with structured readings and counters',()=>{for(const r of content.levels.flatMap(l=>l.rounds)){for(const o of r.observations.light){const output=r.commandOutputs.find(v=>v.id===o.interfaceId+'-optics');const rows=output.text.split('\n').filter(line=>line.startsWith('Et'));assert(rows.length===4);rows.forEach((line,n)=>assert(Number(line.trim().split(/\s+/)[5])===o.opticalReadings[n].value));}for(const o of r.observations.counters)for(const snap of o.snapshots){const output=r.commandOutputs.find(v=>v.id===snap.outputIds[0]);assert(output.text.includes(`${snap.count} input errors, ${snap.count} CRC`));assert(output.text.includes(`is ${snap.operationalState}, line protocol is ${snap.operationalState}`));}}});
 test('Validated content is frozen',()=>assert(Object.isFrozen(validateContent(clone(content)).content)));
 test('Same-mechanic replacement requires data only',()=>{const d=clone(content),r=d.levels[1].rounds[1];r.observations.counters[0].snapshots[1].count=160;const out=r.commandOutputs.find(o=>o.id==='a-status');out.text=out.text.replaceAll('145','160');assert(validateContent(d).content);const pending=clone(d);pending.levels[1].rounds[1].review.status='pending';assert(!validateContent(pending).content);});
}
for(const addr of ['2001:db8::1/64','2001:db8::/127','::/0','::ffff:192.0.2.1/128'])test(`IPv6 accepts ${addr}`,()=>assert(validIPv6(addr)));
for(const addr of ['hello:world/64','1::2::3/64','::1/129','::1/-1','1:2:3/64','::gg/64','::ffff:999.2.3.4/64'])test(`IPv6 rejects ${addr}`,()=>assert(!validIPv6(addr)));

test('Loader catches network failure',async()=>{const r=await loadContent('test',async()=>{throw new Error('offline')});assert(!r.content&&r.errors[0].code==='load-failed');});
test('Loader catches HTTP failure',async()=>{const r=await loadContent('test',async()=>({ok:false,status:404}));assert(!r.content&&r.errors[0].code==='load-failed');});
test('Loader catches malformed JSON',async()=>{const r=await loadContent('test',async()=>({ok:true,json:async()=>{throw new Error('bad JSON')}}));assert(!r.content&&r.errors[0].code==='invalid-json');});
test('Loader rejects malformed nested records without throwing',()=>{const r=validateContent({schemaVersion:1,contentRevision:'x',sources:[null],levels:[null,null,null]});assert(!r.content&&r.errors.length>0);});
