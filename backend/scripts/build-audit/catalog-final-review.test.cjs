'use strict';

const assert=require('node:assert/strict');
const {test}=require('node:test');
const fs=require('node:fs');
const path=require('node:path');
const {audit,select}=require('./catalog-final-review.cjs');
const {digest}=require('./catalog-completion.cjs');
const folder=path.resolve(__dirname,'../../../docs/character-builds/final-review');
const read=name=>JSON.parse(fs.readFileSync(path.join(folder,name),'utf8'));
function r2Manifest(){
  const manifest=read('READY_BATCHES.json');
  // Both R3 reviews intentionally replaced their active batches after this R2 snapshot.
  const archives=new Map(['A01','A02'].map(id=>[id,read(`${id}_ORIGINAL.json`).batch]));
  return {...manifest,batches:manifest.batches.map(row=>archives.get(row.id)??row)};
}
const current=JSON.parse(fs.readFileSync(process.env.BUILD_AUDIT_INVENTORY,'utf8'));

test('all candidates have one group and each selected version binds a checksummed patch',()=>{
  const result=audit(current);
  const manifest=r2Manifest();
  assert.deepEqual(manifest.batches,result.batches);
  assert.deepEqual(manifest.counts,result.counts);
  assert.equal(new Set(result.matrix.map(row=>row.candidateId)).size,result.matrix.length);
  assert.ok(result.provenance.every(row=>row.game.checked&&row.approvedGenshinHub.checked));
  for(const {candidate} of result.revisions){
    const {checksum,...body}=candidate;
    assert.equal(digest(body),checksum);
    assert.notEqual(candidate.supersedes.checksum,checksum);
    assert.equal(candidate.reviewDecision,'NONE_REVIEW_MUST_RESTART');
  }
  assert.ok(manifest.batches.flatMap(row=>row.candidates).every(c=>result.matrix.some(r=>r.candidateId===c.candidateId&&r.group==='A')));
  assert.equal(select(result,manifest,'A01','bennett:1').candidates.length,1);
  assert.throws(()=>select(result,manifest,'A01','mitya:1'),/outside this review-ready batch/);
});

test('a real snapshot drift prevents selection eligibility without moving a frozen batch identity',()=>{
  const drifted=structuredClone(current);
  drifted.characters.find(row=>row.id==='bennett').builds[0].version++;
  const result=audit(drifted);
  const plan=select(result,r2Manifest(),'A01','bennett:1');
  assert.equal(plan.candidates[0].outcome,'BASELINE_CHANGED');
  assert.equal(plan.candidates[0].group,'C');
  assert.equal(plan.writes,0);
  assert.equal(plan.candidates[0].writeEligible,false);
});

test('tampered batch checksums and picks from a different batch are rejected',()=>{
  const result=audit(current);
  const manifest=r2Manifest();
  manifest.batches[0].candidates[0].checksum='0'.repeat(64);
  assert.throws(()=>select(result,manifest,'A01'),/Batch manifest checksum mismatch/);
});
