'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { ALLOWED } = require('./build-approval.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'weapon-tier-independent', 'approval-package.json'), 'utf8'));
const candidates = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'weapon-tier-independent', 'independent-candidates.json'), 'utf8'));
const byId = new Map(pkg.rows.map(r => [r.candidateId, r]));

test('final approval package has exactly 14 reviewed candidates with valid statuses', () => {
  assert.equal(pkg.phase, 'B2.6');
  assert.equal(pkg.rows.length, 14);
  assert.equal(pkg.validation.ok, true);
  assert.deepEqual(pkg.validation.issues, []);
  assert.equal(pkg.dbStateAtReview.ranks, 0);
  assert.equal(pkg.dbStateAtReview.audits, 0);
  for (const row of pkg.rows) {
    assert.ok(ALLOWED.has(row.recommendation));
    assert.ok(['READY_FOR_ADMIN_REVIEW', 'NEEDS_MORE_EVIDENCE'].includes(row.recommendation));
    assert.equal(row.reviewStatus, 'PENDING_REVIEW');
    assert.equal(row.publishRightsVerified, false);
    assert.equal(row.derivation, 'INDEPENDENT');
  }
  assert.deepEqual(pkg.counts.byRecommendation, { READY_FOR_ADMIN_REVIEW: 13, NEEDS_MORE_EVIDENCE: 1 });
  assert.equal(pkg.counts.tierChanges, 2);
  assert.equal(pkg.counts.adminReviewRequired, 3);
  assert.equal(pkg.counts.publishRightsVerified, 0);
});

test('approval package does not mutate the candidate artifact', () => {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, 'docs', 'weapon-tier-independent', 'independent-candidates.json'))).digest('hex');
  assert.equal(pkg.candidateArtifactSha256, hash);
  assert.equal(candidates.records.length, 14);
  assert.ok(candidates.records.every(r => r.reviewStatus === 'PENDING_REVIEW'));
  assert.ok(candidates.records.every(r => r.publishRightsVerified === false));
  assert.ok(candidates.records.every(r => r.approvedBy === null && r.reviewedAt === null));
  for (const record of candidates.records) {
    const row = byId.get(record.id);
    assert.equal(row.proposedTier, record.tier);
    assert.equal(row.oldTier, record.oldTier);
    assert.equal(row.tierChanged, record.tierChanged);
    assert.equal(row.refinement, record.refinementContext);
    assert.equal(row.gameVersion, record.gameVersion);
    assert.equal(row.confidence, record.confidence);
    assert.equal(row.explanationVi, record.explanationVi);
  }
});

test('refinement is never silently changed and R1/R5 rationale is preserved', () => {
  const r1 = candidates.records.filter(r => r.refinementContext === 'R1');
  const r5 = candidates.records.filter(r => r.refinementContext === 'R5');
  assert.equal(r1.length, 11);
  assert.equal(r5.length, 3);
  assert.deepEqual(r5.map(r => r.weaponId).sort(), ['11403', '14302', '14406']);
  for (const record of r5) {
    assert.match(record.evidence.assumptions.join(' '), /R5|maximum|craftable|tinh luyện/i);
    assert.equal(byId.get(record.id).refinement, 'R5');
  }
  for (const row of pkg.rows) {
    if (row.recommendation === 'READY_FOR_ADMIN_REVIEW') assert.deepEqual(row.proposedDiff, []);
    else assert.ok(row.proposedDiff.length > 0, `${row.candidateId} needs a concrete diff`);
    assert.ok(!/thay.*R1.*bằng.*R5|change R1 to R5/i.test(row.refinementCheck));
  }
});

test('tier changes keep OLD_TIER, PROPOSED_TIER, reason, evidence and admin re-review flag', () => {
  const changed = pkg.rows.filter(r => r.tierChanged).sort((a, b) => a.weaponId.localeCompare(b.weaponId));
  assert.deepEqual(changed.map(r => `${r.weaponId}:${r.oldTier}->${r.proposedTier}`), ['14302:SS->S', '14402:S->A']);
  for (const row of changed) {
    assert.equal(row.adminReviewRequired, true);
    assert.ok(row.tierReason.length > 40, `${row.candidateId} has no tier reason`);
    assert.ok(row.exactFacts.length > 0, `${row.candidateId} has no exact facts`);
    assert.match(row.adminActionRequired, /re-review|Mandatory/i);
    assert.match(row.tierReason, /OLD_TIER|PROPOSED_TIER/);
  }
  const ttds = byId.get('independent-14302-SUPPORT-R5');
  const widsith = byId.get('independent-14402-SUB_DPS-R1');
  assert.match(ttds.assessment, /Universality| universality /i);
  assert.match(ttds.gameFact, /48% ATK/i);
  assert.match(widsith.assessment, /best-case assumptions/i);
  assert.match(widsith.gameFact, /1\/3|random/i);
  for (const row of pkg.rows.filter(r => !r.tierChanged && r.recommendation === 'READY_FOR_ADMIN_REVIEW')) {
    assert.equal(row.oldTier, row.proposedTier);
    assert.equal(row.adminReviewRequired, false);
  }
});

