import {test,assert,equal} from './harness.js';
import {validateCases,loadCases,caseReport,patrolSummary} from '../engine/cases.js?v=guided-v7';
import {initialState,transition} from '../engine/state.js?v=guided-v7';

export function caseSourceTests(data,sources){
  test('Every shipped inventory, optical/counter row and MAC capture matches its source case',()=>{
    for(const c of data.cases){
      const source=sources[c.id];assert(typeof source==='string',`Missing source ${c.id}`);
      for(const endpoint of c.endpoints)assert(source.includes(`| ${endpoint.name} | ${endpoint.model} | ${endpoint.eos} | ${endpoint.port} | ${endpoint.manufacturer} | ${endpoint.optic} |`));
      for(const e of c.evidence){
        if(e.kind==='mac')assert(source.includes(e.text),`${c.id}/${e.id} MAC text changed`);
        if(e.rows){const endpoint=c.endpoints.find(p=>p.id===e.endpointId);for(const row of e.rows)assert(source.includes(`| ${endpoint.name} ${row.join(' | ')} |`),`${c.id}/${e.id} table row changed`);}
      }
    }
  });
}

export function caseTests(data){
  const copy=()=>JSON.parse(JSON.stringify(data));
  const expected=[['b','b','c','a','b'],['b','b','c','c','a'],['b','a','c','b','b']];
  const validated=validateCases(data),cases=validated.cases;
  const content={cases};
  const go=(s,type,extra={})=>transition(s,{type,...extra},content);
  const begin=()=>go(initialState(content),'begin-guided');
  const answer=s=>go(go(s,'select',{answerId:expected[s.patrol.caseIndex][s.patrol.questionIndex]}),'submit');
  const inspect=s=>{for(const e of cases[s.patrol.caseIndex].evidence)s=go(s,'inspect',{outputId:e.id});return s;};
  const finishQuestions=s=>{for(let n=0;n<5;n++){s=answer(s);if(n<4)s=go(s,'question-next');}return s;};
  const finishCase=s=>go(finishQuestions(inspect(s)),'reveal');
  test('Three supplied cases validate with independently reviewed answer choices',()=>{equal(validated.errors,[]);equal(cases.map(c=>c.id),['U10','U11','U12']);equal(cases.map(c=>c.questions.map(q=>q.options.find(o=>o.correct).id)),expected);assert(Object.isFrozen(cases[0].evidence[0].rows));});
  for(const [name,mutate] of [
    ['duplicate identities',d=>d.cases[1].id=d.cases[0].id],
    ['stale revision',d=>d.cases[0].revision='old'],
    ['wrong MAC endpoint',d=>d.cases[0].evidence.find(e=>e.kind==='mac').text='leaf-gw1# show interfaces Ethernet99 mac detail'],
    ['missing endpoint evidence',d=>d.cases[0].evidence.splice(0,1)],
    ['wrong optical channel count',d=>d.cases[1].evidence[0].rows.pop()],
    ['wrong optical channel port',d=>d.cases[1].evidence[0].rows[1][0]='Et99/2'],
    ['non-numeric optics',d=>d.cases[0].evidence[0].rows[0][4]='NaN'],
    ['negative counters',d=>d.cases[0].evidence[1].rows[0][1]='-2'],
    ['multiple answers',d=>d.cases[0].questions[0].options[0].correct=true],
    ['no supported answer',d=>d.cases[0].questions[0].options.forEach(o=>o.correct=false)],
    ['unresolved source',d=>d.cases[0].questions[0].sourceIds=['wrong']],
    ['invented outcome type',d=>d.cases[1].outcome.status='proven-hardware-failure']
  ])test(`Case validation rejects ${name}`,()=>{const d=copy();mutate(d);const r=validateCases(d);equal(r.cases,[]);assert(r.errors.length>0);});
  test('Unavailable or malformed case files fail closed without throwing',async()=>{for(const fetcher of [async()=>{throw Error('offline');},async()=>({ok:false,status:404}),async()=>({ok:true,json:async()=>{throw Error('bad json');}}),async()=>({ok:true,json:async()=>null})]){const r=await loadCases('unused',fetcher);equal(r.cases,[]);assert(r.errors.length);}equal((await loadCases('unused',async()=>({ok:true,json:async()=>copy()}))).errors,[]);});
  test('Captured 10G values and 100G channel outliers retain exact formatting',()=>{equal(cases[0].evidence[0].rows[0],['Et52','57.75','3.36','9.90','-4.34','-26.78']);equal(cases[0].evidence[1].rows[0],['Et52','24,786','0','4,686','24,834','0']);equal(cases[1].evidence.find(e=>e.id==='spine-optics').rows[3][5],'-14.09');equal(cases[2].evidence.find(e=>e.id==='spine-optics').rows[1][5],'-15.21');equal(cases[2].evidence[0].rows[0][5],'-0.00');});
  test('Actual models, releases and ports retain their captured identities',()=>{equal(cases[0].endpoints.map(e=>e.eos),['4.28.12M','4.31.10M']);assert(cases.slice(1).every(c=>c.endpoints.every(e=>e.eos==='4.31.10M'&&e.optic==='C100Q020CWDM403H')));equal(cases[2].endpoints[1].port,'Et8/5/1');});
  test('Fresh guided patrol accepts only valid evidence and decisions',()=>{const s=begin();equal(s.view,'challenge');equal(s.patrol.questionIndex,0);equal(go(s,'select',{answerId:'unknown'}),s);equal(go(s,'inspect',{outputId:'unknown'}),s);equal(go(s,'next'),s);equal(go(s,'reveal'),s);equal(transition(s,{},content),s);});
  test('Empty input does not count and hints cannot complete a decision',()=>{let s=go(begin(),'submit');const p=s.patrol.progress.U10.questions.q1;equal(p.attempts,0);equal(p.feedback.status,'invalid');s=go(s,'hint');assert(s.patrol.progress.U10.questions.q1.assisted);assert(!s.patrol.progress.U10.questions.q1.completed);equal(go(s,'question-next'),s);equal(go(s,'hint'),s);});
  test('Every wrong choice remains retryable in all 15 decisions',()=>{let s=begin();for(let ci=0;ci<3;ci++){s=inspect(s);for(let qi=0;qi<5;qi++){const c=cases[ci],q=c.questions[qi];for(const option of q.options.filter(o=>o.id!==expected[ci][qi])){s=go(go(s,'select',{answerId:option.id}),'submit');equal(s.patrol.progress[c.id].questions[q.id].feedback.status,'incorrect');equal(go(s,'question-next'),s);}s=answer(s);equal(s.patrol.progress[c.id].questions[q.id].attempts,3);equal(go(s,'submit'),s);if(qi<4)s=go(s,'question-next');}s=go(go(s,'reveal'),'next');}equal(s.view,'session-summary');equal(patrolSummary(s.patrol,cases),{completed:3,total:3,decisions:15,attempts:45,assisted:0});});
  test('Correct decisions alone cannot reveal outcome or export a report',()=>{let s=finishQuestions(begin());equal(go(s,'reveal'),s);equal(caseReport(cases[0],s.patrol.progress.U10),null);s=go(inspect(s),'reveal');assert(s.patrol.progress.U10.completed);assert(caseReport(cases[0],s.patrol.progress.U10));equal(go(s,'reveal'),s);});
  test('Viewing every panel alone cannot reveal outcome; duplicate views count once',()=>{const s=inspect(begin());equal(s.patrol.progress.U10.viewedIds.length,7);equal(inspect(s).patrol.progress.U10.viewedIds.length,7);equal(go(s,'reveal'),s);});
  test('Each case starts with fresh decisions; prior completed case is retained',()=>{let s=go(finishCase(begin()),'next');equal(s.patrol.caseIndex,1);equal(s.patrol.questionIndex,0);assert(s.patrol.progress.U10.completed);equal(s.patrol.progress.U11.questions.q1.attempts,0);equal(s.patrol.activeEvidenceId,cases[1].evidence[0].id);});
  test('Restart confirmation freezes the patrol; cancel preserves and confirm clears it',()=>{const s=finishCase(begin()),pending=go(s,'restart');assert(pending.restartConfirmation);equal(go(pending,'next'),pending);equal(go(pending,'cancel-restart'),s);equal(go(pending,'confirm-restart'),initialState(content));});
  test('Three cases complete in a single guided patrol and retain all learning records',()=>{let s=begin();for(let n=0;n<3;n++)s=go(finishCase(s),'next');equal(s.view,'session-summary');equal(patrolSummary(s.patrol,cases).attempts,15);for(const c of cases){const report=caseReport(c,s.patrol.progress[c.id]);assert(report.includes(c.outcome.summary));for(const e of c.evidence)assert(report.includes(e.text||e.rows[0].join(' | ')));}equal(go(s,'begin-guided'),s);equal(go(s,'next'),s);});
  test('Outcomes distinguish recovery, replacement-only and combined intervention',()=>{equal(cases.map(c=>c.outcome.status),['confirmed-recovery','intervention-only','combined-recovery']);assert(cases[1].outcome.limits.includes('not explicitly confirmed'));assert(cases[2].outcome.limits.includes('does not isolate cleaning'));assert(cases[2].collectionNote.includes('polled together'));});
  test('U12 script discrepancy and literal MAC histories remain separate evidence',()=>{const script=cases[2].evidence.find(e=>e.kind==='script').text;for(const n of ['533','267','227','39'])assert(script.includes(n));equal(cases[2].evidence.find(e=>e.id==='spine-errors').rows[0][4],'277');assert(cases[1].evidence.find(e=>e.id==='leaf-mac').text.includes('7 days, 16:11:34 ago'));assert(cases[1].evidence.find(e=>e.id==='spine-mac').text.includes('96 days, 19:13:15 ago'));});
  test('Only the guided start is accepted; retired modes cannot be reached',()=>{
    const s=initialState(content);equal(s.view,'briefing');
    for(const type of ['begin','begin-real','real-home','real-next','select','submit','reveal','next'])equal(go(s,type),s);
    equal(go(s,'begin-guided').view,'challenge');equal(go(begin(),'begin-guided'),begin());
  });
  test('An empty incident library is unavailable and has no fallback',()=>{
    const empty={cases:[]},s=initialState(empty);equal(s.view,'content-error');
    equal(transition(s,{type:'begin-guided'},empty),s);
  });
  test('Learner content and every completed handoff omit retired mode and sanitization labels',()=>{
    const banned=/saniti[sz]|real incident patrol|arcade|simulated|dojo[’']s/i;
    assert(!banned.test(JSON.stringify(cases)));
    let s=begin();for(const c of cases){s=finishCase(s);const report=caseReport(c,s.patrol.progress[c.id]);assert(report.includes('GUIDED PATROL'));assert(!banned.test(report));s=go(s,'next');}
  });
  test('Restart from briefing and summary clears every attempt, hint and evidence record',()=>{
    let s=go(begin(),'hint');for(let n=0;n<cases.length;n++)s=go(finishCase(s),'next');
    const pending=go(s,'restart');equal(go(pending,'cancel-restart'),s);equal(go(pending,'confirm-restart'),initialState(content));
    equal(go(go(initialState(content),'restart'),'confirm-restart'),initialState(content));
  });
}
