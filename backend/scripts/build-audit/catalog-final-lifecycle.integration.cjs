'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const {spawn}=require('node:child_process');
const {randomBytes}=require('node:crypto');
const {isDeepStrictEqual}=require('node:util');
const {PrismaClient}=require('@prisma/client');
const bcrypt=require('bcryptjs');
const {digest}=require('./catalog-completion.cjs');
const {make,frozen}=require('./catalog-a01.cjs');

const folder='../../../docs/character-builds/final-review/';
const {batches}=require(folder+'READY_BATCHES.json');
const {records}=require(folder+'REVISED_CANDIDATES.json');
const inventory=JSON.parse(fs.readFileSync(process.env.BUILD_AUDIT_INVENTORY,'utf8'));
const url=new URL(process.env.BUILD_AUDIT_TEST_DATABASE_URL);
assert.ok(['127.0.0.1','localhost'].includes(url.hostname));
assert.match(url.pathname,/^\/genshinhub_test_build_final_review_[a-z0-9]+$/);
const prisma=new PrismaClient({datasourceUrl:url.href});
const secret=randomBytes(32).toString('hex');
let sessionToken='';
const endpoint='http://127.0.0.1:4021/graphql';
const selection=batches[0].candidates;
let child;

async function call(query,variables={}, credential=sessionToken) {
  const response=await fetch(endpoint,{method:'POST',headers:{
    'content-type':'application/json',...(credential?{'x-admin-session':credential}:{}),
  },body:JSON.stringify({query,variables})});
  return response.json();
}
function ok(result){
  assert.equal(result.errors,undefined,JSON.stringify(result.errors));
  return Object.values(result.data)[0];
}
const stage='mutation($id:ID!,$c:String!,$v:Int!,$p:CharacterBuildInput!){updateCharacterBuild(id:$id,characterId:$c,expectedVersion:$v,input:$p){version reviewStatus isDefault}}';
const review='mutation($id:ID!,$c:String!,$v:Int!,$d:CharacterBuildReviewDecision!){reviewCharacterBuild(id:$id,characterId:$c,expectedVersion:$v,decision:$d){version reviewStatus isDefault}}';
const load='query($id:ID!){characterBuildPending(buildId:$id)}';
const detail='query($id:String!){character(id:$id){id defaultBuild{id bestWeapons{weaponId} bestArtifacts{pieces} teams{members{characterId}}} builds{id isDefault}}}';

