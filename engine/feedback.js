const names={opticalIssue:'Light levels',crcIncreasing:'CRC / errors',linkFlapping:'Link flapping'};
export function explain(result,challenge,choice){
  if(result.status==='content-error')return 'This evidence cannot support a reliable answer. No throw was counted. Reload after correcting the content.';
  if(result.status==='invalid-input')return 'Aim at one of the three diagnosis targets, then throw your shuriken. No throw has been counted.';
  const endpoints=new Map(challenge.topology.devices.flatMap(d=>d.interfaces.map(i=>[i.id,`${d.label||d.id} ${i.displayAlias||i.name}`])));
  const selected=choice?.diagnosis.condition;
  const describe=e=>{
    const name=endpoints.get(e.interfaceId);
    if(e.condition==='crcIncreasing')return `${name}: ${e.laterCount} − ${e.earlierCount} = ${e.delta} new receive CRC errors in ${e.elapsedSeconds} seconds (states ${e.operationalStates.join(' / ')}).`;
    if(e.condition==='linkFlapping')return `${name}: ${e.transitions} actual state changes in 60 seconds, ending ${e.finalState}. The four-change threshold is this game’s teaching rule, not a universal EOS definition.`;
    const tx=e.badTxChannels?` Tx ${e.txValues.map(v=>v.toFixed(2)).join(', ')} dBm includes values outside the supplied alarm limits.`:'';
    return `${name}: Rx ${e.rxValues.map(v=>v.toFixed(2)).join(', ')} dBm; ${e.receiveSignal==='absent'?'no receive light':e.receiveSignal==='degraded'?'very bad receive light, below −15.70 dBm':'no Rx reading below −15.70 dBm'}, interface ${e.operationalState}.${tx}`;
  };
  if(result.status==='incorrect')return `${names[selected]} is not supported here. ${result.evidence.filter(e=>e.condition===selected).map(describe).join(' ')} ${selected==='linkFlapping'?'The game requires at least four actual changes in the inclusive window.':selected==='crcIncreasing'?'A historical total alone is not an ongoing error.':'Compare the counters and state history next.'} Inspect another tool and try again.`;
  if(result.expected.interfaceIds&&result.expected.condition==='linkFlapping'){
    const observed=result.evidence.filter(e=>e.supported&&e.condition==='linkFlapping');
    return `Link flapping — both endpoints report the same link event. ${observed.map(describe).join(' ')} These are ${observed[0].transitions} shared transitions, counted once for the link. This identifies the link condition, not a failed component or proof of IPv6 connectivity.`;
  }
  const finding=result.evidence.find(e=>e.supported);
  const directional=finding.condition==='opticalIssue'?(challenge.observations.history||[]).filter(h=>h.macSnapshots?.length).map(h=>{
    const rows=h.macSnapshots.at(-1).rows;
    return `${endpoints.get(h.interfaceId)}: PHY ${rows[0].state}, Interface ${rows[1].state}, Local Fault ${rows[2].state}, Remote Fault ${rows[3].state}.`;
  }).join(' '):'';
  const other=result.evidence.filter(e=>e.interfaceId===finding.interfaceId&&e.condition!==finding.condition);
  return `${names[result.expected.condition]} — diagnosis supported. ${result.evidence.filter(e=>e.supported).map(describe).join(' ')} ${other.map(describe).join(' ')} ${directional} This identifies a condition, not a failed component or proof of IPv6 connectivity.`;
}
