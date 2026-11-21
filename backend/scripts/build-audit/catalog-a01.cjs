'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const game=require('genshin-db');
const {digest}=require('./catalog-completion.cjs');
const {dryRun}=require('./catalog-dry-run.cjs');
const folder=path.resolve(__dirname,'../../../docs/character-builds/final-review');
const read=name=>JSON.parse(fs.readFileSync(path.join(folder,name),'utf8'));
const write=(name,object)=>fs.writeFileSync(path.join(folder,name),JSON.stringify(object,null,2)+'\n');
const revision='character-build-catalog-7.2-r3-a01';
const originalBatch='1acfde1c57701c09a90574eab83c969abbd0554bf73e39c1cb083377e418ae36';
const oldSums={
  'bennett:1':'6e94ecbffb40fa65c7ddb251430d151127ec55c78f9af3ff1a08852e666f07eb',
  'fischl:1':'92483f765e9bbb0a0ca1caab7f3347f60431da958e98a8a39b1117e80cd6f703',
  'xiangling:1':'8b217db9e2b920e674bcb00f0de81648a871373e016fbb24d028ef1eb1b2847e',
};
const cfg={
  bennett:{
    sands:['Energy Recharge','HP%'],
    notes:'Use an Energy Recharge Sands until Fantastic Voyage is available on each planned rotation. HP% Sands is a healing alternative only after that requirement is met. The Burst ATK bonus uses Bennett’s innate Base ATK plus the sword’s Base ATK; artifact ATK% does not increase it. At C0 the active character needs above 70% HP for the buff. Use Healing Bonus normally or CRIT Rate when relying on an on-field Favonius crit. Shortlist: Sapwood Blade for craftable ER and base ATK, Aquila Favonia for base ATK only if ER is covered, Skyward Blade for ER plus base ATK, and Favonius Sword when team energy outweighs the smaller ATK buff. Assign one Noblesse holder; Instructor is a four-star alternative when Bennett triggers a reaction on field and the team values EM. The Xiangling–Xingqiu–Sucrose rotation is an optional example, not a replacement for existing teams.',
    urls:['https://genshin-builds.com/en/character/bennett','https://keqingmains.com/q/bennett-quickguide/','https://library.keqingmains.com/bennett/'],
    reason:'ER first, HP% only once covered. Keep all three current collections.',
    claims:'Checked ER/HP healing split, 70% C0 threshold, Base ATK and Sapwood/Favonius tradeoff.',
  },
  fischl:{
    sands:['ATK%','Elemental Mastery'],
    notes:'ATK% Sands is the general off-field default. Consider EM Sands in a stable Quicken/Aggravate rotation only if the weapon, team buffs and substats support it; compare with ATK rather than assuming it wins. Electro goblet, CRIT circlet and Skill > Burst > Normal Attack remain. Meet the chosen Oz renewal cadence with ER; no fixed target is assumed. Song of Stillness needs actual healing on Fischl before creating or resummoning Oz to snapshot its damage buff. At C0 Fischl cannot rely on her own C4 heal. A later Yaoyao heal can trigger or refresh the weapon buff even off field, but does not retroactively update existing Oz. Polar Star stack types are independent; set up inexpensive Normal/Aimed hits when practical, avoid assuming four stacks, and establish desired stacks before the Oz snapshot. Keqing drives Electro application, Nahida maintains Dendro and Yaoyao adds healing; the named team remains experimental.',
    urls:['https://genshin-builds.com/en/character/fischl','https://keqingmains.com/q/fischl-quickguide/','https://keqingmains.com/q/keqing-quickguide/'],
    reason:'Add a conditional Aggravate sands, document Oz weapon setup, keep both existing bow choices canonically, and retain experimental status.',
    claims:'Checked ATK/EM tradeoff, off-field Golden Troupe, healing before Oz snapshot and compatible Quicken teammates. Exact injury/healing timing remains experimental.',
  },
  xiangling:{
    sands:['Energy Recharge','ATK%','Elemental Mastery'],
    notes:'Use Energy Recharge Sands until the 80-Energy Pyronado is ready on the intended rotation. Once Energy is covered, ATK% is a straightforward option for raw Pyro damage or inconsistent Vaporize; EM is conditional on Xiangling owning frequent reactions. Cast Pyronado after applicable Bennett buffs are active and catch Bennett Skill particles on Xiangling for the next Burst. Pyronado snapshots eligible character stats; enemy-state effects such as Dragon’s Bane depend on the aura at each hit. The Catch R5 adds ER and Burst damage/CRIT and is obtainable through fishing. Engulfing Lightning converts excess ER to ATK and grants temporary ER after Burst. Favonius needs a critical hit while Xiangling is on field. Dragon’s Bane is for reliable Hydro/Pyro aura once Energy is covered. Emblem is the general Burst set; mixed sets and Crimson Witch remain situational. Xingqiu needs normal-attack triggers and Bennett supplies Pyro particles. The Sucrose lineup is one example alongside retained Melt, Vaporize, Overvape and mono-Pyro teams.',
    urls:['https://genshin-builds.com/en/character/xiangling','https://keqingmains.com/xiangling/','https://keqingmains.com/q/xiangling-quickguide/'],
    reason:'Add ATK% and EM only after Energy needs are satisfied. Keep all three current collections.',
    claims:'Checked ER gating, conditional ATK/EM, eligible snapshots, Favonius and Bennett particles, and aura-dependent Dragon’s Bane.',
  },
};
const teamAssessment={
  bennett:[
    ['NEEDS_REVIEW','Klee can outrun Xingqiu Hydro. Confirm normal triggers and reaction ownership.'],
    ['UPDATE','Mono Pyro core is useful; replace unresolved kazuha alias in a separate reviewed team edit.'],
    ['UPDATE','Raiden hypercarry core is useful; replace kazuha alias and avoid assuming Sara C6 in a C0 context.'],
    ['NEEDS_REVIEW','Bennett healing may trade away Hu Tao below-half-HP effects. Check Hydro uptime and risk.'],
    ['UPDATE','Yoimiya and Xingqiu are viable; replace kazuha alias and check Pyro Swirl setup and interruption.'],
    ['RETAIN','Fischl and Cryo enable Superconduct; Bennett C0 does not infuse Eula. Check circle uptime.'],
    ['UPDATE','International core is useful; replace unresolved kazuha alias in a separate reviewed team edit.'],
    ['RETAIN','Yanfei can drive Xingqiu with normal attacks before charged attacks. Sucrose supports Swirl.'],
  ],
  xiangling:[
    ['RETAIN','Ganyu reverse Melt, Xiangling Pyro, Bennett battery and Zhongli interruption protection.'],
    ['NEEDS_REVIEW','Possible Overloaded quickswap. Test energy and knockback before endorsing.'],
    ['RETAIN','Matches the proposed benchmark roster. Sucrose drives normal triggers; no duplicate needed.'],
    ['RETAIN','Tartaglia applies Hydro; Bennett funnels particles and Kazuha can support both elements.'],
    ['NEEDS_REVIEW','Electro/Pyro roster is legal, but no Hydro and timing and Sara constellation affect value.'],
    ['RETAIN','Kokomi can sustain and supply Hydro; align driving time with Pyronado.'],
    ['RETAIN','Raiden drives Xingqiu and batteries the team; Pyro, Hydro and Electro support Overvape.'],
    ['RETAIN','Klee, Bennett and Xiangling support mono Pyro with Anemo resistance shred.'],
  ],
};
const normalized=x=>String(x??'').normalize('NFC').toLowerCase().replaceAll('’',"'").replaceAll('"','').trim();
const digestBatch=members=>digest(members.map(({candidateId,checksum})=>({candidateId,checksum})));

