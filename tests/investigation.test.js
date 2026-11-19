import {test,assert,equal} from './harness.js';
import {evidenceText,resolveCapture,captureManifest,commands,matchesCommand} from '../engine/investigation.js?v=guided-v17';
import {initialState as makeState,transition as step} from '../engine/state.js?v=guided-v17';
import {validateCases,caseReport} from '../engine/cases.js?v=guided-v17';

const initialState=content=>makeState(content,()=>0.999999);
const transition=(state,event,content)=>step(state,event,content,()=>0.999999);

export function investigationTests(data){
  const content={cases:data.cases},c=content.cases[0];
  const request=(endpointId,commandId,observationId='incident')=>({endpointId,commandId,observationId});
  const begin=()=>transition(initialState(content),{type:'begin-guided'},content);
  const go=(s,type,extra={})=>transition(s,{type,...extra},content);
  test('The exercise exposes exactly four interface-scoped command choices',()=>{
    equal(commands.map(c=>c.id),['status','optics','mac','errors']);
    for(const c of content.cases)for(const endpoint of c.endpoints)for(const command of commands){
      const r=resolveCapture(c,request(endpoint.id,command.id));
      assert(r.commandText.startsWith('show interfaces ethernet '+endpoint.port.slice(2)+' '));
    }
    for(const commandId of ['detail','rates','discards','logging'])equal(resolveCapture(c,request('spine',commandId)),null);
  });
  test('Dropdown changes show all available readings and record coverage without a request button',()=>{
    let s=begin();equal(s.patrol.captureGroup,true);
    s=go(s,'choose-capture',{selection:{endpointId:'spine',commandId:'mac'}});
    assert(s.patrol.progress.U13.viewedIds.includes('spine-mac'));
    assert(s.patrol.progress.U13.viewedIds.includes('spine-mac-followup'));
    assert(!s.patrol.progress.U13.captureRequests.some(r=>r.observationId==='after-repair'));
    const before=s.patrol.progress.U13;
    s=go(s,'choose-capture',{selection:{endpointId:'spine',commandId:'mac'}});
    equal(s.patrol.progress.U13.viewedIds,before.viewedIds);equal(s.patrol.progress.U13.captureRequests,before.captureRequests);
    s=go(s,'choose-capture',{selection:{endpointId:'dmz',commandId:'optics'}});
    assert(s.patrol.progress.U13.viewedIds.includes('dmz-optics-followup'));
    equal(s.patrol.progress.U13.questions,before.questions);
    equal(go(s,'choose-capture',{selection:{endpointId:'other',commandId:'mac'}}),s);
  });
  test('U13 replays all 14 literal captures with original units, prompts and repeat samples',()=>{
    const c=content.cases[0];equal(c.id,'U13');equal(c.evidence.length,14);
    equal(c.endpoints.map(e=>[e.id,e.port,e.model,e.eos,e.linecard,e.manufacturer,e.optic]),[['spine','Et6/2/1','Arista DCS-7808-CH','4.31.10M','7800R3-48CQ-LC','ColorChip','C100Q020CWDM403H'],['dmz','Et6/21/1','Arista DCS-7804-CH','4.31.10M','7800R3-48CQ-LC','ColorChip','C100Q020CWDM403H']]);
    equal(c.evidence.filter(e=>e.kind==='script'),[]);
    for(const e of c.evidence){const r=resolveCapture(c,request(e.endpointId,e.kind,e.observationId));equal(r.status,'captured');equal(r.evidence.text,e.text);assert(!r.evidence.rows);assert(matchesCommand(e.text,c.endpoints.find(p=>p.id===e.endpointId),e.kind));}
    const rows=captureManifest(c);equal(rows.length,24);equal(rows.filter(r=>r.status==='captured').length,14);equal(rows.filter(r=>r.status==='missing').length,10);
    const dmz=resolveCapture(c,request('dmz','optics','monitoring')).evidence.text;
    assert(dmz.startsWith('dmz-gw2(s1)#show interfaces 6/21/1 transceiver'));equal((dmz.match(/-30\.00/g)||[]).length,4);
    assert(dmz.includes('(mA)')&&dmz.includes('Last Update'));
    assert(resolveCapture(c,request('spine','errors')).evidence.text.includes('Runts   Giants'));
    equal(resolveCapture(c,request('dmz','status','monitoring')).status,'missing');
  });
  test('U13 preserves fault timing and distinguishes reported repair from measured verification',()=>{
    const c=content.cases[0],mac=id=>c.evidence.find(e=>e.id===id).text;
    assert(mac('spine-mac').includes('23:59:30 2026'));assert(mac('spine-mac-followup').includes('00:00:11 2026'));
    assert(mac('dmz-mac').includes('23:59:35 2026'));assert(mac('dmz-mac-followup').includes('00:00:14 2026'));
    for(const endpoint of ['spine','dmz']){
      const states=t=>t.split('\n').filter(line=>/PHY State|Interface State|MAC Rx/.test(line)).map(line=>line.trim().split(/\s{2,}/).slice(0,3));
      equal(states(mac(endpoint+'-mac')),states(mac(endpoint+'-mac-followup')));
    }
    equal(c.outcome.status,'confirmed-recovery');assert(c.outcome.limits.includes('not supplied'));
    equal(c.questions.map(q=>q.options.find(o=>o.correct).id),['b','a','c','b']);
    assert(c.questions[0].explanation.includes('Remote Fault alone is not a universal failed-optic indicator'));
    assert(c.questions[0].options[1].text.includes('spine-gw1 Et6/2/1 optic has failed; replace it'));
  });
  test('Raw evidence validation rejects wrong endpoint/command, duplicate observation and invented table',()=>{
    for(const mutate of [
      e=>e.text=e.text.replace('ethernet 6/2/1','ethernet 6/21/1'),
      e=>e.kind='errors',e=>e.observationId='after-repair',e=>e.rows=[['invented']]
    ]){const d=JSON.parse(JSON.stringify(data));mutate(d.cases[0].evidence[0]);assert(validateCases(d).errors.length>0);}
    const d=JSON.parse(JSON.stringify(data));d.cases[0].evidence.push({...d.cases[0].evidence[0],id:'duplicate'});assert(validateCases(d).errors.length>0);
  });
  test('Missing follow-up status and post-repair captures never fall back to existing incident data',()=>{
    for(const e of c.endpoints){
      equal(resolveCapture(c,request(e.id,'status','monitoring')).status,'missing');
      for(const command of commands){const r=resolveCapture(c,request(e.id,command.id,'after-repair'),true);equal(r.status,'missing');assert(!r.evidence&&!r.text);}
    }
    equal(resolveCapture(c,request('other','mac')),null);equal(resolveCapture(c,request('spine','configure terminal')),null);equal(resolveCapture(c,request('spine','mac','tomorrow')),null);
  });
  test('Missing requests do not grant coverage or attempts, and repeats are deduplicated',()=>{
    let s=begin(),before=s.patrol.progress.U13;
    s=go(s,'request-capture',{selection:request('spine','status','monitoring')});s=go(s,'request-capture',{selection:request('spine','status','monitoring')});
    equal(s.patrol.progress.U13.viewedIds,before.viewedIds);equal(s.patrol.progress.U13.questions,before.questions);equal(s.patrol.progress.U13.captureRequests.length,before.captureRequests.length+1);
    s=go(s,'request-capture',{selection:request('spine','mac')});assert(s.patrol.progress.U13.viewedIds.includes('spine-mac'));equal(s.patrol.activeEvidenceId,'spine-mac');
    s=go(s,'request-capture',{selection:request('spine','errors')});assert(s.patrol.progress.U13.viewedIds.includes('spine-errors'));
    equal(go(s,'request-capture',{selection:request('other','mac')}),s);
  });
  test('After-repair requests stay gated and never disclose a recording before completion',()=>{
    // Reuse literal supplied MAC text to test routing only; this fixture is never shipped as recovery evidence.
    const text=c.evidence.find(e=>e.id==='spine-mac').text;
    const fixture={...c,commandCaptures:[{...request('spine','mac','after-repair'),text,capturedAt:'Test-only routing fixture',source:c.source}]};
    const locked=resolveCapture(fixture,request('spine','mac','after-repair'));equal(locked.status,'locked');assert(!locked.text&&!locked.evidence);
    equal(resolveCapture(fixture,request('spine','mac','after-repair'),true).text,text);
    equal(resolveCapture(fixture,request('dmz','mac','after-repair'),true).status,'missing');
    equal(resolveCapture(fixture,request('spine','mac','monitoring'),true).evidence.text,c.evidence.find(e=>e.id==='spine-mac-followup').text);
  });
  test('Malformed recording provenance, targets and duplicate keys fail closed',()=>{
    for(const mutate of [
      r=>r.endpointId='missing',r=>r.commandId='unknown',r=>r.observationId='tomorrow',r=>r.source='',r=>r.capturedAt='',r=>r.text='spine-gw1# show interfaces Ethernet52 mac detail\nwrong target'
    ]){const d=JSON.parse(JSON.stringify(data)),r={...request('spine','mac','after-repair'),text:c.evidence.find(e=>e.id==='spine-mac').text,capturedAt:'Test-only fixture',source:c.source};mutate(r);d.cases[0].commandCaptures=[r];assert(validateCases(d).errors.length>0);}
    const d=JSON.parse(JSON.stringify(data)),r={...request('spine','mac','after-repair'),text:c.evidence.find(e=>e.id==='spine-mac').text,capturedAt:'Test-only fixture',source:c.source};d.cases[0].commandCaptures=[r,r];assert(validateCases(d).errors.length>0);
  });
  test('Capture coverage and handoff distinguish missing recordings from available evidence',()=>{
    const rows=captureManifest(c);equal(rows.length,24);equal(rows.filter(r=>r.status==='captured').length,14);equal(rows.filter(r=>r.status==='summary-only').length,0);equal(rows.filter(r=>r.status==='missing').length,10);
    let s=begin();s=go(s,'request-capture',{selection:request('spine','status','monitoring')});
    for(const e of c.evidence)s=go(s,'inspect',{outputId:e.id});
    for(const q of c.questions){s=go(go(s,'select',{answerId:q.options.find(o=>o.correct).id}),'submit');s=go(s,'question-next');}
    s=go(s,'reveal');const report=caseReport(c,s.patrol.progress.U13);assert(report.includes('Follow-up capture | Not captured'));assert(report.includes('CAPTURES TO COLLECT'));assert(report.includes(c.captureNeeds[0]));
    equal(go(s,'request-capture',{selection:request('spine','mac','after-repair')}).patrol.progress.U13.captureRequests.at(-1).status,'missing');
  });
  test('Restart clears command requests and restores the initial case selection',()=>{
    let s=go(begin(),'request-capture',{selection:request('dmz','mac','monitoring')});
    s=go(go(s,'restart'),'confirm-restart');equal(s,initialState(content));
    equal(s.patrol.activeCapture,null);equal(s.patrol.captureSelection,request('spine','status'));equal(s.patrol.progress.U13.captureRequests,[]);
  });
  test('Two-case patrol preserves progression, completion gates and separate handoffs',()=>{
    equal(content.cases.map(c=>c.id),['U13','U14']);
    let s=begin();
    for(const incident of content.cases){
      equal(content.cases[s.patrol.caseIndex].id,incident.id);
      assert(s.patrol.captureGroup);equal(s.patrol.captureSelection.endpointId,incident.endpoints[0].id);
      equal(s.patrol.progress[incident.id].viewedIds.length,1);
      equal(go(s,'reveal'),s);equal(go(s,'next'),s);
      for(const e of incident.evidence)s=go(s,'inspect',{outputId:e.id});
      for(const q of incident.questions){
        for(const wrong of q.options.filter(o=>!o.correct)){
          s=go(go(s,'select',{answerId:wrong.id}),'submit');
          equal(go(s,'question-next'),s);
        }
        s=go(go(s,'select',{answerId:q.options.find(o=>o.correct).id}),'submit');s=go(s,'question-next');
      }
      s=go(s,'reveal');const report=caseReport(incident,s.patrol.progress[incident.id]);
      assert(report.includes(incident.outcome.summary));
      for(const e of incident.evidence)assert(report.includes(evidenceText(incident,e)));
      assert(!report.includes('senz'));
      s=go(s,'next');
    }
    equal(s.view,'session-summary');assert(Object.values(s.patrol.progress).every(p=>p.completed));
  });
  test('U14 preserves lane 4, counter deltas, false flags and original shortcut prompt',()=>{
    const c=content.cases[1],e=id=>c.evidence.find(e=>e.id===id);
    equal(c.evidence.length,14);equal(c.questions.length,4);
    assert(e('leaf-errors').text.startsWith('leaf-gw2#senz'));
    const displayed=evidenceText(c,e('leaf-errors'));
    assert(displayed.startsWith('leaf-gw2#show interfaces ethernet 55/1 counters errors\n'));
    equal(displayed.split('\n').slice(1),e('leaf-errors').text.split('\n').slice(1));
    assert(matchesCommand(e('leaf-errors').text,c.endpoints[0],'errors','senz'));
    assert(!matchesCommand(e('leaf-errors').text,c.endpoints[1],'errors','senz'));
    assert(!matchesCommand(e('leaf-errors').text,c.endpoints[0],'mac','senz'));
    assert(!matchesCommand(e('leaf-errors').text.replace('Et55/1','Et99/1'),c.endpoints[0],'errors','senz'));
    for(const id of ['leaf-optics','leaf-optics-followup'])assert(e(id).text.includes('-14.91'));
    const row=(id,pattern)=>e(id).text.split('\n').find(line=>line.includes(pattern)).trim().split(/\s{2,}/);
    equal(row('leaf-mac','MAC Rx Local Fault').slice(1,3),['False','1088']);
    equal(row('leaf-mac-followup','MAC Rx Local Fault').slice(1,3),['False','1096']);
    equal(row('spine-mac','MAC Rx Remote Fault').slice(1,3),['False','1058']);
    equal(row('spine-mac-followup','MAC Rx Remote Fault').slice(1,3),['False','1066']);
    equal(c.outcome.status,'confirmed-recovery');equal(c.commandCaptures,[]);
    for(const mutate of [e=>e.commandAlias='unknown',e=>e.endpointId='spine',e=>e.text=e.text.replace('Et55/1','Et99/1')]){
      const d=JSON.parse(JSON.stringify(data));mutate(d.cases[1].evidence.find(e=>e.id==='leaf-errors'));assert(validateCases(d).errors.length>0);
    }
  });

}
