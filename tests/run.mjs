import {readFile} from 'node:fs/promises';
import {run} from './harness.js';
import './rules.test.js';
import './state.test.js';
import {contentTests} from './content.test.js';
contentTests(JSON.parse(await readFile(new URL('../data/levels.json',import.meta.url),'utf8')));
const report=await run();console.log(JSON.stringify(report,null,2));if(!report.ok)process.exitCode=1;
