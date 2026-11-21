'use strict';

/**
 * Historical frozen planning and verification. Apply is retired.
 * Use the D2 importer for publication after the current dossier is reviewed.
 *
 * Classification (dry-run prints all five counts):
 *   eligible — APPROVE + real actor + rights verified + checksum matched +
 *              gameplay evidence + tier re-review confirmed + no conflicts;
 *   blocked  — selected but a prerequisite is missing (PENDING, fake actor,
 *              rights not verified, tier review open, Group B evidence gap...);
 *   changed  — record checksum no longer matches the frozen draft;
 *   skipped  — not selected, or an explicit REQUEST_CHANGES / REJECT decision;
 *   writeCount — number of operations that would be issued (eligible count).
 */
const fs = require('node:fs');
const path = require('node:path');
const { verify, verifyDbState, sha, canonical } = require('./freeze.cjs');
const { openReadOnly } = require('../weapon-tier-audit/db.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const DECISIONS = path.join(__dirname, 'admin-decisions.input.json');
const SHEET = path.join(ROOT, 'docs', 'weapon-tier-independent', 'decision-sheet.json');
const MIGRATIONS = path.join(ROOT, 'backend', 'prisma', 'migrations');
const GROUP_B_ID = 'independent-12401-SUB_DPS-R1';
const GROUP_B_EVIDENCE_FIELDS = [
  'critRateAssumptions',
  'passiveProcConditions',
  'rotation',
  'fieldTimeRequirements',
  'energyGenerationAssumptions',
  'rubricJustification',
];
// Phase C1 added the legacy baseline and CharacterBuild migration; B3.2 adds
// the review-workflow schema. All five are applied locally (schema only).
const EXPECTED_MIGRATIONS = [
  '20261120000000_legacy_baseline',
  '20261120145000_add_character_builds',
  '20261120151000_add_character_tier_rankings',
  '20261120153500_add_weapon_tier_rankings',
  '20261120160000_add_weapon_tier_review_workflow',
  '20261121141000_add_maintenance_build_status',
];
const RIGHTS_GROUNDS = [
  'independentRanking', 'originalExplanation', 'noGenshinBuildsEditorialCopy',
  'gameFactsAttributionCorrect', 'evidenceValid',
];
const ALLOWED_DECISIONS = new Set(['APPROVE', 'REQUEST_CHANGES', 'REJECT', 'PENDING']);
const FAKE_ACTORS = new Set(['admin', 'admin-key', 'system', 'automation', 'test', 'agent', 'auto', 'script', 'ci', 'unknown']);
const FORBIDDEN_BYPASS_KEYS = ['bypassAuth', 'skipAdminCheck', 'autoApprove', 'bypassRights', 'fakeActor', 'actorIsEvidence', 'approveAll'];

const UPSERT = `mutation Upsert($input: WeaponTierRankInput!) {
  upsertWeaponTierRank(input: $input) { id weaponId role tier refinementContext reviewStatus publishRightsVerified derivation updatedAt }
}`;
const APPROVE = `mutation Approve($id: String!, $expectedUpdatedAt: String) {
  approveWeaponTierRank(id: $id, expectedUpdatedAt: $expectedUpdatedAt) { id reviewStatus approvedBy publishRightsVerified }
}`;
// Authoritative decisions live in the DB-backed B3.2 review workflow. The
// JSON decision template is metadata only and is NEVER read by this importer.
// This B3 importer reads only the default FROZEN queue; separately versioned
// review-only candidates are never imported here.
const REVIEW_QUEUE = `query ReviewQueue {
  adminWeaponTierReviewQueue {
    candidateId weaponId decision decisionReason decidedAt decidedBy
    rightsVerified rightsVerifiedAt rightsVerifiedBy rightsBasis
    tierChangeConfirmed evidenceAcknowledged evidenceSupplement
    approvalChecksum batchSha256 reviewGroup importEligible blockedReason version
  }
}`;

const isRealActor = value => typeof value === 'string' && value.trim().length >= 3 && !FAKE_ACTORS.has(value.trim().toLowerCase());
const isIsoDate = value => typeof value === 'string' && !Number.isNaN(new Date(value).getTime());
const loadJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const isSha256 = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);

