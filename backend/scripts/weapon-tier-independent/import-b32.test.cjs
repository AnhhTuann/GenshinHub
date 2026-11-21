'use strict';

/**
 * Phase B3.2 importer tests: the importer must consume DB-backed Admin review
 * decisions, never JSON metadata, and must never create an approval itself.
 * All checks are pure planning/conversion; no ranking rows are written.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  plan, toDecisionRecord, loadDbDecisions, RIGHTS_GROUNDS, GROUP_B_ID,
} = require('./import-approved.cjs');
const { validDecisions, readOnlyState, planCtx } = require('./b3-test-helpers.cjs');
const { verify } = require('./freeze.cjs');

const manifest = verify().manifest;
const batch = manifest.batchSha256;
const now = () => new Date().toISOString();
let state;

test('setup: read-only dev state with 5 migrations and zero ranking rows', async () => {
  state = await readOnlyState();
  assert.equal(state.migrationRows.length, 5);
  const { openReadOnly } = require('../weapon-tier-audit/db.cjs');
  const { prisma } = openReadOnly();
  try {
    assert.equal(await prisma.weaponTierRank.count(), 0);
    assert.equal(await prisma.weaponTierAudit.count(), 0);
  } finally {
    await prisma.$disconnect();
  }
});

/** Build a DB review-queue row from an in-memory decision fixture. */
function dbRow(record, overrides = {}) {
  const basis = {
    ...Object.fromEntries(RIGHTS_GROUNDS.map(g => [g, true])),
    note: 'Verified by Admin after reviewing original explanation and valid evidence.',
    verifiedBy: record.rightsVerifiedBy,
    verifiedAt: now(),
    recordSha256: record.recordSha256,
    batchSha256: batch,
  };
  return {
    candidateId: record.candidateId,
    decision: record.decision,
    decisionReason: record.reason,
    decidedAt: record.decidedAt,
    decidedBy: record.adminActor,
    rightsVerified: record.rightsVerified,
    rightsVerifiedAt: basis.verifiedAt,
    rightsVerifiedBy: record.rightsVerifiedBy,
    rightsBasis: basis,
    tierChangeConfirmed: record.tierReReviewConfirmed === true,
    evidenceAcknowledged: record.evidenceAcknowledged,
    evidenceSupplement: record.evidenceSupplement ?? null,
    approvalChecksum: record.recordSha256,
    batchSha256: batch,
    reviewGroup: record.reviewGroup,
    importEligible: true,
    blockedReason: null,
    version: 12,
    ...overrides,
  };
}

function dbContext(extra = {}) {
  const decisions = validDecisions();
  const queue = decisions.records.map(r => dbRow(r));
  return { decisions, queue, ...extra };
}

test('toDecisionRecord maps only server-persisted fields and ignores injected client actors', () => {
  const { queue } = dbContext();
  const converted = toDecisionRecord({
    ...queue[0],
    adminActor: 'client-supplied-fake-actor',
    actor: 'client-supplied-fake-actor',
    approvedBy: 'client-supplied-fake-actor',
    bypassAuth: true,
  });
  assert.equal(converted.adminActor, queue[0].decidedBy);
  assert.equal(converted.decisionSource, 'database');
  assert.equal(converted.bypassAuth, undefined);
  assert.equal(converted.actor, undefined);
  assert.equal(converted.recordSha256, queue[0].approvalChecksum);
  assert.equal(converted.tierReReviewConfirmed, true);
  assert.equal(converted.tierChangeReviewConfirmed, true);
});

test('authoritative DB queue cannot be read without a real Admin key', async () => {
  await assert.rejects(() => loadDbDecisions('http://127.0.0.1:4000/graphql', ''),
    /DB_DECISIONS_REQUIRE_ADMIN_KEY/);
});

test('all-PENDING DB decisions: 14 blocked, 0 eligible, writeCount 0', () => {
  const queue = validDecisions().records.map(r => dbRow(r, {
    decision: 'PENDING', decidedBy: null, decidedAt: null, decisionReason: null,
  }));
  const result = plan({ records: queue.map(toDecisionRecord) }, {
    ...planCtx(state), dbBacked: true,
  });
  assert.deepEqual(result.fatal, []);
  assert.equal(result.counts.total, 14);
  assert.equal(result.counts.blocked, 14);
  assert.equal(result.counts.eligible, 0);
  assert.equal(result.writeCount, 0);
  assert.equal(result.decisionSource, 'database');
});

