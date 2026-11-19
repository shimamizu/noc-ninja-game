import './aim.test.js';
import {readFile,readdir} from 'node:fs/promises';
import {test,assert,run} from './harness.js';
import {caseTests,caseSourceTests} from './cases.test.js';
import {randomizationTests} from './randomization.test.js';
import {investigationTests} from './investigation.test.js';
const data=JSON.parse(await readFile(new URL('../data/cases.json',import.meta.url),'utf8'));
caseTests(data);
investigationTests(data);randomizationTests(data);
caseSourceTests(data,Object.fromEntries(await Promise.all(data.cases.map(async c=>[c.id,await readFile(new URL('../'+c.source,import.meta.url),'utf8')]))));
test('Retired simulation data and separate-mode runtime paths are removed',async()=>{
  const runtimeFiles={data:['cases.json','optics-reference.yaml'],engine:['cases.js','investigation.js','state.js'],ui:['aim.js','controls.js','patrol.js','render.js']};
  for(const [directory,expected] of Object.entries(runtimeFiles)){
    const actual=await readdir(new URL('../'+directory+'/',import.meta.url));
    assert(actual.length===expected.length&&actual.every(file=>expected.includes(file)),'Unexpected runtime asset in '+directory);
  }
  for(const file of ['main.js','ui/render.js','ui/patrol.js','ui/controls.js','index.html']){
    const text=await readFile(new URL('../'+file,import.meta.url),'utf8');
    assert(!/saniti[sz]|Arcade practice|levels\.json/i.test(text),'Retired user flow in '+file);
  }
});
const report=await run();console.log(JSON.stringify(report,null,2));if(!report.ok)process.exitCode=1;
