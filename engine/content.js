import {evaluate,timestamp} from './rules.js';
const text=v=>typeof v==='string'&&v.trim().length>0;
const list=v=>Array.isArray(v)&&v.length>0;
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const unique=a=>new Set(a).size===a.length;
const limits={temperature:[-5,0,55,60],voltage:[3,3.1,3.5,3.6],bias_current:[20,25,75,78],tx_power:[-9,-7,2.3,3.3],rx_power:[-15.7,-13.7,2.3,3.3]};
const units={temperature:'Celsius',voltage:'V',bias_current:'mA',tx_power:'dBm',rx_power:'dBm'};
export function validIPv6(value){
  if(typeof value!=='string')return false;
  const parts=value.split('/');if(parts.length!==2||!/^\d{1,3}$/.test(parts[1])||Number(parts[1])>128)return false;
  let address=parts[0];
  if(address.includes('.')){const at=address.lastIndexOf(':');const ipv4=address.slice(at+1).split('.');if(ipv4.length!==4||ipv4.some(n=>!/^\d{1,3}$/.test(n)||Number(n)>255))return false;address=address.slice(0,at+1)+'0:0';}
  if((address.match(/::/g)||[]).length>1)return false;
  const compact=address.includes('::');const halves=address.split('::');
  const groups=halves.flatMap(h=>h?h.split(':'):[]);
  return groups.every(g=>/^[0-9a-fA-F]{1,4}$/.test(g))&&(compact?groups.length<8:groups.length===8);
}
function freeze(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
export function validateContent(document){
  try { return validateDocument(document); }
  catch { return {content:null,errors:[{code:'invalid-schema',path:'$',message:'Content contains malformed nested records.'}]}; }
}
function addressNumber(address){
  let a=new URL(`http://[${address}]/`).hostname.slice(1,-1);
  const halves=a.split('::'),left=halves[0]?halves[0].split(':'):[],right=halves[1]?halves[1].split(':'):[];
  const words=halves.length===2?[...left,...Array(8-left.length-right.length).fill('0'),...right]:left;
  return words.reduce((n,w)=>(n<<16n)+BigInt('0x'+w),0n);
}
function validateDocument(document){
  const errors=[];let levelId,roundId;
  const error=(code,path,message)=>errors.push({code,path,...(levelId?{levelId}:{}),...(roundId?{roundId}:{}),message});
  const check=(ok,path,message,code='invalid-schema')=>{if(!ok)error(code,path,message);return Boolean(ok);};
  if(!object(document))return {content:null,errors:[{code:'invalid-schema',path:'$',message:'Expected a content document.'}]};
  const revision=document.contentRevision;
  check(document.schemaVersion===2,'schemaVersion','Unsupported schema version.');check(text(revision),'contentRevision','Content revision is required.');
  const review=(value,path)=>check(object(value)&&value.status==='verified'&&text(value.reviewer)&&/^\d{4}-\d{2}-\d{2}$/.test(value.reviewedOn)&&timestamp(`${value.reviewedOn}T00:00:00Z`)&&value.contentRevision===revision&&text(value.notes),path,'Review is missing, pending, rejected or does not match this curriculum revision.','unverified-content');
  if(!check(list(document.sources),'sources','Sources are required.'))return {content:null,errors};
  const sourceIds=document.sources.map(s=>s?.id);check(sourceIds.every(text)&&unique(sourceIds),'sources','Source IDs must be unique.','invalid-reference');
  const sourceMap=new Map(document.sources.filter(object).map(s=>[s.id,s]));
  for(const [n,source] of document.sources.entries()){
    const path=`sources[${n}]`;if(!check(object(source),path,'Invalid source.'))continue;
    check(['vendor-document','reviewed-capture','user-example','user-reference','authored-rule'].includes(source.kind),path+'.kind','Unknown source type.');
    check(text(source.title)&&text(source.section)&&list(source.supportedClaims)&&source.supportedClaims.every(text),path,'Source must name its title, section and supported claims.');
    check(text(source.locator)&&(/^(https:\/\/[^\s@]+|(?:specs|StarterKit)\/[^\s]+)$/.test(source.locator))&&!source.locator.includes('..'),path+'.locator','Use a public HTTPS URL or project evidence path.');
    check(object(source.applicability),path+'.applicability','Source applicability is required.');
    if(source.kind!=='authored-rule'){
      const a=source.applicability;
      check(a?.eosVersion==='4.36.3M'&&Array.isArray(a.platforms)&&['DCS-7050SX3-48YC8','DCS-7808-CH'].every(p=>a.platforms.includes(p))&&Array.isArray(a.imageArchitectures)&&[32,64].every(v=>a.imageArchitectures.includes(v))&&a.lineCard==='7800R3-48CQ-LC'&&a.slot===3&&a.opticModel==='C100Q020CWDM403B',path+'.applicability','This curriculum requires explicit support for its selected deployment. Generic family evidence alone is insufficient.','unverified-content');
    }
    review(source.review,path+'.review');
  }
  const refs=(ids,path)=>check(list(ids)&&unique(ids)&&ids.every(id=>sourceMap.has(id)),path,'Missing or unresolved source references.','invalid-reference');
  const claim=(ids,name,path)=>check(ids?.some(id=>sourceMap.get(id)?.supportedClaims?.includes(name)),path,`Source support for ${name} is missing.`,'unverified-content');
  if(!check(Array.isArray(document.levels)&&document.levels.length===3,'levels','Three levels are required.'))return {content:null,errors};
  const globalIds=[...sourceIds];
  for(const [li,level] of document.levels.entries()){
    levelId=level?.id;roundId=undefined;const lp=`levels[${li}]`;
    if(!check(object(level),lp,'Invalid level.'))continue;
    globalIds.push(level.id);
    check(level.id===`L${li+1}`&&Array.isArray(level.learningOutcomes)&&['LO1','LO2','LO3'].every(id=>level.learningOutcomes.includes(id))&&level.difficulty===li+1&&text(level.title),lp,'Level identity, order and learning outcome must match.');
    const b=level.briefing;
    check(object(b)&&text(b.text)&&list(b.definitions)&&b.definitions.every(d=>text(d.term)&&text(d.meaning))&&text(b.workedExample),lp+'.briefing','Briefing needs definitions and a distinct worked example.');
    refs(level.sourceIds,lp+'.sourceIds');refs(b?.sourceIds,lp+'.briefing.sourceIds');
    if(!check(Array.isArray(level.rounds)&&level.rounds.length===2,lp+'.rounds','Each level needs two rounds.'))continue;
    for(const [ri,round] of level.rounds.entries()){
      roundId=round?.id;const path=`${lp}.rounds[${ri}]`;
      if(!check(object(round),path,'Invalid round.'))continue;
      globalIds.push(round.id);
      check(round.id===`L${li+1}-R${ri+1}`&&round.contentRevision===revision,path,'Round identity or revision mismatch.');
      check(text(round.prompt)&&text(round.title)&&round.conditionType===undefined&&round.targetInterfaceId===undefined,path,'Use a neutral incident prompt without a preselected diagnosis or target.');
      review(round.review,path+'.review');refs(round.sourceIds,path+'.sourceIds');
      for(const name of ['deployment','interface-state','no-light','low-light','crc-counter','timed-history'])claim(round.sourceIds,name,path+'.sourceIds');
      const topology=round.topology,devices=topology?.devices;
      if(!check(Array.isArray(devices)&&devices.length===2,path+'.topology','Two devices are required.'))continue;
      const allInterfaces=[];
      for(const [di,d] of devices.entries()){
        const dp=path+`.topology.devices[${di}]`;const deviceId=di===0?'leaf-gw1':'spine-gw1';
        if(!check(object(d),dp,'Invalid device.'))continue;
        check(d.id===deviceId&&d.label===deviceId&&d.platform===(di===0?'DCS-7050SX3-48YC8':'DCS-7808-CH')&&d.eosVersion==='4.36.3M'&&d.imageArchitecture===(di===0?32:64)&&d.routingModel==='multi-agent',dp,'Device must match the selected deployment.');
        check(di===0?d.lineCard===null:d.lineCard?.model==='7800R3-48CQ-LC'&&d.lineCard.slot===3,dp+'.lineCard','Incorrect line card/slot.');
        if(!check(Array.isArray(d.interfaces)&&d.interfaces.length===1,dp+'.interfaces','One connected physical interface per device is required.'))continue;
        const i=d.interfaces[0];allInterfaces.push(i);
        check(text(i.id)&&i.deviceId===d.id&&i.name===(di===0?'Ethernet51/1':'Ethernet3/15/1')&&i.displayAlias===(di===0?'Et51/1':'Et3/15/1'),dp+'.interfaces','Incorrect endpoint identity.');
        check(validIPv6(i.ipv6Address)&&i.ipv6Address.endsWith('/126'),dp+'.ipv6Address','A valid IPv6 address with the selected /126 prefix is required.');
        const o=i.optic;
        if(!check(object(o),dp+'.optic','Optic information is required.'))continue;
        check(o.vendor==='COLORCHIP'&&o.manufacturer==='ColorChip ltd'&&o.model==='C100Q020CWDM403B'&&o.formFactor==='QSFP28'&&o.speedGbps===100&&o.lanes===4&&o.classification==='CWDM4',dp+'.optic','Optic does not match the supplied reference.');refs(o.sourceIds,dp+'.optic.sourceIds');claim(o.sourceIds,'optical-reference',dp+'.optic.sourceIds');
        for(const [group,values] of Object.entries(limits)){
          const v=o.referenceLimits?.[group];check(object(v)&&['low_alarm','low_warn','high_warn','high_alarm'].every((key,n)=>Number.isFinite(v[key])&&v[key]===values[n])&&v.unit===units[group]&&[null,'module','lane'].includes(v.scope)&&(v.comparisonRule===null||text(v.comparisonRule)),dp+`.optic.referenceLimits.${group}`,'Preserve the supplied limits, confirmed units and explicit interpretation metadata.');refs(v?.sourceIds,dp+`.optic.referenceLimits.${group}.sourceIds`);
        }
      }
      const intIds=allInterfaces.map(i=>i.id),link=topology.link;
      check(unique(intIds)&&allInterfaces.length===2,path+'.topology','Interface IDs must be distinct.','invalid-reference');
      check(object(link)&&text(link.id)&&Array.isArray(link.endpointInterfaceIds)&&link.endpointInterfaceIds.length===2&&unique(link.endpointInterfaceIds)&&link.endpointInterfaceIds.every(id=>intIds.includes(id))&&link.speedGbps===100&&link.medium==='single-mode-fiber',path+'.topology.link','Invalid link endpoints, speed or medium.');
      check(allInterfaces.length===2&&allInterfaces[0].ipv6Address!==allInterfaces[1].ipv6Address,path+'.topology','IPv6 addresses must differ.');
      // The authored point-to-point subnet is explicit; URL normalizes equivalent IPv6 spellings.
      if(allInterfaces.every(i=>validIPv6(i.ipv6Address))){
        const normalized=allInterfaces.map(i=>{const [a,p]=i.ipv6Address.split('/');return {address:new URL(`http://[${a}]/`).hostname,prefix:Number(p)};});
        const shift=BigInt(128-normalized[0].prefix);
        check(normalized[0].address!==normalized[1].address&&normalized[0].prefix===normalized[1].prefix&&(addressNumber(allInterfaces[0].ipv6Address.split('/')[0])>>shift)===(addressNumber(allInterfaces[1].ipv6Address.split('/')[0])>>shift),path+'.topology','Addresses must be distinct in the same point-to-point subnet with matching prefixes.');
      }
      if(!check(list(round.commandOutputs),path+'.commandOutputs','Command evidence is required.'))continue;
      const outputMap=new Map();
      for(const output of round.commandOutputs){
        if(!check(object(output)&&text(output.id),path+'.commandOutputs','Output identity required.'))continue;
        check(!outputMap.has(output.id),path+'.commandOutputs','Duplicate output ID.','invalid-reference');outputMap.set(output.id,output);
        check(devices.some(d=>d.id===output.deviceId)&&list(output.interfaceIds)&&unique(output.interfaceIds)&&output.interfaceIds.every(id=>allInterfaces.some(i=>i.id===id&&i.deviceId===output.deviceId)),path+'.commandOutputs','Output endpoint mismatch.','invalid-reference');
        check(text(output.command)&&text(output.text)&&timestamp(output.observedAt)&&['reviewed-capture','authored-simulation'].includes(output.origin),path+'.commandOutputs','Output text, command, timestamp or origin missing.');
        refs(output.sourceIds,path+'.commandOutputs.sourceIds');review(output.review,path+'.commandOutputs.review');
      }
      for(const id of intIds)check(['status','optics','counters','history'].every(kind=>round.commandOutputs.filter(o=>o.interfaceIds.includes(id)&&o.kind===kind).length===1),path+'.commandOutputs','Each endpoint needs the same four diagnostic tools.');
      for(const [kind,records] of Object.entries(round.observations||{}))for(const o of records||[]){
        const observations=kind==='counters'?o.snapshots:kind==='history'?o.reports:[o];
        if(kind==='light'){
          refs(o.interpretationSourceIds,path+'.observations.interpretationSourceIds');claim(o.interpretationSourceIds,'no-light',path+'.observations');
          for(const reading of o.opticalReadings||[])refs(reading.sourceIds,path+'.observations.opticalReadings.sourceIds');
        }else refs(o.sourceIds,path+'.observations.sourceIds');
        for(const observed of observations||[]){
          check(list(observed.outputIds)&&observed.outputIds.every(id=>outputMap.get(id)?.interfaceIds.includes(o.interfaceId)),path+'.observations.outputIds','Observation must reference outputs for the same endpoint.','invalid-reference');
          if(kind!=='history')check(observed.outputIds?.every(id=>outputMap.get(id)?.observedAt===observed.observedAt),path+'.observations.observedAt','Observation and output timestamps disagree.','inconsistent-evidence');
        }
      }
      check(list(round.choices)&&round.choices.every(c=>text(c.label)&&object(c.feedback)&&text(c.feedback.text)&&text(c.feedback.method)),path+'.choices','Every choice needs corrective or supporting explanation.');
      check(Array.isArray(round.hints)&&round.hints.length===3&&unique(round.hints.map(h=>h.id))&&round.hints.every((h,n)=>text(h.id)&&h.kind===['method','worked-step','solution'][n]&&text(h.text)),path+'.hints','Provide three uniquely identified, ordered help items.');
      for(const h of round.hints||[])refs(h.sourceIds,path+'.hints.sourceIds');
      const result=evaluate(round,{choiceId:round.choices?.[0]?.id});
      check(result.status!=='content-error',path+'.observations',`Domain evidence error: ${result.reasonCode}`,result.reasonCode==='ambiguous-diagnosis'?'ambiguous-answer':'inconsistent-evidence');
    }
  }
  levelId=undefined;roundId=undefined;
  check(globalIds.every(text)&&unique(globalIds),'$','Source, level and round IDs must be globally unique.','invalid-reference');
  return {content:errors.length?null:freeze(document),errors};
}
export async function loadContent(url=new URL('../data/levels.json',import.meta.url),fetcher=fetch){
  let response;
  try{response=await fetcher(url);if(!response.ok)throw new Error(`HTTP ${response.status}`);}catch(error){return {content:null,errors:[{code:'load-failed',path:'$',message:`Training content could not be loaded (${error.message}).`}]};}
  let data;try{data=await response.json();}catch{return {content:null,errors:[{code:'invalid-json',path:'$',message:'Training content is not valid JSON.'}]};}
  try{return validateContent(data);}catch{return {content:null,errors:[{code:'invalid-schema',path:'$',message:'Training content has an invalid structure.'}]};}
}
