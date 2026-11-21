'use strict';
const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const { digest, generate } = require('./catalog-completion.cjs');
const { dryRun } = require('./catalog-dry-run.cjs');

const root = path.resolve(__dirname,'../../../docs/character-builds');
const read = name => JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));

test('all proposals are traceable to their catalog owner and have unique checksums', () => {
  const { characters } = read('coverage.json');
  const { builds, revision } = read('proposed-builds.json');
  const diff = read('character-diffs.json');
  const inventory = new Map(characters.map(row => [row.id,row]));
  assert.equal(inventory.size, characters.length);
  assert.equal(diff.characters.length, characters.length);
  assert.equal(new Set(builds.map(b=>b.checksum)).size, builds.length);
  assert.ok(!builds.some(b=>b.characterId==='mitya'));
  for (const {checksum,...draft} of builds) {
    const owner = inventory.get(draft.characterId);
    assert.equal(draft.revision,revision);
    assert.equal(digest(draft),checksum);
    assert.equal(draft.stage,'PENDING_ADMIN_REVIEW');
    assert.equal(draft.defaultPolicy,'PRESERVE');
    assert.equal(owner.mechanics.talentVersion,draft.provenance.mechanics.talentVersion);
    assert.ok(owner.candidates.includes(draft.candidateId));
    assert.ok(draft.patch.weapons.length > 0 && draft.patch.artifacts.length > 0);
    for (const team of draft.patch.teams ?? []) {
      const ids = team.members.map(member=>member.characterId);
      assert.equal(new Set(ids).size,4);
      assert.ok(ids.includes(owner.id) && ids.every(id=>inventory.has(id)));
      assert.equal(team.reviewStatus,'EXPERIMENTAL');
    }
  }
});

test('dry run selects a build, protects approved and changed baselines, and rejects tampering', () => {
  const draft = read('proposed-builds.json').builds.find(b=>b.baseline);
  const {checksum,...body}=draft;
  const owner = { id:draft.characterId, builds:[] };
  const {candidates} = dryRun({revision:draft.revision,builds:[draft]},{characters:[owner]},{build:draft.candidateId});
  assert.equal(candidates[0].outcome,'BASELINE_CHANGED');
  assert.equal(candidates[0].writeEligible,false);
  assert.throws(()=>dryRun({revision:draft.revision,builds:[{...draft,checksum:'0'.repeat(64)}]},{characters:[owner]}), /checksum mismatch/);
  const approved = { id:draft.baseline.buildId, version:draft.baseline.version, reviewStatus:'APPROVED', audits:[], isDefault:true };
  owner.builds.push(approved);
  const same = {...body,baseline:{...body.baseline,checksum:digest(approved)}};
  const result = dryRun({revision:draft.revision,builds:[{...same,checksum:digest(same)}]},{characters:[owner]});
  assert.equal(result.candidates[0].outcome,'APPROVED_BUILD_PROTECTED');
  assert.equal(result.writes,0);
  assert.equal(result.candidates[0].existingDefault,approved.id);
  approved.version++;
  approved.audits.push({action:'STAGED',version:approved.version});
  const afterStage = dryRun({revision:draft.revision,builds:[{...same,checksum:digest(same)}]},{
    characters:[owner],pendingPatches:{[approved.id]:{version:approved.version,changes:draft.patch}},
  });
  assert.equal(afterStage.candidates[0].outcome,'ALREADY_STAGED');
  assert.equal(afterStage.candidates[0].writeEligible,false);
});

test('committed proposals regenerate from the catalog with mechanical and equipment validation', {
  skip: process.env.BUILD_AUDIT_INVENTORY ? false : 'Requires the read-only catalog snapshot',
}, () => {
  const snapshot = JSON.parse(fs.readFileSync(process.env.BUILD_AUDIT_INVENTORY,'utf8'));
  const refs = JSON.parse(fs.readFileSync(process.env.BUILD_AUDIT_COMPARISON,'utf8'));
  const evidence = fs.readFileSync(path.join(root,'recommendation-evidence.tsv'),'utf8');
  const result = generate(snapshot,refs,evidence);
  assert.deepEqual(result.proposals,read('proposed-builds.json').builds);
  assert.equal(result.coverage.length,snapshot.characters.length);
});
