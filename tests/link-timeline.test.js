import {test,assert,equal} from './harness.js';
import {clone} from './fixtures.js';
import {validateContent} from '../engine/content.js';
import {evaluate} from '../engine/rules.js';
import {explain} from '../engine/feedback.js';
export function linkTimelineTests(content){
 const rounds=content.levels.flatMap(l=>l.rounds);
 test('Both Interface State rows share event ages without forcing PHY or fault rows to match',()=>{
  for(const r of rounds){const [a,b]=r.observations.history;equal(a.macSnapshots.map(s=>[s.observedAt,[s.rows[1].state,s.rows[1].lastChangeSeconds]]),b.macSnapshots.map(s=>[s.observedAt,[s.rows[1].state,s.rows[1].lastChangeSeconds]]));}
 });
 test('Independent final link durations match both full-interface and MAC outputs',()=>{
  const ages=[1835909,660,5,1835909,660,0];
  const durations=['Up 21 days, 5 hours, 58 minutes, 29 seconds','Down 11 minutes, 0 seconds','Down 5 seconds','Up 21 days, 5 hours, 58 minutes, 29 seconds','Down 11 minutes, 0 seconds','Up 0 seconds'];
  rounds.forEach((r,n)=>{for(const h of r.observations.history)equal(h.macSnapshots.at(-1).rows[1].lastChangeSeconds,ages[n]);for(const o of r.commandOutputs.filter(o=>o.kind==='status'))assert(o.text.includes(durations[n]),o.id+': '+durations[n]);});
 });
 test('Synchronized flaps are one diagnosis with both endpoints in feedback',()=>{
  for(const r of [rounds[2],rounds[5]]){const result=evaluate(r,{choiceId:'linkFlapping'});equal(result.status,'correct');equal(result.expected.interfaceIds,['a','b']);equal(result.evidence.filter(e=>e.supported).map(e=>e.transitions),[4,4]);const feedback=explain(result,r);assert(feedback.includes('leaf-gw1')&&feedback.includes('spine-gw1')&&feedback.includes('4 shared transitions, counted once'));}
 });
 test('A down interface with normal light can retain PHY up and Remote Fault True',()=>{
  for(const [r,bad,peer] of [[rounds[1],'a','b'],[rounds[4],'b','a']]){
   const rows=id=>r.observations.history.find(h=>h.interfaceId===id).macSnapshots.at(-1).rows;
   equal(rows(bad).map(row=>row.state),['linkDown','linkDown','True','False']);
   equal(rows(peer).map(row=>row.state),['linkUp','linkDown','False','True']);
   equal(rows(peer).map(row=>row.lastChangeSeconds),[188,660,193,198]);
   equal(evaluate(r,{choiceId:'opticalIssue'}).status,'correct');
   assert(explain(evaluate(r,{choiceId:'opticalIssue'}),r).includes('Remote Fault True'));
  }
 });
 test('Cleared full-interface link changes can be zero while MAC history remains nonzero',()=>{
  for(const h of rounds[1].observations.history){assert(h.macSnapshots[0].rows[1].changes>0);const pair=rounds[1].observations.counters.find(p=>p.interfaceId===h.interfaceId);equal(pair.snapshots.map(s=>s.linkStatusChanges),[0,0]);}
  assert(validateContent(clone(content)).content);
 });
 test('A fault clock cannot drift without a corresponding row change',()=>{
  const d=clone(content),r=d.levels[0].rounds[1],h=r.observations.history[1],s=h.macSnapshots.at(-1);
  s.rows[3].lastChangeSeconds++;const o=r.commandOutputs.find(o=>o.id===s.outputId);o.text=o.text.replace('0:03:18 ago','0:03:19 ago');
  assert(!validateContent(d).content);
 });
 test('Independent full-interface counters still reject changes absent from link history',()=>{
  const d=clone(content),r=d.levels[0].rounds[1],s=r.observations.counters[0].snapshots[1];s.linkStatusChanges=1;
  const o=r.commandOutputs.find(o=>o.id==='a-status');o.text=o.text.replace('0 link status changes','1 link status changes');assert(!validateContent(d).content);
 });
 test('Cleared Remote Fault ages align with every flap snapshot at both ends',()=>{
  for(const r of [rounds[2],rounds[5]])for(const h of r.observations.history){
   for(const s of h.macSnapshots){equal(s.rows[3].lastChangeSeconds,s.rows[1].lastChangeSeconds);}
   equal(h.macSnapshots.at(-1).rows[3].changes-h.macSnapshots[0].rows[3].changes,r.id==='L3-R2'&&h.interfaceId==='a'?4:8);
  }
 });
 test('Old Remote Fault event ages cannot silently return in flapping examples',()=>{
  const d=clone(content),r=d.levels[1].rounds[0],s=r.observations.history[0].macSnapshots.at(-1);s.rows[3].lastChangeSeconds=20587208;
  const o=r.commandOutputs.find(o=>o.id===s.outputId);o.text=o.text.replace(/(MAC Rx Remote Fault[^\n]*?)0:00:05 ago/,'$1238 days, 6:40:08 ago');
  assert(!validateContent(d).content);
 });
 const defects={
  'unequal full-interface uptime':r=>{const o=r.commandOutputs.find(o=>o.id==='a-status');o.text=o.text.replace('21 days','307 days');},
  'wrong MAC system time':r=>{const o=r.commandOutputs.find(o=>o.id==='a-history');o.text=o.text.replace('12:01:00','12:02:00');},
  'wrong displayed remote-fault age':r=>{const o=r.commandOutputs.find(o=>o.id==='a-history');o.text=o.text.replace(/(MAC Rx Remote Fault[^\n]*)21 days/,'$1238 days');},
  'both endpoints agree on the wrong event date':r=>{for(const h of r.observations.history){const s=h.macSnapshots.at(-1);s.rows.forEach(row=>row.lastChangeSeconds+=86400);const o=r.commandOutputs.find(o=>o.id===s.outputId);o.text=o.text.replaceAll('21 days','22 days');}},
  'missing shared timeline':r=>delete r.linkTimeline,
  'contradictory port status':r=>{const o=r.commandOutputs.find(o=>o.kind==='port-status');o.text=o.text.replace('connected','notconnect');}
 };
 for(const [name,edit] of Object.entries(defects))test('Content blocks '+name,()=>{const d=clone(content);edit(d.levels[0].rounds[0]);const result=validateContent(d);assert(!result.content);assert(result.errors.some(e=>e.path.includes('linkTimeline')));});
 test('One endpoint with a different flap event time remains ambiguous',()=>{const r=clone(rounds[2]);r.observations.history[1].reports[0].observedAt='2026-11-17T12:00:06Z';equal(evaluate(r,{choiceId:'linkFlapping'}).status,'content-error');});
 test('Shared flapping plus an independent optical fault remains ambiguous',()=>{const r=clone(rounds[2]);r.observations.light[0].opticalReadings.forEach(o=>o.value=-30);equal(evaluate(r,{choiceId:'linkFlapping'}).status,'content-error');});
}
