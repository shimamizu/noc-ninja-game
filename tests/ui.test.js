import {test,assert,equal} from './harness.js';
import {render} from '../ui/render.js?v=guided-v7';
import {bindControls} from '../ui/controls.js?v=guided-v7';
import {initialState,transition} from '../engine/state.js?v=guided-v7';
export function uiTests(data){
  const content={cases:data.cases},app=document.querySelector('#app');
  const expected=[['b','b','c','a','b'],['b','b','c','c','a'],['b','a','c','b','b']];
  const go=(s,type,extra={})=>transition(s,{type,...extra},content);
  const begin=()=>go(initialState(content),'begin-guided');
  const checkIds=()=>{const ids=[...app.querySelectorAll('[id]')].map(n=>n.id);equal(ids.length,new Set(ids).size);};
  test('Opening screen has one guided start, accurate totals and educational briefing',()=>{
    render(content,initialState(content));checkIds();
    equal(app.querySelectorAll('[data-action="begin-guided"]').length,1);
    assert(app.textContent.includes('3 incidents · 15 decisions'));
    assert(app.textContent.includes('Build the evidence before the conclusion.'));
    assert(!/saniti[sz]|real incident patrol|arcade|six simulated|six incidents/i.test(app.textContent));
    assert(!app.querySelector('[data-action="begin"], [data-action="begin-real"]'));
  });
  test('Every rendered evidence panel preserves its captured rows or literal output',()=>{
    let s=begin();
    for(let ci=0;ci<content.cases.length;ci++){
      const c=content.cases[ci];s={...s,patrol:{...s.patrol,caseIndex:ci,questionIndex:0}};
      for(const e of c.evidence){s=go(s,'inspect',{outputId:e.id});render(content,s);checkIds();
        if(e.rows)equal([...app.querySelectorAll('.case-output tbody tr')].map(tr=>[...tr.children].map(td=>td.textContent)),e.rows);
        else equal(app.querySelector('.case-terminal').textContent,e.text);
        assert(!app.querySelector('#case-outcome-title'));
      }
    }
  });
  test('Completed questions expose missing evidence links with distinct IDs and a disabled reveal',()=>{
    let s=begin();for(let qi=0;qi<5;qi++){s=go(go(s,'select',{answerId:expected[0][qi]}),'submit');if(qi<4)s=go(s,'question-next');}
    render(content,s);checkIds();assert(app.querySelector('#reveal').disabled);
    equal(app.querySelectorAll('[id^="missing-"]').length,6);
    assert(app.querySelector('#patrol-feedback').textContent.includes('Evidence supports'));
    assert(!app.querySelector('#download-handoff'));
  });
  test('All three completed outcomes and summary handoffs render in the same patrol',()=>{
    let s=begin();for(let ci=0;ci<3;ci++){
      const c=content.cases[ci];for(const e of c.evidence)s=go(s,'inspect',{outputId:e.id});
      for(let qi=0;qi<5;qi++){s=go(go(s,'select',{answerId:expected[ci][qi]}),'submit');if(qi<4)s=go(s,'question-next');}
      s=go(s,'reveal');render(content,s);checkIds();
      equal(app.querySelector('#case-outcome-title').textContent,c.outcome.title);
      assert(app.textContent.includes(c.outcome.limits));assert(app.textContent.includes('Before closing the ticket'));
      assert(app.querySelector('#download-handoff'));s=go(s,'next');
    }
    render(content,s);checkIds();equal(app.querySelectorAll('[data-action="download-handoff"]').length,3);
    assert(app.textContent.includes('3 incidents · 15 decisions completed'));assert(!/back to|real incident|saniti[sz]/i.test(app.textContent));
  });
  test('Invalid content renders a reload action without playable fallback',()=>{
    render(null,{view:'content-error'},[{path:'Incident library',message:'Invalid evidence'}]);
    assert(app.textContent.includes('Training unavailable'));assert(app.querySelector('#reload'));assert(!app.querySelector('#begin-guided'));
  });
  test('Answer text and targets cannot click-submit; shuriken keyboard drag submits and restart cancels',()=>{
    let s=initialState(content);render(content,s);
    bindControls(event=>{s=go(s,event.type,event);if(!s.restartConfirmation)render(content,s);},()=>{});
    app.querySelector('#begin-guided').click();equal(s.view,'challenge');
    assert(!app.querySelector('input[name="case-answer"], #submit, form, .target-caption'));
    equal([...app.querySelectorAll('.target')].map(t=>t.textContent),['A','B','C']);
    app.querySelector('.answer-description').click();app.querySelector('.target').click();app.querySelector('#shuriken-handle').click();
    equal(s.patrol.progress.U10.questions.q1.attempts,0);equal(s.patrol.progress.U10.questions.q1.answerId,null);
    const key=k=>app.querySelector('#shuriken-handle').dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true}));
    for(const moves of [1,2]){key(' ');for(let i=0;i<moves;i++)key('ArrowRight');key(' ');}
    equal(s.patrol.progress.U10.questions.q1.attempts,2);assert(s.patrol.progress.U10.questions.q1.completed);
    assert(app.querySelector('#shuriken-handle').disabled);app.querySelector('#question-next').click();equal(s.patrol.questionIndex,1);
    const before=s;app.querySelector('#restart').click();assert(s.restartConfirmation);document.querySelector('#cancel-restart').click();equal(s,before);
    app.querySelector('#restart').click();document.querySelector('#confirm-restart').click();equal(s,initialState(content));
  });
}
