// The owner's training runbook recommends a replacement location; it does not
// claim that an observation alone proves a failed component on a live network.
export function technicianDispatch(round,diagnosis){
 const ids=round.scopeInterfaceIds,signals=[];
 const add=(id,reason)=>signals.push({interfaceId:id,reason});
 for(const light of round.observations.light){
  const bad=(light.txReadings||[]).filter(r=>r.value < -9 || r.value > 3.3);
  if(bad.length)add(light.interfaceId,`Tx ${bad.map(r=>r.value.toFixed(2)).join(', ')} dBm is outside the supplied −9.00 / +3.30 dBm alarm limits: replace this transmitting optic.`);
 }
 for(const pair of round.observations.counters){
  const [a,b]=pair.snapshots,delta=b.count-a.count;
  if(pair.noReset===true&&delta>0)add(ids.find(id=>id!==pair.interfaceId),`${delta} new receive FCS/CRC errors at ${endpointName(round,pair.interfaceId)}: replace the optic at the opposite end.`);
 }
 for(const h of round.observations.history){
  const snapshots=h.macSnapshots||[],last=snapshots.at(-1),remote=last?.rows[3];
  const activeDown=last?.rows[1].state==='linkDown'&&remote?.state==='True';
  // Only observed assertions during this window count; old cumulative totals do not.
  const remoteFlaps=diagnosis==='linkFlapping'&&snapshots.some((s,i)=>i>0&&s.rows[3].state==='True'&&snapshots[i-1].rows[3].state==='False');
  if(activeDown||remoteFlaps)add(h.interfaceId,`${endpointName(round,h.interfaceId)} ${activeDown?'is down with Remote Fault True':'shows Remote Fault changing to True during the flap history'}: replace the optic on this side under the training runbook.`);
 }
 const candidates=[...new Set(signals.map(s=>s.interfaceId))];
 if(candidates.length!==1)return {status:candidates.length?'conflicting':'insufficient',interfaceId:null,reasons:signals.map(s=>s.reason),message:candidates.length?'The replacement clues point to different ends. Gather more evidence before sending the technician.':'Flapping or low receive light alone does not select an optic. Check Tx, error deltas and Remote Fault history.'};
 const interfaceId=candidates[0];
 return {status:'ready',interfaceId,endpoint:endpointName(round,interfaceId),reasons:signals.map(s=>s.reason),message:`Send the technician to ${endpointName(round,interfaceId)}. Replace the COLORCHIP C100Q020CWDM403B optic, then recheck light, errors and link stability.`};
}
export function endpointName(round,id){for(const d of round.topology.devices){const i=d.interfaces.find(i=>i.id===id);if(i)return `${d.label||d.id} ${i.displayAlias||i.name}`;}return id;}
