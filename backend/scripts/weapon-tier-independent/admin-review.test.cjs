'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { buildSheet, buildReport } = require('./build-admin-review.cjs');
const { verify } = require('./freeze.cjs');
const { ROOT } = require('./b3-test-helpers.cjs');

const SHEET = path.join(ROOT, 'docs', 'weapon-tier-independent', 'admin-review-sheet.json');
const DRY_RUN = path.join(ROOT, 'docs', 'weapon-tier-independent', 'partial-import-dry-run.json');
const REPORT = path.join(ROOT, 'docs', 'weapon-tier-audit', 'PHASE_B3_1_FINAL_ADMIN_REVIEW.md');
const sheet = buildSheet();

test('sheet is derived from a verified freeze and binds every checksum', () => {
  const freeze = verify();
  assert.equal(freeze.ok, true);
  assert.equal(sheet.freeze.verified, true);
  assert.equal(sheet.freeze.batchSha256, freeze.manifest.batchSha256);
  assert.equal(sheet.freeze.perRecordChecksums.length, 14);
  assert.ok(sheet.freeze.perRecordChecksums.every(r => /^[a-f0-9]{64}$/.test(r.sha256)));
});

test('Group A has exactly 13 complete review records', () => {
  assert.equal(sheet.groups.A.count, 13);
  assert.equal(sheet.groups.A.records.length, 13);
  for (const r of sheet.groups.A.records) {
    assert.ok(r.weaponId && r.role && r.refinement && r.proposedTier);
    assert.ok(r.explanationVi.length > 40);
    assert.ok(r.gameplayAssumptions.length > 0);
    assert.ok(r.exactGameFacts.length > 0);
    assert.ok(r.evidence.rubric && r.evidence.primaryEvidence.length > 0);
    assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(r.confidence));
    assert.equal(r.rightsVerification.publishRightsVerified, false);
    assert.equal(r.rightsVerification.requiredBeforeImport, true);
    assert.ok(/^[a-f0-9]{64}$/.test(r.approvalChecksum));
    assert.deepEqual(r.allowedDecisions, ['APPROVE', 'REQUEST_CHANGES', 'REJECT']);
    assert.equal(r.selectedDecision, 'PENDING');
  }
});

test('Favonius Greatsword is retained in Group B with all six evidence gaps', () => {
  assert.equal(sheet.groups.B.count, 1);
  const b = sheet.groups.B.records[0];
  assert.equal(b.weaponId, '12401');
  assert.equal(b.candidateId, 'independent-12401-SUB_DPS-R1');
  assert.equal(b.blockedDecision, 'REQUEST_CHANGES');
  assert.equal(b.draftRecommendation, 'NEEDS_MORE_EVIDENCE');
  assert.equal(b.confidence, 'LOW');
  assert.equal(b.requiredEvidence.length, 6);
  assert.deepEqual(b.missingEvidence.map(x => x.toLowerCase()).sort(), [
    'crit rate assumptions', 'energy generation assumptions', 'field-time requirements',
    'passive proc conditions', 'rotation', 'rubric justification',
  ]);
  assert.equal(b.importableNow, undefined);
  assert.equal(sheet.groups.B.importableNow, 0);
});

test('both tier changes require a separate, currently unconfirmed Admin review', () => {
  assert.equal(sheet.tierChangeReviews.length, 2);
  const byId = new Map(sheet.tierChangeReviews.map(t => [t.weaponId, t]));
  const ttds = byId.get('14302');
  assert.equal(ttds.change, 'SS → S');
  assert.equal(ttds.role, 'SUPPORT');
  assert.equal(ttds.refinement, 'R5');
  assert.equal(ttds.separateConfirmationRequired, true);
  assert.equal(ttds.confirmed, false);
  assert.match(ttds.reason, /48% ATK/);
  const widsith = byId.get('14402');
  assert.equal(widsith.change, 'S → A');
  assert.equal(widsith.role, 'SUB_DPS');
  assert.equal(widsith.refinement, 'R1');
  assert.equal(widsith.separateConfirmationRequired, true);
  assert.equal(widsith.confirmed, false);
  assert.match(widsith.gameplayConditions.join(' '), /30s cooldown/i);
});

test('rights dossier keeps every flag false and rejects source-derived data', () => {
  assert.equal(sheet.rightsDossier.allPublishRightsVerifiedFalse, true);
  assert.equal(sheet.rightsDossier.independentRankings, true);
  assert.equal(sheet.rightsDossier.originalExplanations, true);
  assert.equal(sheet.rightsDossier.noGenshinBuildsEditorialCopy, true);
  assert.equal(sheet.rightsDossier.gameFactsAttributed, true);
  assert.equal(sheet.rightsDossier.sourceDerivedResearchUsedAsRanking, false);
  assert.ok(sheet.rightsDossier.records.every(r => r.publishRightsVerified === false));
});

test('all 14 decisions are still missing and authentication is server-side', () => {
  assert.equal(sheet.missingDecisions.length, 14);
  assert.ok(sheet.missingDecisions.every(m => m.decision === 'PENDING'));
  assert.equal(sheet.authenticationPolicy.jsonActorIsEvidence, false);
  assert.equal(sheet.authenticationPolicy.permissionCheck, true);
  assert.equal(sheet.authenticationPolicy.auditLog, true);
  assert.equal(sheet.authenticationPolicy.rejectChangedContent, true);
  assert.equal(sheet.importEligibility.currentlyImportable, 0);
});

test('generated report and dry-run artifacts exist and show all five counts', () => {
  assert.ok(fs.existsSync(SHEET));
  assert.ok(fs.existsSync(REPORT));
  assert.ok(fs.existsSync(DRY_RUN));
  const dry = JSON.parse(fs.readFileSync(DRY_RUN, 'utf8'));
  assert.equal(dry.mode, 'DRY_RUN');
  assert.equal(dry.counts.total, 14);
  assert.equal(dry.counts.eligible, 0);
  assert.equal(dry.counts.blocked, 14);
  assert.equal(dry.counts.skipped, 0);
  assert.equal(dry.counts.changed, 0);
  assert.equal(dry.counts.writeCount, 0);
  assert.ok(dry.adminAuthorization.jsonActorIsEvidence === false);
  const report = fs.readFileSync(REPORT, 'utf8');
  for (const heading of [
    '## 1. Final Admin Review Sheet',
    '## 2. 13 candidates eligible for Admin review (Group A)',
    '## 3. Favonius Greatsword 12401 — blocked (Group B)',
    '## 4. Two changed tiers — separate Admin confirmation',
    '## 5. Missing per-record decisions',
    '## 6. Publish-rights verification status',
    '## 7. Safe partial-import dry-run',
    '## 8. Test results',
    '## 9. Files changed',
  ]) assert.ok(report.includes(heading), heading);
});

test('buildReport is deterministic for the same sheet', () => {
  assert.equal(buildReport(sheet), buildReport(sheet));
});
