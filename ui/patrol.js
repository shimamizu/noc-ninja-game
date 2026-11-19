import {currentCase,patrolSummary,verificationChecklist,counterHistoryNote} from '../engine/cases.js?v=guided-v21';
import {evidenceText,commandReadings,commands,commandText,resolveCapture,statusLabels} from '../engine/investigation.js?v=guided-v21';
const el=(tag,cls='',text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
function button(text,action,id){const b=el('button','',text);b.type='button';b.dataset.action=action;b.id=id;return b;}
function title(text){const h=el('h1','',text);h.id='view-title';h.tabIndex=-1;return h;}

export function patrolBriefing(content){
  const frag=document.createDocumentFragment(),hero=el('section','briefing-hero'),copy=el('div','hero-copy');
  copy.append(el('span','tag','GUIDED NOC PATROL'),title('Master the link.'),el('p','lead','Observe. Reason. Explain. Hand off.'),el('p','intro',`${content.cases.length} incident${content.cases.length===1?'':'s'} · ${content.cases.reduce((n,c)=>n+c.questions.length,0)} decisions. Investigate both switches, interpret the captured outputs, and build a diagnosis you can support. Then compare your reasoning with the diagnosis review and any reported repair outcome.`));
  const start=button('Start guided NOC patrol  →','begin-guided','begin-guided');start.className='primary';copy.append(start,el('p','micro','Reasoning hints · unlimited retries · downloadable handoffs'));
  const art=el('div','hero-art');art.setAttribute('aria-hidden','true');art.append(el('div','moon'),el('div','mountain mountain-back'),el('div','mountain'),el('div','torii'),el('div','dojo-floor'));
  const ninja=el('div','ninja'),img=el('img','icon sprite sprite-ninja');img.src='./assets/ninja.png';img.alt='';ninja.append(img);art.append(ninja,el('span','scene-caption','THE NETWORK NEEDS A SHARP MIND.'));hero.append(copy,art);frag.append(hero);
  const guide=el('section','field-guide');guide.setAttribute('aria-label','Investigation method');guide.append(el('h2','','Build the evidence before the conclusion.'));
  const cards=el('div','guide-cards');
  for(const [heading,text] of [
    ['01 · Request evidence','Choose a switch and one of four interface commands. All available readings appear together. Compare status, transceiver readings, MAC detail and error counters at both endpoints.'],
    ['02 · Separate state from trend','LinkUp alone does not establish health. A cumulative counter is not an error rate. Ask for timed readings and reset history before concluding errors are increasing or a link is actively flapping.'],
    ['03 · Explain and verify','Check any supplied diagnosis against the outputs. State the suspected cause, supporting evidence and what is still unknown. After an authorized intervention, verify optics, new errors, stability and service.']
  ]){const card=el('article','guide-card');card.append(el('h3','',heading),el('p','',text));cards.append(card);}
  guide.append(cards,el('p','intro','Training assumption: transmitters have not been intentionally disabled. The workbench opens saved evidence; it does not connect to switches. Complete the decisions and review each case’s available evidence to reveal its diagnosis review and any reported repair outcome, then review which after-repair verification evidence to collect. Opening evidence alone does not demonstrate understanding.'));frag.append(guide);return frag;
}

function commandWorkbench(c,patrol){
  const p=patrol.progress[c.id],selection=patrol.captureSelection,box=el('div','command-workbench');
  box.append(el('h2','','Command investigation'),el('span','micro',`${p.viewedIds.length} / ${c.evidence.length} captures viewed`));
  const fields=el('div','command-fields');
  function selectField(id,label,items,value){
    const wrap=el('div'),caption=el('label','',label),select=el('select');caption.htmlFor=id;select.id=id;
    for(const item of items){const option=el('option','',item.label);option.value=item.id;option.selected=item.id===value;select.append(option);}
    wrap.append(caption,select);fields.append(wrap);return select;
  }
  selectField('capture-endpoint','Switch / interface',c.endpoints.map(e=>({id:e.id,label:`${e.name} · ${e.port}`})),selection.endpointId);
  const endpoint=c.endpoints.find(e=>e.id===selection.endpointId);
  selectField('capture-command','Show command',commands.map(cmd=>({id:cmd.id,label:commandText(cmd,endpoint)})),selection.commandId);
  box.append(fields);
  const cmd=commands.find(cmd=>cmd.id===selection.commandId);
  const help=el('details','command-help');help.append(el('summary','','What to look for'),el('p','',cmd.purpose));box.append(help);
  return box;
}

function evidencePanel(c,patrol){
  const p=patrol.progress[c.id],section=el('section','evidence-panel patrol-evidence');
  section.append(commandWorkbench(c,patrol));
  if(patrol.captureGroup){
    const readings=commandReadings(c,patrol.captureSelection,p.completed);
    const available=readings.filter(r=>['captured','summary-only'].includes(r.status));
    const outputs=el('div','recorded-readings');outputs.id='capture-response';
    outputs.setAttribute('aria-label','Recorded command readings');
    for(const r of available){
      const card=el('article','recorded-reading');
      card.append(el('h3','',r.observation.label));
      const region=el('div','case-output');region.tabIndex=0;region.setAttribute('role','region');region.setAttribute('aria-label',`${r.endpoint.name} ${r.commandText} ${r.observation.label}`);
      if(r.text||r.evidence?.text)region.append(el('pre','case-terminal',r.text||evidenceText(c,r.evidence)));
      else region.append(el('p','','Script summary only; original command output not captured.'));
      card.append(region);outputs.append(card);
    }
    if(!available.length)outputs.append(el('p','capture-response missing','Not captured. No saved output is available for this command.'));
    section.append(outputs);
    const notes=el('details','practice evidence-notes');notes.append(el('summary','','Capture notes and limits'),el('p','',c.collectionNote));
    for(const note of new Set(available.map(r=>r.evidence?.note).filter(Boolean)))notes.append(el('p','',note));
    if(['errors','mac'].includes(patrol.captureSelection.commandId))notes.append(el('p','',counterHistoryNote));
    notes.append(el('p','',c.limits));
    const missing=readings.filter(r=>r.status==='missing');if(missing.length)notes.append(el('p','',`Not captured: ${missing.map(r=>r.observation.label).join(', ')}.`));
    section.append(notes);return section;
  }
  const result=patrol.activeCapture&&resolveCapture(c,patrol.activeCapture,p.completed);
  if(result){
    const response=el('div','capture-response '+result.status);response.id='capture-response';response.tabIndex=-1;
    response.append(el('strong','',statusLabels[result.status]),el('p','command-name',`${result.endpoint.name} · ${result.commandText} · ${result.observation.label}`));
    if(result.status==='missing')response.append(el('p','','This output was not captured for this incident at this observation. It cannot establish a normal result, zero errors or recovery. Continue with the available evidence.'),el('p','micro',`What to collect next: ${result.command.purpose}`));
    if(result.status==='locked')response.append(el('p','','Complete the decisions and review the captured evidence to reveal the reported outcome before inspecting after-repair recordings.'));
    if(result.status==='summary-only')response.append(el('p','','The original command output is not available. The related script table is shown below; its original command and capture time were not recorded.'));
    if(result.capturedAt)response.append(el('p','micro',`Recorded: ${result.capturedAt}`));
    if(result.text){const raw=el('div','case-output');raw.tabIndex=0;raw.setAttribute('role','region');raw.setAttribute('aria-label','Recorded command output');raw.append(el('pre','case-terminal',result.text));response.append(raw);}
    section.append(response);
  }
  const active=c.evidence.find(e=>e.id===patrol.activeEvidenceId);
  if(!active)return section;
  const label=el('h3','',`${active.endpointId?c.endpoints.find(e=>e.id===active.endpointId).name+' · ':''}${active.label}`);section.append(label);
  if(active.rows)section.append(el('p','micro','Recorded script summary · original show-command output not supplied.'));
  const region=el('div','case-output');region.tabIndex=0;region.setAttribute('role','region');region.setAttribute('aria-label',label.textContent+' evidence');
  if(active.rows){
    const table=el('table','error-table'),head=el('thead'),tr=el('tr');
    const columns=active.kind==='optics'?['Port','Temp (°C)','Voltage*','Bias*','Tx (dBm)','Rx (dBm)']:['Port','FCS','Align','Sym','RX','TX'];
    for(const text of columns){const th=el('th','',text);th.scope='col';tr.append(th);}head.append(tr);table.append(head);
    const body=el('tbody');for(const row of active.rows){const tr=el('tr');row.forEach((text,i)=>{const cell=el(i?'td':'th','',text);if(!i)cell.scope='row';tr.append(cell);});body.append(tr);}table.append(body);region.append(table);
  }else region.append(el('pre','case-terminal',evidenceText(c,active)));
  section.append(region);
  if(active.capturedAt&&!result)section.append(el('p','micro',`Recorded: ${active.capturedAt}`));
  section.append(el('p','micro',active.note||(active.kind==='optics'?'* Voltage/Bias units were not shown in the supplied headers. Read each optical row separately. No model-specific alarm bands are inferred.':active.kind==='errors'?'Captured totals, not rates. No second timed counter sample or reset baseline is supplied.':active.kind==='script'?'Original automated assessment, not an answer key. Its claims and totals need to be checked against the evidence.':'Literal supplied MAC detail. Different rows may have different histories; cumulative changes are not a recent flap rate.')));
  if(['errors','mac'].includes(active.kind)){const reset=el('details','practice');reset.append(el('summary','','Counter resets and MAC history'),el('p','',counterHistoryNote));section.append(reset);}
  const scope=el('details','practice');scope.append(el('summary','','Evidence limits'),el('p','',c.limits));section.append(scope);return section;
}
function evidenceButton(e,patrol,p){
  const b=button(`${p.viewedIds.includes(e.id)?'✓ ':''}${e.label}`,'inspect','case-tool-'+e.id);
  b.dataset.outputId=e.id;b.className=patrol.activeEvidenceId===e.id?'case-tool selected':'case-tool';b.setAttribute('aria-pressed',String(patrol.activeEvidenceId===e.id));return b;
}

function sprite(name){const img=el('img','icon sprite sprite-'+name);img.src='./assets/'+(name==='star'?'shuriken':name)+'.png';img.alt='';img.draggable=false;return img;}
function decisionArena(q,record,animate){
  const arena=el('div','arena'),targets=el('div','targets');
  for(const [i,option] of q.options.entries()){
    const target=el('div','target'+(record.answerId===option.id?' aimed':''));target.dataset.choiceId=option.id;target.setAttribute('role','img');target.setAttribute('aria-label','Target '+String.fromCharCode(65+i));target.setAttribute('aria-describedby','case-answer-'+option.id);
    const board=el('span','target-board');board.append(el('strong','',String.fromCharCode(65+i)));target.append(board);targets.append(target);
  }
  const launcher=el('div','launcher'),figure=el('div','ninja-figure');figure.append(sprite('ninja'));
  const star=el('button','shuriken-handle');star.type='button';star.id='shuriken-handle';star.disabled=record.completed;
  star.setAttribute('aria-label','Drag the shuriken to an answer target and release. Keyboard: Space to pick up, arrow keys to move, Space to drop, Escape to cancel.');star.append(sprite('star'));figure.append(star);launcher.append(figure);
  const readout=el('p','drag-readout','Drag the shuriken onto A, B or C. Release to answer.');readout.setAttribute('aria-live','polite');arena.append(targets,launcher,readout);
  if(animate&&record.answerId){const shot=el('span','projectile');shot.dataset.choiceId=record.answerId;shot.setAttribute('aria-hidden','true');shot.append(sprite('star'));arena.append(shot);}
  return arena;
}

function decisionPanel(c,patrol,animate){
  const p=patrol.progress[c.id],q=c.questions[patrol.questionIndex],record=p.questions[q.id],section=el('section','decision-panel patrol-decision');
  if(p.completed){
    const heading=el('h2','',c.outcome.title);heading.id='case-outcome-title';heading.tabIndex=-1;
    section.append(el('span','tag',c.outcome.status==='recommended-action'?'DIAGNOSIS REVIEW':'REPORTED OUTCOME'),heading,el('p','lead',c.outcome.summary),el('p','',c.outcome.limits));
    const review=el('details','practice');review.append(el('summary','','Review your decisions'));
    for(const question of c.questions){review.append(el('h3','',question.prompt),el('p','',question.options.find(o=>o.correct).text),el('p','micro',question.explanation));}
    section.append(review,el('h3','','Before closing the ticket'),el('p','',verificationChecklist),button('Download case handoff (.txt)','download-handoff','download-handoff'));
    const needs=el('details','practice');needs.append(el('summary','','What evidence would strengthen this case?'));
    const list=el('ul');for(const text of c.captureNeeds)list.append(el('li','',text));needs.append(list);section.append(needs);
    const next=button(patrol.caseIndex+1<Object.keys(patrol.progress).length?'Continue patrol  →':'Finish patrol  →','next','next');next.className='primary';section.append(next);return section;
  }
  section.append(el('span','tag',`DECISION ${patrol.questionIndex+1} / ${c.questions.length}`));
  const heading=el('h2','',q.prompt);heading.id='case-question-title';heading.tabIndex=-1;section.append(heading);
  if(q.context)section.append(el('p','decision-context',q.context));
  const answers=el('div','decision-answers');answers.setAttribute('role','list');answers.setAttribute('aria-label','Answer choices');
  for(const [i,option] of q.options.entries()){
    const answer=el('div','reasoning-option answer-description',`${String.fromCharCode(65+i)}. ${option.text}`);answer.id='case-answer-'+option.id;answer.setAttribute('role','listitem');answers.append(answer);
  }
  section.append(answers,decisionArena(q,record,animate));
  if(record.feedback){const feedback=el('div','feedback '+record.feedback.status);feedback.id='patrol-feedback';feedback.tabIndex=-1;feedback.append(el('strong','',record.feedback.status==='correct'?'Evidence supports your decision.':record.feedback.status==='invalid'?'Choose an answer.':'Check the evidence and try again.'),el('p','',record.feedback.text));section.append(feedback);}
  if(record.completed){
    if(patrol.questionIndex<c.questions.length-1){const next=button('Next decision  →','question-next','question-next');next.className='primary';section.append(next);}
    else{
      const missing=c.evidence.filter(e=>!p.viewedIds.includes(e.id));
      if(missing.length){section.append(el('p','',`Open the remaining ${missing.length} evidence panels before revealing the outcome.`));const links=el('div','help-buttons');for(const e of missing){const b=evidenceButton(e,patrol,p);b.id='missing-'+e.id;b.textContent=(e.endpointId?c.endpoints.find(p=>p.id===e.endpointId).name+' · ':'')+e.label;links.append(b);}section.append(links);}
      const reveal=button(c.outcome.status==='recommended-action'?'Review diagnosis  →':'Reveal actual outcome  →','reveal','reveal');reveal.className='primary';reveal.disabled=missing.length>0;section.append(reveal);
    }
  }
  section.append(el('p','micro',`${record.attempts} attempts · ${record.assisted?'Hint used':'Unlimited retries'}`));
  if(record.assisted)section.append(el('p','help-text',q.commandHint),el('p','help-text',q.explanation));
  else if(!record.completed)section.append(button('Show reasoning hint','hint','hint'));
  return section;
}

export function patrolCaseView(content,state,animate=false){
  const c=currentCase(state,content),frag=document.createDocumentFragment();
  const heading=el('div','case-heading');heading.append(title(c.title),el('span','tag',`${c.speed} · INCIDENT ${state.patrol.caseIndex+1} / ${content.cases.length}`));frag.append(heading);
  const context=el('details','case-context');context.append(el('summary','',`${c.endpoints.map(e=>e.name+' '+e.port).join(' ↔ ')} · Device details & method`));
  const inventory=el('section','case-inventory');inventory.setAttribute('aria-label','Case link endpoints');
  for(const endpoint of c.endpoints){const card=el('article','device');card.append(el('strong','device-name',`${endpoint.name} · ${endpoint.port}`),el('p','',`${endpoint.model||'Switch model not captured'} · EOS ${endpoint.eos||'not captured'}`),el('p','',`Line card: ${endpoint.linecard||'not captured'}`),el('p','micro',endpoint.optic?`${endpoint.manufacturer||'Manufacturer not captured'} ${endpoint.optic}`:`${endpoint.type||'Optic type not captured'} · manufacturer / part number not captured`));inventory.append(card);}context.append(inventory);
  context.append(el('p','',c.intro),el('p','',c.method));frag.append(context);
  const grid=el('div','challenge-grid patrol-grid');grid.append(evidencePanel(c,state.patrol),decisionPanel(c,state.patrol,animate));frag.append(grid);return frag;
}

export function patrolResults(content,state){
  const section=el('section','results-hero'),s=patrolSummary(state.patrol,content.cases);
  section.append(el('span','tag','GUIDED NOC PATROL COMPLETE'),title('Evidence before certainty.'),el('p','lead',`${s.completed} incident${s.completed===1?'':'s'} · ${s.decisions} decisions completed · ${s.attempts} attempts · ${s.assisted} reasoning hints used.`),el('p','','You investigated directions, challenged counter claims and separated repair actions from confirmed outcomes. Completion records practice, not independent mastery.'));
  const cards=el('div','case-results');
  for(const c of state.sessionCases||content.cases){const card=el('article','guide-card');card.append(el('h2','',c.title),el('h3','',c.outcome.title),el('p','',c.outcome.summary),el('p','micro',c.outcome.limits));const download=button('Download case handoff','download-handoff','download-'+c.id);download.dataset.caseId=c.id;card.append(download);cards.append(card);}
  section.append(cards,button('Start a fresh patrol','restart','patrol-restart'));return section;
}