function make(inventory,original){
  assert.equal(inventory.identity.mode,'on');
  assert.equal(digestBatch(original.batch.candidates),originalBatch);
  const weapons=new Map(inventory.weapons.map(w=>[w.id,w]));
  const equipment=new Map(inventory.weapons.flatMap(w=>[w.nameEn,w.nameVi].map(n=>[normalized(n),w])));
  const artifactNames=new Map(inventory.artifacts.flatMap(a=>[a.nameEn,a.nameVi].map(n=>[normalized(n),a])));
  const newRecords=[], analyses=[], rows=[], plan=[];
  for(const old of original.records){
    const {candidate:stored}=old;
    const {checksum,...prev}=stored;
    assert.equal(checksum,oldSums[prev.candidateId]);
    assert.equal(digest(prev),checksum);
    const entry=original.batch.candidates.find(c=>c.candidateId===prev.candidateId);
    assert.equal(entry.checksum,checksum);
    const owner=inventory.characters.find(c=>c.id===prev.characterId);
    const baseline=owner.builds.find(b=>b.id===prev.baseline.buildId);
    assert.equal(baseline.version,prev.baseline.version);
    assert.equal(baseline.isDefault,true);
    assert.equal(baseline.reviewStatus,'LEGACY_IMPORT');
    assert.ok(baseline.audits.every(e=>e.action==='LEGACY_BACKFILLED'));
    const pre=dryRun({revision:prev.revision,builds:[stored]},inventory,{build:prev.candidateId}).candidates[0];
    assert.equal(pre.outcome,'REQUIRES_EXPLICIT_ADMIN_REVIEW','Baseline drift or protected conflict');
    const config=cfg[owner.id];
    const next=structuredClone(prev);
    next.revision=revision;
    next.supersedes={revision:prev.revision,checksum};
    next.reviewDecision='NONE_REVIEW_MUST_RESTART';
    next.patch={...next.patch,source:revision,sands:config.sands,notesEn:config.notes};
    const shortlist={weapons:structuredClone(prev.patch.weapons),artifacts:structuredClone(prev.patch.artifacts),teams:structuredClone(prev.patch.teams)};
    if(owner.id==='fischl'){
      const harp={weaponId:'15501',isF2P:false,refinement:1,constellation:'C0'};
      shortlist.weapons.push(harp);
      next.patch.weapons.push(harp);
      next.weaponAccess=next.weaponAccess.map(item=>({...item,note:{
        '15507':'Skill/Burst damage is unconditional; distinct Normal, Charged, Skill and Burst hits build separate timed ATK stacks. Do not assume four stacks at Oz summon.',
        '15402':'Wish acquisition. EM is useful in Aggravate and the passive buffs Skill/Burst damage.',
        '15425':'Craftable. Fischl must be healed before summoning/resummoning Oz for the snapshot; later heals do not change existing Oz.',
        '15410':'Limited wish. Accumulates damage bonus off field; minimize unnecessary field time.',
      }[item.weaponId]}));
      next.weaponAccess.push({weaponId:'15501',availability:'STANDARD_WISH_IF_OWNED',note:'Retain existing Skyward Harp as a situational CRIT stat stick.'});
      assert.equal(baseline.teams.length,0);
      assert.equal(next.patch.teams[0].reviewStatus,'EXPERIMENTAL');
    }else{
      for(const field of ['weapons','artifacts','teams'])delete next.patch[field];
    }
    next.provenance.a01={checkedAt:'2026-11-20',urls:config.urls,claims:config.claims,local:'genshin-db@5.2.15'};
    const facts=shortlist.weapons.map(w=>{
      const cat=weapons.get(w.weaponId);
      const item=game.weapons(cat.nameEn);
      assert.equal(String(item.id),w.weaponId);
      assert.equal(item.weaponText,owner.weapon);
      const attack=Math.round(item.stats(90,6).attack);
      assert.equal(attack,cat.baseAtk);
      return {...w,name:cat.nameEn,baseATK90:attack,passiveName:item.effectName};
    });
    assert.equal(baseline.teams.length,teamAssessment[owner.id]?.length??0);
    const teams=baseline.teams.map((team,i)=>({
      id:team.id,name:team.name,members:team.members.map(m=>m.characterId),reviewStatus:team.reviewStatus,
      classification:teamAssessment[owner.id][i][0],reason:teamAssessment[owner.id][i][1],disposition:'PRESERVE_EXACT_ROW',
    }));
    const gear={
      weapons:baseline.bestWeapons.map(row=>{
        const found=weapons.get(row.weaponId)??equipment.get(normalized(row.nameEn))??equipment.get(normalized(row.nameVi));
        const featured=facts.some(w=>w.weaponId===found?.id);
        return {id:row.id,storedId:row.weaponId,name:row.nameEn,canonicalId:found?.id??null,
          classification:featured?'SHORTLIST':found?'SITUATIONAL_OR_LEGACY_RETAINED':'UNRESOLVED_LEGACY_RETAINED',
          disposition:owner.id==='fischl'?'NORMALIZE_EXISTING_OPTION':'PRESERVE_EXACT_ROW'};
      }),
      artifacts:baseline.bestArtifacts.map(row=>{
        const names=row.setNameEn.replace(/^Mix 2-Piece /,'').split(' & ').map(n=>n.replace(/^2-Piece /,''));
        const ids=names.map(n=>artifactNames.get(normalized(n))?.id??null);
        const featured=shortlist.artifacts.some(a=>a.setIds.slice().sort().join()===ids.slice().sort().join());
        return {id:row.id,label:row.setNameEn,pieces:row.pieces,canonicalIds:ids,
          classification:featured?'SHORTLIST':ids.every(Boolean)?'SITUATIONAL_OR_LEGACY_RETAINED':'UNRESOLVED_LABEL',
          disposition:owner.id==='fischl'?'REPLACE_NON_SET_PLACEHOLDER':'PRESERVE_EXACT_ROW'};
      }),
    };
    next.collectionPolicy=owner.id==='fischl'?'REPLACE_GEAR_WITH_CANONICAL_OPTIONS_AND_ADD_ONE_EXPERIMENTAL_TEAM':'PRESERVE_TEAMS_WEAPONS_ARTIFACTS';
    next.reviewShortlist=shortlist;
    const candidate={...next,checksum:digest(next)};
    const fields=Object.fromEntries([...new Set([...Object.keys(prev.patch),...Object.keys(next.patch)])]
      .filter(k=>JSON.stringify(prev.patch[k])!==JSON.stringify(next.patch[k]))
      .map(k=>[k,{before:prev.patch[k]??null,after:next.patch[k]??null,omitted:!(k in next.patch)}]));
    const preview=Object.fromEntries(Object.entries(next.patch).map(([k,v])=>[k,{before:entry.preview[k]?.before??null,after:v}]));
    const preservation={teams:[baseline.teams.length,owner.id==='fischl'?1:baseline.teams.length],
      weapons:[baseline.bestWeapons.length,owner.id==='fischl'?next.patch.weapons.length:baseline.bestWeapons.length],
      artifacts:[baseline.bestArtifacts.length,owner.id==='fischl'?next.patch.artifacts.length:baseline.bestArtifacts.length]};
    const successorPlan=dryRun({revision,builds:[candidate]},inventory,{build:candidate.candidateId}).candidates[0];
    assert.equal(successorPlan.outcome,pre.outcome);
    analyses.push({candidateId:candidate.candidateId,source:next.provenance.a01,teams,gear,shortlistFacts:facts,preservation,
      desiredTeamCollection:owner.id==='fischl'?next.patch.teams:teams,activeRemovals:owner.id==='fischl'?['Non-set artifact placeholder; bow choices retained by canonical ID']:[]});
    plan.push({...successorPlan,group:'A',state:'REVIEW_READY',authorized:false,writeEligible:false});
    newRecords.push({candidate,changes:[{category:'A01_FINAL_REVIEW',reason:config.reason}],fields});
    rows.push({...entry,version:revision,checksum:candidate.checksum,evidenceSummary:config.reason,
      evidenceReferences:['genshin-db@5.2.15',...config.urls],preview,preservation,
      collectionPolicy:next.collectionPolicy});
  }
  return {newRecords,analyses,plan,batch:{...original.batch,candidates:rows,checksum:digestBatch(rows)}};
}