test('Phase B3 re-reviews are reflected in the final package', () => {
  const favGs = byId.get('independent-12401-SUB_DPS-R1');
  assert.equal(favGs.recommendation, 'NEEDS_MORE_EVIDENCE');
  assert.equal(favGs.confidence, 'LOW');
  assert.equal(favGs.adminReviewRequired, true);
  assert.match(favGs.assessment, /READY status alone is not a reason to approve/i);
  assert.ok(favGs.proposedDiff.some(d => /rotation/i.test(d)));
  assert.ok(favGs.proposedDiff.some(d => /CRIT Rate/i.test(d)));
  assert.match(favGs.adminActionRequired, /REQUEST_CHANGES/i);

  const ttds = byId.get('independent-14302-SUPPORT-R5');
  assert.equal(ttds.proposedTier, 'S');
  assert.equal(ttds.oldTier, 'SS');
  assert.match(ttds.gameFact, /48% ATK/i);
  assert.match(ttds.gameplayConditions.join(' '), /10s duration \/ 20s cooldown/i);
  assert.match(ttds.gameplayConditions.join(' '), /scale ATK/i);

  const widsith = byId.get('independent-14402-SUB_DPS-R1');
  assert.equal(widsith.proposedTier, 'A');
  assert.match(widsith.explanationVi, /không nên xem là vô dụng/);
  assert.match(widsith.explanationVi, /burst trùng với 10s/);
  assert.match(widsith.gameplayConditions.join(' '), /30s cooldown/i);
  assert.match(widsith.assessment, /not treated as useless/i);

  const homa = byId.get('independent-13501-MAIN_DPS-R1');
  assert.equal(homa.proposedTier, 'SS');
  assert.match(homa.explanationVi, /không suy từ trường hợp mạnh nhất/);
  assert.match(homa.assessment, /not inferred from a few standout users/i);
  assert.match(homa.limitations.join(' '), /DEF\/HP/i);

  const amber = byId.get('independent-14406-SUPPORT-R5');
  assert.equal(amber.proposedTier, 'A');
  assert.match(amber.gameFact, /No party-wide Energy/i);
  const aqua = byId.get('independent-15508-MAIN_DPS-R1');
  assert.equal(aqua.proposedTier, 'S');
  assert.match(aqua.gameFact, /opponents are nearby/i);
});

test('corrected Prototype Amber and Aqua Simulacra facts are final, not merely flagged', () => {
  const aqua = byId.get('independent-15508-MAIN_DPS-R1');
  const amber = byId.get('independent-14406-SUPPORT-R5');
  assert.equal(aqua.recommendation, 'READY_FOR_ADMIN_REVIEW');
  assert.equal(amber.recommendation, 'READY_FOR_ADMIN_REVIEW');

  assert.match(aqua.gameFact, /opponents are nearby/);
  assert.match(aqua.explanationVi, /khi có kẻ địch ở gần/);
  assert.doesNotMatch(aqua.explanationVi, /không có địch|không bị bao vây|not surrounded/i);
  assert.equal(aqua.tierChanged, false);
  assert.equal(aqua.proposedTier, 'S');
  assert.match(aqua.adminActionRequired, /proximity condition/i);

  assert.match(amber.gameFact, /6 Energy every 2s for 6s = 18 Energy/i);
  assert.match(amber.gameFact, /6% of each member's own Max HP/i);
  assert.match(amber.explanationVi, /6 Năng Lượng mỗi 2s/);
  assert.match(amber.explanationVi, /6% Max HP của chính họ/);
  assert.doesNotMatch(amber.explanationVi, /hồi năng lượng.*toàn đội|energy cho cả đội/i);
  assert.equal(amber.tierChanged, false);
  assert.equal(amber.proposedTier, 'A');
});

test('every final row carries explanation, facts, conditions, sensitivity and limitations', () => {
  for (const row of pkg.rows) {
    assert.ok(row.explanationVi.length > 100, `${row.candidateId} explanation too short`);
    assert.ok(row.exactFacts.length > 0, `${row.candidateId} has no exact facts`);
    assert.ok(row.gameplayConditions.length > 0, `${row.candidateId} has no gameplay conditions`);
    assert.ok(row.sensitivity.length > 20, `${row.candidateId} has no sensitivity analysis`);
    assert.ok(row.limitations.length > 0, `${row.candidateId} has no known limitations`);
    assert.ok(row.adminActionRequired.length > 20, `${row.candidateId} has no required admin decision`);
    assert.ok(row.tierReason.length > 20, `${row.candidateId} has no reason for tier`);
    assert.ok(row.evidence.includes(`genshin-db://weapons/${row.weaponId}`));
    assert.ok(row.evidence.some(e => e.includes(`game-facts.json#${row.weaponId}`)));
  }
});

test('no source-derived or relabelled research record appears in the package', () => {
  const research = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'weapon-tier-audit', 'snapshot-weapon-tier.draft.json'), 'utf8'));
  const researchTexts = new Set(research.records.map(r => r.explanationVi).filter(Boolean));
  for (const row of pkg.rows) {
    const candidate = candidates.records.find(r => r.id === row.candidateId);
    assert.equal(researchTexts.has(candidate.explanationVi), false);
    assert.equal(row.derivation, 'INDEPENDENT');
    assert.ok(!/genshin-builds|source.?derived/i.test(row.gameFact + row.assessment + candidate.explanationVi));
  }
});

test('rights are never auto-verified and every candidate needs an admin decision', () => {
  assert.ok(pkg.rows.every(r => r.publishRightsVerified === false));
  assert.ok(pkg.rows.every(r => /flag stays false/i.test(r.rightsAssessment)));
  assert.ok(pkg.rows.every(r => r.adminActionRequired.length > 0));
  assert.ok(pkg.rows.every(r => /Verify rights|verify rights/i.test(r.adminActionRequired)));
});
