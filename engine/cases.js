// Supplied captures support bounded evidence reasoning; missing telemetry is never generated.
import {evidenceText,commandReadings,validSelection,defaultSelection,resolveCapture,captureKey,captureNeedsReport,statusLabels,matchesCommand} from './investigation.js?v=guided-v21';
const nonempty=v=>typeof v==='string'&&v.trim().length>0;
const unique=values=>new Set(values).size===values.length;
const freeze=v=>{if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};

export function validateCases(data){
  try{
    const require=(ok,message)=>{if(!ok)throw Error(message);};
    require(data?.schemaVersion===1&&nonempty(data.revision),'Unsupported incident schema or missing revision.');
    require(Array.isArray(data.cases)&&data.cases.length>0&&unique(data.cases.map(c=>c.id)),'Cases need unique identities.');
    for(const c of data.cases){
      require([c.id,c.title,c.intro,c.method,c.limits,c.collectionNote].every(nonempty)&&c.revision===data.revision,'Case text/revision missing or stale.');
      require(/^specs\/001-noc-ninja-training\/evidence\/[a-z0-9-]+\.md$/.test(c.source),'A local evidence source is required.');
      require(['10G','100G'].includes(c.speed)&&c.endpoints?.length===2&&unique(c.endpoints.map(e=>e.id)),'Two distinct endpoints and link speed are required.');
      for(const e of c.endpoints){require([e.id,e.name,e.port].every(nonempty),'Incomplete endpoint identity.');require([e.model,e.eos,e.manufacturer,e.optic,e.linecard??null].every(v=>v===null||nonempty(v)),'Inventory fields must be captured text or explicitly unknown.');}
      require(Array.isArray(c.evidence)&&unique(c.evidence.map(e=>e.id)),'Evidence IDs must be unique.');
      // Admission requires both endpoints' expected captures; collect gaps before publishing a case.
      for(const endpoint of c.endpoints)for(const kind of ['status','optics','mac','errors']){
        for(const observationId of kind==='status'?['incident']:['incident','monitoring']){
          const recordings=c.evidence.filter(e=>e.endpointId===endpoint.id&&e.kind===kind&&(e.observationId||'incident')===observationId);
          require(recordings.length===1&&nonempty(recordings[0].text),`Missing required capture: ${c.id} ${endpoint.name} ${endpoint.port} ${kind} (${observationId}). Collect the original output before adding this case to the quiz.`);
        }
      }
      require(c.evidence.filter(e=>e.kind==='script').length<=1,'Do not duplicate a supplied script assessment.');
      const commandEvidence=c.evidence.filter(e=>e.kind!=='script');
      require(unique(commandEvidence.map(e=>`${e.endpointId}:${e.kind}:${e.observationId||'incident'}`)),'Evidence command/observation keys must be unique.');
      require(Array.isArray(c.captureNeeds)&&c.captureNeeds.length>0&&c.captureNeeds.every(nonempty),'Case capture priorities are required.');
      require(Array.isArray(c.commandCaptures)&&unique(c.commandCaptures.map(captureKey)),'Command recordings need unique endpoint/command/observation keys.');
      for(const r of c.commandCaptures){
        require(validSelection(c,r)&&[r.text,r.capturedAt,r.source].every(nonempty)&&r.source===c.source,'Command recordings need a valid target, observation, timestamp and case source.');
        const endpoint=c.endpoints.find(e=>e.id===r.endpointId);
        require(matchesCommand(r.text,endpoint,r.commandId),'Command recording prompt must match its endpoint and command.');
        require(!commandEvidence.some(e=>e.text&&e.endpointId===r.endpointId&&e.kind===r.commandId&&(e.observationId||'incident')===r.observationId),'Original literal evidence must not be shadowed.');
      }
      for(const e of c.evidence){
        require(nonempty(e.id)&&nonempty(e.label)&&['status','optics','errors','mac','script'].includes(e.kind),'Invalid evidence item.');
        require(e.kind==='script'?e.endpointId===null:c.endpoints.some(p=>p.id===e.endpointId),'Evidence endpoint mismatch.');
        require(e.observationId===undefined||['incident','monitoring'].includes(e.observationId),'Review evidence must precede outcome disclosure.');
        if(e.text!==undefined||['status','mac','script'].includes(e.kind)){
          require(nonempty(e.text),'Missing literal output.');
          require(e.rows===undefined,'Literal captures must not have a competing generated table.');
          if(e.kind!=='script')require(matchesCommand(e.text,c.endpoints.find(p=>p.id===e.endpointId),e.kind,e.commandAlias),'Literal command must match the endpoint and kind.');
          if(e.kind==='mac')require(e.text.includes('Current System Time:')&&['PHY State','Interface State','MAC Rx Local Fault','MAC Rx Remote Fault'].every(t=>e.text.includes(t)),'MAC capture needs timestamp and all state rows.');
        }else{
          const endpoint=c.endpoints.find(p=>p.id===e.endpointId);
          require(Array.isArray(e.rows)&&e.rows.length===(e.kind==='errors'?1:c.speed==='10G'?1:4),'Wrong number of captured rows.');
          require(unique(e.rows.map(r=>r[0]))&&e.rows.every((r,i)=>r[0]===(e.kind==='optics'&&c.speed==='100G'?endpoint.port.replace(/\/1$/,`/${i+1}`):endpoint.port)),'Captured row ports must match the endpoint and channel.');
          require(e.rows.every(r=>Array.isArray(r)&&r.length===6&&r.every(nonempty)&&r.slice(1).every(v=>/^(?:-?\d+(?:\.\d+)?|\d{1,3}(?:,\d{3})+)$/.test(v))), 'Invalid captured numeric table.');
          if(e.kind==='errors')require(e.rows[0].slice(1).every(v=>Number.isSafeInteger(Number(v.replaceAll(',','')))&&Number(v.replaceAll(',',''))>=0),'Invalid counter value.');
        }
      }
      require(Array.isArray(c.questions)&&c.questions.length>0&&unique(c.questions.map(q=>q.id)),'Questions need unique identities.');
      for(const q of c.questions){
        require(q.context===undefined||nonempty(q.context),'Question context must be nonempty when supplied.');
        require(nonempty(q.id)&&nonempty(q.prompt)&&nonempty(q.explanation)&&nonempty(q.commandHint)&&q.sourceIds?.includes(c.id),'Question needs an explanation, investigation hint and matching source.');
        require(q.options?.length===3&&unique(q.options.map(o=>o.id))&&q.options.every(o=>nonempty(o.id)&&nonempty(o.text)&&nonempty(o.feedback)&&typeof o.correct==='boolean')&&q.options.filter(o=>o.correct).length===1,'Each reviewed question needs exactly one supported answer.');
      }
      require(['confirmed-recovery','intervention-only','combined-recovery','recommended-action'].includes(c.outcome?.status)&&[c.outcome.title,c.outcome.summary,c.outcome.limits].every(nonempty),'Outcome and its uncertainty must be explicit.');
    }
    return {cases:freeze(data.cases),errors:[]};
  }catch(error){return {cases:[],errors:[{path:'Incident library',message:error.message}]};}
}

