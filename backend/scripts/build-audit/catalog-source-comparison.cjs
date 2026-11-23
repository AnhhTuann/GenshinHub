/* Private comparison input. Keep raw editorial observations outside the repository. */
const fs=require('node:fs'); const {setTimeout:delay}=require('node:timers/promises');
const [inventory,output]=process.argv.slice(2);
if(!output?.startsWith('/tmp/')) throw new Error('Supply a temporary comparison output path under /tmp');
const catalog=JSON.parse(fs.readFileSync(inventory,'utf8')); const origin='https://genshin-builds.com';
const slug=c=>({'lanyan':'lan_yan','yumemizu':'yumemizuki_mizuki','momoka':'kirara','traveler-boy':'manekin','traveler-girl':'manekina'}[c.id]||c.id.replaceAll('-','_'));
const read=async(url)=>fetch(url,{signal:AbortSignal.timeout(6500),redirect:'error'});
(async()=>{
const index=await read(origin+'/en/characters');
if(!index.ok)throw Error('Character index HTTP '+index.status);
const links=new Set([...((await index.text()).matchAll(/\/en\/character\/([a-z0-9_-]+)/g))].map(m=>m[1]));
const out={};let throttled=false; console.log('index links',links.size);
for(const c of catalog.characters){
 const id=slug(c); const url=origin+'/en/character/'+id;
 const r=out[c.id]={url,checkedAt:new Date().toISOString(),indexed:links.has(id)};
 if(!r.indexed||throttled){r.status=throttled?'NOT_CHECKED_RATE_LIMIT':'NOT_INDEXED';continue;}
 try{
  const response=await read(origin+'/api/genshin/character?id='+id+'&lang=english');
  if(response.status===429)throttled=true;
  if(!response.ok){r.status='HTTP_'+response.status;await response.body?.cancel();continue;}
  const data=await response.json();
  if(data.id!==id){r.status='IDENTITY_MISMATCH';continue;}
  if(!data.build){r.status='NO_BUILD';continue;}
  r.status='AVAILABLE'; r.version=data.version??null;
  r.weapons=Array.isArray(data.build.weapons)?data.build.weapons:[];
  r.artifacts=Array.isArray(data.build.artifacts)?data.build.artifacts:[];
  r.statistics={...data.build.main_stats,substats:data.build.sub_stats,talents:data.build.talent_priority};
  r.teams=Array.isArray(data.teams)?data.teams.map(team=>team.characters):[];
 }catch(e){r.status='UNAVAILABLE';}
 finally{fs.writeFileSync(output,JSON.stringify(out),{mode:0o600});await delay(350);}
}
fs.writeFileSync(output,JSON.stringify(out),{mode:0o600});
console.log(Object.values(out).reduce((a,r)=>(a[r.status]=(a[r.status]||0)+1,a),{}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
