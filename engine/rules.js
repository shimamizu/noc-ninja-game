// Pure evidence rules. No level, title, target ID or answer key selects a diagnosis.
export const conditions=['opticalIssue','crcIncreasing','linkFlapping'];
export const timestamp=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().replace('.000Z','Z')===value.replace('.000Z','Z');
const states=['up','down'];
const requireThat=(value,code='invalid-challenge')=>{if(!value)throw new Error(code);};
function light(o){
  requireThat(states.includes(o.administrativeState)&&states.includes(o.operationalState)&&timestamp(o.observedAt));
  requireThat(o.outputIds?.length&&o.interpretationSourceIds?.length,'incomplete-evidence');
  const rows=o.opticalReadings;
  requireThat(Array.isArray(rows)&&rows.length===4&&new Set(rows.map(r=>r.channel)).size===4&&rows.every(r=>typeof r.channel==='string'&&r.channel&&r.metric==='rx_power'&&r.unit==='dBm'&&Number.isFinite(r.value)),'incomplete-evidence');
  // Selected ColorChip reference: -30 is absent; strictly below -15.70 is very bad light.
  const tx=o.txReadings||[];
  requireThat(Array.isArray(tx)&&(!tx.length||(tx.length===4&&new Set(tx.map(r=>r.channel)).size===4&&tx.every(r=>r.metric==='tx_power'&&r.unit==='dBm'&&Number.isFinite(r.value)))),'incomplete-evidence');
  const badTx=tx.filter(r=>r.value < -9 || r.value > 3.3);
  const absent=rows.every(r=>r.value===-30),low=rows.filter(r=>r.value < -15.7);
  requireThat(!absent||o.operationalState==='down','contradictory-evidence');
  return {condition:'opticalIssue',supported:o.administrativeState==='up'&&(low.length>0||badTx.length>0),administrativeState:o.administrativeState,operationalState:o.operationalState,observedAt:o.observedAt,receiveSignal:absent?'absent':low.length?'degraded':'present',rxValues:rows.map(r=>r.value),lowChannels:low.length,txValues:tx.map(r=>r.value),badTxChannels:badTx.length};
}
function counters(o){
  requireThat(o.noReset===true&&Array.isArray(o.snapshots)&&o.snapshots.length===2);
  const [a,b]=o.snapshots;
  for(const s of [a,b])requireThat(timestamp(s.observedAt)&&states.includes(s.operationalState)&&['crc','fcs'].includes(s.counterKind)&&Number.isSafeInteger(s.count)&&s.count>=0&&s.outputIds?.length);
  requireThat(a.counterKind===b.counterKind&&Date.parse(b.observedAt)>Date.parse(a.observedAt)&&b.count>=a.count);
  const delta=b.count-a.count;
  return {condition:'crcIncreasing',supported:delta>0&&a.operationalState==='up'&&b.operationalState==='up',earlierCount:a.count,laterCount:b.count,delta,elapsedSeconds:(Date.parse(b.observedAt)-Date.parse(a.observedAt))/1000,operationalStates:[a.operationalState,b.operationalState]};
}
function history(o){
  requireThat(o.minimumTransitions===4&&timestamp(o.windowStart)&&timestamp(o.windowEnd)&&timestamp(o.historyStart));
  const start=Date.parse(o.windowStart),end=Date.parse(o.windowEnd);
  requireThat(end-start===60000&&Date.parse(o.historyStart)<=start);
  requireThat(o.historyComplete===true&&states.includes(o.stateBeforeHistory)&&Array.isArray(o.reports),'incomplete-evidence');
  let state=o.stateBeforeHistory,initialState=state,finalState=state,last=-Infinity,transitions=0;
  for(const report of o.reports){
    requireThat(timestamp(report.observedAt)&&states.includes(report.operationalState)&&report.outputIds?.length);
    const at=Date.parse(report.observedAt);
    requireThat(at>last&&at>=Date.parse(o.historyStart),'contradictory-evidence');
    if(at>=start&&at<=end&&report.operationalState!==state)transitions++;
    state=report.operationalState;if(at<=start)initialState=state;if(at<=end)finalState=state;last=at;
  }
  return {condition:'linkFlapping',supported:transitions>=4,transitions,windowStart:o.windowStart,windowEnd:o.windowEnd,initialState,finalState,minimumTransitions:4};
}
export function findings(challenge){
  requireThat(challenge&&challenge.conditionType===undefined&&challenge.targetInterfaceId===undefined);
  const interfaces=challenge.topology?.devices?.flatMap(d=>(d.interfaces||[]).map(i=>({...i,deviceId:d.id})));
  requireThat(interfaces?.length===2&&new Set(interfaces.map(i=>i.id)).size===2);
  const byId=new Map(interfaces.map(i=>[i.id,i]));
  const scope=challenge.scopeInterfaceIds;
  requireThat(Array.isArray(scope)&&scope.length===2&&new Set(scope).size===2&&scope.every(id=>byId.has(id)));
  const evidence=[],groups=challenge.observations;
  for(const [key,method] of Object.entries({light,counters,history})){
    const records=groups?.[key];
    requireThat(Array.isArray(records)&&records.length===2&&new Set(records.map(o=>o.interfaceId)).size===2&&scope.every(id=>records.some(o=>o.interfaceId===id)),'incomplete-evidence');
    for(const o of records)evidence.push({interfaceId:o.interfaceId,deviceId:byId.get(o.interfaceId).deviceId,...method(o)});
  }
  // All tools describe the same interval and current interface states.
  for(const id of scope){
    const l=groups.light.find(o=>o.interfaceId===id),c=groups.counters.find(o=>o.interfaceId===id),h=groups.history.find(o=>o.interfaceId===id),hf=evidence.find(e=>e.interfaceId===id&&e.condition==='linkFlapping');
    requireThat(l.observedAt===c.snapshots[1].observedAt&&c.snapshots[0].observedAt===h.windowStart&&c.snapshots[1].observedAt===h.windowEnd&&l.operationalState===hf.finalState&&c.snapshots[0].operationalState===hf.initialState&&c.snapshots[1].operationalState===hf.finalState,'contradictory-evidence');
  }
  let supported=evidence.filter(e=>e.supported);
  // The same flap observed at both ends is one link event, not two competing faults.
  const historySignature=h=>JSON.stringify({windowStart:h.windowStart,windowEnd:h.windowEnd,historyStart:h.historyStart,stateBeforeHistory:h.stateBeforeHistory,reports:h.reports.map(r=>({observedAt:r.observedAt,operationalState:r.operationalState}))});
  const flaps=supported.filter(e=>e.condition==='linkFlapping');
  const sharedFlap=flaps.length===2&&supported.every(e=>['linkFlapping','crcIncreasing'].includes(e.condition))&&historySignature(groups.history[0])===historySignature(groups.history[1]);
  if(sharedFlap)supported=flaps;
  const sharedOptical=supported.length===2&&supported.every(e=>e.condition==='opticalIssue')&&supported.filter(e=>e.badTxChannels>0).length===1&&supported.some(e=>e.badTxChannels===0&&e.lowChannels>0)&&supported.some(e=>e.badTxChannels>0&&e.lowChannels===0);
  requireThat(supported.length===1||sharedFlap||sharedOptical,supported.length?'ambiguous-diagnosis':'incomplete-evidence');
  const {condition,interfaceId,deviceId}=supported[0];
  requireThat(Array.isArray(challenge.choices)&&challenge.choices.length===3&&new Set(challenge.choices.map(c=>c.id)).size===3&&new Set(challenge.choices.map(c=>c.diagnosis?.condition)).size===3,'ambiguous-diagnosis');
  for(const c of challenge.choices)requireThat(typeof c.id==='string'&&c.id&&c.diagnosis&&Object.keys(c.diagnosis).length===1&&conditions.includes(c.diagnosis.condition));
  return {expected:(sharedFlap||sharedOptical)?{condition,interfaceId:null,deviceId:null,interfaceIds:scope.slice(),deviceIds:scope.map(id=>byId.get(id).deviceId)}:{condition,interfaceId,deviceId},evidence};
}
export function evaluate(challenge,answer){
  let facts;
  try{facts=findings(challenge);}catch(error){return {status:'content-error',expected:null,reasonCode:['incomplete-evidence','contradictory-evidence','ambiguous-diagnosis'].includes(error.message)?error.message:'invalid-challenge',evidence:[]};}
  const result=(status,reasonCode)=>({status,...facts,reasonCode});
  if(answer==null||(typeof answer==='object'&&!Array.isArray(answer)&&(!('choiceId' in answer)||answer.choiceId==='')))return result('invalid-input','selection-required');
  if(typeof answer!=='object'||Array.isArray(answer)||typeof answer.choiceId!=='string'||Object.keys(answer).some(k=>k!=='choiceId'))return result('invalid-input','invalid-selection');
  const choice=challenge.choices.find(c=>c.id===answer.choiceId);
  if(!choice)return result('invalid-input','invalid-selection');
  return choice.diagnosis.condition===facts.expected.condition?result('correct','observed-condition-supported'):result('incorrect','condition-not-supported');
}
