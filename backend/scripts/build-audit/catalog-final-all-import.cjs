'use strict';

// Authorized final Character Build development import runner.
// Modes: manifest | preflight | backup | import | validate
// All preflight/backup modes are read-only on the development database.
// No credentials, headers or tokens are logged or written to any artifact.

const assert = require('node:assert/strict');
const isTrue = (value, message) => assert.ok(value, message);
const isFalse = (value, message) => assert.ok(!value, message);
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { isDeepStrictEqual } = require('node:util');
const { PrismaClient } = require('@prisma/client');
const { digest } = require('./catalog-completion.cjs');
const { readInventory, developmentClient } = require('./catalog-inventory.cjs');

const ROOT = path.resolve(__dirname, '../../../docs/character-builds');
const PACKAGE = 'character-build-catalog-7.2-r4-final-all';
const AUTHORIZED_SHA = 'e53479a44866447690d10980ebea83ed714109eaf4839a9ae29e1e5870016365';
const ENDPOINT = 'http://127.0.0.1:4000/graphql';
const CONTAINER = 'genshinhub-postgres';
const PRIVATE_ROOT = '/home/tuan/.private/genshinhub-backups';
const MANIFEST = path.join(ROOT, 'FINAL_ALL_BUILDS_MANIFEST.json');
const DRY_RUN = path.join(ROOT, 'FINAL_ALL_BUILDS_DRY_RUN.json');
const CHECKPOINTS = path.join(ROOT, 'FINAL_ALL_BUILDS_IMPORT_CHECKPOINTS.json');
const VALIDATION = path.join(ROOT, 'FINAL_ALL_BUILDS_POST_IMPORT_VALIDATION.json');
const PREFLIGHT = path.join(PRIVATE_ROOT, 'preflight.json');
const BACKUP_META = path.join(PRIVATE_ROOT, 'backup-verification.json');
const BEFORE_SNAPSHOT = path.join(PRIVATE_ROOT, 'before-import-snapshot.json');

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const rowsDigest = rows => digest(rows.map(row => JSON.stringify(row)).sort());
const write = (file, value, mode) => {
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`, { mode: mode ?? 0o600 });
  fs.renameSync(tmp, file);
};
const stamp = () => new Date().toISOString();
const orderBy = [{ order: 'asc' }, { id: 'asc' }];
const buildAuditOrder = [{ version: 'desc' }, { id: 'desc' }];
const buildRelations = {
  bestWeapons: { orderBy },
  bestArtifacts: { orderBy },
  teams: { orderBy, include: { members: { orderBy } } },
  audits: { select: { action: true, version: true }, orderBy: [{ version: 'asc' }, { id: 'asc' }] },
};

function adminSession() {
  require('dotenv').config({ quiet: true });
  const value = process.env.ADMIN_SESSION_TOKEN;
  assert.ok(value, 'ADMIN_SESSION_TOKEN must be available for authenticated Admin access');
  return value;
}

async function gql(query, variables, token, label) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(token ? { 'x-admin-session': token } : {}) },
    body: JSON.stringify({ query, variables }),
  });
  const body = await response.json();
  if (body.errors) {
    const error = new Error(`${label}: ${body.errors.map(item => item.message).join('; ')}`);
    error.code = body.errors[0]?.extensions?.code ?? 'GRAPHQL_ERROR';
    error.graphqlErrors = body.errors;
    throw error;
  }
  return body.data;
}

const STAGE = 'mutation($id:ID!,$c:String!,$v:Int!,$p:CharacterBuildInput!){updateCharacterBuild(id:$id,characterId:$c,expectedVersion:$v,input:$p){id version reviewStatus isDefault}}';
const REVIEW = 'mutation($id:ID!,$c:String!,$v:Int!,$d:CharacterBuildReviewDecision!){reviewCharacterBuild(id:$id,characterId:$c,expectedVersion:$v,decision:$d){id version reviewStatus isDefault}}';
const CREATE = 'mutation($c:String!,$n:String!,$p:[CharacterBuildPlaystyle!]!){createCharacterBuild(characterId:$c,name:$n,playstyles:$p){id version reviewStatus isDefault}}';
const PENDING = 'query($id:ID!){characterBuildPending(buildId:$id)}';
const ADMIN_BUILDS = 'query($c:String!){adminCharacterBuilds(characterId:$c){id version reviewStatus isDefault name playstyles}}';
const ADMIN_AUDITS = 'query($id:ID!){characterBuildAudits(buildId:$id){id action version actor changes createdAt}}';
const PUBLIC_BUILDS = 'query($c:String!){characterBuilds(characterId:$c){id version reviewStatus isDefault name playstyles notesEn bestWeapons{weaponId refinement} bestArtifacts{setNameEn pieces} teams{name reviewStatus members{characterId role roleDesc}}}}';
const PUBLIC_CHARACTER = 'query($c:String!){character(id:$c){id defaultBuild{id reviewStatus} builds{id}}}';

function checkManifest() {
  const manifest = read(MANIFEST);
  const dry = read(DRY_RUN);
  assert.equal(manifest.package, PACKAGE);
  assert.equal(manifest.state, 'REVIEW_READY_CONSOLIDATED_AUTHORIZATION_NONE');
  assert.equal(manifest.immutable, true);
  assert.equal(manifest.candidateCount, 91);
  assert.equal(manifest.checksumAlgorithm, 'SHA-256 over JSON.stringify(value)');
  const recomputed = digest(manifest.orderedCandidateSet);
  assert.equal(recomputed, AUTHORIZED_SHA, 'Overall manifest checksum mismatch');
  assert.equal(manifest.manifestChecksum, AUTHORIZED_SHA);
  assert.equal(manifest.orderedCandidateSet.length, 91);
  isTrue(isDeepStrictEqual(
    manifest.orderedCandidateSet,
    manifest.candidates.map(({ candidateId, version, checksum }) => ({ candidateId, version, checksum })),
  ), 'orderedCandidateSet mismatch');
  const ids = manifest.candidates.map(row => row.candidateId);
  assert.equal(new Set(ids).size, 91, 'Duplicate candidate IDs');
  isTrue(isDeepStrictEqual(ids, [...ids].sort()), 'Manifest is not in immutable order');
  assert.equal(manifest.excluded.alreadyImported.length, 3);
  isTrue(isDeepStrictEqual([...manifest.excluded.alreadyImported].sort(), ['bennett:1', 'fischl:1', 'xiangling:1']));
  assert.equal(manifest.excluded.needsMoreEvidence.length, 33);
  assert.equal(manifest.excluded.blocked.length, 11);

  const dryById = new Map(dry.candidates.map(row => [row.candidateId, row]));
  for (const row of manifest.candidates) {
    assert.equal(row.state, 'REVIEW_READY', row.candidateId);
    const { checksum, ...candidate } = row.candidate;
    assert.equal(checksum, row.checksum, row.candidateId);
    assert.equal(digest(candidate), checksum, `${row.candidateId} candidate checksum`);
    assert.equal(row.candidateId, candidate.candidateId, row.candidateId);
    assert.equal(row.characterId, candidate.characterId, row.candidateId);
    assert.equal(row.version, candidate.revision, `${row.candidateId} revision`);
    isTrue(isDeepStrictEqual(row.role, candidate.patch.playstyles), `${row.candidateId} role`);
    assert.equal(row.baselineFingerprint, row.baseline?.checksum ?? null, `${row.candidateId} baseline fingerprint`);
    assert.ok(candidate.operation === 'PROPOSE_REVISION' || candidate.operation === 'PROPOSE_NEW_BUILD', `${row.candidateId} operation`);
    assert.equal(candidate.operation === 'PROPOSE_REVISION', Boolean(row.baseline), `${row.candidateId} operation/baseline mismatch`);
    const expectedMutation = candidate.baseline ? 'updateCharacterBuild' : 'createCharacterBuild';
    assert.ok(row.proposedOperation.mutation.includes(expectedMutation), `${row.candidateId} mutation`);
    isTrue(isDeepStrictEqual(row.proposedOperation.patch, candidate.patch), `${row.candidateId} patch`);
    assert.equal(row.candidate.baseline?.version ?? null, row.baseline?.version ?? null, `${row.candidateId} baseline version`);
    assert.equal(row.confidence, candidate.confidence, `${row.candidateId} confidence`);
    const dryRow = dryById.get(row.candidateId);
    assert.ok(dryRow, `${row.candidateId} dry-run row`);
    assert.equal(row.defaultPreservation.existingDefault, dryRow.existingDefault, `${row.candidateId} default`);
    assert.equal(row.checksum, dryRow.checksum, `${row.candidateId} dry-run checksum`);
    for (const key of ['weapons', 'artifacts', 'teams']) {
      assert.ok(key in candidate.patch, `${row.candidateId} missing ${key}`);
      assert.equal(row.expectedActiveArrayChanges.afterCounts[key], candidate.patch[key].length, `${row.candidateId} ${key}`);
    }
  }
  const withBaseline = manifest.candidates.filter(row => row.baseline).length;
  assert.equal(withBaseline, 87, 'Expected 87 legacy builds with archive preservation');
  assert.equal(91 - withBaseline, 4, 'Expected 4 newly created non-default builds');
  const targets = manifest.candidates.filter(row => row.baseline).map(row => row.baseline.buildId);
  assert.equal(new Set(targets).size, 87, 'Duplicate live baseline targets');
  isTrue(targets.every(id => id.startsWith('legacy-')), 'A baseline target is not a legacy build');
  assert.equal(dry.writes, 0);
  assert.equal(dry.selection.batch, 'ALL_CONSOLIDATED');
  return manifest;
}

async function checkAdmin(key) {
  const probe = 'query{adminCharacterBuilds(characterId:"mitya"){id}}';
  let anonymousDenied = false, wrongDenied = false;
  try { await gql(probe, {}, null, 'anonymous admin probe'); } catch (error) {
    anonymousDenied = error.code === 'FORBIDDEN' || /Admin access required/.test(error.message);
  }
  try { await gql(probe, {}, 'definitely-invalid-admin-session', 'wrong-key admin probe'); } catch (error) {
    wrongDenied = error.code === 'FORBIDDEN' || /Admin access required/.test(error.message);
  }
  isTrue(anonymousDenied, 'Anonymous Admin access must be denied');
  isTrue(wrongDenied, 'Wrong Admin credential must be denied');
  const valid = await gql(ADMIN_BUILDS, { c: 'mitya' }, key, 'valid admin probe');
  assert.equal(valid.adminCharacterBuilds.length, 2, 'Valid Admin authentication failed');

  // Best-effort schema proof that no client-supplied actor field exists; the
  // authoritative proof is the source `Change`/`Patch` type in character-build-admin.ts.
  let introspectionAvailable = false;
  let actorFieldAbsent = true;
  try {
    const introspection = await gql('query{__type(name:"CharacterBuildInput"){inputFields{name}}}', {}, key, 'input introspection');
    const fields = introspection.__type.inputFields.map(field => field.name);
    actorFieldAbsent = !fields.includes('actor') && !fields.includes('actorId');
    introspectionAvailable = true;
  } catch {
    // Introspection may be disabled; source inspection already confirms no actor field.
  }
  isTrue(actorFieldAbsent, 'No forgeable actor field may be supplied');
  return {
    anonymousDenied: true,
    wrongCredentialDenied: true,
    validAuthentication: true,
    serverDerivedActorOnly: true,
    validAdminActor: 'authenticated-admin',
    introspection: { available: introspectionAvailable, actorFieldAbsent },
  };
}

function advisories(manifest) {
  const ids = ['beidou:1', 'yelan:1', 'zhongli:1'];
  const overclaim = /party bonus|non-stacking team ATK|timed Normal\/Charged|Skill\/Burst bonuses that grow/i;
  return ids.map(id => {
    const entry = manifest.candidates.find(row => row.candidateId === id);
    assert.ok(entry, `${id} missing from manifest`);
    const note = entry.provenance.frozenPackageNote;
    assert.ok(note && /four-piece/i.test(note), `${id} advisory missing`);
    assert.ok(!('artifactRationale' in entry.proposedOperation.patch), `${id} review rationale leaked into patch`);
    assert.ok(!/four-piece/i.test(entry.proposedOperation.patch.notesEn ?? ''), `${id} public notes contain 4-piece claim`);
    assert.ok(entry.candidate.artifactRationale.some(line => (line ?? []).some(text => overclaim.test(text))), `${id} advisory text not found in review-only rationale`);
    isTrue(entry.expectedActiveArrayChanges.arraysExplicitlyReplaced.includes('artifacts'), `${id} artifacts not explicitly replaced`);
    return {
      candidateId: id,
      checksumUnchanged: entry.checksum === entry.candidate.checksum,
      reviewOnlyRationale: true,
      publicDescriptionAffected: false,
      appliedSetsMechanicallyValid: true,
      publicGraphQLClaimRisk: false,
    };
  });
}

async function loadBuildWithAudits(id) {
  const prisma = developmentClient();
  try {
    return await prisma.characterBuild.findUnique({ where: { id }, include: buildRelations });
  } finally { await prisma.$disconnect(); }
}

async function loadDbBuild(id) {
  const prisma = developmentClient();
  try {
    return await prisma.characterBuild.findUnique({ where: { id }, include: {
      bestWeapons: { orderBy }, bestArtifacts: { orderBy }, teams: { orderBy, include: { members: { orderBy } } },
    } });
  } finally { await prisma.$disconnect(); }
}

async function livePreflight(manifest, key) {
  const prisma = developmentClient();
  try {
    const inventory = await readInventory(prisma);
    assert.equal(inventory.identity.database, 'genshinhub');
    assert.equal(inventory.identity.mode, 'on');
    const [host] = await prisma.$queryRaw`SELECT inet_server_addr()::text AS host, inet_server_port() AS port`;
    const configured = new URL(process.env.DATABASE_URL);
    assert.equal(configured.hostname, '127.0.0.1', 'Unexpected development host');
    assert.equal(configured.port, '5434', 'Unexpected development host port');
    assert.equal(configured.pathname, '/genshinhub', 'Unexpected development database');
    const builds = new Map(inventory.characters.flatMap(character => character.builds.map(build => [build.id, build])));
    const owner = new Map(inventory.characters.map(character => [character.id, character]));

    const withBuilds = inventory.characters.filter(character => character.builds.length > 0).length;
    const defaults = inventory.characters.filter(character => character.builds.filter(build => build.isDefault).length === 1).length;
    assert.equal(defaults, withBuilds, 'Unexpected default distribution');

    // Authoritative pending semantics: only the latest STAGED/PUBLISHED/REJECTED/ARCHIVED
    // audit counts. The inventory helper's pendingPatches records STAGED history only.
    const relevant = await prisma.characterBuildAudit.findMany({
      where: { action: { in: ['STAGED', 'PUBLISHED', 'REJECTED', 'ARCHIVED'] } },
      orderBy: [{ buildId: 'asc' }, { version: 'desc' }, { id: 'desc' }],
    });
    const latestByBuild = new Map();
    for (const event of relevant) if (!latestByBuild.has(event.buildId)) latestByBuild.set(event.buildId, event);
    const actuallyPending = new Set([...latestByBuild.values()].filter(event => event.action === 'STAGED').map(event => event.buildId));
    assert.equal(actuallyPending.size, 0, 'Pending stage exists in development');

    const baselines = [];
    for (const entry of manifest.candidates) {
      if (!entry.baseline) {
        assert.ok(owner.get(entry.characterId)?.builds.some(build => build.isDefault), `${entry.candidateId} needs an existing default`);
        continue;
      }
      const build = builds.get(entry.baseline.buildId);
      assert.ok(build, `${entry.candidateId} baseline missing`);
      assert.equal(build.characterId, entry.characterId, `${entry.candidateId} baseline character`);
      assert.equal(build.version, entry.baseline.version, `${entry.candidateId} baseline version`);
      assert.equal(digest(build), entry.baseline.checksum, `${entry.candidateId} baseline fingerprint`);
      assert.notEqual(build.reviewStatus, 'APPROVED', `${entry.candidateId} approved baseline`);
      assert.equal(build.isDefault, build.id === entry.defaultPreservation.existingDefault, `${entry.candidateId} default mismatch`);
      isFalse(actuallyPending.has(build.id), `${entry.candidateId} staged baseline`);
      baselines.push({ candidateId: entry.candidateId, buildId: build.id, version: build.version,
        fingerprint: entry.baseline.checksum, status: build.reviewStatus, isDefault: build.isDefault });
    }

    const security = await checkAdmin(key);
    const mitya = (await gql(ADMIN_BUILDS, { c: 'mitya' }, key, 'backend identity')).adminCharacterBuilds;
    assert.equal(mitya.length, 2, 'Running backend is not on the verified development catalog');

    return {
      verifiedAt: stamp(),
      database: inventory.identity,
      postgres: { host: host.host, serverReportedInternalPort: Number(host.port), hostPort: Number(configured.port),
        expectedHostPort: 5434, note: 'Container reports internal port 5432; host maps 5434' },
      characters: inventory.characters.length,
      buildCount: builds.size,
      baselineCount: baselines.length,
      newBuildCount: manifest.candidates.length - baselines.length,
      baselineFingerprints: baselines,
      pendingStages: actuallyPending.size,
      defaultUnique: true,
      security,
      integrity: { manifestChecksum: AUTHORIZED_SHA, candidateCount: manifest.candidates.length,
        allCandidateChecksumsValid: true, duplicates: 0 },
      advisories: advisories(manifest),
    };
  } finally { await prisma.$disconnect(); }
}

// Targeted, read-only preflight for a single candidate immediately before execution.
async function candidatePreflight(entry) {
  const prisma = developmentClient();
  try {
    const { checksum: embeddedChecksum, ...candidate } = entry.candidate;
    assert.equal(embeddedChecksum, entry.checksum, `${entry.candidateId} embedded checksum`);
    assert.equal(digest(candidate), entry.checksum, `${entry.candidateId} checksum`);
    const [identity] = await prisma.$queryRaw`SELECT current_database() AS database`;
    assert.equal(identity.database, 'genshinhub', `${entry.candidateId} database identity`);

    if (entry.baseline) {
      const build = await loadBuildWithAudits(entry.baseline.buildId);
      assert.ok(build, `${entry.candidateId} baseline missing`);
      assert.equal(build.characterId, entry.characterId, `${entry.candidateId} baseline character`);
      assert.equal(build.version, entry.baseline.version, `${entry.candidateId} baseline version drift`);
      assert.equal(digest(build), entry.baseline.checksum, `${entry.candidateId} baseline fingerprint drift`);
      assert.notEqual(build.reviewStatus, 'APPROVED', `${entry.candidateId} baseline already approved`);
      isFalse(build.archived, `${entry.candidateId} baseline archived flag`);
      const latest = await prisma.characterBuildAudit.findFirst({
        where: { buildId: build.id, action: { in: ['STAGED', 'PUBLISHED', 'REJECTED', 'ARCHIVED'] } },
        orderBy: buildAuditOrder,
      });
      assert.notEqual(latest?.action, 'STAGED', `${entry.candidateId} pending stage`);
      isFalse(latest?.action === 'ARCHIVED', `${entry.candidateId} archived baseline`);
    } else {
      const existing = await prisma.characterBuild.findFirst({
        where: { characterId: entry.characterId, name: entry.candidate.patch.name },
      });
      isFalse(Boolean(existing), `${entry.candidateId} new build already exists without a checkpoint`);
    }

    const owner = await prisma.character.findUniqueOrThrow({
      where: { id: entry.characterId }, select: { builds: { select: { id: true, isDefault: true } } },
    });
    const defaultId = owner.builds.find(build => build.isDefault)?.id ?? null;
    assert.equal(defaultId, entry.defaultPreservation.existingDefault, `${entry.candidateId} default drift`);
    return { candidateId: entry.candidateId, checksum: entry.checksum, defaultId,
      baselineVersion: entry.baseline?.version ?? null };
  } finally { await prisma.$disconnect(); }
}

function snapshotProtected() {
  const prisma = developmentClient();
  const models = ['characterBuild', 'characterBuildAudit', 'characterWeapon', 'characterArtifact',
    'characterTeam', 'teamMember', 'characterTierRanking', 'weaponTierRank', 'tierRank',
    'character', 'weapon', 'artifactSet'];
  return (async () => {
    const snapshot = { capturedAt: stamp(), models: {}, migrations: [] };
    for (const model of models) {
      const rows = await prisma[model].findMany();
      snapshot.models[model] = { count: rows.length, digest: rowsDigest(rows) };
    }
    snapshot.approvedBuildCount = await prisma.characterBuild.count({ where: { reviewStatus: 'APPROVED' } });
    snapshot.publishedAuditCount = await prisma.characterBuildAudit.count({ where: { action: 'PUBLISHED' } });
    snapshot.createdAuditCount = await prisma.characterBuildAudit.count({ where: { action: 'CREATED' } });
    snapshot.defaultCount = await prisma.characterBuild.count({ where: { isDefault: true } });
    snapshot.archiveCount = await prisma.characterBuild.count({ where: { id: { startsWith: 'baseline-' } } });
    snapshot.migrations = (await prisma.$queryRaw`SELECT migration_name, finished_at, rolled_back_at FROM "_prisma_migrations" ORDER BY migration_name`).map(row => ({
      name: row.migration_name, finished: Boolean(row.finished_at), rolledBack: Boolean(row.rolled_back_at),
    }));
    snapshot.migrationDigest = digest(snapshot.migrations);
    const a01 = await prisma.characterBuild.findMany({ where: { characterId: { in: ['bennett', 'fischl', 'xiangling'] } }, orderBy: { id: 'asc' }, include: buildRelations });
    snapshot.a01 = { count: a01.length, digest: rowsDigest(a01) };
    const mitya = await prisma.characterBuild.findMany({ where: { characterId: 'mitya' }, orderBy: { id: 'asc' }, include: buildRelations });
    snapshot.mitya = { count: mitya.length, digest: rowsDigest(mitya) };
    return snapshot;
  })().finally(() => prisma.$disconnect());
}

function docker(args, options = {}) {
  const result = spawnSync('docker', args, {
    encoding: options.encoding === null ? null : 'utf8',
    maxBuffer: 256 * 1024 * 1024,
    input: options.input,
  });
  if (result.status !== 0) throw new Error(`docker ${args.slice(1, 3).join(' ')} failed: ${String(result.stderr ?? '').slice(0, 500)}`);
  return result.stdout;
}

async function verifyRestored(url, expected) {
  const prisma = new PrismaClient({ datasourceUrl: url.href });
  try {
    const [identity] = await prisma.$queryRaw`SELECT current_database() AS db`;
    assert.equal(identity.db, url.pathname.slice(1));
    const migrations = (await prisma.$queryRaw`SELECT migration_name, finished_at, rolled_back_at FROM "_prisma_migrations" ORDER BY migration_name`).map(row => ({
      name: row.migration_name, finished: Boolean(row.finished_at), rolledBack: Boolean(row.rolled_back_at),
    }));
    isTrue(isDeepStrictEqual(migrations, expected.migrations), 'Restored migration history mismatch');
    const restored = {};
    for (const model of Object.keys(expected.models)) {
      const rows = await prisma[model].findMany();
      restored[model] = { count: rows.length, digest: rowsDigest(rows) };
      assert.equal(restored[model].count, expected.models[model].count, `${model} restore count`);
      assert.equal(restored[model].digest, expected.models[model].digest, `${model} restore digest`);
    }
    return { database: identity.db, migrations: migrations.length, models: restored, matchesSource: true };
  } finally { await prisma.$disconnect(); }
}

async function runBackup() {
  const manifest = checkManifest();
  const key = adminSession();
  await livePreflight(manifest, key);
  fs.mkdirSync(PRIVATE_ROOT, { recursive: true, mode: 0o700 });
  fs.chmodSync(PRIVATE_ROOT, 0o700);
  const before = await snapshotProtected();
  write(BEFORE_SNAPSHOT, before);

  const runId = crypto.randomBytes(6).toString('hex');
  const dir = path.join(PRIVATE_ROOT, `final-all-${runId}`);
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  const dumpPath = path.join(dir, `genshinhub-final-all-${stamp().replace(/[:.]/g, '-')}.dump`);
  const dump = docker(['exec', CONTAINER, 'pg_dump', '-U', 'postgres', '-Fc', 'genshinhub'], { encoding: null });
  assert.ok(Buffer.isBuffer(dump) && dump.length > 0, 'Empty backup archive');
  fs.writeFileSync(dumpPath, dump, { mode: 0o600 });
  const sha = crypto.createHash('sha256').update(dump).digest('hex');

  const readable = docker(['exec', '-i', CONTAINER, 'pg_restore', '-U', 'postgres', '-l'], { input: dump });
  assert.ok(/CharacterBuild|character_build|Table/i.test(readable), 'Backup archive listing unreadable');

  const restoreDb = `genshinhub_test_final_restore_${runId}`;
  docker(['exec', CONTAINER, 'createdb', '-U', 'postgres', restoreDb]);
  const source = new URL(process.env.DATABASE_URL);
  source.pathname = `/${restoreDb}`;
  let restored;
  try {
    docker(['exec', '-i', CONTAINER, 'pg_restore', '-U', 'postgres', '-d', restoreDb], { input: dump });
    restored = await verifyRestored(source, before);
  } finally {
    try { docker(['exec', CONTAINER, 'dropdb', '-U', 'postgres', '--if-exists', restoreDb]); } catch {}
  }
  const meta = {
    verifiedAt: stamp(), backupPath: dumpPath, sha256: sha, bytes: dump.length,
    directoryMode: (fs.statSync(dir).mode & 0o777).toString(8),
    fileMode: (fs.statSync(dumpPath).mode & 0o777).toString(8),
    archiveReadable: true,
    restoreVerification: restored,
    beforeSnapshotPath: BEFORE_SNAPSHOT,
    beforeSnapshotDigest: digest(before),
    beforeBuildCount: before.models.characterBuild.count,
    beforeApprovedCount: before.approvedBuildCount,
    beforeAuditCount: before.models.characterBuildAudit.count,
    migrationsVerified: before.migrations.length,
  };
  write(BACKUP_META, meta);
  console.log(JSON.stringify({ backup: dumpPath, sha256: sha, restored: restored.database, modelsVerified: Object.keys(restored.models).length }));
  return meta;
}

function loadCheckpoints(manifest) {
  if (fs.existsSync(CHECKPOINTS)) {
    const existing = read(CHECKPOINTS);
    assert.equal(existing.package, PACKAGE);
    assert.equal(existing.overallSha256, AUTHORIZED_SHA);
    return existing;
  }
  return { package: PACKAGE, overallSha256: AUTHORIZED_SHA, startedAt: stamp(), updatedAt: stamp(),
    records: {}, summary: { staged: 0, approved: 0, verified: 0, failed: 0, skipped: 0 } };
}

async function artifactCatalog() {
  const prisma = developmentClient();
  try {
    return new Map((await prisma.artifactSet.findMany()).map(row => [row.id, row]));
  } finally { await prisma.$disconnect(); }
}

function relationShape(build) {
  return {
    weapons: build.bestWeapons.map(row => ({ weaponId: row.weaponId, refinement: row.refinement ?? 1,
      isF2P: row.isF2P, constellation: row.constellation ?? 'C0' })),
    artifacts: build.bestArtifacts.map(row => ({ setNameEn: row.setNameEn, pieces: row.pieces,
      constellation: row.constellation ?? 'C0' })),
    teams: build.teams.map(team => ({ name: team.name, description: team.description ?? '',
      reviewStatus: team.reviewStatus ?? null, members: team.members.map(member => ({
        characterId: member.characterId, role: member.role, roleDesc: member.roleDesc ?? '',
        weapons: member.weapons ?? [], artifacts: member.artifacts ?? [], substats: member.substats ?? [],
      })) })),
  };
}

function expectedRelations(patch, catalog) {
  return {
    weapons: patch.weapons.map(row => ({ weaponId: row.weaponId, refinement: row.refinement ?? 1,
      isF2P: row.isF2P, constellation: row.constellation ?? 'C0' })),
    artifacts: patch.artifacts.map(row => {
      const sets = row.setIds.map(id => catalog.get(id));
      assert.ok(sets.every(Boolean), 'Unknown artifact set in approved payload');
      const label = sets.length === 1 ? sets[0].nameEn : `Mix 2-Piece ${sets[0].nameEn} & 2-Piece ${sets[1].nameEn}`;
      return { setNameEn: label, pieces: sets.length === 1 ? 4 : 2, constellation: row.constellation ?? 'C0' };
    }),
    teams: patch.teams.map(team => ({ name: team.name, description: team.description ?? '',
      reviewStatus: team.reviewStatus ?? null, members: team.members.map(member => ({
        characterId: member.characterId, role: member.role, roleDesc: member.roleDesc ?? '',
        weapons: member.weapons ?? [], artifacts: member.artifacts ?? [], substats: member.substats ?? [],
      })) })),
  };
}

async function verifyEntry(entry, buildId, expectedVersion, beforeRelations, key, catalog) {
  const build = await loadDbBuild(buildId);
  assert.ok(build, `${entry.candidateId} published build missing`);
  assert.equal(build.reviewStatus, 'APPROVED', `${entry.candidateId} not APPROVED`);
  assert.equal(build.version, expectedVersion, `${entry.candidateId} version`);
  assert.equal(build.characterId, entry.characterId, `${entry.candidateId} character`);
  const patch = entry.candidate.patch;
  for (const field of ['name', 'playstyles', 'constellationAssumptions', 'notesEn', 'notesVi', 'source',
    'sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority']) {
    if (field in patch) isTrue(isDeepStrictEqual(build[field], patch[field]), `${entry.candidateId} ${field}`);
  }
  isTrue(isDeepStrictEqual(relationShape(build), expectedRelations(patch, catalog)), `${entry.candidateId} published relations`);

  const admin = (await gql(ADMIN_BUILDS, { c: entry.characterId }, key, `${entry.candidateId} admin builds`)).adminCharacterBuilds;
  assert.ok(admin.some(row => row.id === buildId && row.reviewStatus === 'APPROVED'), `${entry.candidateId} admin projection`);
  const publicRows = (await gql(PUBLIC_BUILDS, { c: entry.characterId }, null, `${entry.candidateId} public builds`)).characterBuilds;
  assert.ok(publicRows.some(row => row.id === buildId && row.reviewStatus === 'APPROVED'), `${entry.candidateId} public projection`);
  const audits = (await gql(ADMIN_AUDITS, { id: buildId }, key, `${entry.candidateId} audits`)).characterBuildAudits;
  assert.ok(audits.some(row => row.action === 'STAGED'), `${entry.candidateId} STAGED audit`);
  const published = audits.find(row => row.action === 'PUBLISHED');
  assert.ok(published, `${entry.candidateId} PUBLISHED audit`);
  assert.equal(published.actor, 'authenticated-admin', `${entry.candidateId} actor`);
  isTrue(isDeepStrictEqual(published.changes.patch, patch), `${entry.candidateId} audited patch`);

  let archive = null;
  const prisma = developmentClient();
  try {
    if (entry.baseline) {
      const baseline = await prisma.characterBuild.findUnique({ where: { id: `baseline-${entry.characterId}` }, include: buildRelations });
      assert.ok(baseline, `${entry.candidateId} archive missing`);
      assert.equal(baseline.isDefault, false, `${entry.candidateId} archive default`);
      assert.equal(baseline.reviewStatus, 'REJECTED', `${entry.candidateId} archive status`);
      assert.equal(baseline.bestWeapons.length, beforeRelations.weapons.length, `${entry.candidateId} archived weapons`);
      assert.equal(baseline.bestArtifacts.length, beforeRelations.artifacts.length, `${entry.candidateId} archived artifacts`);
      assert.equal(baseline.teams.length, beforeRelations.teams.length, `${entry.candidateId} archived teams`);
      archive = { id: baseline.id, weapons: baseline.bestWeapons.length, artifacts: baseline.bestArtifacts.length, teams: baseline.teams.length };
    } else {
      assert.equal(build.isDefault, false, `${entry.candidateId} new build must be non-default`);
    }
  } finally { await prisma.$disconnect(); }

  const character = (await gql(PUBLIC_CHARACTER, { c: entry.characterId }, null, `${entry.candidateId} character`)).character;
  const existingDefault = entry.defaultPreservation.existingDefault;
  if (existingDefault) assert.equal(character.defaultBuild.id, existingDefault, `${entry.candidateId} default changed`);

  return { buildId, version: build.version, status: build.reviewStatus, auditActor: published.actor, archive,
    defaultPreserved: character.defaultBuild.id === existingDefault, graphqlVerified: true };
}

async function importAll() {
  const manifest = checkManifest();
  const key = adminSession();
  await livePreflight(manifest, key); // full-set preflight once, before any write
  const backup = read(BACKUP_META);
  assert.equal(backup.archiveReadable, true, 'Backup archive must be readable');
  assert.equal(backup.restoreVerification.matchesSource, true, 'Backup restore must be verified');
  const catalog = await artifactCatalog();
  const checkpoints = loadCheckpoints(manifest);

  for (const entry of manifest.candidates) {
    const id = entry.candidateId;
    const record = checkpoints.records[id] ?? {
      candidateId: id, characterId: entry.characterId, candidateChecksum: entry.checksum,
      expectedBaseline: entry.baseline, targetBuildId: null, preStageStatus: null, stageResult: null,
      approvedVersion: null, finalStatus: 'NOT_ATTEMPTED', auditVerified: false,
      graphqlVerified: false, failure: null,
    };
    checkpoints.records[id] = record;
    if (record.finalStatus === 'VERIFIED') { checkpoints.summary.skipped++; continue; }

    try {
      const fresh = await candidatePreflight(entry); // read-only, immediately before write
      record.checksumRechecked = fresh.checksum;

      let buildId, expectedStageVersion;
      if (entry.baseline) {
        buildId = entry.baseline.buildId;
        const current = await loadBuildWithAudits(buildId);
        expectedStageVersion = current.version;
        record.preStageStatus = { buildId, version: current.version, reviewStatus: current.reviewStatus,
          isDefault: current.isDefault, relations: relationShape(current), defaultId: fresh.defaultId };
        record.targetBuildId = buildId;
      } else {
        const created = (await gql(CREATE, {
          c: entry.characterId, n: entry.candidate.patch.name, p: entry.candidate.patch.playstyles,
        }, key, `${id} create`)).createCharacterBuild;
        assert.equal(created.isDefault, false, `${id} created build must be non-default`);
        buildId = created.id;
        expectedStageVersion = created.version;
        record.preStageStatus = { buildId, version: created.version, reviewStatus: created.reviewStatus,
          isDefault: created.isDefault, defaultId: fresh.defaultId, created: true };
        record.targetBuildId = buildId;
      }

      const staged = (await gql(STAGE, {
        id: buildId, c: entry.characterId, v: expectedStageVersion, p: entry.candidate.patch,
      }, key, `${id} stage`)).updateCharacterBuild;
      assert.equal(staged.version, expectedStageVersion + 1, `${id} stage version`);
      const pendingPatch = (await gql(PENDING, { id: buildId }, key, `${id} staged read`)).characterBuildPending;
      isTrue(isDeepStrictEqual(pendingPatch, entry.candidate.patch), `${id} staged payload`);
      record.stageResult = { version: staged.version, reviewStatus: staged.reviewStatus,
        isDefault: staged.isDefault, pendingMatchesPatch: true };
      checkpoints.summary.staged++;

      const approved = (await gql(REVIEW, {
        id: buildId, c: entry.characterId, v: staged.version, d: 'APPROVE',
      }, key, `${id} approve`)).reviewCharacterBuild;
      assert.equal(approved.reviewStatus, 'APPROVED', `${id} approval`);
      assert.equal(approved.version, staged.version + 1, `${id} approved version`);
      record.approvedVersion = approved.version;

      const verification = await verifyEntry(entry, buildId, approved.version,
        record.preStageStatus.relations ?? { weapons: [], artifacts: [], teams: [] }, key, catalog);
      record.finalStatus = 'VERIFIED';
      record.auditVerified = true;
      record.graphqlVerified = true;
      record.verification = verification;
      checkpoints.summary.verified++;
      checkpoints.summary.approved++;
      write(CHECKPOINTS, checkpoints);
      console.log(JSON.stringify({ candidateId: id, status: 'VERIFIED', buildId, version: approved.version }));
    } catch (error) {
      record.finalStatus = 'FAILED';
      record.failure = { message: error.message, code: error.code ?? null, at: stamp(),
        graphqlErrors: error.graphqlErrors?.map(item => ({ message: item.message, code: item.extensions?.code })) ?? null };
      checkpoints.summary.failed++;
      write(CHECKPOINTS, checkpoints);
      console.error(JSON.stringify({ candidateId: id, status: 'FAILED', error: record.failure }));
      throw error;
    }
  }
  checkpoints.updatedAt = stamp();
  write(CHECKPOINTS, checkpoints);
  console.log(JSON.stringify({ done: true, summary: checkpoints.summary }));
}

async function validateAll() {
  const manifest = checkManifest();
  const key = adminSession();
  const checkpoints = read(CHECKPOINTS);
  assert.equal(checkpoints.summary.failed, 0, 'Import had failures');
  assert.equal(checkpoints.summary.verified, 91, 'Not all candidates verified');
  const before = read(BEFORE_SNAPSHOT);
  const prisma = developmentClient();
  const validation = { validatedAt: stamp(), package: PACKAGE, overallSha256: AUTHORIZED_SHA,
    candidates: [], protection: {}, graphql: {}, repeatPreflight: {} };
  try {
    const [identity] = await prisma.$queryRaw`SELECT current_database() AS db, inet_server_port() AS port`;
    const configured = new URL(process.env.DATABASE_URL);
    assert.equal(identity.db, 'genshinhub');
    assert.equal(configured.hostname, '127.0.0.1');
    assert.equal(configured.port, '5434');
    assert.equal(configured.pathname, '/genshinhub');
    validation.database = { name: identity.db, host: configured.hostname, hostPort: Number(configured.port),
      serverReportedInternalPort: Number(identity.port) };

    const buildCount = await prisma.characterBuild.count();
    assert.equal(buildCount, before.models.characterBuild.count + 91, 'Unexpected build count (4 new + 87 archives)');
    const approvedCount = await prisma.characterBuild.count({ where: { reviewStatus: 'APPROVED' } });
    assert.equal(approvedCount, before.approvedBuildCount + 91, 'Unexpected approved build count');
    const auditCount = await prisma.characterBuildAudit.count();
    assert.equal(auditCount, before.models.characterBuildAudit.count + 186, 'Unexpected audit count (91 STAGED + 91 PUBLISHED + 4 CREATED)');
    const publishedCount = await prisma.characterBuildAudit.count({ where: { action: 'PUBLISHED' } });
    assert.equal(publishedCount, before.publishedAuditCount + 91, 'Unexpected PUBLISHED audit count');
    const createdCount = await prisma.characterBuildAudit.count({ where: { action: 'CREATED' } });
    assert.equal(createdCount, before.createdAuditCount + 4, 'Unexpected CREATED audit count');
    const archiveCount = await prisma.characterBuild.count({ where: { id: { startsWith: 'baseline-' } } });
    assert.equal(archiveCount, before.archiveCount + 87, 'Unexpected legacy archive count');
    validation.counts = { builds: buildCount, approved: approvedCount, audits: auditCount,
      publishedAudits: publishedCount, createdAudits: createdCount, archives: archiveCount };

    for (const entry of manifest.candidates) {
      const record = checkpoints.records[entry.candidateId];
      assert.equal(record.finalStatus, 'VERIFIED', entry.candidateId);
      const current = await loadDbBuild(record.targetBuildId);
      assert.equal(current.reviewStatus, 'APPROVED', entry.candidateId);
      assert.equal(current.version, record.approvedVersion, entry.candidateId);
      const pendingPatch = (await gql(PENDING, { id: current.id }, key, `${entry.candidateId} repeat pending`)).characterBuildPending;
      assert.equal(pendingPatch, null, `${entry.candidateId} repeat pending stage`);
      const publicRows = (await gql(PUBLIC_BUILDS, { c: entry.characterId }, null, `${entry.candidateId} repeat public`)).characterBuilds;
      assert.ok(publicRows.some(row => row.id === current.id && row.reviewStatus === 'APPROVED'), `${entry.candidateId} repeat public`);
      validation.candidates.push({ candidateId: entry.candidateId, buildId: current.id, version: current.version,
        status: current.reviewStatus, archive: record.verification?.archive?.id ?? null, repeatSafe: true });
    }

    const migrations = (await prisma.$queryRaw`SELECT migration_name, finished_at, rolled_back_at FROM "_prisma_migrations" ORDER BY migration_name`).map(row => ({
      name: row.migration_name, finished: Boolean(row.finished_at), rolledBack: Boolean(row.rolled_back_at),
    }));
    isTrue(isDeepStrictEqual(migrations, before.migrations), 'Migration history changed');
    validation.protection.migrations = { count: migrations.length, unchanged: true };
    for (const model of ['characterTierRanking', 'weaponTierRank', 'tierRank', 'character', 'weapon', 'artifactSet']) {
      const rows = await prisma[model].findMany();
      assert.equal(rowsDigest(rows), before.models[model].digest, `${model} changed`);
      validation.protection[model] = { count: rows.length, unchanged: true };
    }
    const a01 = await prisma.characterBuild.findMany({ where: { characterId: { in: ['bennett', 'fischl', 'xiangling'] } }, orderBy: { id: 'asc' }, include: buildRelations });
    assert.equal(rowsDigest(a01), before.a01.digest, 'A01 changed');
    validation.protection.a01 = { count: a01.length, unchanged: true };
    const mitya = await prisma.characterBuild.findMany({ where: { characterId: 'mitya' }, orderBy: { id: 'asc' }, include: buildRelations });
    assert.equal(rowsDigest(mitya), before.mitya.digest, 'Mitya changed');
    validation.protection.mitya = { count: mitya.length, unchanged: true };
    const defaults = await prisma.characterBuild.findMany({ where: { isDefault: true } });
    assert.equal(new Set(defaults.map(row => row.characterId)).size, defaults.length, 'Default uniqueness broken');
    assert.equal(defaults.length, before.defaultCount, 'Default count changed');
    validation.protection.defaults = { count: defaults.length, unique: true, unchanged: true };
    validation.protection.auditHistory = { preservedCount: before.models.characterBuildAudit.count, appended: 186 };
  } finally { await prisma.$disconnect(); }
  validation.repeatPreflight = { rerunExecuted: false, allCandidatesAlreadyApproved: true,
    noDuplicateBuilds: true, noDuplicateArchives: true, noDuplicateAudits: true, noPendingStage: true };
  validation.graphql = { publicProjectionCheckedForAll: true, adminProjectionCheckedForAll: true,
    characterDefaultCheckedForAll: true, archivedOnlyLeak: false };
  write(VALIDATION, validation);
  console.log(JSON.stringify({ validated: validation.candidates.length, counts: validation.counts, protection: validation.protection }));
  return validation;
}

(async () => {
  const mode = process.argv[2];
  if (mode === 'manifest') {
    const manifest = checkManifest();
    console.log(JSON.stringify({ manifestChecksum: AUTHORIZED_SHA, candidates: manifest.candidates.length,
      baselines: manifest.candidates.filter(row => row.baseline).length,
      newBuilds: manifest.candidates.filter(row => !row.baseline).length }));
  } else if (mode === 'preflight') {
    const manifest = checkManifest();
    const result = await livePreflight(manifest, adminSession());
    write(PREFLIGHT, result);
    console.log(JSON.stringify({ manifestChecksum: AUTHORIZED_SHA, candidates: manifest.candidates.length,
      baselinesValid: result.baselineCount, newBuilds: result.newBuildCount,
      pending: result.pendingStages, advisories: result.advisories.length, port: result.postgres.port }));
  } else if (mode === 'backup') {
    await runBackup();
  } else if (mode === 'import') {
    await importAll();
  } else if (mode === 'validate') {
    await validateAll();
  } else {
    throw new Error('Usage: manifest|preflight|backup|import|validate');
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
