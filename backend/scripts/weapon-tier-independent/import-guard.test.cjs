'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  plan, parseSelection, checkMigrations, buildOperations, isRealActor, FAKE_ACTORS,
} = require('./import-approved.cjs');
const { verify } = require('./freeze.cjs');
const { validDecisions, readOnlyState, planCtx, SHEET, DECISIONS, load, now } = require('./b3-test-helpers.cjs');

let state;
test.before(async () => { state = await readOnlyState(); });

const sheet = load(SHEET);
// All-PENDING template: every decision is still PENDING, so every record must
// be excluded and no import operation may be planned.
const pending = load(DECISIONS);
const frozenById = new Map(verify().manifest.records.map(r => [r.candidateId, r]));

test('fake and generic actors are rejected', () => {
  for (const actor of FAKE_ACTORS) assert.equal(isRealActor(actor), false);
  assert.equal(isRealActor(null), false);
  assert.equal(isRealActor('ab'), false);
  assert.equal(isRealActor('  admin-key  '), false);
  assert.equal(isRealActor('Nguyen Van A'), true);
});

test('parseSelection supports all, candidate ids and weapon ids', () => {
  assert.deepEqual(parseSelection([]), { mode: 'all', by: 'candidateId', values: [] });
  assert.deepEqual(parseSelection(['--only', 'independent-11401-SUPPORT-R1,independent-14302-SUPPORT-R5']), {
    mode: 'explicit', by: 'candidateId', values: ['independent-11401-SUPPORT-R1', 'independent-14302-SUPPORT-R5'],
  });
  assert.deepEqual(parseSelection(['--weapon-ids', '11401,14302']), {
    mode: 'explicit', by: 'weaponId', values: ['11401', '14302'],
  });
  assert.throws(() => parseSelection(['--only']), /MISSING_SELECTION_VALUE/);
});

test('all-PENDING decisions: 14 blocked, 0 eligible, writeCount 0', () => {
  const r = plan(pending, planCtx(state));
  assert.equal(r.ok, false);
  assert.equal(r.counts.total, 14);
  assert.equal(r.counts.eligible, 0);
  assert.equal(r.counts.blocked, 14);
  assert.equal(r.counts.skipped, 0);
  assert.equal(r.counts.changed, 0);
  assert.equal(r.writeCount, 0);
  assert.equal(r.operations.length, 0);
  assert.ok(r.fatal.includes('FAKE_OR_MISSING_DECIDED_BY'));
  assert.ok(r.fatal.includes('MISSING_DECIDED_AT'));
  assert.ok(r.blocked.some(b => b.reasons.includes('ADMIN_DECISION_PENDING')));
});

test('a fully decided batch yields 14 eligible operations with no fatal issues', () => {
  const r = plan(validDecisions(), planCtx(state));
  assert.deepEqual(r.fatal, []);
  assert.equal(r.ok, true);
  assert.equal(r.counts.eligible, 14);
  assert.equal(r.counts.blocked, 0);
  assert.equal(r.writeCount, 14);
  assert.equal(r.operations.length, 14);
  assert.ok(r.operations.every(op => op.upsert.variables.input.publishRightsVerified === true));
});

test('partial import: selecting one candidate writes one row and blocks the rest', () => {
  const decisions = validDecisions();
  const r = plan(decisions, planCtx(state, {
    selection: { mode: 'explicit', by: 'candidateId', values: ['independent-11401-SUPPORT-R1'] },
  }));
  assert.deepEqual(r.fatal, []);
  assert.equal(r.counts.eligible, 1);
  assert.equal(r.writeCount, 1);
  assert.equal(r.operations[0].candidateId, 'independent-11401-SUPPORT-R1');
  assert.equal(r.counts.blocked + r.counts.skipped, 13);
});

test('partial import by weapon id can include a tier-changed row only with both confirmations', () => {
  const decisions = validDecisions();
  const okay = plan(decisions, planCtx(state, {
    selection: { mode: 'explicit', by: 'weaponId', values: ['14302', '14402'] },
  }));
  assert.equal(okay.counts.eligible, 2);
  assert.equal(okay.writeCount, 2);

  decisions.records.find(x => x.weaponId === '14302').tierChangeReviewConfirmed = false;
  const blockedTier = plan(decisions, planCtx(state, {
    selection: { mode: 'explicit', by: 'weaponId', values: ['14302'] },
  }));
  assert.equal(blockedTier.counts.eligible, 0);
  assert.equal(blockedTier.counts.blocked, 1);
  assert.ok(blockedTier.blocked[0].reasons.includes('TIER_RE_REVIEW_NOT_CONFIRMED'));
});

test('REQUEST_CHANGES and REJECT are skipped, never written', () => {
  const decisions = validDecisions();
  decisions.records.find(x => x.weaponId === '13501').decision = 'REJECT';
  decisions.records.find(x => x.weaponId === '15508').decision = 'REQUEST_CHANGES';
  const r = plan(decisions, planCtx(state));
  assert.equal(r.counts.eligible, 12);
  assert.equal(r.counts.skipped, 2);
  assert.equal(r.writeCount, 12);
  assert.ok(r.skipped.some(s => s.reasons.includes('DECISION_REJECT')));
  assert.ok(r.skipped.some(s => s.reasons.includes('DECISION_REQUEST_CHANGES')));
});