/**
 * Convert one DB-backed review row into the classifier's decision shape.
 * Only fields persisted by explicit Admin GraphQL mutations are mapped; the
 * caller cannot inject an actor or a rights flag from JSON.
 */
function toDecisionRecord(candidate) {
  return {
    candidateId: candidate.candidateId,
    decision: candidate.decision,
    adminActor: candidate.decidedBy ?? null,
    decidedAt: candidate.decidedAt ?? null,
    reason: candidate.decisionReason ?? null,
    rightsVerified: candidate.rightsVerified === true,
    rightsVerifiedBy: candidate.rightsVerifiedBy ?? null,
    rightsBasis: candidate.rightsBasis ?? null,
    tierReReviewConfirmed: candidate.tierChangeConfirmed === true,
    tierChangeReviewConfirmed: candidate.tierChangeConfirmed === true,
    evidenceAcknowledged: candidate.evidenceAcknowledged === true,
    derivation: 'INDEPENDENT',
    recordSha256: candidate.approvalChecksum ?? null,
    reviewGroup: candidate.reviewGroup ?? null,
    evidenceSupplement: candidate.evidenceSupplement ?? null,
    decisionSource: 'database',
    reviewVersion: candidate.version ?? null,
    // Computed by the B3.2 service from the authoritative FROZEN review state.
    importEligible: candidate.importEligible === true,
  };
}

/** Fetch the authoritative FROZEN review queue using a real Admin session. */
async function loadDbDecisions(endpoint, adminKey) {
  if (!adminKey) throw new Error('DB_DECISIONS_REQUIRE_ADMIN_KEY');
  const data = await gql(endpoint, adminKey, { query: REVIEW_QUEUE });
  const queue = data.adminWeaponTierReviewQueue;
  if (!Array.isArray(queue) || queue.length !== 14) throw new Error('REVIEW_QUEUE_COUNT_INVALID');
  return { records: queue.map(toDecisionRecord), queue };
}

function parseSelection(argv = []) {
  const flag = ['--only', '--candidate', '--candidates', '--weapon-ids'].find(f => argv.includes(f));
  if (!flag) return { mode: 'all', by: 'candidateId', values: [] };
  const index = argv.indexOf(flag);
  const raw = argv[index + 1];
  if (!raw || raw.startsWith('--')) throw new Error('MISSING_SELECTION_VALUE');
  return {
    mode: 'explicit',
    by: flag === '--weapon-ids' ? 'weaponId' : 'candidateId',
    values: raw.split(',').map(v => v.trim()).filter(Boolean),
  };
}

function checkMigrations(rows) {
  const issues = [];
  const recorded = new Map(rows.map(r => [r.migration_name, r.checksum]));
  const names = fs.readdirSync(MIGRATIONS).filter(n => /^\d{14}_/.test(n)).sort();
  if (JSON.stringify(names) !== JSON.stringify(EXPECTED_MIGRATIONS)) issues.push('MIGRATION_SET_UNEXPECTED');
  for (const name of names) {
    const local = sha(fs.readFileSync(path.join(MIGRATIONS, name, 'migration.sql')));
    if (recorded.get(name) !== local) issues.push(`MIGRATION_CHECKSUM_MISMATCH:${name}`);
  }
  return issues;
}

function bypassAttempts(container) {
  return Object.keys(container || {}).filter(k => FORBIDDEN_BYPASS_KEYS.includes(k) && container[k] === true);
}

