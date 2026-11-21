'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {make,frozen}=require('./catalog-a01.cjs');
const {digest}=require('./catalog-completion.cjs');
const inventory=JSON.parse(fs.readFileSync(process.env.BUILD_AUDIT_INVENTORY,'utf8'));
const current=require('../../../docs/character-builds/final-review/READY_BATCHES.json');

test('A01 matches the frozen revisions, current baselines and exact manifest checksum',()=>{
  const r=make(inventory,frozen());
  assert.deepEqual(r.batch,current.batches.find(b=>b.id==='A01'));
  assert.equal(r.newRecords.length,3);
  for(const {candidate} of r.newRecords){
    const {checksum,...body}=candidate;
    assert.equal(digest(body),checksum);
    assert.equal(body.reviewDecision,'NONE_REVIEW_MUST_RESTART');
  }
  for(const id of ['bennett','xiangling']){
    const {patch}=r.newRecords.find(x=>x.candidate.characterId===id).candidate;
    for(const field of ['weapons','artifacts','teams'])assert.ok(!(field in patch));
    const data=r.analyses.find(x=>x.candidateId===id+':1');
    assert.equal(data.teams.length,8);
    assert.equal(data.activeRemovals.length,0);
  }
  const fischl=r.newRecords.find(x=>x.candidate.characterId==='fischl').candidate.patch;
  assert.equal(fischl.teams[0].reviewStatus,'EXPERIMENTAL');
  assert.deepEqual(fischl.sands,['ATK%','Elemental Mastery']);
  assert.ok(['15402','15501'].every(id=>fischl.weapons.some(w=>w.weaponId===id)));
});

test('a stale baseline or stale source checksum stops the package',()=>{
  const changed=structuredClone(inventory);
  changed.characters.find(c=>c.id==='bennett').builds[0].version++;
  assert.throws(()=>make(changed,frozen()));
  const content=structuredClone(inventory);
  content.characters.find(c=>c.id==='xiangling').builds[0].teams[0].name='changed';
  assert.throws(()=>make(content,frozen()),/Baseline drift/);
  const manifest=frozen();
  manifest.records[0].candidate.patch.sands=['ATK%'];
  assert.throws(()=>make(inventory,manifest));
});
