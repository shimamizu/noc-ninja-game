import {test,assert,equal} from './harness.js';
import {validateCases,loadCases,caseReport,patrolSummary} from '../engine/cases.js?v=guided-v17';
import {initialState as makeState,transition as step} from '../engine/state.js?v=guided-v17';

const initialState=content=>makeState(content,()=>0.999999);
const transition=(state,event,content)=>step(state,event,content,()=>0.999999);

export function caseSourceTests(data,sources){
  test('Every playable literal capture matches its reviewed source',()=>{
    for(const c of data.cases){
      const source=sources[c.id];assert(typeof source==='string');
      for(const e of c.endpoints)assert(source.includes(`| ${e.name} | ${e.model} | ${e.eos} | ${e.linecard||'Not supplied'} | ${e.manufacturer} | ${e.optic} |`),'Device inventory must match the owner follow-up.');
      for(const e of [...c.evidence,...c.commandCaptures])assert(source.includes(e.text),`${c.id}/${e.id} literal text changed`);
    }
  });
}
export function caseTests(data){
  const copy=()=>JSON.parse(JSON.stringify(data)),expected=['b','a','c','b'];
  const validated=validateCases(data),cases=validated.cases.slice(0,1),c=cases[0],content={cases};
  const go=(s,type,extra={})=>transition(s,{type,...extra},content);
  const begin=()=>go(initialState(content),'begin-guided');
  const answer=s=>go(go(s,'select',{answerId:expected[s.patrol.questionIndex]}),'submit');
  const inspect=s=>{for(const e of c.evidence)s=go(s,'inspect',{outputId:e.id});return s;};
  const finishQuestions=s=>{for(let n=0;n<4;n++){s=answer(s);if(n<3)s=go(s,'question-next');}return s;};
  const finishCase=s=>go(finishQuestions(inspect(s)),'reveal');
  test('The spine–DMZ case retains its four reviewed answers',()=>{
    equal(validated.errors,[]);equal(cases.map(c=>c.id),['U13']);equal(c.questions.map(q=>q.options.find(o=>o.correct).id),expected);
    equal(c.evidence.length,14);assert(Object.isFrozen(c.evidence));assert(!/U10|U11|U12|leaf-gw1/.test(JSON.stringify(cases)));
  });
  for(const [name,mutate] of [
    ['duplicate identities',d=>d.cases.push(structuredClone(d.cases[0]))],
    ['stale revision',d=>d.cases[0].revision='old'],
    ['wrong MAC endpoint',d=>d.cases[0].evidence.find(e=>e.kind==='mac').text='spine-gw1# show interfaces Ethernet99 mac detail'],
    ['missing incident evidence',d=>d.cases[0].evidence=d.cases[0].evidence.filter(e=>e.id!=='spine-optics')],
    ['multiple answers',d=>d.cases[0].questions[0].options[0].correct=true],
    ['no supported answer',d=>d.cases[0].questions[0].options.forEach(o=>o.correct=false)],
    ['unresolved source',d=>d.cases[0].questions[0].sourceIds=['wrong']],
    ['invented outcome type',d=>d.cases[0].outcome.status='proven-hardware-failure']
  ])test(`Case validation rejects ${name}`,()=>{const d=copy();mutate(d);const r=validateCases(d);equal(r.cases,[]);assert(r.errors.length>0);});
  test('Unavailable or malformed files fail closed without restoring old examples',async()=>{
    for(const fetcher of [async()=>{throw Error('offline');},async()=>({ok:false,status:404}),async()=>({ok:true,json:async()=>{throw Error('bad json');}}),async()=>({ok:true,json:async()=>null})]){const r=await loadCases('unused',fetcher);equal(r.cases,[]);assert(r.errors.length);}
    equal((await loadCases('unused',async()=>({ok:true,json:async()=>copy()}))).errors,[]);
  });
  test('Fresh patrol rejects invalid selections and cannot skip the case',()=>{const s=begin();equal(s.view,'challenge');equal(go(s,'select',{answerId:'unknown'}),s);equal(go(s,'inspect',{outputId:'leaf-mac'}),s);equal(go(s,'next'),s);equal(go(s,'reveal'),s);equal(transition(s,{},content),s);});
  test('Empty input does not count and hints cannot complete a decision',()=>{
    let s=go(begin(),'submit');equal(s.patrol.progress.U13.questions.q1.attempts,0);equal(s.patrol.progress.U13.questions.q1.feedback.status,'invalid');
    s=go(s,'hint');assert(s.patrol.progress.U13.questions.q1.assisted);assert(!s.patrol.progress.U13.questions.q1.completed);equal(go(s,'question-next'),s);equal(go(s,'hint'),s);
  });
  test('Every distractor remains retryable and repeated correct submissions do not add attempts',()=>{
    let s=inspect(begin());for(let qi=0;qi<4;qi++){
      for(const option of c.questions[qi].options.filter(o=>o.id!==expected[qi])){s=go(go(s,'select',{answerId:option.id}),'submit');equal(s.patrol.progress.U13.questions[c.questions[qi].id].feedback.status,'incorrect');equal(go(s,'question-next'),s);}
      s=answer(s);equal(s.patrol.progress.U13.questions[c.questions[qi].id].attempts,3);equal(go(s,'submit'),s);if(qi<3)s=go(s,'question-next');
    }
    s=go(go(s,'reveal'),'next');equal(s.view,'session-summary');equal(patrolSummary(s.patrol,cases),{completed:1,total:1,decisions:4,attempts:12,assisted:0});
  });
  test('Correct answers alone cannot reveal the repair or export a handoff',()=>{let s=finishQuestions(begin());equal(go(s,'reveal'),s);equal(caseReport(c,s.patrol.progress.U13),null);s=go(inspect(s),'reveal');assert(s.patrol.progress.U13.completed);assert(caseReport(c,s.patrol.progress.U13));equal(go(s,'reveal'),s);});
  test('Fourteen views alone cannot reveal the repair and duplicate views count once',()=>{const s=inspect(begin());equal(s.patrol.progress.U13.viewedIds.length,14);equal(inspect(s).patrol.progress.U13.viewedIds.length,14);equal(go(s,'reveal'),s);});
  test('Completion goes directly to the summary with one preserved handoff',()=>{
    const s=go(finishCase(begin()),'next');equal(s.view,'session-summary');equal(Object.keys(s.patrol.progress),['U13']);equal(patrolSummary(s.patrol,cases).attempts,4);
    const report=caseReport(c,s.patrol.progress.U13);assert(report.includes(c.outcome.summary));for(const text of ['Arista DCS-7808-CH','Arista DCS-7804-CH','EOS 4.31.10M','Line card 7800R3-48CQ-LC','ColorChip C100Q020CWDM403H'])assert(report.includes(text));for(const e of c.evidence)assert(report.includes(e.text));equal(go(s,'next'),s);
  });
  test('Confirmed link recovery does not fabricate post-repair readings or fiber work',()=>{
    equal(c.outcome.status,'confirmed-recovery');assert(c.outcome.summary.includes('replacing the spine-gw1 Et6/2/1 optic fixed the link'));
    assert(c.outcome.limits.includes('not supplied'));assert(c.outcome.limits.includes('cleaned or reseated'));equal(c.commandCaptures,[]);assert(c.evidence.every(e=>e.observationId!=='after-repair'));
  });
  test('Restart guards changes and clears all decisions, evidence and requests',()=>{
    const s=finishCase(go(begin(),'hint')),pending=go(s,'restart');equal(go(pending,'next'),pending);equal(go(pending,'cancel-restart'),s);equal(go(pending,'confirm-restart'),initialState(content));
    const summary=go(s,'next');equal(go(go(summary,'restart'),'confirm-restart'),initialState(content));
  });
  test('Retired modes and empty-library fallbacks remain unavailable',()=>{
    const s=initialState(content);for(const type of ['begin','begin-real','real-home','real-next','select','submit','reveal','next'])equal(go(s,type),s);
    const empty={cases:[]},none=initialState(empty);equal(none.view,'content-error');equal(transition(none,{type:'begin-guided'},empty),none);
  });
  test('Learner content and handoff contain no old cases or sanitization labels',()=>{
    const report=caseReport(c,finishCase(begin()).patrol.progress.U13);assert(!/U10|U11|U12|leaf-gw1|saniti[sz]|real incident patrol|arcade/i.test(JSON.stringify(cases)+report));
  });
}