export async function loadCases(url=new URL('../data/cases.json?v=guided-v21',import.meta.url),fetcher=fetch){
  try{const response=await fetcher(url);if(!response.ok)throw Error(`HTTP ${response.status}`);return validateCases(await response.json());}
  catch(error){return {cases:[],errors:[{path:'Incident library',message:`Could not load case studies (${error.message}).`}]};}
}

export function initialPatrol(cases=[]){
  return {caseIndex:0,questionIndex:0,activeEvidenceId:cases[0]?.evidence[0]?.id||null,activeCapture:null,captureSelection:cases.length?defaultSelection(cases[0]):null,progress:Object.fromEntries(cases.map(c=>[c.id,{
    completed:false,viewedIds:[c.evidence[0].id],captureRequests:[],questions:Object.fromEntries(c.questions.map(q=>[q.id,{answerId:null,attempts:0,completed:false,assisted:false,feedback:null}]))
  }]))};
}
export const currentCase=(state,content)=>(state.sessionCases||content.cases)?.[state.patrol.caseIndex];
export function patrolSummary(patrol,cases){
  const records=Object.values(patrol.progress),questions=records.flatMap(p=>Object.values(p.questions));
  return {completed:records.filter(p=>p.completed).length,total:cases.length,decisions:questions.filter(q=>q.completed).length,attempts:questions.reduce((n,q)=>n+q.attempts,0),assisted:questions.filter(q=>q.assisted).length};
}

