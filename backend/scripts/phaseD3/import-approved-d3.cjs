'use strict';

/**
 * Phase D3 partial importer — publishes ONLY authoritative D2_REVISED weapon
 * review decisions from the B3.2 `WeaponTierReview` queue. It never approves,
 * never flips rights, never reads JSON decision metadata and never writes to
 * the development database unless ALLOW_DEV_IMPORT=1 is set explicitly.
 *
 * This is a D3-specific companion to the B3.3 frozen importer. FROZEN-bound
 * decisions are rejected as SUPERSEDED_VERSION; a D2 revision is the only
 * importable content version.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const D2_DRAFT = path.join(ROOT, 'docs', 'tierlist', 'phase-d2', 'WEAPON_REVISED_DRAFT.json');
const SHEET = path.join(ROOT, 'docs', 'weapon-tier-independent', 'decision-sheet.json');
const MIGRATIONS = path.join(ROOT, 'backend', 'prisma', 'migrations');
const D2_SUFFIX = '::D2';
const GROUP_B_ID = 'independent-12401-SUB_DPS-R1';
const RIGHTS_GROUNDS = [
  'independentRanking', 'originalExplanation', 'noGenshinBuildsEditorialCopy',
  'gameFactsAttributionCorrect', 'evidenceValid',
];
const FAKE_ACTORS = new Set([
  'admin', 'admin-key', 'system', 'automation', 'test', 'agent', 'auto', 'script', 'ci', 'unknown', 'anonymous',
]);
const FORBIDDEN_BYPASS_KEYS = ['bypassAuth', 'skipAdminCheck', 'autoApprove', 'bypassRights', 'fakeActor', 'actorIsEvidence', 'approveAll'];
const EXPECTED_MIGRATIONS = [
  '20261120000000_legacy_baseline',
  '20261120145000_add_character_builds',
  '20261120151000_add_character_tier_rankings',
  '20261120153500_add_weapon_tier_rankings',
  '20261120160000_add_weapon_tier_review_workflow',
  '20261121141000_add_maintenance_build_status',
];

const PUBLISH = `mutation Publish($candidateId: String!, $batchSha256: String!, $recordSha256: String!, $expectedVersion: Int!, $expectedDatabase: String) {
  adminPublishWeaponTierReview(candidateId: $candidateId, batchSha256: $batchSha256,
    recordSha256: $recordSha256, expectedVersion: $expectedVersion, expectedDatabase: $expectedDatabase, sourceVersion: D2_REVISED) {
    id reviewStatus approvedBy publishRightsVerified
  }
}`;
const PUBLIC_QUERY = `query { weaponTierRanks(limit: 500) {
  id weaponId weaponType role tier refinementContext refinementLevel publishRightsVerified derivation reviewStatus
} }`;
const ADMIN_QUERY = `query { adminWeaponTierRanks(limit: 1000) {
  id weaponId reviewStatus publishRightsVerified derivation approvedBy role tier refinementContext refinementLevel
} }`;
const REVIEW_QUEUE = `query ReviewQueue($sourceVersion: WeaponTierReviewSource) {
  adminWeaponTierReviewQueue(sourceVersion: $sourceVersion) {
    candidateId weaponId decision decisionReason decidedAt decidedBy
    rightsVerified rightsVerifiedAt rightsVerifiedBy rightsBasis
    tierChangeConfirmed evidenceAcknowledged evidenceSupplement
    approvalChecksum batchSha256 reviewGroup importEligible published blockedReason version
  }
}`;

const sha = value => crypto.createHash('sha256').update(value).digest('hex');
function canonical(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value ?? null);
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
}
const isSha256 = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const isRealActor = value => typeof value === 'string' && value.trim().length >= 3
  && !FAKE_ACTORS.has(value.trim().toLowerCase());
const isIsoDate = value => typeof value === 'string' && !Number.isNaN(new Date(value).getTime());
const loadJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));

function loadEnv() {
  const text = fs.readFileSync(path.join(ROOT, 'backend', '.env'), 'utf8');
  const env = {};
  for (const line of text.split(/\r?\n/)) {
    const match = /^([A-Z0-9_]+)="([^"]*)"$/.exec(line.trim());
    if (match) env[match[1]] = match[2];
  }
  return env;
}

/** Recompute D2 artifact + per-record checksums; a hand-edited draft fails closed. */
function loadD2Bridge() {
  const d2 = loadJson(D2_DRAFT);
  if (!Array.isArray(d2.records) || d2.records.length !== 14) throw new Error('D2_RECORD_COUNT_INVALID');
  if (!isSha256(d2.artifactSha256) || sha(canonical(d2.records)) !== d2.artifactSha256) {
    throw new Error('D2_ARTIFACT_CHANGED');
  }
  const revisedById = new Map();
  for (const record of d2.records) {
    const { newChecksum, ...rest } = record;
    if (!isSha256(newChecksum) || sha(canonical(rest)) !== newChecksum) {
      throw new Error(`D2_RECORD_CHANGED:${record.candidateId}`);
    }
    if (!isSha256(record.oldChecksum) || record.oldChecksum === newChecksum) {
      throw new Error(`D2_SOURCE_LINK_INVALID:${record.candidateId}`);
    }
    revisedById.set(record.candidateId, record);
  }
  return { d2, revisedById };
}