function groupBEvidenceReasons(record) {
  const reasons = [];
  const supp = record.evidenceSupplement || {};
  const missing = GROUP_B_EVIDENCE_FIELDS.filter(k => typeof supp[k] !== 'string' || supp[k].trim().length < 10);
  if (missing.length) reasons.push(`GROUP_B_EVIDENCE_INCOMPLETE:${missing.join(',')}`);
  if (!isRealActor(supp.supplementedBy)) reasons.push('GROUP_B_EVIDENCE_ACTOR_MISSING');
  if (!isIsoDate(supp.supplementedAt)) reasons.push('GROUP_B_EVIDENCE_DATE_MISSING');
  return reasons;
}

/**
 * Per-record classification. `fatal` is for global integrity/auth failures;
 * `reasons` explain blocked/changed/skipped. No writes, no network.
 */
function classify(record, ctx) {
  const id = record.candidateId;
  const frozen = ctx.manifestById.get(id);
  const draft = ctx.sheetById.get(id);
  const selected = ctx.selection.mode === 'all' ||
    ctx.selection.values.includes(ctx.selection.by === 'weaponId' ? record.weaponId : id);

  if (!selected) return { candidateId: id, status: 'skipped', reasons: ['NOT_SELECTED'] };
  if (!frozen || !draft) return { candidateId: id, status: 'blocked', reasons: ['UNKNOWN_DECISION_RECORD'] };
  if (record.recordSha256 !== frozen.sha256) return { candidateId: id, status: 'changed', reasons: ['CHECKSUM_MISMATCH'] };

  const reasons = [];
  if (!ALLOWED_DECISIONS.has(record.decision)) reasons.push('INVALID_DECISION');
  if (record.decision === 'PENDING') reasons.push('ADMIN_DECISION_PENDING');
  if (record.decision === 'REQUEST_CHANGES' || record.decision === 'REJECT') {
    return { candidateId: id, status: 'skipped', reasons: [`DECISION_${record.decision}`], decision: record.decision };
  }
  if (!isRealActor(record.adminActor)) reasons.push('FAKE_OR_MISSING_ACTOR');
  if (!isIsoDate(record.decidedAt)) reasons.push('MISSING_RECORD_DECIDED_AT');
  if (!record.reason || String(record.reason).trim().length < 10) reasons.push('MISSING_DECISION_REASON');
  if (record.evidenceAcknowledged !== true) reasons.push('GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED');
  if (!draft.evidence?.rubric || !Array.isArray(draft.evidence?.primaryEvidence) || draft.evidence.primaryEvidence.length === 0) {
    reasons.push('GAMEPLAY_EVIDENCE_MISSING');
  }
  if (record.rightsVerified !== true || !isRealActor(record.rightsVerifiedBy)) reasons.push('RIGHTS_NOT_VERIFIED_BY_ADMIN');
  if (ctx.dbBacked) {
    const basis = record.rightsBasis;
    if (record.decisionSource !== 'database') reasons.push('DECISION_SOURCE_NOT_DATABASE');
    if (!basis || RIGHTS_GROUNDS.some(ground => basis[ground] !== true) ||
        basis.verifiedBy !== record.rightsVerifiedBy || !isIsoDate(basis.verifiedAt) ||
        !isRealActor(basis.verifiedBy) || String(basis.note ?? '').trim().length < 10) {
      reasons.push('RIGHTS_BASIS_INCOMPLETE');
    }
    if (!basis || basis.recordSha256 !== record.recordSha256 || basis.batchSha256 !== ctx.batchSha256) {
      reasons.push('RIGHTS_BASIS_CHECKSUM_MISMATCH');
    }
  }
  if (draft.tierChanged &&
      (record.tierReReviewConfirmed !== true || record.tierChangeReviewConfirmed !== true)) {
    reasons.push('TIER_RE_REVIEW_NOT_CONFIRMED');
  }
  // The B3.2 service's importEligible is the authoritative aggregate: it folds
  // in rights, acknowledgement, evidence and tier checks. A stale APPROVE from
  // the review row alone can never bypass it.
  if (ctx.dbBacked && record.importEligible !== true) reasons.push('REVIEW_NOT_IMPORT_ELIGIBLE');
  if (record.derivation && record.derivation !== 'INDEPENDENT') reasons.push('SOURCE_DERIVED_EXCLUDED');
  if (id === GROUP_B_ID) reasons.push(...groupBEvidenceReasons(record));
  reasons.push(...bypassAttempts(record).map(k => `AUTH_BYPASS_ATTEMPT:${k}`));

  const weapon = ctx.weapons.get(String(draft.weaponId));
  if (!weapon) reasons.push(`WEAPON_NOT_FOUND:${draft.weaponId}`);
  else if (weapon.type !== draft.dbWeaponType) reasons.push(`WEAPON_TYPE_CONFLICT:${draft.weaponId}`);
  if (weapon && (weapon.tier || weapon.role)) reasons.push(`ADMIN_CONFLICT:${draft.weaponId}`);

  return {
    candidateId: id,
    weaponId: draft.weaponId,
    reviewGroup: draft.candidateId === GROUP_B_ID ? 'B' : 'A',
    status: reasons.length ? 'blocked' : 'eligible',
    reasons,
    decision: record.decision,
  };
}