export function transitionPatrol(state,event,cases=[]){
  if(event.type==='begin-guided'&&state.view==='briefing'&&cases.length)return transitionPatrol({...state,view:'challenge'},{type:'choose-capture',selection:state.patrol.captureSelection},cases);
  if(state.view!=='challenge')return state;
  const patrol=state.patrol,c=cases[patrol.caseIndex],p=patrol.progress[c.id],q=c.questions[patrol.questionIndex],record=p.questions[q.id];
  const patch=changes=>({...state,patrol:{...patrol,progress:{...patrol.progress,[c.id]:{...p,...changes}}}});
  const questionPatch=changes=>patch({questions:{...p.questions,[q.id]:{...record,...changes}}});
  if(event.type==='choose-capture'){
    const readings=commandReadings(c,event.selection,p.completed);if(!readings.length)return state;
    const available=readings.filter(r=>r.status==='captured'||r.status==='summary-only');
    const shown=available.length?available:readings.slice(0,1);
    const selection={...readings[0].request};
    return {...state,patrol:{...patrol,captureSelection:selection,activeCapture:selection,captureGroup:true,activeEvidenceId:shown[0]?.evidence?.id||null,progress:{...patrol.progress,[c.id]:{...p,
      viewedIds:[...new Set([...p.viewedIds,...shown.flatMap(r=>r.evidence?[r.evidence.id]:[])])],
      captureRequests:[...p.captureRequests.filter(r=>!shown.some(s=>captureKey(s.request)===captureKey(r))),...shown.map(r=>({...r.request,status:r.status}))]
    }}}};
  }
  if(event.type==='request-capture'){
    const selection=event.selection||patrol.captureSelection,result=resolveCapture(c,selection,p.completed);
    if(!result)return state;
    const request={endpointId:selection.endpointId,commandId:selection.commandId,observationId:selection.observationId};
    return {...state,patrol:{...patrol,captureSelection:request,activeCapture:request,captureGroup:false,activeEvidenceId:result.evidence?.id||null,progress:{...patrol.progress,[c.id]:{...p,
      viewedIds:result.evidence?[...new Set([...p.viewedIds,result.evidence.id])]:p.viewedIds,
      captureRequests:[...p.captureRequests.filter(r=>captureKey(r)!==captureKey(request)),{...request,status:result.status}]
    }}}};
  }
  if(event.type==='inspect'){
    const evidence=c.evidence.find(e=>e.id===event.outputId);if(!evidence)return state;
    return transitionPatrol(state,{type:'choose-capture',selection:{endpointId:evidence.endpointId,commandId:evidence.kind}},cases);
  }
  if(event.type==='select'&&!record.completed&&q.options.some(o=>o.id===event.answerId))return questionPatch({answerId:event.answerId,feedback:null});
  if(event.type==='hint'&&!record.completed&&!record.assisted)return questionPatch({assisted:true});
  if(event.type==='submit'&&!record.completed){
    const option=q.options.find(o=>o.id===record.answerId);
    if(!option)return questionPatch({feedback:{status:'invalid',text:'Choose an answer before submitting. No attempt counted.'}});
    return questionPatch({attempts:record.attempts+1,completed:option.correct,feedback:{status:option.correct?'correct':'incorrect',text:option.feedback+' '+q.explanation}});
  }
  if(event.type==='question-next'&&record.completed&&patrol.questionIndex<c.questions.length-1)return {...state,patrol:{...patrol,questionIndex:patrol.questionIndex+1}};
  if(event.type==='reveal'&&!p.completed&&Object.values(p.questions).every(r=>r.completed)&&c.evidence.every(e=>p.viewedIds.includes(e.id)))return patch({completed:true});
  if(event.type==='next'&&p.completed){
    const next=cases[patrol.caseIndex+1];
    return next?transitionPatrol({...state,patrol:{...patrol,caseIndex:patrol.caseIndex+1,questionIndex:0,activeEvidenceId:next.evidence[0].id,activeCapture:null,captureSelection:defaultSelection(next)}},{type:'choose-capture',selection:defaultSelection(next)},cases):{...state,view:'session-summary'};
  }
  return state;
}

