import {currentCase,patrolSummary,verificationChecklist,counterHistoryNote} from '../engine/cases.js?v=guided-v7';
const el=(tag,cls='',text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
function button(text,action,id){const b=el('button','',text);b.type='button';b.dataset.action=action;b.id=id;return b;}
function title(text){const h=el('h1','',text);h.id='view-title';h.tabIndex=-1;return h;}

export function patrolBriefing(content){
  const frag=document.createDocumentFragment(),hero=el('section','briefing-hero'),copy=el('div','hero-copy');
  copy.append(el('span','tag','GUIDED NOC PATROL'),title('Master the link.'),el('p','lead','Observe. Reason. Explain. Hand off.'),el('p','intro',`${content.cases.length} incidents · ${content.cases.reduce((n,c)=>n+c.questions.length,0)} decisions. Investigate both switches, interpret the captured outputs, and build a diagnosis you can support. Then compare your reasoning with the reported repair outcome.`));
  const start=button('Start guided NOC patrol  →','begin-guided','begin-guided');start.className='primary';copy.append(start,el('p','micro','Five decisions per incident · reasoning hints · unlimited retries · downloadable handoffs'));
  const art=el('div','hero-art');art.setAttribute('aria-hidden','true');art.append(el('div','moon'),el('div','mountain mountain-back'),el('div','mountain'),el('div','torii'),el('div','dojo-floor'));
  const ninja=el('div','ninja'),img=el('img','icon sprite sprite-ninja');img.src='./assets/ninja.png';img.alt='';ninja.append(img);art.append(ninja,el('span','scene-caption','THE NETWORK NEEDS A SHARP MIND.'));hero.append(copy,art);frag.append(hero);
  const guide=el('section','field-guide');guide.setAttribute('aria-label','Investigation method');guide.append(el('h2','','Build the evidence before the conclusion.'));
  const cards=el('div','guide-cards');
  for(const [heading,text] of [
    ['01 · Compare both endpoints','Follow each transmitter toward the opposite receiver. Inspect every optical channel. A fault flag helps locate the affected direction; it does not uniquely identify a failed optic.'],
    ['02 · Separate state from trend','LinkUp alone does not establish health. A cumulative counter is not an error rate. Ask for timed readings and reset history before concluding errors are increasing or a link is actively flapping.'],
    ['03 · Explain and verify','Check the automated assessment against the outputs. State the suspected cause, supporting evidence and what is still unknown. After an authorized intervention, verify optics, new errors, stability and service.']
  ]){const card=el('article','guide-card');card.append(el('h3','',heading),el('p','',text));cards.append(card);}
  guide.append(cards,el('p','intro','Training assumption: transmitters have not been intentionally disabled. Use the investigation notebook to review both switches and the automated assessment. Each decision gives feedback and a reasoning hint if needed. Complete the decisions and open every evidence panel to reveal the reported outcome. Missing measurements remain unknown; opening a panel alone does not demonstrate understanding.'));frag.append(guide);return frag;
}

function evidencePanel(c,patrol){
  const p=patrol.progress[c.id],section=el('section','evidence-panel patrol-evidence');
  section.append(el('h2','','Investigation notebook'),el('p','micro',`${p.viewedIds.length} / ${c.evidence.length} panels viewed · ${c.collectionNote}`));
  const tabs=el('div','case-tools');tabs.setAttribute('aria-label','Investigation evidence panels');
  for(const endpoint of c.endpoints){
    const group=el('div','case-tool-group');group.append(el('strong','',`${endpoint.name} · ${endpoint.port}`));
    const buttons=el('div','help-buttons');
    for(const e of c.evidence.filter(e=>e.endpointId===endpoint.id))buttons.append(evidenceButton(e,patrol,p));
    group.append(buttons);tabs.append(group);
  }
  tabs.append(evidenceButton(c.evidence.find(e=>e.kind==='script'),patrol,p));section.append(tabs);
  const active=c.evidence.find(e=>e.id===patrol.activeEvidenceId),label=el('h3','',`${active.endpointId?c.endpoints.find(e=>e.id===active.endpointId).name+' · ':''}${active.label}`);section.append(label);
  const region=el('div','case-output');region.tabIndex=0;region.setAttribute('role','region');region.setAttribute('aria-label',label.textContent+' evidence');
  if(active.rows){
    const table=el('table','error-table'),head=el('thead'),tr=el('tr');
    const columns=active.kind==='optics'?['Port','Temp (°C)','Voltage*','Bias*','Tx (dBm)','Rx (dBm)']:['Port','FCS','Align','Sym','RX','TX'];
    for(const text of columns){const th=el('th','',text);th.scope='col';tr.append(th);}head.append(tr);table.append(head);
    const body=el('tbody');for(const row of active.rows){const tr=el('tr');row.forEach((text,i)=>{const cell=el(i?'td':'th','',text);if(!i)cell.scope='row';tr.append(cell);});body.append(tr);}table.append(body);region.append(table);
  }else region.append(el('pre','case-terminal',active.text));
  section.append(region);
  section.append(el('p','micro',active.kind==='optics'?'* Voltage/Bias units were not shown in the supplied headers. Read each optical row separately. No model-specific alarm bands are inferred.':active.kind==='errors'?'Captured totals, not rates. No second timed counter sample or reset baseline is supplied.':active.kind==='script'?'Original automated assessment, not an answer key. Its claims and totals need to be checked against the evidence.':'Literal supplied MAC detail. Different rows may have different histories; cumulative changes are not a recent flap rate.'));
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
  const readout=el('p','drag-readout','Grab the shuriken. Drag onto a target. Release to throw.');readout.setAttribute('aria-live','polite');arena.append(targets,launcher,readout);
  if(animate&&record.answerId){const shot=el('span','projectile');shot.dataset.choiceId=record.answerId;shot.setAttribute('aria-hidden','true');shot.append(sprite('star'));arena.append(shot);}
  return arena;
}

function decisionPanel(c,patrol,animate){
  const p=patrol.progress[c.id],q=c.questions[patrol.questionIndex],record=p.questions[q.id],section=el('section','decision-panel patrol-decision');
  if(p.completed){
    const heading=el('h2','',c.outcome.title);heading.id='case-outcome-title';heading.tabIndex=-1;
    section.append(el('span','tag','REPORTED OUTCOME'),heading,el('p','lead',c.outcome.summary),el('p','',c.outcome.limits));
    const review=el('details','practice');review.append(el('summary','','Review your decisions'));
    for(const question of c.questions){review.append(el('h3','',question.prompt),el('p','',question.options.find(o=>o.correct).text),el('p','micro',question.explanation));}
    section.append(review,el('h3','','Before closing the ticket'),el('p','',verificationChecklist),button('Download case handoff (.txt)','download-handoff','download-handoff'));
    const next=button('Continue patrol  →','next','next');next.className='primary';section.append(next);return section;
  }
  section.append(el('span','tag',`DECISION ${patrol.questionIndex+1} / ${c.questions.length}`));
  const heading=el('h2','',q.prompt);heading.id='case-question-title';heading.tabIndex=-1;section.append(heading);
  const answers=el('div','decision-answers');answers.setAttribute('role','list');answers.setAttribute('aria-label','Answer choices');
  for(const [i,option] of q.options.entries()){
    const answer=el('div','reasoning-option answer-description',`${String.fromCharCode(65+i)}. ${option.text}`);answer.id='case-answer-'+option.id;answer.setAttribute('role','listitem');answers.append(answer);
  }
  section.append(answers,decisionArena(q,record,animate),el('p','aim-guide','Drag the shuriken from the ninja’s hand onto A, B or C, then release to answer. Release outside the targets to cancel.'));
  if(record.feedback){const feedback=el('div','feedback '+record.feedback.status);feedback.id='patrol-feedback';feedback.tabIndex=-1;feedback.append(el('strong','',record.feedback.status==='correct'?'Evidence supports your decision.':record.feedback.status==='invalid'?'Choose an answer.':'Check the evidence and try again.'),el('p','',record.feedback.text));section.append(feedback);}
  if(record.completed){
    if(patrol.questionIndex<c.questions.length-1){const next=button('Next decision  →','question-next','question-next');next.className='primary';section.append(next);}
    else{
      const missing=c.evidence.filter(e=>!p.viewedIds.includes(e.id));
      if(missing.length){section.append(el('p','',`Open the remaining ${missing.length} evidence panels before revealing the outcome.`));const links=el('div','help-buttons');for(const e of missing){const b=evidenceButton(e,patrol,p);b.id='missing-'+e.id;b.textContent=(e.endpointId?c.endpoints.find(p=>p.id===e.endpointId).name+' · ':'')+e.label;links.append(b);}section.append(links);}
      const reveal=button('Reveal actual outcome  →','reveal','reveal');reveal.className='primary';reveal.disabled=missing.length>0;section.append(reveal);
    }
  }
  section.append(el('p','micro',`${record.attempts} attempts on this decision · ${record.assisted?'Reasoning hint used':'No reasoning hint used'} · No retry penalty`));
  if(record.assisted)section.append(el('p','help-text',q.explanation));
  else if(!record.completed)section.append(button('Show reasoning hint','hint','hint'));
  return section;
}

export function patrolCaseView(content,state,animate=false){
  const c=currentCase(state,content),frag=document.createDocumentFragment();
  frag.append(el('span','tag',`INCIDENT ${state.patrol.caseIndex+1} / ${content.cases.length} · ${c.speed}`),title(c.title),el('p','lead',c.intro));
  const inventory=el('section','case-inventory');inventory.setAttribute('aria-label','Case link endpoints');
  for(const endpoint of c.endpoints){const card=el('article','device');card.append(el('strong','device-name',`${endpoint.name} · ${endpoint.port}`),el('p','',`${endpoint.model} · EOS ${endpoint.eos}`),el('p','micro',`${endpoint.manufacturer} ${endpoint.optic}`));inventory.append(card);}frag.append(inventory);
  const method=el('details','practice case-method');method.open=true;method.append(el('summary','','NOC method for this case'),el('p','',c.method));frag.append(method);
  const grid=el('div','challenge-grid patrol-grid');grid.append(evidencePanel(c,state.patrol),decisionPanel(c,state.patrol,animate));frag.append(grid);return frag;
}

export function patrolResults(content,state){
  const section=el('section','results-hero'),s=patrolSummary(state.patrol,content.cases);
  section.append(el('span','tag','GUIDED NOC PATROL COMPLETE'),title('Evidence before certainty.'),el('p','lead',`${s.completed} incidents · ${s.decisions} decisions completed · ${s.attempts} attempts · ${s.assisted} reasoning hints used.`),el('p','','You investigated directions, challenged counter claims and separated repair actions from confirmed outcomes. Completion records practice, not independent mastery.'));
  const cards=el('div','case-results');
  for(const c of content.cases){const card=el('article','guide-card');card.append(el('h2','',c.title),el('h3','',c.outcome.title),el('p','',c.outcome.summary),el('p','micro',c.outcome.limits));const download=button('Download case handoff','download-handoff','download-'+c.id);download.dataset.caseId=c.id;card.append(download);cards.append(card);}
  section.append(cards,button('Start a fresh patrol','restart','patrol-restart'));return section;
}