test('fully decided DB review queue yields 14 eligible DB-sourced operations', () => {
  const { queue } = dbContext();
  const result = plan({ records: queue.map(toDecisionRecord) }, {
    ...planCtx(state), dbBacked: true,
  });
  assert.deepEqual(result.fatal, []);
  assert.equal(result.counts.eligible, 14);
  assert.equal(result.writeCount, 14);
  assert.ok(result.operations.every(op => op.upsert.variables.input.derivation === 'INDEPENDENT'));
  assert.ok(result.operations.every(op => op.upsert.variables.input.publishRightsVerified === true));
  assert.ok(result.operations.some(op => op.upsert.variables.input.rightsNote.includes('Verified by')));
  assert.ok(result.operations.every(op => !('adminActor' in op.upsert.variables.input)));
});

test('subset DB import: only the selected candidate is eligible, writeCount stays 1', () => {
  const { queue } = dbContext();
  const target = queue[0].candidateId;
  const result = plan({ records: queue.map(toDecisionRecord) }, {
    ...planCtx(state), dbBacked: true, argv: ['--only', target],
  });
  assert.deepEqual(result.fatal, []);
  assert.equal(result.counts.eligible, 1);
  assert.equal(result.writeCount, 1);
  assert.equal(result.counts.skipped, 13);
  assert.equal(result.operations[0].candidateId, target);
});

test('incomplete or checksum-mismatched rights grounds block the DB decision', () => {
  const { queue } = dbContext();
  const incomplete = plan({ records: queue.map((r, i) => i === 0 ? toDecisionRecord({
    ...r, rightsBasis: { ...r.rightsBasis, evidenceValid: false },
  }) : toDecisionRecord(r)) }, { ...planCtx(state), dbBacked: true });
  const blocked0 = incomplete.blocked.find(r => r.candidateId === queue[0].candidateId);
  assert.ok(blocked0, 'record with incomplete rights grounds must be blocked');
  assert.ok(blocked0.reasons.includes('RIGHTS_BASIS_INCOMPLETE'));

  const mismatched = plan({ records: queue.map((r, i) => i === 0 ? toDecisionRecord({
    ...r, rightsBasis: { ...r.rightsBasis, recordSha256: 'f'.repeat(64) },
  }) : toDecisionRecord(r)) }, { ...planCtx(state), dbBacked: true });
  const blocked1 = mismatched.blocked.find(r => r.candidateId === queue[0].candidateId);
  assert.ok(blocked1, 'record with rights checksum mismatch must be blocked');
  assert.ok(blocked1.reasons.includes('RIGHTS_BASIS_CHECKSUM_MISMATCH'));
  assert.equal(incomplete.writeCount, 13);
  assert.equal(mismatched.writeCount, 13);
});

test('Group B stays blocked without the six supplemented evidence fields', () => {
  const { queue } = dbContext();
  const bIndex = queue.findIndex(r => r.candidateId === GROUP_B_ID);
  assert.ok(bIndex >= 0);
  const result = plan({ records: queue.map((r, i) => i === bIndex ? toDecisionRecord({
    ...r, evidenceSupplement: { critRateAssumptions: 'Only one field supplied.' },
  }) : toDecisionRecord(r)) }, { ...planCtx(state), dbBacked: true });
  const blocked = result.blocked.find(r => r.candidateId === GROUP_B_ID);
  assert.ok(blocked);
  assert.ok(blocked.reasons.some(reason => reason.startsWith('GROUP_B_EVIDENCE_INCOMPLETE')));
  assert.equal(result.writeCount, 13);
});

test('REQUEST_CHANGES and REJECT DB decisions are skipped, never written', () => {
  const { queue } = dbContext();
  const result = plan({ records: queue.map((r, i) => i === 0 ? toDecisionRecord({
    ...r, decision: 'REQUEST_CHANGES',
  }) : i === 1 ? toDecisionRecord({ ...r, decision: 'REJECT' }) : toDecisionRecord(r)) }, {
    ...planCtx(state), dbBacked: true,
  });
  assert.equal(result.counts.skipped, 2);
  assert.equal(result.writeCount, 12);
  assert.ok(result.skipped.some(r => r.decision === 'REQUEST_CHANGES'));
  assert.ok(result.skipped.some(r => r.decision === 'REJECT'));
});