function toDecisionRecord(candidate) {
  const rawId = String(candidate.candidateId ?? '');
  const stableId = rawId.endsWith(D2_SUFFIX) ? rawId.slice(0, -D2_SUFFIX.length) : rawId;
  if (rawId.endsWith(D2_SUFFIX) === false) {
    // A FROZEN-bound decision is never importable; keep it so classify() can
    // report SUPERSEDED_VERSION instead of silently dropping the row.
    return {
      candidateId: stableId, rawId, weaponId: String(candidate.weaponId ?? ''),
      sourceVersion: 'FROZEN', decision: candidate.decision,
      adminActor: candidate.decidedBy ?? null, decidedAt: candidate.decidedAt ?? null,
      reason: candidate.decisionReason ?? null, rightsVerified: candidate.rightsVerified === true,
      rightsVerifiedBy: candidate.rightsVerifiedBy ?? null, rightsBasis: candidate.rightsBasis ?? null,
      tierReReviewConfirmed: candidate.tierChangeConfirmed === true,
      tierChangeReviewConfirmed: candidate.tierChangeConfirmed === true,
      evidenceAcknowledged: candidate.evidenceAcknowledged === true,
      derivation: 'INDEPENDENT', recordSha256: candidate.approvalChecksum ?? null,
      reviewGroup: candidate.reviewGroup ?? null, evidenceSupplement: candidate.evidenceSupplement ?? null,
      decisionSource: 'database', reviewVersion: candidate.version ?? null,
      importEligible: false,
    };
  }
  return {
    candidateId: stableId,
    rawId,
    weaponId: String(candidate.weaponId ?? ''),
    sourceVersion: 'D2_REVISED',
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
    // Authoritative aggregate computed by the B3.2 service from D2 content.
    importEligible: candidate.importEligible === true,
    batchSha256: candidate.batchSha256 ?? null,
    published: candidate.published === true,
  };
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

async function loadDbDecisions(endpoint, adminKey, sourceVersion = 'D2_REVISED') {
  if (!adminKey) throw new Error('DB_DECISIONS_REQUIRE_ADMIN_KEY');
  const data = await gql(endpoint, adminKey, { query: REVIEW_QUEUE, variables: { sourceVersion } });
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
    if (recorded.get(name) !== sha(fs.readFileSync(path.join(MIGRATIONS, name, 'migration.sql')))) {
      issues.push(`MIGRATION_CHECKSUM_MISMATCH:${name}`);
    }
  }
  return issues;
}

const bypassAttempts = container => Object.keys(container || {})
  .filter(k => FORBIDDEN_BYPASS_KEYS.includes(k) && container[k] === true);

function groupBEvidenceReasons(record) {
  const supplement = record.evidenceSupplement || {};
  const fields = ['critRateAssumptions', 'passiveProcConditions', 'rotation',
    'fieldTimeRequirements', 'energyGenerationAssumptions', 'rubricJustification'];
  const missing = fields.filter(k => typeof supplement[k] !== 'string' || supplement[k].trim().length < 10);
  const reasons = missing.length ? [`GROUP_B_EVIDENCE_INCOMPLETE:${missing.join(',')}`] : [];
  if (!isRealActor(supplement.supplementedBy)) reasons.push('GROUP_B_EVIDENCE_ACTOR_MISSING');
  if (!isIsoDate(supplement.supplementedAt)) reasons.push('GROUP_B_EVIDENCE_DATE_MISSING');
  return reasons;
}

