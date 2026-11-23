'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const game = require('genshin-db');
const { digest } = require('./catalog-completion.cjs');
const { dryRun } = require('./catalog-dry-run.cjs');

const root = path.resolve(__dirname, '../../../docs/character-builds');
const out = path.join(root, 'final-review');
const second = 'character-build-catalog-7.2-r2';
const local = 'genshin-db@' + require('genshin-db/package.json').version;
const checked = '2026-11-20';
const kqm = {
  'bennett:1': 'https://keqingmains.com/q/bennett-quickguide/',
  'fischl:1': 'https://keqingmains.com/q/fischl-quickguide/',
  'xiangling:1': 'https://keqingmains.com/xiangling/',
  'ganyu:2': 'https://keqingmains.com/q/ganyu-quickguide/',
  'raiden-shogun:2': 'https://keqingmains.com/q/raiden-quickguide/',
  'mavuika:2': 'https://keqingmains.com/q/mavuika-quickguide/',
  'varesa:1': 'https://keqingmains.com/q/varesa-quickguide/',
  'yelan:1': 'https://keqingmains.com/q/yelan-quickguide/',
  'sucrose:1': 'https://keqingmains.com/q/sucrose-quickguide/',
  'beidou:1': 'https://keqingmains.com/beidou/',
  'baizhu:1': 'https://keqingmains.com/q/baizhu-quickguide/',
  'citlali:1': 'https://keqingmains.com/q/citlali-quickguide/',
  'thoma:1': 'https://keqingmains.com/q/thoma-quickguide/',
  'thoma:2': 'https://keqingmains.com/q/thoma-quickguide/',
};
const ready = {
  'bennett:1': ['Burst buff uses base ATK; meet ER first. Noblesse has one holder and the C0 HP threshold applies.',
    ['SUPPORT:ATK buff, healing and Pyro particles', 'SUB_DPS:off-field Pyronado', 'SUB_DPS:Hydro via normal-attack triggers', 'SUPPORT:on-field driver and resistance shred']],
  'xiangling:1': ['The Catch R5 and Emblem address a Burst-driven role. Bennett funnels particles; Hydro must be maintained.',
    ['SUB_DPS:off-field Pyro and Vaporize trigger', 'SUPPORT:ATK buff, healing and Pyro battery', 'SUB_DPS:off-field Hydro', 'SUPPORT:on-field Swirl driver']],
  'fischl:1': ['Oz uses Skill scaling and off-field Golden Troupe. Alternate Skill and Burst and allow sufficient field time for weapon setup.',
    ['SUB_DPS:off-field Oz and Aggravate follow-up', 'MAIN_DPS:quick-swap Electro attacker', 'SUB_DPS:ongoing Dendro application', 'SUPPORT:healing and Dendro application']],
  'sucrose:1': ['On-field normal attacks drive both off-field Bursts. Prioritize level and EM for Swirl, with sufficient ER for the chosen Burst cadence.',
    ['SUPPORT:on-field Swirl driver', 'SUB_DPS:Oz and Electro battery', 'SUB_DPS:multi-target Stormbreaker damage', 'SUB_DPS:Hydro and defensive utility']],
  'beidou:1': ['Normal attacks from the driver proc Stormbreaker; Fischl batteries Beidou. Recommend for multi-target content with bounce opportunities.',
    ['SUB_DPS:off-field Stormbreaker', 'SUPPORT:on-field Swirl driver', 'SUB_DPS:Oz and Electro battery', 'SUB_DPS:off-field Hydro']],
  'raiden-shogun:2': ['Skill hits trigger Dendro cores when there is a damageable target. Character level and EM govern Hyperbloom damage.',
    ['SUB_DPS:off-field Hyperbloom trigger', 'SUPPORT:Dendro application', 'SUB_DPS:off-field Hydro', 'SUPPORT:Hydro sustain and normal-attack driver']],
  'ganyu:2': ['Keep Pyro aura and protect aiming time. Use Hamayumi with a set that preserves full Energy, and treat Burst as rotation-dependent.',
    ['MAIN_DPS:charged-shot reverse Melt', 'SUB_DPS:off-field Pyro aura', 'SUPPORT:buff, heal and Pyro battery', 'SUPPORT:shield and interruption protection']],
  'yelan:1': ['Yelan and Xingqiu can trade Hydro particles while Hu Tao drives normal-attack triggers. Slingshot adds CRIT Rate without needing refinement for Burst.',
    ['SUB_DPS:off-field Hydro and HP-scaled Burst', 'MAIN_DPS:Pyro carry weaving normal attacks', 'SUB_DPS:off-field Hydro and Hydro battery', 'SUPPORT:shield and interruption protection']],
  'baizhu:1': ['Burst uptime matters for sustain; Prototype Amber restores Energy after Burst. Nahida may already hold Deepwood.',
    ['SUPPORT:healing and Dendro sustain', 'MAIN_DPS:long-field Electro carry', 'SUB_DPS:off-field Dendro marking', 'SUB_DPS:Hydro via normal-attack triggers']],
  'varesa:1': ['Plunge and special Burst are the core of this setup; Skill primarily enables the attack sequence. Team healing supports Fanfare.',
    ['MAIN_DPS:on-field plunge and Burst', 'SUPPORT:movement-sensitive ATK buff', 'SUPPORT:plunge support and team healing', 'SUB_DPS:off-field Hydro and Fanfare']],
  'zhongli:1': ['Held Skill shield and nearby resistance reduction are the focus. Tenacity needs pillar hits, so a two-piece HP mix is the predictable fallback.',
    ['SUPPORT:shield and resistance reduction', 'MAIN_DPS:Pyro Vape carry', 'SUB_DPS:off-field Hydro and resistance to interruption', 'SUB_DPS:off-field Hydro and damage buff']],
  'albedo:1': ['DEF and Skill damage drive Transient Blossoms. Shield coverage helps keep Harbinger above its HP threshold.',
    ['SUB_DPS:off-field Geo Skill damage', 'MAIN_DPS:on-field charged Geo damage', 'SUPPORT:DEF and Geo buffs', 'SUPPORT:shield and nearby resistance reduction']],
};
const corrections = {
  'yelan:1': [['weapons','Slingshot refinement does not improve its CRIT Rate or Exquisite Throw.'], d => {
    d.patch.weapons.find(w=>w.weaponId==='15304').refinement=1;
    d.weaponAccess.find(w=>w.weaponId==='15304').note='R1 supplies the same CRIT Rate as R5. Do not count the projectile passive toward Burst damage.';
  }],
  'ganyu:2': [['artifacts','Remove Shimenawa from this Hamayumi-compatible shortlist because Skill consumes Energy and prevents the full-Energy passive.'], d => {
    d.patch.artifacts[1].setIds=['15003','14001'];
    d.artifactRationale[1]=['Two-piece EM for Melt','Two-piece Cryo damage without Freeze or Energy-spend requirements'];
  }],
  'mavuika:2': [['artifacts','The listed Xilonen lineup already has a natural Scroll holder. Set a non-overlapping Skill set first.'], d => {
    d.patch.artifacts.reverse();
    d.artifactRationale.reverse();
    d.artifactRationale[1]=['Use Scroll only after explicitly assigning Xilonen a different set. The same elemental buff does not stack.'];
  }],
  'citlali:1': [['artifacts','The named Xilonen lineup should explicitly assign the only Scroll effect; Citlali can use the EM mix while Xilonen holds Scroll.'], d => {
    d.patch.artifacts.reverse(); d.artifactRationale.reverse();
    d.artifactRationale[1]=['Use Scroll on Citlali only if the team assigns a different set to Xilonen.'];
  }],
  'raiden-shogun:2': [['talents','Character level and EM drive transformative reaction damage. Remove a ranked Burst and Normal Attack recommendation for the dedicated trigger role.'], d => {
    d.patch.talentPriority=['Skill'];
    d.patch.notesEn+=' Raise Raiden to level 90 first. Skill ranks help its utility, while the reaction itself does not scale with talent level.';
  }],
  'bennett:1': [['stats','The generic healing circlet does not meet the Favonius proc condition reliably. Include a conditional CRIT Rate alternative and clarify the C0 threshold.'], d => {
    d.patch.circlet=['Healing Bonus','CRIT Rate'];
    d.patch.notesEn+=' At C0 the active character needs above 70% HP for the ATK buff. Use a CRIT Rate circlet when relying on Favonius and do not count its particles without an on-field proc.';
  }],
  'chasca:1': [['weapons','Song of Stillness requires the wielder to receive healing; the roster can supply it via Bennett, but the passive is not assumed if a rotation misses that healing.'], d => {
    d.weaponAccess.find(w=>w.weaponId==='15425').note='Bennett must actually heal Chasca to trigger the damage passive.';
  }],
  'iansan:1': [['weapons','Rightful Reward refunds Energy when the wearer is healed; the draft lacks a lineup to establish that condition.'], d => {
    d.patch.weapons=d.patch.weapons.filter(w=>w.weaponId!=='13425');
    d.weaponAccess=d.weaponAccess.filter(w=>w.weaponId!=='13425');
  }],
  'klee:1': [['weapons','Mono Pyro does not guarantee useful damage from The Widsith EM song. Preserve the option but disclose its inactive outcome in this archetype.'], d => {
    d.weaponAccess.find(w=>w.weaponId==='14402').note='The EM song offers little to this mono Pyro rotation; do not model every song as a damage buff.';
  }],
};
const holds = {
  'alyosha:1':'Measure Polestar timing and determine whether its buff can be handed to Mitya without losing Burst uptime.',
  'odette:1':'Verify whether the double and special Skill preserve Cryo aura through the two Anemo slots.',
  'valeriy:1':'Measure Momentum generation with the actual Electro field-time order before assigning a directive sequence.',
  'vesna:1':'Confirm Cryo aura ownership and Scarlet Proof uptime in the proposed Stellar Swirl rotation.',
  'vodyanitsa:1':'Test Wandering Vortex production and shield/sustain needs in the proposed Cryo/Anemo team.',
  'mavuika:2':'Check Mualani bite timing and Pyro application after Xilonen takes Scroll.',
  'citlali:1':'Model Cryo application versus Arlecchino attack timing and the assigned Scroll holder.',
  'nilou:1':'Confirm who owns Bountiful Cores before retaining the EM set or Iron Sting alternative.',
  'kaveh:1':'Confirm core ownership and field-time requirements before claiming EM value.',
  'sangonomiya-kokomi:2':'Measure Bloom ownership and the amount of healing needed before recommending an EM sands.',
  'neuvillette:1':'Check C0 reaction stacks and interruption behavior in this double Hydro composition.',
};
const extra = new Set(['linnea','lohen','nicole','prune','sandrone','varka']);
const outside = ['traveler','traveler-boy','traveler-girl'];
const key = value=>String(value??'').normalize('NFC').toLowerCase().trim();
const aliases={'kiếm đơn':'sword','trọng kiếm':'claymore','vũ khí cán dài':'polearm',cung:'bow','pháp khí':'catalyst'};
const type=value=>aliases[key(value)]??key(value);
const read = file=>JSON.parse(fs.readFileSync(file,'utf8'));
const write = (name,data)=>fs.writeFileSync(path.join(out,name),JSON.stringify(data,null,2)+'\n');
const csv = rows=>rows.map(row=>row.map(c=>'"'+String(c??'').replaceAll('"','""')+'"').join(',')).join('\n')+'\n';

