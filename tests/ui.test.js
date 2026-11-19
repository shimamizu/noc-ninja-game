import {evidenceText} from '../engine/investigation.js?v=guided-v21';
import {test,assert,equal} from './harness.js';
import {render} from '../ui/render.js?v=guided-v21';
import {bindControls} from '../ui/controls.js?v=guided-v21';
import {initialState as makeState,transition as step} from '../engine/state.js?v=guided-v21';
const initialState=content=>makeState(content,()=>0.999999);
const transition=(state,event,content)=>step(state,event,content,()=>0.999999);

export function uiTests(data){
  const content={cases:data.cases},app=document.querySelector('#app');
  const expected=[['b','a','c','b'],['b','a','c','b'],['b','a','c','b']];
  const go=(s,type,extra={})=>transition(s,{type,...extra},content);
  const begin=()=>go(initialState(content),'begin-guided');
  const checkIds=()=>{const ids=[...app.querySelectorAll('[id]')].map(n=>n.id);equal(ids.length,new Set(ids).size);};
  test('Opening screen has one guided start, accurate totals and educational briefing',()=>{
    render(content,initialState(content));checkIds();
    equal(app.querySelectorAll('[data-action="begin-guided"]').length,1);
    assert(app.textContent.includes('3 incidents · 12 decisions'));
    assert(app.textContent.includes('Build the evidence before the conclusion.'));
    assert(!/saniti[sz]|arcade|six simulated|six incidents/i.test(app.textContent));
    assert(!app.querySelector('[data-action="begin"], [data-action="begin-legacy"]'));
  });
  test('Every rendered evidence panel preserves its captured rows or literal output',()=>{
    let s=begin();
    for(let ci=0;ci<content.cases.length;ci++){
      const c=content.cases[ci];s={...s,patrol:{...s.patrol,caseIndex:ci,questionIndex:0,captureSelection:{endpointId:c.endpoints[0].id,commandId:'status',observationId:'incident'}}};
      for(const e of c.evidence){s=go(s,'inspect',{outputId:e.id});render(content,s);checkIds();
        if(e.rows)equal([...app.querySelectorAll('.case-output tbody tr')].map(tr=>[...tr.children].map(td=>td.textContent)),e.rows);
        else assert([...app.querySelectorAll('.case-terminal')].some(n=>n.textContent===evidenceText(c,e)));
        assert(!app.querySelector('#case-outcome-title'));assert(!app.textContent.includes('senz'));
      }
    }
  });
  test('Completed questions expose missing evidence links with distinct IDs and a disabled reveal',()=>{
    let s=begin();for(let qi=0;qi<4;qi++){s=go(go(s,'select',{answerId:expected[0][qi]}),'submit');if(qi<3)s=go(s,'question-next');}
    render(content,s);checkIds();assert(app.querySelector('#reveal').disabled);
    equal(app.querySelectorAll('[id^="missing-"]').length,13);
    assert(app.querySelector('#patrol-feedback').textContent.includes('Evidence supports'));
    assert(!app.querySelector('#download-handoff'));
  });
  test('Confirmed outcomes, diagnosis review and summary handoffs render in the same patrol',()=>{
    let s=begin();for(let ci=0;ci<content.cases.length;ci++){
      const c=content.cases[ci];for(const e of c.evidence)s=go(s,'inspect',{outputId:e.id});
      for(let qi=0;qi<4;qi++){s=go(go(s,'select',{answerId:expected[ci][qi]}),'submit');if(qi<3)s=go(s,'question-next');}
      s=go(s,'reveal');render(content,s);checkIds();
      equal(app.querySelector('#case-outcome-title').textContent,c.outcome.title);
      assert(app.textContent.includes(c.outcome.limits));assert(app.textContent.includes('Before closing the ticket'));
      assert(app.querySelector('#download-handoff'));s=go(s,'next');
    }
    render(content,s);checkIds();equal(app.querySelectorAll('[data-action="download-handoff"]').length,3);
    assert(app.textContent.includes('3 incidents · 12 decisions completed'));assert(!/back to|saniti[sz]/i.test(app.textContent));
  });
  test('Invalid content renders a reload action without playable fallback',()=>{
    render(null,{view:'content-error'},[{path:'Incident library',message:'Invalid evidence'}]);
    assert(app.textContent.includes('Training unavailable'));assert(app.querySelector('#reload'));assert(!app.querySelector('#begin-guided'));
  });
  test('Command workbench distinguishes absent, locked and raw output without stale evidence',()=>{
    let s=begin();render(content,s);checkIds();
    equal(app.querySelectorAll('#capture-endpoint option').length,2);
    equal(app.querySelectorAll('#capture-command option').length,4);
    const request=(commandId,observationId='incident')=>{s=go(s,'request-capture',{selection:{endpointId:'spine',commandId,observationId}});render(content,s);checkIds();};
    request('status','monitoring');assert(app.querySelector('#capture-response').textContent.includes('Not captured'));assert(!app.querySelector('.case-output'));
    request('optics');assert(app.querySelector('#capture-response').textContent.includes('Recorded output'));assert(app.querySelector('.case-terminal'));assert(!app.querySelector('.error-table'));
    request('mac');equal(app.querySelector('.case-terminal').textContent,content.cases[0].evidence.find(e=>e.id==='spine-mac').text);
    request('mac','monitoring');equal(app.querySelector('.case-terminal').textContent,content.cases[0].evidence.find(e=>e.id==='spine-mac-followup').text);
    request('mac','after-repair');assert(app.querySelector('#capture-response').textContent.includes('Complete the decisions'));assert(!app.querySelector('.case-output'));
  });
  test('U13 renders status and follow-up optics without fabricating inventory or script panels',()=>{
    const c=content.cases[0];let s=begin();s={...s,patrol:{...s.patrol,captureGroup:false,caseIndex:0,activeEvidenceId:'spine-status',captureSelection:{endpointId:'spine',commandId:'status',observationId:'incident'}}};
    render(content,s);checkIds();for(const text of ['Arista DCS-7808-CH','Arista DCS-7804-CH','4.31.10M','Line card: 7800R3-48CQ-LC','ColorChip C100Q020CWDM403H'])assert(app.textContent.includes(text));assert(!app.textContent.includes('undefined'));assert(!app.textContent.includes('null'));
    equal(app.querySelectorAll('#capture-command option').length,4);assert(!app.querySelector('#case-tool-script'));
    equal(app.querySelector('.case-terminal').textContent,c.evidence[0].text);
    s=go(s,'request-capture',{selection:{endpointId:'dmz',commandId:'optics',observationId:'monitoring'}});render(content,s);checkIds();
    equal(app.querySelector('.case-terminal').textContent,c.evidence.find(e=>e.id==='dmz-optics-followup').text);
    assert(app.textContent.includes('Last Update is telemetry age'));assert(!app.textContent.includes('Voltage/Bias units were not shown'));
  });
  test('U15 displays both zero leaf counter samples and gates diagnosis review',()=>{
    const c=content.cases[2],one={cases:[c]};let s=transition(initialState(one),{type:'begin-guided'},one);
    const go=event=>{s=transition(s,event,one);};
    go({type:'choose-capture',selection:{endpointId:'leaf',commandId:'errors'}});
    render(one,s);checkIds();
    equal([...app.querySelectorAll('.case-terminal')].map(n=>n.textContent),c.evidence.filter(e=>e.endpointId==='leaf'&&e.kind==='errors').map(e=>e.text));
    assert(!app.querySelector('#capture-response').textContent.includes('Not captured'));
    assert(app.textContent.includes('Arista DCS-7508N'));
    for(const e of c.evidence)go({type:'inspect',outputId:e.id});
    for(const q of c.questions){
      if(q.context){
        render(one,s);
        equal(app.querySelector('.decision-context').textContent,q.context);
        assert(app.querySelector('.decision-context').textContent.includes('63.35 − 27.33 = 36.02 mA'));
        assert(app.querySelector('.decision-context').textContent.includes('10–20 mA'));
        assert(!app.querySelector('#patrol-feedback'));
      }
      go({type:'select',answerId:q.options.find(o=>o.correct).id});go({type:'submit'});go({type:'question-next'});
    }
    render(one,s);assert(!app.querySelector('#reveal').disabled);
    assert(app.querySelector('#reveal').textContent.includes('Review diagnosis'));
    go({type:'reveal'});render(one,s);checkIds();
    assert(app.textContent.includes('DIAGNOSIS REVIEW'));assert(!app.textContent.includes('REPORTED OUTCOME'));
    assert(app.textContent.includes('link remains down AND the bias current variance between lanes on spine-gw1 stays high after the leaf swap'));
  });
  test('Shuffled visible letters map to their answer identities and remain stable on rerender',()=>{
    let s=step(makeState(content,()=>0),{type:'begin-guided'},content);
    const c=s.sessionCases[0],q=c.questions[0];
    render(content,s);checkIds();
    const read=()=>[...app.querySelectorAll('.target')].map((target,i)=>{
      equal(target.dataset.choiceId,q.options[i].id);
      equal(target.textContent,String.fromCharCode(65+i));
      equal(app.querySelector('#'+target.getAttribute('aria-describedby')).textContent,`${String.fromCharCode(65+i)}. ${q.options[i].text}`);
      return target.dataset.choiceId;
    });
    const before=read();s=step(s,{type:'hint'},content);render(content,s);equal(read(),before);
    const correctTarget=app.querySelectorAll('.target')[q.options.findIndex(o=>o.correct)];
    s=step(step(s,{type:'select',answerId:correctTarget.dataset.choiceId},content),{type:'submit'},content);
    assert(s.patrol.progress[c.id].questions[q.id].completed);
  });
  test('Answer text and targets cannot click-submit; shuriken keyboard drag submits and restart cancels',()=>{
    let s=initialState(content);render(content,s);
    bindControls(event=>{s=go(s,event.type,event);if(!s.restartConfirmation)render(content,s);},()=>{});
    app.querySelector('#begin-guided').click();equal(s.view,'challenge');
    const select=(id,value)=>{const node=app.querySelector('#'+id);node.value=value;node.dispatchEvent(new Event('change',{bubbles:true}));};
    select('capture-endpoint','spine');select('capture-command','mac');
    equal(s.patrol.activeEvidenceId,'spine-mac');assert(app.querySelector('.case-terminal').textContent.startsWith('spine-gw1(s1)#show interfaces ethernet 6/2/1 mac detail'));
    equal(app.querySelectorAll('.case-terminal').length,2);
    assert(app.querySelectorAll('.case-terminal')[1].textContent.includes('00:00:11 2026'));
    assert(!app.querySelector('#capture-observation, #request-capture'));
    select('capture-endpoint','dmz');equal(app.querySelectorAll('.case-terminal').length,2);
    assert([...app.querySelectorAll('.case-terminal')].every(n=>n.textContent.startsWith('dmz-gw2')));
    assert(!app.querySelector('input[name="case-answer"], #submit, form, .target-caption'));
    equal([...app.querySelectorAll('.target')].map(t=>t.textContent),['A','B','C']);
    app.querySelector('.answer-description').click();app.querySelector('.target').click();app.querySelector('#shuriken-handle').click();
    equal(s.patrol.progress.U13.questions.q1.attempts,0);equal(s.patrol.progress.U13.questions.q1.answerId,null);
    const key=k=>app.querySelector('#shuriken-handle').dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true}));
    for(const moves of [1,2]){key(' ');for(let i=0;i<moves;i++)key('ArrowRight');key(' ');}
    equal(s.patrol.progress.U13.questions.q1.attempts,2);assert(s.patrol.progress.U13.questions.q1.completed);
    assert(app.querySelector('#shuriken-handle').disabled);app.querySelector('#question-next').click();equal(s.patrol.questionIndex,1);
    const before=s;app.querySelector('#restart').click();assert(s.restartConfirmation);document.querySelector('#cancel-restart').click();equal(s,before);
    app.querySelector('#restart').click();document.querySelector('#confirm-restart').click();equal(s,initialState(content));
  });
}