function classify(record, ctx) {
  const id = record.candidateId;
  const revised = ctx.revisedById.get(id);
  const selected = ctx.selection.mode === 'all' ||
    ctx.selection.values.includes(ctx.selection.by === 'weaponId' ? record.weaponId : id);

  if (!selected) return { candidateId: id, status: 'skipped', reasons: ['NOT_SELECTED'] };
  if (!revised) return { candidateId: id, status: 'blocked', reasons: ['UNKNOWN_D2_REVISION'] };
  if (record.sourceVersion !== 'D2_REVISED') {
    return { candidateId: id, status: 'changed', reasons: ['SUPERSEDED_VERSION'] };
  }
  if (record.recordSha256 !== revised.newChecksum) {
    return { candidateId: id, status: 'changed', reasons: ['CHECKSUM_MISMATCH'] };
  }
  if (record.decision === 'REQUEST_CHANGES' || record.decision === 'REJECT') {
    return { candidateId: id, status: 'skipped', reasons: [`DECISION_${record.decision}`], decision: record.decision };
  }

  const reasons = [];
  if (record.decision !== 'APPROVE') reasons.push('ADMIN_DECISION_PENDING');
  if (!isRealActor(record.adminActor)) reasons.push('FAKE_OR_MISSING_ACTOR');
  if (!isIsoDate(record.decidedAt)) reasons.push('MISSING_RECORD_DECIDED_AT');
  if (!record.reason || String(record.reason).trim().length < 10) reasons.push('MISSING_DECISION_REASON');
  if (record.evidenceAcknowledged !== true) reasons.push('GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED');
  if (record.rightsVerified !== true || !isRealActor(record.rightsVerifiedBy)) reasons.push('RIGHTS_NOT_VERIFIED_BY_ADMIN');
  const basis = record.rightsBasis;
  if (!basis || RIGHTS_GROUNDS.some(g => basis[g] !== true) ||
      basis.verifiedBy !== record.rightsVerifiedBy || !isIsoDate(basis.verifiedAt) ||
      !isRealActor(basis.verifiedBy) || String(basis.note ?? '').trim().length < 10) {
    reasons.push('RIGHTS_BASIS_INCOMPLETE');
  }
  if (!basis || basis.recordSha256 !== record.recordSha256 || basis.batchSha256 !== ctx.batchSha256) {
    reasons.push('RIGHTS_BASIS_CHECKSUM_MISMATCH');
  }
  if (revised.tierChanged === true &&
      (record.tierReReviewConfirmed !== true || record.tierChangeReviewConfirmed !== true)) {
    reasons.push('TIER_RE_REVIEW_NOT_CONFIRMED');
  }
  // The B3.2 service computes this from the authoritative D2-bound review state.
  // A stale APPROVE on the row can never bypass the aggregate.
  if (record.importEligible !== true) reasons.push('REVIEW_NOT_IMPORT_ELIGIBLE');
  // SOURCE_DERIVED content is research, never an official ranking. The D2
  // dossier records this per-record; a tampered queue actor cannot override it.
  if (revised.rightsStatus?.sourceDerivedResearchUsedAsRanking === true ||
      (record.derivation && record.derivation !== 'INDEPENDENT')) {
    reasons.push('SOURCE_DERIVED_EXCLUDED');
  }
  if (id === GROUP_B_ID) reasons.push(...groupBEvidenceReasons(record));
  reasons.push(...bypassAttempts(record).map(k => `AUTH_BYPASS_ATTEMPT:${k}`));

  const weapon = ctx.weapons.get(String(revised.weaponId));
  if (!weapon) reasons.push(`WEAPON_NOT_FOUND:${revised.weaponId}`);
  else if (weapon.type !== ctx.dbWeaponType.get(id)) reasons.push(`WEAPON_TYPE_CONFLICT:${revised.weaponId}`);
  if (weapon && (weapon.tier || weapon.role)) reasons.push(`ADMIN_CONFLICT:${revised.weaponId}`);

  return {
    candidateId: id,
    weaponId: revised.weaponId,
    reviewGroup: record.reviewGroup ?? 'A',
    status: reasons.length ? 'blocked' : 'eligible',
    reasons,
    decision: record.decision,
  };
}

