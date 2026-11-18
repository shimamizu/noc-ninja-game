import './aim.test.js';
import {readFile,access} from 'node:fs/promises';
import {test,assert,run} from './harness.js';
import {caseTests,caseSourceTests} from './cases.test.js';
const data=JSON.parse(await readFile(new URL('../data/cases.json',import.meta.url),'utf8'));
caseTests(data);
caseSourceTests(data,Object.fromEntries(await Promise.all(data.cases.map(async c=>[c.id,await readFile(new URL('../'+c.source,import.meta.url),'utf8')]))));
test('Retired simulation data and separate-mode runtime paths are removed',async()=>{
  for(const file of ['data/levels.json','data/coaching.js','data/real-cases.json','engine/content.js','engine/rules.js','engine/dispatch.js','ui/real-cases.js']){
    let exists=true;try{await access(new URL('../'+file,import.meta.url));}catch(e){if(e.code!=='ENOENT')throw e;exists=false;}assert(!exists,'Retired asset still present: '+file);
  }
  for(const file of ['main.js','ui/render.js','ui/patrol.js','ui/controls.js','index.html']){
    const text=await readFile(new URL('../'+file,import.meta.url),'utf8');
    assert(!/saniti[sz]|real incident patrol|Arcade practice|levels\.json|real-cases\.js|begin-real/i.test(text),'Retired user flow in '+file);
  }
});
const report=await run();console.log(JSON.stringify(report,null,2));if(!report.ok)process.exitCode=1;
