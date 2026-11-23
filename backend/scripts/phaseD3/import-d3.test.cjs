'use strict';

/**
 * Phase D3 importer unit tests. All fixtures are in-memory and clearly marked
 * as synthetic test data; no ranking rows are written and no dev DB is used.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  plan, classify, loadD2Bridge, toDecisionRecord, parseSelection, FAKE_ACTORS,
} = require('./import-approved-d3.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const SHEET = path.join(ROOT, 'docs', 'weapon-tier-independent', 'decision-sheet.json');
const d2 = loadD2Bridge().d2;
const sheet = JSON.parse(fs.readFileSync(SHEET, 'utf8'));
const batch = d2.artifactSha256;
const FIXTURE = '[D3-TEST-FIXTURE] ';
const ACTOR = 'admin-d3-unit-principal';
// The authoritative B3.2 service sets importEligible=false for D2 records with
// unresolved evidence. These are the two D2 weapon records still carrying
// evidence blockers in the snapshot.
const EVIDENCE_BLOCKED = new Set([
  'independent-12401-SUB_DPS-R1',
  'independent-13501-MAIN_DPS-R1',
]);

function dbRow(record, overrides = {}) {
  const revised = d2.records.find(r => r.candidateId === record.candidateId);
  const basis = {
    independentRanking: true, originalExplanation: true, noGenshinBuildsEditorialCopy: true,
    gameFactsAttributionCorrect: true, evidenceValid: true,
    note: FIXTURE + 'all five rights grounds verified on the D2 revised dossier.',
    verifiedBy: ACTOR, verifiedAt: new Date().toISOString(),
    recordSha256: revised.newChecksum, batchSha256: batch,
  };
  return {
    candidateId: `${record.candidateId}::D2`,
    weaponId: revised.weaponId,
    decision: 'APPROVE',
    decisionReason: FIXTURE + 'explicit admin decision after inspecting the revised dossier.',
    decidedAt: new Date().toISOString(),
    decidedBy: ACTOR,
    rightsVerified: true,
    rightsVerifiedBy: ACTOR,
    rightsBasis: basis,
    tierChangeConfirmed: revised.tierChanged === true,
    evidenceAcknowledged: true,
    evidenceSupplement: null,
    approvalChecksum: revised.newChecksum,
    batchSha256: batch,
    reviewGroup: EVIDENCE_BLOCKED.has(record.candidateId) ? 'B' : 'A',
    // Synthetic fixture: mirror the authoritative service, which leaves these
    // two D2 records ineligible until their evidence is resolved.
    importEligible: !EVIDENCE_BLOCKED.has(record.candidateId),
    blockedReason: EVIDENCE_BLOCKED.has(record.candidateId) ? 'D2_MISSING_EVIDENCE_FIXTURE' : null,
    version: 12,
    ...overrides,
  };
}

function decisions(overrides = {}) {
  // Mirror the real flow: the authoritative queue rows pass through
  // toDecisionRecord, which normalises the ::D2 version identity.
  return {
    records: d2.records
      .map(r => toDecisionRecord(dbRow(r, overrides[r.candidateId] ?? {}))),
  };
}

function ctx(extra = {}) {
  return {
    sheet,
    dbState: { ranks: 0, audits: 0 },
    migrationRows: [
      { migration_name: '20261120000000_legacy_baseline', checksum: require('../weapon-tier-independent/freeze.cjs').sha(fs.readFileSync(path.join(ROOT, 'backend/prisma/migrations/20261120000000_legacy_baseline/migration.sql'))) },
      { migration_name: '20261120145000_add_character_builds', checksum: require('../weapon-tier-independent/freeze.cjs').sha(fs.readFileSync(path.join(ROOT, 'backend/prisma/migrations/20261120145000_add_character_builds/migration.sql'))) },
      { migration_name: '20261120151000_add_character_tier_rankings', checksum: require('../weapon-tier-independent/freeze.cjs').sha(fs.readFileSync(path.join(ROOT, 'backend/prisma/migrations/20261120151000_add_character_tier_rankings/migration.sql'))) },
      { migration_name: '20261120153500_add_weapon_tier_rankings', checksum: require('../weapon-tier-independent/freeze.cjs').sha(fs.readFileSync(path.join(ROOT, 'backend/prisma/migrations/20261120153500_add_weapon_tier_rankings/migration.sql'))) },
      { migration_name: '20261120160000_add_weapon_tier_review_workflow', checksum: require('../weapon-tier-independent/freeze.cjs').sha(fs.readFileSync(path.join(ROOT, 'backend/prisma/migrations/20261120160000_add_weapon_tier_review_workflow/migration.sql'))) },
      { migration_name: '20261121100452_add_database_backed_auth', checksum: require('../weapon-tier-independent/freeze.cjs').sha(fs.readFileSync(path.join(ROOT, 'backend/prisma/migrations/20261121100452_add_database_backed_auth/migration.sql'))) },
      { migration_name: '20261121141000_add_maintenance_build_status', checksum: require('../weapon-tier-independent/freeze.cjs').sha(fs.readFileSync(path.join(ROOT, 'backend/prisma/migrations/20261121141000_add_maintenance_build_status/migration.sql'))) },
    ],
    weapons: sheet.records.map(r => ({ id: String(r.weaponId), type: r.dbWeaponType, tier: null, role: null })),
    ...extra,
  };
}

test('D3: a decided D2_REVISED queue yields 12 eligible, D2-bound operations', () => {
  const result = plan(decisions(), ctx());
  assert.deepEqual(result.fatal, []);
  assert.equal(result.counts.total, 14);
  // 12 review-ready records; the 2 D2 evidence-blocked records stay ineligible.
  assert.equal(result.counts.eligible, 12);
  assert.equal(result.counts.blocked, 2);
  assert.equal(result.counts.writeCount, 12);
  assert.ok(result.operations.every(op => op.publish.variables.recordSha256
    === d2.records.find(r => r.candidateId === op.candidateId).newChecksum));
  assert.ok(result.operations.every(op => op.publish.query.includes('adminPublishWeaponTierReview') &&
    op.publish.variables.candidateId === `${op.candidateId}::D2` &&
    op.publish.variables.batchSha256 === d2.artifactSha256));
});

test('D3: FROZEN-bound decisions are superseded and never importable', () => {
  const freeze = require('../weapon-tier-independent/freeze.cjs').verify();
  const frozen = freeze.manifest.records.find(r => r.candidateId === 'independent-11401-SUPPORT-R1');
  const raw = decisions();
  // Simulate a stale persisted row still bound to the superseded FROZEN
  // checksum/content instead of the D2 revision.
  Object.assign(raw.records[0], {
    sourceVersion: 'FROZEN', recordSha256: frozen.sha256, importEligible: false,
  });
  const result = plan(raw, ctx());
  assert.ok(result.changed.some(r => r.candidateId === 'independent-11401-SUPPORT-R1'
    && r.reasons.includes('SUPERSEDED_VERSION')));
  assert.equal(result.counts.eligible, 11);
  assert.equal(result.operations.some(op => op.candidateId === 'independent-11401-SUPPORT-R1'), false);
  assert.ok(result.operations.every(op => op.publish.variables.recordSha256
    !== frozen.sha256));
});

test('D3: PENDING / REQUEST_CHANGES / REJECT never become eligible', () => {
  const raw = decisions({
    'independent-11403-SUB_DPS-R5': { decision: 'PENDING', importEligible: false },
    'independent-11418-SUPPORT-R1': { decision: 'REQUEST_CHANGES', importEligible: false },
    'independent-11512-MAIN_DPS-R1': { decision: 'REJECT', importEligible: false },
  });
  const result = plan(raw, ctx());
  assert.equal(result.counts.eligible, 9);
  assert.ok(result.blocked.some(r => r.reasons.includes('ADMIN_DECISION_PENDING')));
  assert.ok(result.skipped.some(r => r.reasons.includes('DECISION_REQUEST_CHANGES')));
  assert.ok(result.skipped.some(r => r.reasons.includes('DECISION_REJECT')));
});

test('D3: a stale APPROVE with importEligible=false is blocked', () => {
  const raw = decisions({ 'independent-11401-SUPPORT-R1': { importEligible: false } });
  const result = plan(raw, ctx());
  assert.equal(result.counts.eligible, 11);
  const blocked = result.blocked.find(r => r.candidateId === 'independent-11401-SUPPORT-R1');
  assert.ok(blocked.reasons.includes('REVIEW_NOT_IMPORT_ELIGIBLE'));
});

test('D3: missing rights, evidence acknowledgement and tier confirmation all block', () => {
  const raw = decisions({
    'independent-11401-SUPPORT-R1': { rightsVerified: false, importEligible: false },
    'independent-11403-SUB_DPS-R5': { evidenceAcknowledged: false, importEligible: false },
    'independent-14302-SUPPORT-R5': { tierChangeConfirmed: false, importEligible: false },
  });
  const result = plan(raw, ctx());
  const byId = new Map([...result.blocked, ...result.changed].map(r => [r.candidateId, r]));
  assert.ok(byId.get('independent-11401-SUPPORT-R1').reasons.includes('RIGHTS_NOT_VERIFIED_BY_ADMIN'));
  assert.ok(byId.get('independent-11403-SUB_DPS-R5').reasons.includes('GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED'));
  assert.ok(byId.get('independent-14302-SUPPORT-R5').reasons.includes('TIER_RE_REVIEW_NOT_CONFIRMED'));
});

test('D3: SOURCE_DERIVED revised content is excluded even with an APPROVE row', () => {
  const bridge = loadD2Bridge();
  const revisedById = new Map(bridge.revisedById);
  const id = 'independent-14402-SUB_DPS-R1';
  const sourceDerived = {
    ...revisedById.get(id),
    rightsStatus: { ...revisedById.get(id).rightsStatus, sourceDerivedResearchUsedAsRanking: true },
  };
  revisedById.set(id, sourceDerived);
  const record = toDecisionRecord(dbRow({ candidateId: id }));
  const result = classify(record, {
    selection: { mode: 'all', by: 'candidateId', values: [] },
    revisedById,
    weapons: new Map(),
    dbWeaponType: new Map(),
    batchSha256: batch,
  });
  assert.equal(result.status, 'blocked');
  assert.ok(result.reasons.includes('SOURCE_DERIVED_EXCLUDED'));
});

test('D3: fake actors and client bypass attempts fail closed', () => {
  for (const actor of FAKE_ACTORS) {
    const raw = decisions({ 'independent-11401-SUPPORT-R1': { decidedBy: actor, importEligible: false } });
    const result = plan(raw, ctx());
    assert.equal(result.counts.eligible, 11, `fake actor ${actor} must not import`);
  }
  // A client-supplied bypass flag on the decisions container itself is fatal.
  const result = plan({ ...decisions(), bypassAuth: true }, ctx());
  assert.ok(result.fatal.some(i => i.includes('AUTH_BYPASS_ATTEMPT')));
  assert.equal(result.operations.length, 0);
});

test('D3: D2 evidence blockers (Raiden / Staff / Favonius) stay ineligible', () => {
  const raw = decisions({
    'independent-13501-MAIN_DPS-R1': { importEligible: false },
    'independent-12401-SUB_DPS-R1': { importEligible: false },
  });
  const result = plan(raw, ctx());
  assert.equal(result.counts.eligible, 12);
  for (const id of ['independent-13501-MAIN_DPS-R1', 'independent-12401-SUB_DPS-R1']) {
    assert.ok(result.blocked.some(r => r.candidateId === id && r.reasons.includes('REVIEW_NOT_IMPORT_ELIGIBLE')));
  }
});

test('D3: partial selection writes only the selected candidate', () => {
  const result = plan(decisions(), ctx({ selection: { mode: 'explicit', by: 'candidateId', values: ['independent-11401-SUPPORT-R1'] } }));
  assert.equal(result.counts.eligible, 1);
  assert.equal(result.writeCount, 1);
  assert.equal(result.operations[0].candidateId, 'independent-11401-SUPPORT-R1');
});

test('D3: parseSelection keeps prior CLI contract', () => {
  assert.deepEqual(parseSelection([]), { mode: 'all', by: 'candidateId', values: [] });
  assert.deepEqual(parseSelection(['--weapon-ids', '11401,14302']), {
    mode: 'explicit', by: 'weaponId', values: ['11401', '14302'],
  });
});

test('D3: toDecisionRecord ignores injected client actors', () => {
  const row = dbRow({ candidateId: 'independent-11401-SUPPORT-R1' });
  const mapped = toDecisionRecord({ ...row, actor: 'client-fake', approvedBy: 'client-fake', bypassAuth: true });
  assert.equal(mapped.adminActor, ACTOR);
  assert.equal(mapped.sourceVersion, 'D2_REVISED');
  assert.equal(Object.hasOwn(mapped, 'bypassAuth'), false);
  assert.equal(Object.hasOwn(mapped, 'actor'), false);
});