function buildOperations(eligible, ctx) {
  return eligible.map(({ candidateId }) => {
    const draft = ctx.sheetById.get(candidateId);
    const decision = ctx.decisionById.get(candidateId);
    const revised = ctx.revisedById.get(candidateId);
    if (!draft || !decision || !revised) throw new Error(`D2_IMPORT_CONTEXT_MISSING:${candidateId}`);
    return {
      candidateId,
      weaponId: draft.weaponId,
      tier: revised.proposedTier,
      role: draft.role,
      refinement: draft.refinement,
      publish: { query: PUBLISH, variables: {
        candidateId: `${candidateId}${D2_SUFFIX}`,
        batchSha256: decision.batchSha256 ?? ctx.batchSha256,
        recordSha256: revised.newChecksum,
        expectedVersion: decision.reviewVersion,
      } },
    };
  });
}

/** Pure planning: no writes, no network. */
function plan(decisions, ctx = {}) {
  const fatal = [];
  let bridge;
  try {
    bridge = loadD2Bridge();
  } catch (error) {
    fatal.push(`D2_BRIDGE_INVALID:${error.message}`);
    bridge = { d2: { records: [], artifactSha256: '' }, revisedById: new Map() };
  }
  const freeze = require('../weapon-tier-independent/freeze.cjs').verify();
  fatal.push(...freeze.issues);
  const manifest = freeze.manifest;
  const sheet = ctx.sheet ?? loadJson(SHEET);
  if (sheet.sha256 !== manifest.decisionSheetSha256) fatal.push('DECISION_SHEET_MANIFEST_MISMATCH');
  if (ctx.dbState && !ctx.dbState.containsOnlyCanonicalPublications &&
      (ctx.dbState.ranks !== 0 || ctx.dbState.audits !== 0)) fatal.push('DB_NOT_EMPTY');
  if (Array.isArray(ctx.migrationRows)) fatal.push(...checkMigrations(ctx.migrationRows));
  else fatal.push('MIGRATION_STATE_UNKNOWN');

  const selection = ctx.selection ?? parseSelection(ctx.argv ?? []);
  const manifestById = new Map(manifest.records.map(r => [r.candidateId, r]));
  const sheetById = new Map(sheet.records.map(r => [r.candidateId, r]));
  const dbWeaponType = new Map(sheet.records.map(r => [r.candidateId, r.dbWeaponType]));
  const decisionById = new Map((decisions?.records ?? []).map(r => [r.candidateId, r]));

  if (!Array.isArray(decisions?.records) || decisions.records.length !== manifest.records.length) {
    fatal.push('DECISION_RECORD_COUNT_MISMATCH');
  }
  for (const [candidateId, revised] of bridge.revisedById) {
    const frozen = manifestById.get(candidateId);
    if (!frozen || frozen.sha256 !== revised.oldChecksum) {
      fatal.push(`D2_LINEAGE_CHECKSUM_MISMATCH:${candidateId}`);
    }
  }
  fatal.push(...bypassAttempts(decisions).map(k => `AUTH_BYPASS_ATTEMPT:${k}`));

  const seen = new Set();
  for (const record of decisions?.records ?? []) {
    if (seen.has(record.candidateId)) fatal.push(`DUPLICATE_DECISION_RECORD:${record.candidateId}`);
    seen.add(record.candidateId);
    if (!manifestById.has(record.candidateId)) fatal.push(`UNKNOWN_DECISION_RECORD:${record.candidateId}`);
  }
  if (selection.mode === 'explicit') {
    const unknown = selection.values.filter(v => selection.by === 'weaponId'
      ? !manifest.records.some(r => r.weaponId === v)
      : !manifestById.has(v));
    if (unknown.length) fatal.push(`UNKNOWN_SELECTION:${unknown.join(',')}`);
  }

  const weapons = new Map((ctx.weapons ?? []).map(w => [String(w.id), w]));
  const classification = (decisions?.records ?? []).map(r => classify(r, {
    selection, revisedById: bridge.revisedById, weapons, dbWeaponType,
    batchSha256: bridge.d2.artifactSha256,
  }));
  const eligible = classification.filter(r => r.status === 'eligible');
  const blocked = classification.filter(r => r.status === 'blocked');
  const skipped = classification.filter(r => r.status === 'skipped');
  const changed = classification.filter(r => r.status === 'changed');
  const operations = fatal.length === 0 ? buildOperations(eligible, { sheetById, decisionById, revisedById: bridge.revisedById, batchSha256: bridge.d2.artifactSha256 }) : [];

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
    decisionSource: 'database',
    adminAuthorization: { serverDerived: true, clientActorAccepted: false },
    eligible,
    blocked,
    skipped,
    changed,
    operations,
    writeCount: operations.length,
  };
}

