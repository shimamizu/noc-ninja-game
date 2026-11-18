// Supplied captures support bounded evidence reasoning; missing telemetry is never generated.
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
      for(const e of c.endpoints)require([e.id,e.name,e.model,e.eos,e.port,e.manufacturer,e.optic].every(nonempty),'Incomplete endpoint inventory.');
      require(Array.isArray(c.evidence)&&unique(c.evidence.map(e=>e.id)),'Evidence IDs must be unique.');
      for(const endpoint of c.endpoints)for(const kind of ['optics','errors','mac'])require(c.evidence.filter(e=>e.endpointId===endpoint.id&&e.kind===kind).length===1,'Each endpoint needs optics, errors and MAC evidence.');
      require(c.evidence.filter(e=>e.kind==='script').length===1,'Include the original script assessment.');
      for(const e of c.evidence){
        require(nonempty(e.id)&&nonempty(e.label)&&['optics','errors','mac','script'].includes(e.kind),'Invalid evidence item.');
        require(e.kind==='script'?e.endpointId===null:c.endpoints.some(p=>p.id===e.endpointId),'Evidence endpoint mismatch.');
        if(['mac','script'].includes(e.kind)){
          require(nonempty(e.text),'Missing literal output.');
          if(e.kind==='mac'){const endpoint=c.endpoints.find(p=>p.id===e.endpointId);require(e.text.startsWith(`${endpoint.name}# show interfaces ${endpoint.port.replace(/^Et/,'Ethernet')} mac detail`)&&e.text.includes('Current System Time:')&&['PHY State','Interface State','MAC Rx Local Fault','MAC Rx Remote Fault'].every(t=>e.text.includes(t)),'MAC command must match its endpoint and contain all state rows.');}
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
        require(nonempty(q.id)&&nonempty(q.prompt)&&nonempty(q.explanation)&&q.sourceIds?.includes(c.id),'Question needs an explanation and matching source.');
        require(q.options?.length===3&&unique(q.options.map(o=>o.id))&&q.options.every(o=>nonempty(o.id)&&nonempty(o.text)&&nonempty(o.feedback)&&typeof o.correct==='boolean')&&q.options.filter(o=>o.correct).length===1,'Each reviewed question needs exactly one supported answer.');
      }
      require(['confirmed-recovery','intervention-only','combined-recovery'].includes(c.outcome?.status)&&[c.outcome.title,c.outcome.summary,c.outcome.limits].every(nonempty),'Outcome and its uncertainty must be explicit.');
    }
    return {cases:freeze(data.cases),errors:[]};
  }catch(error){return {cases:[],errors:[{path:'Incident library',message:error.message}]};}
}

export async function loadCases(url=new URL('../data/cases.json?v=guided-v7',import.meta.url),fetcher=fetch){
  try{const response=await fetcher(url);if(!response.ok)throw Error(`HTTP ${response.status}`);return validateCases(await response.json());}
  catch(error){return {cases:[],errors:[{path:'Incident library',message:`Could not load case studies (${error.message}).`}]};}
}

export function initialPatrol(cases=[]){
  return {caseIndex:0,questionIndex:0,activeEvidenceId:cases[0]?.evidence[0]?.id||null,progress:Object.fromEntries(cases.map(c=>[c.id,{
    completed:false,viewedIds:[c.evidence[0].id],questions:Object.fromEntries(c.questions.map(q=>[q.id,{answerId:null,attempts:0,completed:false,assisted:false,feedback:null}]))
  }]))};
}
export const currentCase=(state,content)=>content.cases?.[state.patrol.caseIndex];
export function patrolSummary(patrol,cases){
  const records=Object.values(patrol.progress),questions=records.flatMap(p=>Object.values(p.questions));
  return {completed:records.filter(p=>p.completed).length,total:cases.length,decisions:questions.filter(q=>q.completed).length,attempts:questions.reduce((n,q)=>n+q.attempts,0),assisted:questions.filter(q=>q.assisted).length};
}

export function transitionPatrol(state,event,cases=[]){
  if(event.type==='begin-guided'&&state.view==='briefing'&&cases.length)return {...state,view:'challenge'};
  if(state.view!=='challenge')return state;
  const patrol=state.patrol,c=cases[patrol.caseIndex],p=patrol.progress[c.id],q=c.questions[patrol.questionIndex],record=p.questions[q.id];
  const patch=changes=>({...state,patrol:{...patrol,progress:{...patrol.progress,[c.id]:{...p,...changes}}}});
  const questionPatch=changes=>patch({questions:{...p.questions,[q.id]:{...record,...changes}}});
  if(event.type==='inspect'&&c.evidence.some(e=>e.id===event.outputId))return {...state,patrol:{...patrol,activeEvidenceId:event.outputId,progress:{...patrol.progress,[c.id]:{...p,viewedIds:[...new Set([...p.viewedIds,event.outputId])]}}}};
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
    return next?{...state,patrol:{...patrol,caseIndex:patrol.caseIndex+1,questionIndex:0,activeEvidenceId:next.evidence[0].id}}:{...state,view:'session-summary'};
  }
  return state;
}

export const counterHistoryNote='Counter resets in this training environment: clearing interface traffic/error counters does not clear the PHY, interface-state or Local/Remote Fault Changes in show interfaces … mac detail. Those MAC histories persist until a switch reboot. Keep timestamped baselines and compare changes; do not reboot merely to zero the history. Traffic/error counters and MAC state histories have separate baselines.';

export const verificationChecklist='After authorized work, check both endpoints, per-channel optics, new error deltas with a verified reset baseline, stability over a stated interval, and the affected service. Record each intervention separately. Do not record an unmeasured result as verified.';

export function caseReport(c,p){
  if(!p?.completed)return null;
  return [
    `NOC NINJA — GUIDED PATROL LEARNING RECORD\n${c.id}: ${c.title}\nIncident evidence and reasoning review.`,
    c.endpoints.map(e=>`${e.name} ${e.port} · ${e.model} · EOS ${e.eos} · ${e.manufacturer} ${e.optic}`).join('\n'),
    c.collectionNote,c.limits,
    counterHistoryNote,
    ...c.evidence.map(e=>`${e.endpointId||'Automation'} · ${e.label}\n${e.text||[(e.kind==='optics'?'Port | Temp (°C) | Voltage | Bias | Tx (dBm) | Rx (dBm)':'Port | FCS | Align | Sym | RX | TX'),...e.rows.map(r=>r.join(' | '))].join('\n')}`),
    ...c.questions.map(q=>`${q.prompt}\nSupported answer: ${q.options.find(o=>o.correct).text}\n${q.explanation}\nAttempts: ${p.questions[q.id].attempts}; reasoning hint: ${p.questions[q.id].assisted?'used':'not used'}`),
    `REPORTED OUTCOME\n${c.outcome.title}\n${c.outcome.summary}\n${c.outcome.limits}`,
    `VERIFICATION TO COLLECT\n${verificationChecklist}`,
    'Completion records practice, not independent mastery or proof of service recovery beyond the incident follow-up.'
  ].join('\n\n');
}