function buildOperations(eligible, ctx) {
  return eligible.map(({ candidateId }) => {
    const draft = ctx.sheetById.get(candidateId);
    const decision = ctx.decisionById.get(candidateId);
    const frozen = ctx.manifestById.get(candidateId);
    if (!frozen) throw new Error(`FROZEN_RECORD_NOT_FOUND:${candidateId}`);
    const input = {
      weaponId: draft.weaponId,
      weaponType: draft.dbWeaponType,
      role: draft.role,
      tier: draft.proposedTier,
      refinementContext: draft.refinement,
      refinementLevel: draft.refinementLevel,
      versionKey: draft.versionKey,
      gameVersion: draft.gameVersion,
      gameVersionStatus: draft.gameVersionStatus,
      explanationVi: draft.explanationVi,
      evidence: draft.evidence,
      rubricVersion: draft.rubricVersion,
      confidence: draft.confidence,
      reviewNotes: `Phase B3.1 approved import. Sensitivity: ${draft.sensitivity}. Admin decision: ${decision.decision} by ${decision.adminActor} at ${decision.decidedAt}. Reason: ${decision.reason}.`,
      sourceName: draft.sourceName,
      sourceUrl: null,
      sourceLocale: draft.sourceLocale,
      sourceChecksum: frozen.sha256,
      // Only reflects an already-recorded explicit Admin rights verification;
      // this automation never decides or flips the rights flag on its own.
      publishRightsVerified: true,
      rightsNote: `Verified by ${decision.rightsVerifiedBy} (${decision.rightsBasis?.verifiedAt}). Grounds: ${RIGHTS_GROUNDS.join(', ')}. ${decision.rightsBasis?.note ?? ''}`,
      derivation: 'INDEPENDENT',
    };
    return {
      candidateId,
      weaponId: draft.weaponId,
      upsert: { query: UPSERT, variables: { input } },
      approve: { query: APPROVE },
      decisionReason: decision.reason,
    };
  });
}

/**
 * Pure planning function: no writes, no network. ctx supplies read-only state.
 */