function frozen(){
  const archive='A01_ORIGINAL.json';
  if(fs.existsSync(path.join(folder,archive)))return read(archive);
  return {batch:read('READY_BATCHES.json').batches.find(row=>row.id==='A01'),
    records:read('REVISED_CANDIDATES.json').records.filter(row=>oldSums[row.candidate.candidateId])};
}

function run(snapshot,options=[]){
  const current=make(JSON.parse(fs.readFileSync(snapshot,'utf8')),frozen());
  if(options.includes('--dry-run')){
    const select=options[options.indexOf('--candidate')+1];
    const restricted=options.includes('--candidate');
    const candidates=restricted?current.plan.filter(c=>c.candidateId===select):current.plan;
    assert.ok(candidates.length);
    const manifest=read('READY_BATCHES.json').batches.find(b=>b.id==='A01');
    assert.equal(current.batch.checksum,manifest.checksum,'Scope or manifest drift');
    console.log(JSON.stringify({mode:'DRY_RUN',batch:'A01',batchChecksum:manifest.checksum,writes:0,candidates},null,2));
    return;
  }
  write('A01_ORIGINAL.json',frozen());
  write('A01_PRESERVATION_ANALYSIS.json',{revision,originalBatch,finalBatch:current.batch.checksum,records:current.analyses});
  const manifest=read('READY_BATCHES.json');
  manifest.batches=manifest.batches.map(row=>row.id==='A01'?current.batch:row);
  write('READY_BATCHES.json',manifest);
  const drafts=read('REVISED_CANDIDATES.json');
  drafts.records=drafts.records.map(row=>current.newRecords.find(n=>n.candidate.candidateId===row.candidate.candidateId)??row);
  write('REVISED_CANDIDATES.json',drafts);
  const dry=read('IMPORT_DRY_RUN.json');
  dry.candidates=dry.candidates.map(row=>current.plan.find(n=>n.candidateId===row.candidateId)??row);
  write('IMPORT_DRY_RUN.json',dry);
  const sources=read('SOURCE_PROVENANCE.json');
  sources.records=sources.records.map(row=>{
    const row3=current.newRecords.find(r=>r.candidate.candidateId===row.candidateId);
    if(!row3)return row;
    return {...row,a01:row3.candidate.provenance.a01,independentReasoning:row3.candidate.patch.notesEn};
  });
  write('SOURCE_PROVENANCE.json',sources);
  const matrix=path.join(folder,'BUILD_REVIEW_MATRIX.csv');
  const lines=fs.readFileSync(matrix,'utf8').split('\n').map(line=>{
    const row=current.newRecords.find(r=>line.startsWith('"'+r.candidate.candidateId+'"'));
    if(!row)return line;
    const old=oldSums[row.candidate.candidateId];
    return line.replace('character-build-catalog-7.2-r2',revision).replace(old,row.candidate.checksum)
      .replace(/("REVIEW_READY",)"[^"]+"/,'$1"'+cfg[row.candidate.characterId].reason+'"');
  });
  fs.writeFileSync(matrix,lines.join('\n'));
  console.log(JSON.stringify({batchChecksum:current.batch.checksum,rows:current.batch.candidates.map(({candidateId,checksum,preservation})=>({candidateId,checksum,preservation}))}));
}
if(require.main===module)run(process.argv[2],process.argv.slice(3));
module.exports={make,frozen,run};
