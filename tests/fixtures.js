export const clone=value=>JSON.parse(JSON.stringify(value));
export const time=seconds=>new Date(Date.UTC(2026,10,17,12,0,seconds)).toISOString();
export function pair(id,a,b){return {interfaceId:id,noReset:true,sourceIds:['counter'],snapshots:[a,b].map((count,i)=>({observedAt:time(i*60),operationalState:'up',counterKind:'crc',count,outputIds:[`counter-${i}`]}))};}
export function domain(kind='crcIncreasing',target='a'){
  const c={id:'test',scopeInterfaceIds:['a','b'],topology:{devices:['a','b'].map(id=>({id:id==='a'?'leaf-gw1':'spine-gw1',interfaces:[{id,displayAlias:id==='a'?'Et51/1':'Et3/15/1'}]}))},observations:{light:[],counters:[],history:[]},choices:['opticalIssue','crcIncreasing','linkFlapping'].map(condition=>({id:condition,diagnosis:{condition}}))};
  for(const id of ['a','b']){
    const optical=kind==='opticalIssue'&&id===target,state=optical?'down':'up';
    c.observations.light.push({interfaceId:id,administrativeState:'up',operationalState:state,observedAt:time(60),outputIds:['status','optics'],interpretationSourceIds:['reference'],opticalReadings:[1,2,3,4].map(n=>({channel:String(n),metric:'rx_power',unit:'dBm',value:optical?-30:0.42}))});
    const counters=pair(id,120,kind==='crcIncreasing'&&id===target?145:120);counters.snapshots.forEach(s=>s.operationalState=state);c.observations.counters.push(counters);
    c.observations.history.push({interfaceId:id,windowStart:time(0),windowEnd:time(60),minimumTransitions:4,stateBeforeHistory:state,historyStart:time(0),historyComplete:true,sourceIds:['history'],reports:kind==='linkFlapping'&&id===target?[10,20,40,60].map((n,i)=>({observedAt:time(n),operationalState:i%2?'up':'down',outputIds:['history']})):[]});
  }
  return c;
}
export function curriculum(){return {levels:[1,2,3].map(n=>({id:`L${n}`,rounds:[1,2].map(k=>({...domain(),id:`L${n}-R${k}`,commandOutputs:[{id:'out'}],hints:['method','worked-step','solution'].map(kind=>({id:kind,kind,text:kind}))}))}))};}