function plan(decisions, ctx = {}) {
  const freeze = verify();
  const fatal = [...freeze.issues];
  const manifest = freeze.manifest;
  const sheet = ctx.sheet ?? loadJson(SHEET);
  if (sheet.sha256 !== manifest.decisionSheetSha256) fatal.push('DECISION_SHEET_MANIFEST_MISMATCH');
  if (ctx.dbState && (ctx.dbState.ranks !== 0 || ctx.dbState.audits !== 0)) fatal.push('DB_NOT_EMPTY');
  if (Array.isArray(ctx.migrationRows)) fatal.push(...checkMigrations(ctx.migrationRows));
  else fatal.push('MIGRATION_STATE_UNKNOWN');

  const selection = ctx.selection ?? parseSelection(ctx.argv ?? []);
  const manifestById = new Map(manifest.records.map(r => [r.candidateId, r]));
  const sheetById = new Map(sheet.records.map(r => [r.candidateId, r]));
  const decisionById = new Map((decisions?.records ?? []).map(r => [r.candidateId, r]));

  if (!Array.isArray(decisions?.records) || decisions.records.length !== manifest.records.length) {
    fatal.push('DECISION_RECORD_COUNT_MISMATCH');
  }
  // DB-backed decisions carry a per-record actor/timestamp (each Admin action
  // is independent), so the legacy single top-level author check does not apply.
  if (!ctx.dbBacked && !isRealActor(decisions?.decidedBy)) fatal.push('FAKE_OR_MISSING_DECIDED_BY');
  if (!ctx.dbBacked && !isIsoDate(decisions?.decidedAt)) fatal.push('MISSING_DECIDED_AT');
  fatal.push(...bypassAttempts(decisions).map(k => `AUTH_BYPASS_ATTEMPT:${k}`));

  const seen = new Set();
  for (const record of decisions?.records ?? []) {
    if (seen.has(record.candidateId)) fatal.push(`DUPLICATE_DECISION_RECORD:${record.candidateId}`);
    seen.add(record.candidateId);
    if (!manifestById.has(record.candidateId)) fatal.push(`UNKNOWN_DECISION_RECORD:${record.candidateId}`);
  }
  if (selection.mode === 'explicit') {
    const known = new Set([...manifestById.keys()]);
    const unknown = selection.values.filter(v => selection.by === 'weaponId'
      ? !manifest.records.some(r => r.weaponId === v)
      : !known.has(v));
    if (unknown.length) fatal.push(`UNKNOWN_SELECTION:${unknown.join(',')}`);
  }

  const weapons = new Map((ctx.weapons ?? []).map(w => [String(w.id), w]));
  const classification = (decisions?.records ?? []).map(r => classify(r, {
    selection, manifestById, sheetById, weapons,
    dbBacked: ctx.dbBacked === true,
    batchSha256: manifest.batchSha256,
  }));
  const eligible = classification.filter(r => r.status === 'eligible');
  const blocked = classification.filter(r => r.status === 'blocked');
  const skipped = classification.filter(r => r.status === 'skipped');
  const changed = classification.filter(r => r.status === 'changed');
  const operations = fatal.length === 0 ? buildOperations(eligible, { sheetById, decisionById, manifestById }) : [];

  // Duplicate logical key among eligible rows is a fatal integrity issue.
  const keys = new Set();
  for (const op of operations) {
    const draft = sheetById.get(op.candidateId);
    const key = `${draft.weaponId}|${draft.role}|${draft.versionKey}|${draft.refinement}`;
    if (keys.has(key)) fatal.push(`DUPLICATE_APPROVED_KEY:${key}`);
    keys.add(key);
  }

  return {
    ok: fatal.length === 0 && eligible.length > 0,
    fatal,
    issues: fatal,
    selection,
    counts: {
      total: manifest.records.length,
      eligible: eligible.length,
      blocked: blocked.length,
      skipped: skipped.length,
      changed: changed.length,
      writeCount: operations.length,
    },
    writeCount: operations.length,
    eligible,
    blocked,
    skipped,
    changed,
    operations,
    batchSha256: manifest.batchSha256,
    decisionSource: ctx.dbBacked ? 'database' : 'in-memory-test-fixture',
    adminAuthorization: {
      jsonActorIsEvidence: false,
      authorizationSource: 'backend Admin session (x-admin-key verified against ADMIN_PASSWORD)',
      serverDerivedActor: true,
      permissionCheck: true,
      auditLog: true,
      rejectChangedContent: true,
      actorFieldsNeverSentToGraphQL: true,
    },
  };
}