function exactPatch(entry, document){
  const {checksum,...body}=document;
  assert.equal(entry.checksum,checksum,'Batch checksum mismatch');
  assert.equal(digest(body),checksum,'Candidate checksum mismatch');
  assert.equal(body.candidateId,entry.candidateId);
  assert.equal(body.revision,entry.version);
  return body.patch;
}
async function run(){
  const [identity]=await prisma.$queryRaw`SELECT current_database() AS database`;
  assert.equal(identity.database,url.pathname.slice(1));
  assert.equal(await prisma.character.count(),0,'Fresh fixture required');
  const migrations=await prisma.$queryRaw`SELECT migration_name FROM "_prisma_migrations" WHERE finished_at IS NOT NULL AND rolled_back_at IS NULL`;
  assert.deepEqual(migrations.map(x=>x.migration_name).sort(),
    fs.readdirSync('prisma/migrations').filter(x=>/^\d{14}_/.test(x)).sort());
  const reference=process.env.A01_TEST_REFERENCE_INVENTORY?JSON.parse(fs.readFileSync(process.env.A01_TEST_REFERENCE_INVENTORY,'utf8')):inventory;
  const fixtureCharacters=[...inventory.characters,...reference.characters.filter(row=>!inventory.characters.some(owner=>owner.id===row.id))];
  await prisma.character.createMany({data:fixtureCharacters.map(({builds,bestWeapons,bestArtifacts,teams,...row})=>
    Object.fromEntries(Object.entries(row).filter(([field,value])=>value!==null||!['stats','ascensionMats','talentMats'].includes(field))))});
  await prisma.weapon.createMany({data:inventory.weapons});
  await prisma.artifactSet.createMany({data:inventory.artifacts});
  for(const owner of fixtureCharacters.filter(x=>x.id==='mitya'||selection.some(s=>s.characterId===x.id))){
    for(const {bestWeapons,bestArtifacts,teams,audits,...build} of owner.builds){
      await prisma.characterBuild.create({data:build});
      await prisma.characterWeapon.createMany({data:bestWeapons});
      await prisma.characterArtifact.createMany({data:bestArtifacts});
      for(const {members,...team} of teams){
        await prisma.characterTeam.create({data:team});
        await prisma.teamMember.createMany({data:members});
      }
    }
  }
  const mitya=await prisma.characterBuild.findMany({where:{characterId:'mitya'},orderBy:{id:'asc'}});
  assert.equal(mitya.length,2);
  const collections=async id=>{
    const where={buildId:id}; const orderBy=[{order:'asc'},{id:'asc'}];
    return {weapons:await prisma.characterWeapon.findMany({where,orderBy}),
      artifacts:await prisma.characterArtifact.findMany({where,orderBy}),
      teams:await prisma.characterTeam.findMany({where,orderBy,include:{members:{orderBy}}})};
  };
  assert.equal(make(inventory,frozen()).batch.checksum,batches[0].checksum);
  child=spawn(process.execPath,['-r','ts-node/register','src/index.ts'],{
    env:{...process.env,PORT:'4021',DATABASE_URL:url.href,
      ADMIN_JWT_SECRET:randomBytes(32).toString('hex')},
    stdio:'ignore',
  });
  for(let i=0;;i++){
    if(child.exitCode!==null||i===100)throw Error('Isolated backend unavailable');
    try{if((await fetch('http://127.0.0.1:4021/health')).ok)break;}catch{}
    await new Promise(r=>setTimeout(r,200));
  }
  await prisma.admin.create({data:{
    username:'integration_owner',passwordHash:await bcrypt.hash(secret,12),
    role:'OWNER',status:'ACTIVE',
  }});
  const loginResponse=await fetch('http://127.0.0.1:4021/auth/admin/login',{
    method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({username:'integration_owner',password:secret}),
  });
  const login=await loginResponse.json();
  assert.equal(loginResponse.status,200,JSON.stringify(login));
  sessionToken=login.token;
  assert.ok(sessionToken,'Admin session token required');
  const candidate=selection[0];
  const doc=records.find(row=>row.candidate.candidateId===candidate.candidateId).candidate;
  assert.throws(()=>exactPatch(candidate,{...doc,patch:{...doc.patch,sands:['ATK%']}}),/checksum mismatch/);
  const patch=exactPatch(candidate,doc);
  const first={id:candidate.existingBuildId,c:candidate.characterId,v:candidate.expectedBaseline.version,p:patch};
  for(const key of [null,'incorrect-credential']){
    const result=await call(stage, first,key);
    assert.match(result.errors[0].message,/Admin access required/);
  }
  const before=ok(await call(detail,{id:first.c},null));
  const beforeRejection=await collections(first.id);
  const race=await Promise.all([call(stage,first),call(stage,first)]);
  assert.equal(race.filter(r=>!r.errors).length,1);
  assert.equal(race.filter(r=>r.errors?.[0]?.extensions.code==='CONFLICT').length,1);
  const staged=ok(race.find(r=>!r.errors));
  const pending=ok(await call(load,{id:first.id}));
  assert.ok(isDeepStrictEqual(patch,pending),'Exact replay is a no-op under preflight');
  assert.deepEqual(ok(await call(detail,{id:first.c},null)),before);
  const denied=await call(review,{id:first.id,c:first.c,v:staged.version,d:'APPROVE'},null);
  assert.match(denied.errors[0].message,/Admin access required/);
  const rejected=ok(await call(review,{id:first.id,c:first.c,v:staged.version,d:'REJECT'}));
  assert.equal(rejected.reviewStatus,'LEGACY_IMPORT');
  assert.deepEqual(ok(await call(detail,{id:first.c},null)),before);
  assert.deepEqual(await collections(first.id),beforeRejection);
  for(const entry of selection){
    const document=records.find(row=>row.candidate.candidateId===entry.candidateId).candidate;
    const input=exactPatch(entry,document);
    const current=await prisma.characterBuild.findUniqueOrThrow({where:{id:entry.existingBuildId}});
    const args={id:current.id,c:entry.characterId,v:current.version};
    const beforeCollections=await collections(current.id);
    const next=ok(await call(stage,{...args,p:input}));
    assert.deepEqual(await collections(current.id),beforeCollections);
    const approved=ok(await call(review,{...args,v:next.version,d:'APPROVE'}));
    assert.equal(approved.reviewStatus,'APPROVED');
    assert.equal(approved.isDefault,true);
    const publicData=ok(await call(detail,{id:entry.characterId},null));
    assert.equal(publicData.defaultBuild.id,current.id);
    const activeCollections=await collections(current.id);
    const archive=await prisma.characterBuild.findUnique({where:{id:'baseline-'+entry.characterId}});
    if(input.weapons){
      assert.deepEqual(publicData.defaultBuild.bestWeapons.map(row=>row.weaponId),input.weapons.map(row=>row.weaponId));
      assert.equal(publicData.defaultBuild.teams[0].members.length,4);
      assert.ok(archive&&!archive.isDefault);
      assert.equal(activeCollections.teams[0].reviewStatus,'EXPERIMENTAL');
    }else{
      assert.equal(archive,null);
      assert.deepEqual(activeCollections,beforeCollections);
    }
    for(const key of ['teams','weapons','artifacts'])assert.equal(activeCollections[key].length,entry.preservation[key][1]);
    const trail=await prisma.characterBuildAudit.findMany({where:{buildId:current.id},orderBy:{version:'asc'}});
    assert.ok(trail.every(row=>row.actor==='authenticated-admin'));
    assert.equal(trail.at(-1).action,'PUBLISHED');
    assert.deepEqual(trail.at(-1).changes.patch,input);
    if(input.weapons)assert.ok(trail.at(-1).changes.before.weapons.length);
    else for(const key of ['teams','weapons','artifacts'])assert.ok(!(key in trail.at(-1).changes.before));
    const replay=await call(review,{...args,v:next.version,d:'APPROVE'});
    assert.equal(replay.errors?.[0]?.extensions.code,'CONFLICT');
  }
  const fish=await prisma.characterBuild.findUniqueOrThrow({where:{id:'legacy-fischl'}});
  const teamPatch=exactPatch(selection.find(e=>e.characterId==='fischl'),records.find(r=>r.candidate.characterId==='fischl'&&r.candidate.candidateId==='fischl:1').candidate).teams;
  const replaceTeams=async(v,teams)=>{
    const args={id:fish.id,c:'fischl',v};
    const staged=ok(await call(stage,{...args,p:{teams}}));
    return ok(await call(review,{...args,v:staged.version,d:'APPROVE'}));
  };
  const updateTeam=[{...teamPatch[0],description:'Test-only role description update'}];
  const updatedTeam=await replaceTeams(fish.version,updateTeam);
  assert.equal((await collections(fish.id)).teams[0].description,updateTeam[0].description);
  const removed=await replaceTeams(updatedTeam.version,[]);
  assert.equal((await collections(fish.id)).teams.length,0);
  await replaceTeams(removed.version,teamPatch);
  assert.equal((await collections(fish.id)).teams[0].reviewStatus,'EXPERIMENTAL');
  const create='mutation($c:String!){createCharacterBuild(characterId:$c,name:"Isolated rollback exercise",playstyles:[SUPPORT]){id version isDefault}}';
  const alt=ok(await call(create,{c:first.c}));
  const altArgs={id:alt.id,c:first.c,v:alt.version};
  const changed=ok(await call(stage,{...altArgs,p:{sands:['Energy Recharge']}}));
  const published=ok(await call(review,{...altArgs,v:changed.version,d:'APPROVE'}));
  assert.equal(published.isDefault,false);
  await assert.rejects(prisma.characterBuild.update({where:{id:alt.id},data:{isDefault:true}}),error=>error.code==='P2002');
  const hide='mutation($id:ID!,$c:String!,$v:Int!){archiveCharacterBuild(id:$id,characterId:$c,expectedVersion:$v){reviewStatus}}';
  assert.equal(ok(await call(hide,{...altArgs,v:published.version})).reviewStatus,'REJECTED');
  const active=ok(await call(detail,{id:first.c},null));
  assert.equal(active.defaultBuild.id,first.id);
  assert.ok(active.builds.every(row=>row.id!==alt.id));
  assert.deepEqual(await prisma.characterBuild.findMany({where:{characterId:'mitya'},orderBy:{id:'asc'}}),mitya);
  console.log(JSON.stringify({database:identity.database,verifiedBatch:selection.map(row=>row.candidateId),
    isolatedTestApprovals:selection.length+4,realApprovals:0,auditActions:['CREATED','STAGED','REJECTED','PUBLISHED','ARCHIVED'],
    checks:['unauthenticated and wrong-key denial','stale concurrency','checksum mismatch','idempotent replay','unchanged default','public GraphQL','Mitya protected','exact preservation on omission','explicit replacement and removal','team restored']}));
}
run().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{
  if(child?.pid)child.kill();
  await prisma.$disconnect();
});
