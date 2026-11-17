import {timestamp} from './rules.js';
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const reports=h=>h.reports.map(r=>({observedAt:r.observedAt,operationalState:r.operationalState}));
const duration=text=>{
 const parts=[...text.matchAll(/(\d+) (days|hours|minutes|seconds)/g)];
 return parts.length?parts.reduce((n,m)=>n+Number(m[1])*({days:86400,hours:3600,minutes:60,seconds:1}[m[2]]),0):NaN;
};
const age=text=>{const m=text.match(/(?:(\d+) days, )?(\d+):(\d+):(\d+) ago$/);return m?Number(m[1]||0)*86400+Number(m[2])*3600+Number(m[3])*60+Number(m[4]):NaN;};
export function linkAt(timeline,observedAt){
 const at=Date.parse(observedAt);let state=timeline.initialState,last=Date.parse(timeline.initialStateSince),changes=0;
 for(const event of timeline.transitions){if(Date.parse(event.observedAt)>at)break;state=event.operationalState;last=Date.parse(event.observedAt);changes++;}
 return {state,ageSeconds:(at-last)/1000,changes};
}
// Validate the project's authored display formats, not arbitrary vendor CLI output.
export function linkTimelineErrors(round){
 const errors=[],check=(ok,message)=>{if(!ok)errors.push(message);};
 try{
  const t=round.linkTimeline;
  if(!t||!timestamp(t.windowStart)||!timestamp(t.windowEnd)||!timestamp(t.initialStateSince)||!['up','down'].includes(t.initialState)||!Array.isArray(t.transitions))return ['Shared link timeline is missing or malformed.'];
  check(Date.parse(t.windowEnd)-Date.parse(t.windowStart)===60000&&Date.parse(t.initialStateSince)<=Date.parse(t.windowStart),'Shared timeline must define the initial state event and a 60-second window.');
  let prior=-Infinity,state=t.initialState;
  for(const e of t.transitions){const at=Date.parse(e.observedAt);check(timestamp(e.observedAt)&&at>=Date.parse(t.windowStart)&&at<=Date.parse(t.windowEnd)&&at>prior&&['up','down'].includes(e.operationalState)&&e.operationalState!==state,'Shared timeline contains an invalid or repeated transition.');prior=at;state=e.operationalState;}
  const times=[...new Set([t.windowStart,...t.transitions.map(e=>e.observedAt),t.windowEnd])].sort();
  const outputMap=new Map(round.commandOutputs.map(o=>[o.id,o]));
  const histories=round.observations.history;
  for(const h of histories){
   const label=h.interfaceId;
   check(h.windowStart===t.windowStart&&h.windowEnd===t.windowEnd&&h.historyStart===t.windowStart&&h.stateBeforeHistory===t.initialState&&same(reports(h),t.transitions),`${label}: endpoint history differs from the shared link timeline.`);
   check(same(h.macSnapshots.map(s=>s.observedAt),times),`${label}: MAC snapshots must cover the shared observation times.`);
   const base=h.macSnapshots[0].rows,initialChanges=linkAt(t,h.macSnapshots[0].observedAt).changes;
   for(const s of h.macSnapshots){
    const expected=linkAt(t,s.observedAt),o=outputMap.get(s.outputId);
    check(o?.observedAt===s.observedAt&&Date.parse(o?.text.match(/^Current System Time: (.+)$/m)?.[1]+' UTC')===Date.parse(s.observedAt),`${label}: MAC system time contradicts its observation time.`);
    for(const n of [1])check(s.rows[n].state===(expected.state==='up'?'linkUp':'linkDown')&&s.rows[n].lastChangeSeconds===expected.ageSeconds&&s.rows[n].changes===base[n].changes+expected.changes-initialChanges,`${label}: Interface state, change count or age contradicts the shared link event.`);
    if(t.transitions.length&&s.rows[3].state==='False')check(s.rows[3].lastChangeSeconds===expected.ageSeconds,`${label}: cleared Remote Fault age must align with the authored flap event.`);
    if(!t.transitions.length&&t.initialState==='up')check(s.rows.every(row=>row.lastChangeSeconds===expected.ageSeconds),`${label}: stable-up MAC ages must align.`);
    for(const row of s.rows){const line=o?.text.split('\n').find(line=>line.trimStart().startsWith(row.name+' ')),tail=line?.trimStart().slice(row.name.length).trim();check(tail?.split(/\s+/)[0]===row.state&&Number(tail?.split(/\s+/)[1])===row.changes&&age(tail||'')===row.lastChangeSeconds,`${label}: displayed MAC row differs from its reviewed observation.`);}
   }
   // PHY and fault rows have their own event clocks. A repeated state with no
   // new changes must retain the same absolute event time across observations.
   for(let i=1;i<h.macSnapshots.length;i++){
    const previous=h.macSnapshots[i-1],current=h.macSnapshots[i];
    current.rows.forEach((row,n)=>{
     const before=previous.rows[n],delta=row.changes-before.changes;
     const event=Date.parse(current.observedAt)-row.lastChangeSeconds*1000;
     const priorEvent=Date.parse(previous.observedAt)-before.lastChangeSeconds*1000;
     check(delta>=0&&(delta===0
      ? row.state===before.state&&event===priorEvent
      : event>Date.parse(previous.observedAt)&&event<=Date.parse(current.observedAt)&&(row.state!==before.state)===(delta%2===1)),`${label}: MAC row event history is inconsistent.`);
    });
   }
   const pair=round.observations.counters.find(o=>o.interfaceId===h.interfaceId),light=round.observations.light.find(o=>o.interfaceId===h.interfaceId);
   check(light.operationalState===linkAt(t,light.observedAt).state,`${label}: optical status contradicts the shared timeline.`);
   for(const s of pair.snapshots){const expected=linkAt(t,s.observedAt);check(s.operationalState===expected.state,`${label}: counter observation status contradicts the shared timeline.`);const o=s.outputIds.map(id=>outputMap.get(id)).find(o=>['status','interface-snapshot'].includes(o?.kind));const line=o?.text.match(/^  (Up|Down) (.+)$/m);check(line?.[1].toLowerCase()===expected.state&&duration(line?.[2]||'')===expected.ageSeconds,`${label}: full interface Up/Down duration contradicts the shared timeline.`);check(o?.text.includes(` is ${expected.state}, line protocol is ${expected.state} (`),`${label}: full interface status contradicts the shared timeline.`);check(Number.isSafeInteger(s.linkStatusChanges)&&s.linkStatusChanges>=0&&Number(o?.text.match(/(\d+) link status changes since last clear/)?.[1])===s.linkStatusChanges&&s.linkStatusChanges-pair.snapshots[0].linkStatusChanges===expected.changes-linkAt(t,pair.snapshots[0].observedAt).changes,`${label}: full interface change total contradicts its own counter history.`);}
   const port=round.commandOutputs.find(o=>o.interfaceIds.includes(h.interfaceId)&&o.kind==='port-status');check(port?.text.split('\n')[2]?.trim().split(/\s+/)[2]===(linkAt(t,port.observedAt).state==='up'?'connected':'notconnect'),`${label}: port-status row contradicts the shared timeline.`);
  }
  // Interface State follows the shared timeline; PHY/fault events can differ by direction.
 }catch{errors.push('Cannot reconcile endpoint evidence with the shared link timeline.');}
 return [...new Set(errors)];
}
