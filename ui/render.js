import {animateThrow} from './aim.js?v=guided-v20';
import {patrolBriefing,patrolCaseView,patrolResults} from './patrol.js?v=guided-v20';
import {patrolSummary} from '../engine/cases.js?v=guided-v20';
const el=(tag,cls='',text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
function title(text){const h=el('h1','',text);h.id='view-title';h.tabIndex=-1;return h;}
function button(text,action,id){const b=el('button','ghost',text);b.type='button';b.dataset.action=action;b.id=id;return b;}
function header(content,state){
  const bar=el('header','topbar'),brand=el('div','brand'),icon=el('img','icon sprite sprite-star');icon.src='./assets/shuriken.png';icon.alt='';
  brand.append(icon,el('strong','','NOC NINJA'),el('span','tag','GUIDED PATROL'));bar.append(brand);
  const s=patrolSummary(state.patrol,content.cases),hud=el('div','hud'),meter=el('progress');meter.max=s.total;meter.value=s.completed;meter.setAttribute('aria-label','Completed incidents');
  hud.append(el('span','hud-label',`${s.completed} / ${s.total} incident${s.total===1?'':'s'}`),meter,button('Restart','restart','restart'));bar.append(hud);return bar;
}
export function render(content,state,errors=[],animate=false){
  const app=document.querySelector('#app'),focused=document.activeElement?.id;app.replaceChildren();
  if(!content||state.view==='content-error'){
    const panel=el('main','availability');panel.id='main-content';panel.append(title(state.view==='loading'?'Opening the patrol…':'Training unavailable'));
    if(state.view!=='loading'){
      panel.append(el('p','','The incident evidence could not be validated. Reload to try again.'));
      errors.forEach(e=>panel.append(el('p','error-detail',`${e.path||'Content'}: ${e.message}`)));
      panel.append(button('Reload content','reload','reload'));
    }
    app.append(panel);return;
  }
  app.append(header(content,state));const main=el('main','workspace'+(state.view==='challenge'?' compact-patrol':''));main.id='main-content';main.tabIndex=-1;
  if(state.view==='briefing')main.append(patrolBriefing(content));
  else if(state.view==='challenge')main.append(patrolCaseView(content,state,animate));
  else if(state.view==='session-summary')main.append(patrolResults(content,state));
  app.append(main);
  const footer=el('footer','footer');footer.append(el('span','','NOC NINJA · OBSERVE / REASON / RESPOND'),el('span','','Guided NOC patrol · Evidence before certainty'));app.append(footer);
  if(animate)animateThrow(app);
  if(focused)document.getElementById(focused)?.focus({preventScroll:true});
}
export function focusView(){document.querySelector('#view-title')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