/**
 * Resolve the import target. Production/dev is the default. An isolated test
 * database can ONLY be selected through an explicit env var whose name is
 * restricted to a `genshinhub_*test*` database on localhost; a test apply also
 * requires ALLOW_TEST_IMPORT=1. This makes it impossible to accidentally point
 * an E2E run at the development database.
 */
function resolveTarget() {
  if (process.env.D3_IMPORT_DATABASE_URL) {
    const url = new URL(process.env.D3_IMPORT_DATABASE_URL);
    const database = decodeURIComponent(url.pathname.slice(1));
    if (!/^genshinhub_.{0,}(test|e2e)/i.test(database)) throw new Error('D3_TEST_DB_NAME_REQUIRED');
    if (!/^(127\.0\.0\.1|localhost)$/.test(url.hostname)) throw new Error('D3_TEST_HOST_REQUIRED');
    return {
      url: url.toString(), database, host: url.hostname, port: url.port || '5432',
      username: decodeURIComponent(url.username), password: decodeURIComponent(url.password),
      test: true, target: `${url.hostname}:${url.port || '5432'}/${database}`,
    };
  }
  const url = new URL(loadEnv().DATABASE_URL);
  const database = decodeURIComponent(url.pathname.slice(1));
  if (!/genshinhub/i.test(database) || !/^(127\.0\.0\.1|localhost)$/.test(url.hostname)) {
    throw new Error(`Refusing non-development database: ${url.hostname}/${database}`);
  }
  return {
    url: url.toString(), database, host: url.hostname, port: url.port || '5432',
    username: decodeURIComponent(url.username), password: decodeURIComponent(url.password),
    test: false, target: `${url.hostname}:${url.port || '5432'}/${database}`,
  };
}

function createBackup(target) {
  const dir = '/tmp/opencode/db-backups';
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `genshinhub-d3-pre-import-${Date.now()}.dump`);
  const proc = spawnSync('pg_dump', [
    '--no-owner', '--no-privileges', '--format=custom',
    '--host', target.host, '--port', target.port,
    '--username', target.username, '--dbname', target.database,
    '--file', file,
  ], { encoding: 'utf8', env: { ...process.env, PGPASSWORD: target.password } });
  if (proc.status !== 0) throw new Error(`BACKUP_FAILED:${proc.stderr?.trim() || proc.error}`);
  return { file, sha256: sha(fs.readFileSync(file)), bytes: fs.statSync(file).size };
}

async function readOnlyState() {
  const target = resolveTarget();
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient({ datasources: { db: { url: target.url } } });
  try {
    const [id, ranks, audits, migrationRows, weapons] = await prisma.$transaction([
      prisma.$queryRawUnsafe('SELECT current_database() AS db'),
      prisma.weaponTierRank.findMany({ select: { id: true, sourceChecksum: true, gameVersion: true,
        reviewStatus: true, derivation: true, publishRightsVerified: true } }),
      prisma.weaponTierAudit.findMany({ select: { rankingId: true, action: true, changes: true } }),
      prisma.$queryRawUnsafe('SELECT migration_name, checksum FROM "_prisma_migrations" ORDER BY finished_at'),
      prisma.weapon.findMany({ select: { id: true, type: true, tier: true, role: true } }),
    ]);
    if (id[0].db !== target.database) throw new Error(`WRONG_DATABASE:${id[0].db}`);
    const checksums = new Set(loadD2Bridge().d2.records.map(record => record.newChecksum));
    const publicationByRank = new Map(audits.map(audit => [audit.rankingId, audit]));
    const containsOnlyCanonicalPublications = audits.length === ranks.length && ranks.every(rank => {
      const audit = publicationByRank.get(rank.id);
      return rank.gameVersion === '7.2' && rank.reviewStatus === 'APPROVED' &&
        rank.derivation === 'INDEPENDENT' && rank.publishRightsVerified &&
        checksums.has(rank.sourceChecksum) && audit?.action === 'PUBLISHED' &&
        audit.changes?.recordSha256 === rank.sourceChecksum;
    });
    const db = { ranks: ranks.length, audits: audits.length, containsOnlyCanonicalPublications,
      matchesFreeze: ranks.length === 0 && audits.length === 0 };
    return { db, migrationRows, weapons, target };
  } finally {
    await prisma.$disconnect();
  }
}