function validate(d,catalog) {
  const {characters,weapons,artifacts}=catalog;
  const char=characters.get(d.characterId);
  assert.ok(char && !outside.includes(char.id) && char.id!=='mitya');
  assert.equal(d.patch.constellationAssumptions.join(','),'C0');
  const weaponFacts=d.patch.weapons.map(w=>{
    const row=weapons.get(w.weaponId);
    assert.ok(row && type(row.type)===type(char.weapon),d.candidateId+' weapon '+w.weaponId);
    const item=game.weapons(row.nameEn);
    assert.equal(String(item?.id),w.weaponId);
    assert.ok(item.effectName || item.effect || item.rarity===1,'Missing weapon effect');
    assert.ok(Number.isInteger(w.refinement)&&w.refinement>=1&&w.refinement<=5);
    return {id:w.weaponId,reference:item.name,passive:item.effectName??null,refinement:w.refinement};
  });
  assert.equal(new Set(weaponFacts.map(x=>x.id)).size,weaponFacts.length);
  const artifactFacts=d.patch.artifacts.map(option=>{
    assert.ok([1,2].includes(option.setIds.length));
    assert.equal(new Set(option.setIds).size,option.setIds.length);
    return option.setIds.map(id=>{
      const row=artifacts.get(id);
      const item=game.artifacts(row?.nameEn);
      assert.equal(String(item?.id),id);
      assert.ok(option.setIds.length===2 ? item.effect2Pc : item.effect4Pc);
      return {id,name:item.name,pieces:option.setIds.length===2?2:4};
    });
  });
  const talents=game.talents(char.nameEn);
  assert.ok(talents?.combat1&&talents?.combat2&&talents?.combat3);
  for(const stat of d.patch.talentPriority??[]) assert.ok(['Normal Attack','Skill','Burst'].includes(stat));
  const teams=(d.patch.teams??[]).map(team=>{
    const ids=team.members.map(m=>m.characterId);
    assert.ok(ids.includes(char.id)&&ids.length===4&&new Set(ids).size===4&&ids.every(id=>characters.has(id)));
    return team.members.map(m=>({characterId:m.characterId,element:characters.get(m.characterId).element,role:m.role}));
  });
  return {weaponFacts,artifactFacts,teams,talentVersion:talents.version??null};
}