export const counterHistoryNote='Counter resets in this training environment: clearing interface traffic/error counters does not clear the PHY, interface-state or Local/Remote Fault Changes in show interfaces … mac detail. Those MAC histories persist until a switch reboot. Keep timestamped baselines and compare changes; do not reboot merely to zero the history. Traffic/error counters and MAC state histories have separate baselines.';

export const verificationChecklist='After authorized work, check both endpoints, per-channel optics, new error deltas with a verified reset baseline, stability over a stated interval, and the affected service. Record each intervention separately. Do not record an unmeasured result as verified.';

export function caseReport(c,p){
  if(!p?.completed)return null;
  return [
    `NOC NINJA — GUIDED PATROL LEARNING RECORD\n${c.id}: ${c.title}\nIncident evidence and reasoning review.`,
    c.endpoints.map(e=>`${e.name} ${e.port} · ${e.model||'Switch model not captured'} · EOS ${e.eos||'not captured'} · Line card ${e.linecard||'not captured'} · ${e.manufacturer||'Optic manufacturer not captured'} ${e.optic||'— part number not captured'}`).join('\n'),
    c.collectionNote,c.limits,
    counterHistoryNote,
    'RECORDED COMMAND REQUESTS\n'+(p.captureRequests.map(r=>{const resolved=resolveCapture(c,r,true);return `${resolved.endpoint.name} | ${resolved.commandText} | ${resolved.observation.label} | ${statusLabels[r.status]}`;}).join('\n')||'No command requests recorded.'),
    ...c.evidence.map(e=>`${e.endpointId||'Automation'} · ${e.label}\n${evidenceText(c,e)||[(e.kind==='optics'?'Port | Temp (°C) | Voltage | Bias | Tx (dBm) | Rx (dBm)':'Port | FCS | Align | Sym | RX | TX'),...e.rows.map(r=>r.join(' | '))].join('\n')}`),
    ...c.commandCaptures.map(r=>`ADDITIONAL RECORDED OUTPUT · ${r.observationId} · ${r.capturedAt}\n${r.text}`),
    ...c.questions.map(q=>`${q.prompt}\nSupported answer: ${q.options.find(o=>o.correct).text}\n${q.explanation}\nAttempts: ${p.questions[q.id].attempts}; reasoning hint: ${p.questions[q.id].assisted?'used':'not used'}`),
    `${c.outcome.status==='recommended-action'?'DIAGNOSIS REVIEW':'REPORTED OUTCOME'}\n${c.outcome.title}\n${c.outcome.summary}\n${c.outcome.limits}`,
    `VERIFICATION TO COLLECT\n${verificationChecklist}`,
    captureNeedsReport(c),
    'Completion records practice, not independent mastery or proof of service recovery beyond the incident follow-up.'
  ].join('\n\n');
}