async function gatherReadOnlyState() {
  const freeze = verify();
  const db = await verifyDbState();
  const { prisma } = openReadOnly();
  try {
    const [migrationRows, weapons] = await prisma.$transaction([
      prisma.$queryRawUnsafe('SELECT migration_name, checksum FROM "_prisma_migrations" ORDER BY finished_at'),
      prisma.weapon.findMany({ select: { id: true, type: true, tier: true, role: true } }),
    ]);
    return { freeze, db, migrationRows, weapons };
  } finally {
    await prisma.$disconnect();
  }
}

async function gql(endpoint, adminKey, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-admin-key': adminKey },
    body: JSON.stringify(payload),
  });
  const body = await response.json();
  if (!response.ok || body.errors) throw new Error(`GRAPHQL_ERROR:${JSON.stringify(body.errors ?? response.status)}`);
  return body.data;
}

async function run(argv = process.argv.slice(2)) {
  const apply = argv.includes('--apply');
  if (apply) throw new Error('FROZEN_REVIEW_READ_ONLY_USE_D2_IMPORTER');
  // Authoritative decisions live in the DB review workflow, which is admin-only.
  // Reading them always requires a real Admin key, even for a dry run.
  if (!process.env.ADMIN_KEY) throw new Error('DB_DECISIONS_REQUIRE_ADMIN_KEY');
  const endpoint = process.env.GRAPHQL_URL || 'http://127.0.0.1:4000/graphql';

  const state = await gatherReadOnlyState();
  const decisions = await loadDbDecisions(endpoint, process.env.ADMIN_KEY);
  const result = plan(decisions, {
    sheet: loadJson(SHEET),
    dbState: state.db,
    migrationRows: state.migrationRows,
    weapons: state.weapons,
    argv,
    dbBacked: true,
  });

  const summary = {
    mode: apply ? 'APPLY' : 'DRY_RUN',
    endpoint,
    freezeOk: state.freeze.ok,
    batchSha256: state.freeze.manifest.batchSha256,
    decisionSource: result.decisionSource,
    dbState: state.db,
    selection: result.selection,
    adminAuthorization: result.adminAuthorization,
    counts: result.counts,
    ok: result.ok,
    issues: result.fatal,
    eligible: result.eligible,
    blocked: result.blocked,
    skipped: result.skipped,
    changed: result.changed,
    writeCount: result.writeCount,
  };
  if (!result.ok) {
    console.log(JSON.stringify(summary, null, 2));
    return summary;
  }

  if (!apply) {
    summary.plannedOperations = result.operations.map(op => {
      const input = op.upsert.variables.input;
      return {
        candidateId: op.candidateId,
        weaponId: op.weaponId,
        tier: input.tier,
        role: input.role,
        refinement: input.refinementContext,
        publishRightsVerified: input.publishRightsVerified,
        derivation: input.derivation,
      };
    });
    summary.backupPlanned = '/tmp/opencode/db-backups/genshinhub-b3-partial-pre-import-<timestamp>.dump';
    console.log(JSON.stringify(summary, null, 2));
    return summary;
  }

  return summary;
}

if (require.main === module) {
  run().then(s => { if (!s.ok) process.exitCode = 1; }).catch(error => {
    console.error(JSON.stringify({ ok: false, error: String(error.message || error) }, null, 2));
    process.exitCode = 1;
  });
}

module.exports = {
  plan, run, classify, parseSelection, checkMigrations, buildOperations,
  isRealActor, FAKE_ACTORS, GROUP_B_ID, GROUP_B_EVIDENCE_FIELDS,
  toDecisionRecord, loadDbDecisions, REVIEW_QUEUE, RIGHTS_GROUNDS,
};
