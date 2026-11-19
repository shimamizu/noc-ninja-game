// A finite local recording catalog, never a shell or a live EOS connection.
export const observations=[
  {id:'incident',label:'Incident snapshot'},
  {id:'monitoring',label:'Follow-up capture'},
  {id:'after-repair',label:'After repair (outcome review)'}
];
export const commands=[
  {id:'status',label:'show interfaces ethernet {port} status',kind:'status',phase:'1 · Establish state',purpose:'Check the affected port, operational state and speed at both endpoints. PHY linkUp alone does not establish an operational interface.'},
  {id:'optics',label:'show interfaces ethernet {port} transceiver',kind:'optics',phase:'2 · Follow the signal',purpose:'Compare each transmitter with the opposite receiver and inspect every channel. Transmit DOM is a local measurement, not proof of delivery to the peer. 0 dBm is 1 mW, not absent light.'},
  {id:'mac',label:'show interfaces ethernet {port} mac detail',kind:'mac',phase:'3 · Locate the fault',purpose:'Compare PHY and Interface State, Local/Remote Fault, Changes and Last Change. Remote Fault reports the peer’s incoming-signal problem. Compare repeat captures before claiming ongoing flapping.'},
  {id:'errors',label:'show interfaces ethernet {port} counters errors',kind:'errors',phase:'4 · Compare counters',purpose:'Compare errors at both ends and between captures. A total is not a rate; zero errors on a down link do not establish health. Keep reset history and observation timing explicit.'}
];
export const commandText=(command,endpoint)=>command.label.replace('{port}',endpoint.port.replace(/^Et(?:hernet)?/i,''));
// Accept only the equivalent spellings present in supplied CLI captures. Preserve original text.
export function matchesCommand(text,endpoint,commandId,alias){
  if(alias!==undefined){
    if(alias!=='senz'||commandId!=='errors'||text?.split('\n')[0].trim()!==endpoint.name+'#senz')return false;
    const lines=text.split('\n').slice(1).filter(line=>line.trim());
    return lines.length===2&&lines[0].trim().split(/\s+/).join(' ')==='Port FCS Align Symbol Rx Runts Giants Tx'&&lines[1].trim().split(/\s+/)[0]===endpoint.port&&/^\S+(?:\s+\d+){7}$/.test(lines[1].trim());
  }
  const match=text?.split('\n')[0].trim().match(/^([^#]+)#\s*show\s+interfaces\s+(?:ethernet\s*)?(\d+(?:\/\d+)*)\s+(status|transceiver|mac\s+detail|counters\s+errors)\s*$/i);
  if(!match)return false;
  const host=match[1].replace(/\([^)]*\)$/,'');
  const suffix={status:'status',optics:'transceiver',mac:'mac detail',errors:'counters errors'}[commandId];
  return host===endpoint.name&&match[2]===endpoint.port.replace(/^Et(?:hernet)?/i,'')&&match[3].toLowerCase().replace(/\s+/g,' ')===suffix;
}
export const captureKey=r=>`${r.endpointId}:${r.commandId}:${r.observationId}`;
export const defaultSelection=c=>({endpointId:c.endpoints[0].id,commandId:'status',observationId:'incident'});
export function validSelection(c,r){return !!r&&c.endpoints.some(e=>e.id===r.endpointId)&&commands.some(e=>e.id===r.commandId)&&observations.some(e=>e.id===r.observationId);}
export function resolveCapture(c,request,completed=false){
  if(!validSelection(c,request))return null;
  const endpoint=c.endpoints.find(e=>e.id===request.endpointId),command=commands.find(e=>e.id===request.commandId);
  const base={endpoint,command,commandText:commandText(command,endpoint),observation:observations.find(e=>e.id===request.observationId)};
  if(request.observationId==='after-repair'&&!completed)return {...base,status:'locked'};
  const recorded=c.commandCaptures?.find(r=>captureKey(r)===captureKey(request));
  if(recorded)return {...base,status:'captured',text:recorded.text,capturedAt:recorded.capturedAt,source:recorded.source};
  const evidence=c.evidence.find(e=>e.endpointId===endpoint.id&&e.kind===command.kind&&(e.observationId||'incident')===request.observationId);
  if(evidence)return {...base,status:evidence.text?'captured':'summary-only',evidence,capturedAt:evidence.capturedAt};
  return {...base,status:'missing'};
}
export const statusLabels={'captured':'Recorded output','summary-only':'Script summary only',missing:'Not captured',locked:'Locked until outcome review'};
export function captureManifest(c){
  const rows=[];
  for(const observation of observations)for(const endpoint of c.endpoints)for(const command of commands){
    const request={endpointId:endpoint.id,commandId:command.id,observationId:observation.id};
    rows.push({...request,...resolveCapture(c,request,true)});
  }
  return rows;
}
export function captureNeedsReport(c){
  return [
    `CAPTURES TO COLLECT — ${c.id}`,
    ...c.captureNeeds.map(n=>`• ${n}`),
    'Capture commands on both endpoints with actual timestamps, timezone, reset history and intervention order. Preserve original command prompts and output. Later readings from a different incident are a separate case.',
    ...captureManifest(c).filter(r=>r.status!=='captured').map(r=>`${r.endpoint.name} ${r.endpoint.port} | ${r.observation.label} | ${r.commandText} | ${statusLabels[r.status]}`)
  ].join('\n');
}

// Group available observations for a command without exposing repair evidence early.
export function commandReadings(c,selection,completed=false){
  if(!validSelection(c,{...selection,observationId:'incident'}))return [];
  return observations.filter(o=>completed||o.id!=='after-repair').map(o=>{
    const request={endpointId:selection.endpointId,commandId:selection.commandId,observationId:o.id};
    return {...resolveCapture(c,request,completed),request};
  });
}

// Present captured shortcuts as the standard command without altering the recorded body.
export function evidenceText(c,e){
  if(!e.commandAlias||!e.text)return e.text;
  const endpoint=c.endpoints.find(endpoint=>endpoint.id===e.endpointId);
  const command=commands.find(command=>command.kind===e.kind);
  return e.text.replace(/^[^\n]+/,`${endpoint.name}#${commandText(command,endpoint)}`);
}
