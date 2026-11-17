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
    return `${name}: Rx ${e.rxValues.map(v=>v.toFixed(2)).join(', ')} dBm; ${e.receiveSignal==='absent'?'no receive light':e.receiveSignal==='degraded'?'very bad receive light, below −15.70 dBm':'no Rx reading below −15.70 dBm'}, interface ${e.operationalState}.`;
  };
  if(result.status==='incorrect')return `${names[selected]} is not supported here. ${result.evidence.filter(e=>e.condition===selected).map(describe).join(' ')} ${selected==='linkFlapping'?'The game requires at least four actual changes in the inclusive window.':selected==='crcIncreasing'?'A historical total alone is not an ongoing error.':'Compare the counters and state history next.'} Inspect another tool and try again.`;
  const finding=result.evidence.find(e=>e.supported);
  const other=result.evidence.filter(e=>e.interfaceId===finding.interfaceId&&e.condition!==finding.condition);
  return `${names[result.expected.condition]} — diagnosis supported. ${describe(finding)} ${other.map(describe).join(' ')} This identifies a condition, not a failed component or proof of IPv6 connectivity.`;
}
