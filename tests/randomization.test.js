import {test,assert,equal} from './harness.js';
import {initialState,transition} from '../engine/state.js?v=guided-v21';
import {currentCase,caseReport} from '../engine/cases.js?v=guided-v21';
export function randomizationTests(data){
  const content={cases:data.cases};
  const rng=seed=>()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const signature=s=>s.sessionCases.map(c=>[c.id,c.questions.map(q=>[q.id,q.options.map(o=>o.id)])]);
  test('Session shuffles scenarios, questions and answers without changing source evidence',()=>{
    const source=JSON.stringify(content),caseOrders=new Set(),questionOrders=new Set(),answerOrders=new Set();
    for(let seed=1;seed<=32;seed++){
      const s=initialState(content,rng(seed*7919));caseOrders.add(s.sessionCases.map(c=>c.id).join(','));
      equal(s.sessionCases.map(c=>c.id).sort(),content.cases.map(c=>c.id).sort());
      for(const c of s.sessionCases){
        const original=content.cases.find(item=>item.id===c.id);
        assert(c.evidence===original.evidence);equal(c.questions.map(q=>q.id).sort(),original.questions.map(q=>q.id).sort());
        questionOrders.add(c.questions.map(q=>q.id).join(','));
        for(const q of c.questions){
          const old=original.questions.find(item=>item.id===q.id);
          equal(q.options.map(o=>o.id).sort(),old.options.map(o=>o.id).sort());
          for(const o of q.options)assert(old.options.includes(o));
          answerOrders.add(q.options.map(o=>o.id).join(','));
        }
      }
    }
    assert(caseOrders.size>1);assert(questionOrders.size>1);equal(answerOrders.size,6);
    equal(JSON.stringify(content),source);
  });
  test('Shuffled patrols grade by answer identity, stay stable and complete every scenario',()=>{
    for(let seed=1;seed<=12;seed++){
      let s=initialState(content,rng(seed*7919));const order=signature(s);
      const go=(type,extra={})=>{s=transition(s,{type,...extra},content);equal(signature(s),order);};
      go('begin-guided');
      for(const incident of s.sessionCases){
        equal(currentCase(s,content).id,incident.id);equal(s.patrol.captureSelection.endpointId,incident.endpoints[0].id);
        go('hint');go('restart');go('cancel-restart');
        for(const e of incident.evidence)go('inspect',{outputId:e.id});
        for(const q of incident.questions){
          const wrong=q.options.find(o=>!o.correct),right=q.options.find(o=>o.correct);
          go('select',{answerId:wrong.id});go('submit');equal(s.patrol.progress[incident.id].questions[q.id].feedback.status,'incorrect');
          go('select',{answerId:right.id});go('submit');assert(s.patrol.progress[incident.id].questions[q.id].completed);
          go('question-next');
        }
        go('reveal');const report=caseReport(incident,s.patrol.progress[incident.id]);
        let previous=-1;for(const q of incident.questions){const index=report.indexOf(q.prompt);assert(index>previous);previous=index;}
        go('next');
      }
      equal(s.view,'session-summary');assert(Object.values(s.patrol.progress).every(p=>p.completed));
    }
  });
  test('Confirmed restart reshuffles and clears progress; cancel preserves the exact session',()=>{
    const start=initialState(content,()=>0.999999);
    let s=transition(start,{type:'begin-guided'},content);s=transition(s,{type:'hint'},content);
    const pending=transition(s,{type:'restart'},content);
    equal(transition(pending,{type:'cancel-restart'},content),s);
    const fresh=transition(pending,{type:'confirm-restart'},content,()=>0);
    assert(JSON.stringify(signature(fresh))!==JSON.stringify(signature(start)));
    equal(fresh.view,'briefing');equal(fresh.patrol.caseIndex,0);equal(fresh.patrol.questionIndex,0);
    assert(Object.values(fresh.patrol.progress).every(p=>!p.completed&&p.captureRequests.length===0&&Object.values(p.questions).every(q=>q.attempts===0&&!q.assisted)));
  });
}