async function run(argv = process.argv.slice(2)) {
  const apply = argv.includes('--apply');
  const target = resolveTarget();
  if (apply && target.test && process.env.ALLOW_TEST_IMPORT !== '1') {
    throw new Error('APPLY_TO_TEST_REQUIRES_ALLOW_TEST_IMPORT');
  }
  if (apply && !target.test && process.env.ALLOW_DEV_IMPORT !== '1') {
    throw new Error('APPLY_REQUIRES_ALLOW_DEV_IMPORT');
  }
  if (!process.env.ADMIN_KEY) throw new Error('DB_DECISIONS_REQUIRE_ADMIN_KEY');
  const endpoint = process.env.GRAPHQL_URL || 'http://127.0.0.1:4000/graphql';
  const state = await readOnlyState();
  const decisions = await loadDbDecisions(endpoint, process.env.ADMIN_KEY, 'D2_REVISED');
  const result = plan(decisions, {
    sheet: loadJson(SHEET),
    dbState: state.db,
    migrationRows: state.migrationRows,
    weapons: state.weapons,
    argv,
  });

  const summary = {
    mode: apply ? 'APPLY' : 'DRY_RUN',
    decisionSource: result.decisionSource,
    sourceVersion: 'D2_REVISED',
    d2ArtifactSha256: loadD2Bridge().d2.artifactSha256,
    target: state.target,
    dbState: state.db,
    selection: result.selection,
    counts: result.counts,
    ok: result.ok,
    issues: result.fatal,
    eligible: result.eligible,
    blocked: result.blocked,
    skipped: result.skipped,
    changed: result.changed,
    writeCount: result.writeCount,
  };
  if (!result.ok || !apply) {
    if (!apply) {
      summary.plannedOperations = result.operations.map(op => ({
        candidateId: op.candidateId,
        weaponId: op.weaponId,
        tier: op.tier,
        role: op.role,
        refinement: op.refinement,
        sourceChecksum: op.publish.variables.recordSha256,
        expectedReviewVersion: op.publish.variables.expectedVersion,
      }));
    }
    console.log(JSON.stringify(summary, null, 2));
    return summary;
  }

  // An isolated test DB is disposable; pg_dump is unavailable in this harness.
  // Production/dev applies always take a real pg_dump backup.
  summary.backup = state.target.test && process.env.D3_SKIP_BACKUP === '1'
    ? { skipped: true, reason: 'ISOLATED_TEST_DB_DISPOSABLE' }
    : createBackup(state.target);
  const written = [];
  for (const op of result.operations) {
    const { adminPublishWeaponTierReview: published } = await gql(endpoint, process.env.ADMIN_KEY, {
      ...op.publish, variables: { ...op.publish.variables, expectedDatabase: state.target.database },
    });
    written.push({
      candidateId: op.candidateId,
      id: published.id,
      reviewStatus: published.reviewStatus,
      actor: published.approvedBy,
    });
  }
  const publicRows = (await gql(endpoint, process.env.ADMIN_KEY, { query: PUBLIC_QUERY })).weaponTierRanks;
  const adminRows = (await gql(endpoint, process.env.ADMIN_KEY, { query: ADMIN_QUERY })).adminWeaponTierRanks;
  summary.written = written;
  summary.verification = {
    publicCount: publicRows.length,
    adminCount: adminRows.length,
    allPublicApprovedIndependentAndRightsVerified: publicRows.every(r =>
      r.reviewStatus === 'APPROVED' && r.derivation === 'INDEPENDENT' && r.publishRightsVerified),
    noDuplicates: new Set(publicRows.map(r => `${r.weaponId}|${r.role}|${r.refinementContext}`)).size === publicRows.length,
    noUnapprovedInPublic: publicRows.every(r => r.reviewStatus === 'APPROVED'),
  };
  if (!written.every(row => publicRows.some(published => published.id === row.id)) ||
      !summary.verification.allPublicApprovedIndependentAndRightsVerified ||
      !summary.verification.noDuplicates || !summary.verification.noUnapprovedInPublic) {
    summary.ok = false;
    summary.issues.push('POST_IMPORT_VERIFICATION_FAILED');
  }
  console.log(JSON.stringify(summary, null, 2));
  return summary;
}

if (require.main === module) {
  run().then(s => { if (!s.ok) process.exitCode = 1; }).catch(error => {
    console.error(JSON.stringify({ ok: false, error: String(error.message || error) }, null, 2));
    process.exitCode = 1;
  });
}

module.exports = {
  plan, run, classify, parseSelection, loadD2Bridge, toDecisionRecord, loadDbDecisions, buildOperations,
  REVIEW_QUEUE, RIGHTS_GROUNDS, GROUP_B_ID, FAKE_ACTORS,
};
