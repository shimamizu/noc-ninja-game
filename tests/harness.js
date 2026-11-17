const cases = [];
export function test(name, fn) { cases.push({name, fn}); }
export function assert(value, message='Assertion failed') { if (!value) throw new Error(message); }
export function equal(actual, expected) { if (JSON.stringify(actual)!==JSON.stringify(expected)) throw new Error(`Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`); }
export async function run() {
  const results=[];
  for (const c of cases) { try { await c.fn(); results.push({name:c.name,pass:true}); } catch(error) { results.push({name:c.name,pass:false,error:error.message}); } }
  return {total:cases.length, passed:results.filter(r=>r.pass).length, failed:results.filter(r=>!r.pass).length, results, ok:cases.length>0 && results.every(r=>r.pass)};
}