function audit(inventory) {
  const doc=read(path.join(root,'proposed-builds.json'));
  const coverage=read(path.join(root,'coverage.json')).characters;
  const previousDiffs=read(path.join(root,'character-diffs.json')).characters.flatMap(row=>row.changes);
  const previousPlan=read(path.join(root,'import-dry-run.json'));
  const coverageCsv=fs.readFileSync(path.join(root,'coverage.csv'),'utf8').trim().split('\n');
  assert.equal(coverageCsv.length-1,inventory.characters.length);
  assert.deepEqual(coverage.map(x=>x.id),inventory.characters.map(x=>x.id));
  assert.equal(previousPlan.writes,0);
  const matrix=[], provenance=[], revisions=[], readyBatchRows=[], dry=[];
  const catalog=Object.fromEntries(['characters','weapons','artifacts'].map(field=>[field,new Map(inventory[field].map(row=>[row.id,row]))]));
  const oldPlan=new Map(previousPlan.candidates.map(row=>[row.candidateId,row]));
  const oldDiff=new Map(previousDiffs.map(row=>[row.candidateId,row]));
  for(const original of doc.builds){
    const {checksum:oldChecksum,...candidate}=original;
    const id=candidate.candidateId;
    assert.equal(digest(candidate),oldChecksum,id);
    assert.equal(oldPlan.get(id)?.checksum,oldChecksum,id);
    assert.ok(oldDiff.has(id),id);
    const d=structuredClone(candidate);
    const isReady=Boolean(ready[id]);
    const changes=[];
    if(corrections[id]){
      const [[category,reason],fix]=corrections[id];
      fix(d);
      changes.push({category,reason});
    }
    if(isReady){
      const roles=ready[id][1];
      assert.ok(d.patch.teams?.length===1 && roles.length===4);
      d.patch.teams[0].members.forEach((member,i)=>{
        const [role,roleDesc]=roles[i].split(':');
        Object.assign(member,{role,roleDesc});
      });
      changes.push({category:'teams',reason:'Make the named team rotation reviewable by assigning each member’s actual job.'});
    }
    if(changes.length){
      d.revision=second;
      d.patch.source=second;
      d.supersedes={revision:original.revision,checksum:oldChecksum};
      d.reviewDecision='NONE_REVIEW_MUST_RESTART';
    }
    const currentChecksum=digest(d);
    const structural=validate(d,catalog);
    const elements=structural.teams[0]?.map(member=>member.element)??[];
    const observations={
      energy:d.provenance.mechanics.burstEnergy,
      energyPlan:d.patch.subStatsPriority?.includes('Energy Recharge')?'ER in substat plan. Verify active and off-field particle routing.':'No blanket ER target; verify whether the stated role depends on Burst.',
      lineupElements:[...new Set(elements)],
      access:d.weaponAccess.map(w=>({weaponId:w.weaponId,availability:w.availability,condition:w.note})),
      stats:d.patch.sands?{sands:d.patch.sands,goblet:d.patch.goblet,circlet:d.patch.circlet,substats:d.patch.subStatsPriority}:null,
      talents:d.patch.talentPriority??null,
      rotationScope:d.patch.notesEn,
    };
    if(id==='chevreuse:1')assert.ok(elements.every(element=>['Pyro','Electro'].includes(element))&&new Set(elements).size===2);
    if(id==='nilou:1')assert.ok(elements.every(element=>['Hydro','Dendro'].includes(element))&&new Set(elements).size===2);
    if(id==='skirk:1'||id==='escoffier:1')assert.ok(elements.every(element=>['Hydro','Cryo'].includes(element)));
    if(id==='raiden-shogun:2'||id==='kuki-shinobu:1')assert.ok(['Hydro','Dendro','Electro'].every(element=>elements.includes(element)));
    const current=dryRun({revision:d.revision,builds:[{...d,checksum:currentChecksum}]},inventory,{build:id}).candidates[0];
    const owner=catalog.characters.get(d.characterId);
    const existing=owner.builds.find(build=>build.id===d.baseline?.buildId);
    const managed=existing?.audits.some(event=>event.action!=='LEGACY_BACKFILLED')??false;
    if(managed)current.outcome='ADMIN_MANAGED_HISTORY';
    const conflict=!['REQUIRES_EXPLICIT_ADMIN_REVIEW','EVIDENCE_HOLD'].includes(current.outcome);
    const group=conflict||extra.has(d.characterId)?'C':isReady?'A':'B';
    const evidence=group==='A'?ready[id][0]:group==='C'?
      (conflict?current.outcome:'Equipment only. Scaling, main stats, talent priorities and a useful rotation remain open.'):
      (holds[id] ?? (!d.patch.teams?'No supported team rotation or explicit team omission sign-off.':
        'Confirm reaction ownership, role assignments and Energy cadence for the listed lineup before review-ready classification.'));
    const fields=Object.fromEntries(Object.keys(d.patch).filter(k=>JSON.stringify(d.patch[k])!==JSON.stringify(original.patch[k]))
      .map(k=>[k,{before:original.patch[k]??null,after:d.patch[k]}]));
    const refs={
      genshinBuilds:{name:'Genshin-Builds',...d.provenance.externalReference,
        categories:['weapons','artifacts','stats','talents','teams'],comparison:original.provenance.externalComparison,
        comparisonVersion:original.revision, statusNote:'Previously observed comparison. Successor corrections are independently reasoned.'},
      game:{name:'genshin-db',reference:local,accessDate:checked,checked:true,
        categories:['weapon identity, refinement range and passive identity','artifact identity and piece effect','talent kit and team identity'],...structural},
      theorycrafting:kqm[id]?{name:'KQM',url:kqm[id],accessDate:checked,checked:true,category:'Build mechanic and rotation context',reason:evidence}:
        {checked:false,status:'NO_ADDITIONAL_THEORYCRAFTING_VERIFIED'},
      approvedGenshinHub:{checked:true,reference:'Read-only development CharacterBuild snapshot',accessDate:checked,
        baseline:d.baseline,usedAsEditorialEvidence:false},
      confidence:group==='A'?'SUPPORTED_WITHIN_SCOPE':group==='B'?'PROVISIONAL':'INSUFFICIENT',
      independentReasoning:d.patch.notesEn,
    };
    provenance.push({candidateId:id,characterId:d.characterId,group,observations,...refs});
    matrix.push({candidateId:id,characterId:d.characterId,role:d.patch.playstyles.join('+'),revision:d.revision,
      checksum:currentChecksum,group,state:group==='A'?'REVIEW_READY':'DRAFTED',evidence,
      external:d.provenance.externalReference.status,teamAssigned:Boolean(d.patch.teams?.length),
      mechanicReview:group==='A'?'SUPPORTED_CONTEXT':'STRUCTURAL_AND_CONDITION_SCREEN',published:false});
    dry.push({...current,group,state:group==='A'?'REVIEW_READY':'DRAFTED',authorized:false,writeEligible:false});
    if(changes.length) revisions.push({candidate:{...d,checksum:currentChecksum},changes,fields});
    if(group==='A'){
      const before=oldDiff.get(id).fields;
      const preview=Object.fromEntries(Object.keys(d.patch).map(k=>[k,{before:before[k]?.before??null,after:d.patch[k]}]));
      readyBatchRows.push({characterId:d.characterId,candidateId:id,role:d.patch.playstyles,
        version:d.revision,checksum:currentChecksum,approvalRequirement:'Explicit user authorization for this ID and checksum, then authenticated Admin review of the exact staged patch',
        evidenceSummary:evidence,evidenceReferences:[local,d.provenance.externalReference.url,kqm[id]].filter(Boolean),
        databaseOperation:d.operation==='PROPOSE_REVISION'?'STAGE_PATCH_ON_EXISTING_LEGACY_BUILD':'CREATE_SEPARATE_DRAFT_THEN_STAGE',
        conflictStatus:current.outcome,existingBuildId:d.baseline?.buildId??null,
        expectedBaseline:d.baseline,preserveDefault:true,state:'REVIEW_READY',preview});
    }
  }
  const first=['bennett:1','fischl:1','xiangling:1'];
  const batches=[{id:'A01',candidates:first.map(id=>readyBatchRows.find(row=>row.candidateId===id)).filter(Boolean)}];
  const rest=readyBatchRows.filter(row=>!first.includes(row.candidateId)).sort((a,b)=>a.candidateId.localeCompare(b.candidateId));
  for(let i=0;i<rest.length;i+=3)batches.push({id:'A0'+(i/3+2),candidates:rest.slice(i,i+3)});
  for(const batch of batches)batch.checksum=digest(batch.candidates.map(({candidateId,checksum})=>({candidateId,checksum})));
  const counts=Object.fromEntries(['A','B','C'].map(group=>{
    const selected=matrix.filter(row=>row.group===group);
    const roles={};
    for(const record of selected)for(const role of record.role.split('+'))roles[role]=(roles[role]??0)+1;
    return [group,{builds:selected.length,characters:new Set(selected.map(row=>row.characterId)).size,roles}];
  }));
  return {matrix,provenance,revisions,batches,dry,counts,outside};
}