test('checksum mismatch is reported as changed and excluded from writes', () => {
  const decisions = validDecisions();
  decisions.records[0].recordSha256 = '0'.repeat(64);
  const r = plan(decisions, planCtx(state));
  assert.equal(r.counts.changed, 1);
  assert.equal(r.counts.eligible, 13);
  assert.equal(r.writeCount, 13);
  assert.ok(r.changed[0].reasons.includes('CHECKSUM_MISMATCH'));
});

test('false publishRightsVerified blocks the record; automation cannot flip it', () => {
  const decisions = validDecisions();
  decisions.records[0].rightsVerified = false;
  decisions.records[1].rightsVerifiedBy = 'system';
  const r = plan(decisions, planCtx(state));
  assert.equal(r.counts.blocked, 2);
  assert.ok(r.blocked.some(b => b.reasons.includes('RIGHTS_NOT_VERIFIED_BY_ADMIN')));
  assert.equal(r.writeCount, 12);
});

test('auth-bypass fields are fatal; JSON actors are never proof of authorization', () => {
  const decisions = validDecisions();
  decisions.bypassAuth = true;
  const r = plan(decisions, planCtx(state));
  assert.ok(r.fatal.some(i => i.startsWith('AUTH_BYPASS_ATTEMPT:')));
  assert.equal(r.ok, false);
  assert.equal(r.writeCount, 0);

  const clean = plan(validDecisions(), planCtx(state));
  assert.equal(clean.adminAuthorization.jsonActorIsEvidence, false);
  assert.equal(clean.adminAuthorization.serverDerivedActor, true);
  assert.equal(clean.adminAuthorization.actorFieldsNeverSentToGraphQL, true);
});

test('source-derived records and unknown candidate ids are excluded fatally', () => {
  const decisions = validDecisions();
  decisions.records[0].derivation = 'SOURCE_DERIVED';
  const r = plan(decisions, planCtx(state));
  assert.ok(r.blocked.some(b => b.reasons.includes('SOURCE_DERIVED_EXCLUDED')));

  const forged = validDecisions();
  forged.records[0].candidateId = 'source-derived-99999-MAIN_DPS-R1';
  const f = plan(forged, planCtx(state));
  assert.ok(f.fatal.includes('UNKNOWN_DECISION_RECORD:source-derived-99999-MAIN_DPS-R1'));
  assert.equal(f.writeCount, 0);
});

test('Group B stays blocked until all six evidence fields are supplied', () => {
  const decisions = validDecisions();
  const b = decisions.records.find(x => x.candidateId === 'independent-12401-SUB_DPS-R1');
  b.evidenceSupplement.rotation = null;
  b.evidenceSupplement.supplementedBy = 'admin';
  const r = plan(decisions, planCtx(state));
  const gb = r.blocked.find(x => x.candidateId === 'independent-12401-SUB_DPS-R1');
  assert.ok(gb.reasons.some(x => x.startsWith('GROUP_B_EVIDENCE_INCOMPLETE:')));
  assert.ok(gb.reasons.includes('GROUP_B_EVIDENCE_ACTOR_MISSING'));
  assert.equal(r.writeCount, 13);
});

test('tampered decision sheet, non-empty DB and bad migrations are fatal', () => {
  const decisions = validDecisions();
  const badSheet = JSON.parse(JSON.stringify(sheet));
  badSheet.records[0].proposedTier = 'SS';
  badSheet.sha256 = '0'.repeat(64);
  const r = plan(decisions, planCtx(state, {
    sheet: badSheet,
    dbState: { ranks: 1, audits: 1 },
    migrationRows: [],
  }));
  assert.ok(r.fatal.includes('DECISION_SHEET_MANIFEST_MISMATCH'));
  assert.ok(r.fatal.includes('DB_NOT_EMPTY'));
  assert.ok(r.fatal.some(i => i.startsWith('MIGRATION_CHECKSUM_MISMATCH:')));
  assert.equal(r.writeCount, 0);
});

test('all applied migrations (including B3.2 review schema) match local checksums', () => {
  assert.deepEqual(checkMigrations(state.migrationRows), []);
  assert.equal(state.migrationRows.length, 7);
});

test('built operations bind the frozen checksum and never carry an actor field', () => {
  const decisions = validDecisions();
  const ctx = {
    sheetById: new Map(sheet.records.map(r => [r.candidateId, r])),
    decisionById: new Map(decisions.records.map(r => [r.candidateId, r])),
    manifestById: frozenById,
  };
  const eligible = decisions.records.map(r => ({ candidateId: r.candidateId }));
  const operations = buildOperations(eligible, ctx);
  assert.equal(operations.length, 14);
  const input = operations[0].upsert.variables.input;
  assert.equal(input.derivation, 'INDEPENDENT');
  assert.equal(input.publishRightsVerified, true);
  assert.equal(input.weaponType, 'Kiếm Đơn'); // DB stores localized type, not rubric SWORD
  assert.equal(input.sourceChecksum, frozenById.get('independent-11401-SUPPORT-R1').sha256);
  for (const forbidden of ['actor', 'approvedBy', 'adminActor', 'reviewStatus']) {
    assert.equal(Object.hasOwn(input, forbidden), false);
  }
});