function select(r,manifest,batchID,candidateID){
  const batch=manifest.batches.find(row=>row.id===batchID);
  assert.ok(batch,'Unknown review-ready batch');
  assert.equal(batch.checksum,digest(batch.candidates.map(({candidateId,checksum})=>({candidateId,checksum}))), 'Batch manifest checksum mismatch');
  const candidates=batch.candidates.filter(row=>!candidateID||row.candidateId===candidateID);
  assert.ok(candidates.length,'Candidate is outside this review-ready batch');
  return {mode:'DRY_RUN',writes:0,selection:{batch:batchID,candidate:candidateID??null},batchChecksum:batch.checksum,
    candidates:candidates.map(row=>{
      const current=r.dry.find(decision=>decision.candidateId===row.candidateId);
      if(!current||current.checksum!==row.checksum)return {candidateId:row.candidateId,outcome:'CANDIDATE_CHANGED',writeEligible:false};
      return current;
    })};
}

if(require.main===module){
  const [, ,snapshot,batchArg,batchID,candidateArg,candidateID]=process.argv;
  if(batchArg==='--batch'&&batchID==='A01'&&fs.existsSync(path.join(out,'A01_ORIGINAL.json'))){
    assert.ok(!candidateArg||candidateArg==='--candidate'&&candidateID);
    require('./catalog-a01.cjs').run(snapshot,['--dry-run',...(candidateID?['--candidate',candidateID]:[])]);
    process.exit(0);
  }
  if(batchArg==='--batch'&&batchID==='A02'&&fs.existsSync(path.join(out,'A02_ORIGINAL.json'))){
    assert.ok(!candidateArg||candidateArg==='--candidate'&&candidateID);
    const manifest=read(path.join(out,'READY_BATCHES.json'));
    const batch=manifest.batches.find(row=>row.id===batchID);
    const {records}=read(path.join(out,'REVISED_CANDIDATES.json'));
    const inventory=read(snapshot);
    const dry=batch.candidates.map(entry=>{
      const {candidate}=records.find(row=>row.candidate.candidateId===entry.candidateId);
      assert.equal(candidate.checksum,entry.checksum);
      assert.equal(candidate.revision,entry.version);
      assert.deepEqual(candidate.baseline,entry.expectedBaseline);
      return dryRun({revision:candidate.revision,builds:[candidate]},inventory).candidates[0];
    });
    console.log(JSON.stringify(select({dry},manifest,batchID,candidateID),null,2));
    process.exit(0);
  }
  if(!batchArg&&fs.existsSync(path.join(out,'A01_ORIGINAL.json'))){
    throw new Error('The frozen final review has an A01 successor. Use its scoped verification command.');
  }
  const r=audit(read(snapshot));
  if(batchArg){
    assert.ok(batchArg==='--batch'&&batchID&&(!candidateArg||candidateArg==='--candidate'&&candidateID));
    console.log(JSON.stringify(select(r,read(path.join(out,'READY_BATCHES.json')),batchID,candidateID),null,2));
    process.exit(0);
  }
  const fields=Object.keys(r.matrix[0]);
  fs.writeFileSync(path.join(out,'BUILD_REVIEW_MATRIX.csv'),csv([fields,...r.matrix.map(row=>fields.map(f=>row[f]))]));
  write('SOURCE_PROVENANCE.json',{records:r.provenance});
  write('REVISED_CANDIDATES.json',{revision:second,records:r.revisions});
  write('READY_BATCHES.json',{state:'REVIEW_READY',authorization:'NONE',counts:r.counts,batches:r.batches});
  write('IMPORT_DRY_RUN.json',{mode:'DRY_RUN',writes:0,selection:{batch:'ALL',subsetSupported:true},candidates:r.dry});
  const human=value=>JSON.stringify(value);
  fs.writeFileSync(path.join(out,'BUILD_DIFFS.md'),'# Successor changes\n\nFrozen R1 drafts remain in place. The checksum shown for R2 supersedes the corresponding R1 review target.\n'+
    r.revisions.map(({candidate:d,changes,fields})=>'\n## '+d.candidateId+'\n\n- R1 `'+d.supersedes.checksum+'`\n- R2 `'+d.checksum+'`\n'+changes.map(c=>'- '+c.category+' — '+c.reason).join('\n')+
      '\n\n'+Object.entries(fields).map(([k,v])=>'- `'+k+'` — `'+human(v.before)+'` → `'+human(v.after)+'`').join('\n')+'\n').join(''));
  fs.writeFileSync(path.join(out,'BLOCKED_AND_MISSING_EVIDENCE.md'),'# Evidence holds\n\n## Catalog entries outside the draft set\n\n- Generic Traveler, Manekin and Manekina lack a supported combat context and remain blocked.\n- Mitya is protected. Both approved builds and the existing default remain unchanged.\n\n## Drafts\n\n'+
    r.matrix.filter(row=>row.group!=='A').map(row=>'- **'+row.candidateId+' · '+row.group+'** — '+row.evidence).join('\n')+'\n');
  console.log(JSON.stringify({reviewed:r.matrix.length,counts:r.counts,revised:r.revisions.length,batches:r.batches.length}));
}
module.exports={audit,validate,select};
