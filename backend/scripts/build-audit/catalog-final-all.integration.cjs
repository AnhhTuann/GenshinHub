'use strict';

// Isolated PostgreSQL lifecycle verification for the entire consolidated R4 import set.
// Requires a fresh database created outside this script and a read-only development inventory.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const { spawn } = require('node:child_process');
const { randomBytes } = require('node:crypto');
const { isDeepStrictEqual } = require('node:util');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { digest } = require('./catalog-completion.cjs');

const inventory = JSON.parse(fs.readFileSync(process.env.FINAL_ALL_INVENTORY, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(process.env.FINAL_ALL_MANIFEST, 'utf8'));
const url = new URL(process.env.BUILD_AUDIT_TEST_DATABASE_URL);
assert.ok(['127.0.0.1', 'localhost'].includes(url.hostname));
assert.match(url.pathname, /^\/genshinhub_test_build_final_all_[a-z0-9]+$/);
const prisma = new PrismaClient({ datasourceUrl: url.href });
const secret = randomBytes(32).toString('hex');
let sessionToken = '';
const endpoint = 'http://127.0.0.1:4023/graphql';
const stageMutation = 'mutation($id:ID!,$c:String!,$v:Int!,$p:CharacterBuildInput!){updateCharacterBuild(id:$id,characterId:$c,expectedVersion:$v,input:$p){version reviewStatus isDefault}}';
const reviewMutation = 'mutation($id:ID!,$c:String!,$v:Int!,$d:CharacterBuildReviewDecision!){reviewCharacterBuild(id:$id,characterId:$c,expectedVersion:$v,decision:$d){version reviewStatus isDefault}}';
const createMutation = 'mutation($c:String!,$n:String!,$p:[CharacterBuildPlaystyle!]!){createCharacterBuild(characterId:$c,name:$n,playstyles:$p){id version reviewStatus isDefault}}';
const archiveMutation = 'mutation($id:ID!,$c:String!,$v:Int!){archiveCharacterBuild(id:$id,characterId:$c,expectedVersion:$v){reviewStatus}}';
const pendingQuery = 'query($id:ID!){characterBuildPending(buildId:$id)}';
const detailQuery = 'query($id:String!){character(id:$id){id defaultBuild{id name reviewStatus bestWeapons{weaponId} bestArtifacts{setNameEn pieces} teams{name reviewStatus members{characterId role roleDesc}}} builds{id isDefault reviewStatus}}}';
let child;

async function call(query, variables = {}, credential = sessionToken) {
  const response = await fetch(endpoint, { method: 'POST', headers: {
    'content-type': 'application/json', ...(credential ? { 'x-admin-session': credential } : {}),
  }, body: JSON.stringify({ query, variables }) });
  return response.json();
}
function ok(result) {
  assert.equal(result.errors, undefined, JSON.stringify(result.errors));
  return Object.values(result.data)[0];
}
const stripRelations = ({ builds, bestWeapons, bestArtifacts, teams, ...row }) => row;
const shape = rows => rows.map(row => row.id);

async function seed() {
  const [identity] = await prisma.$queryRaw`SELECT current_database() AS database`;
  assert.equal(identity.database, url.pathname.slice(1));
  assert.equal(await prisma.character.count(), 0, 'Fresh fixture required');
  const migrations = await prisma.$queryRaw`SELECT migration_name FROM "_prisma_migrations" WHERE finished_at IS NOT NULL AND rolled_back_at IS NULL`;
  assert.deepEqual(migrations.map(row => row.migration_name).sort(),
    fs.readdirSync('prisma/migrations').filter(name => /^\d{14}_/.test(name)).sort());
  await prisma.character.createMany({ data: inventory.characters.map(character => {
    const row = stripRelations(character);
    return Object.fromEntries(Object.entries(row).filter(([field, value]) => value !== null || !['stats', 'ascensionMats', 'talentMats'].includes(field)));
  }) });
  await prisma.weapon.createMany({ data: inventory.weapons });
  await prisma.artifactSet.createMany({ data: inventory.artifacts });
  for (const owner of inventory.characters) {
    for (const { bestWeapons, bestArtifacts, teams, audits, ...build } of owner.builds) {
      await prisma.characterBuild.create({ data: build });
      for (const row of bestWeapons) await prisma.characterWeapon.create({ data: row });
      for (const row of bestArtifacts) await prisma.characterArtifact.create({ data: row });
      for (const { members, ...team } of teams) {
        await prisma.characterTeam.create({ data: team });
        for (const member of members) await prisma.teamMember.create({ data: member });
      }
      for (const event of audits) await prisma.characterBuildAudit.create({ data: {
        characterId: owner.id, buildId: build.id, action: event.action, version: event.version,
        actor: 'fixture-seed', changes: {},
      } });
    }
  }
  return identity;
}

async function loadBuild(id) {
  const orderBy = [{ order: 'asc' }, { id: 'asc' }];
  return prisma.characterBuild.findUnique({ where: { id }, include: {
    bestWeapons: { orderBy },
    bestArtifacts: { orderBy },
    teams: { orderBy, include: { members: { orderBy } } },
    audits: { select: { action: true, version: true }, orderBy: [{ version: 'asc' }, { id: 'asc' }] },
  } });
}

async function snapshotCollections(buildId) {
  const orderBy = [{ order: 'asc' }, { id: 'asc' }];
  return {
    weapons: await prisma.characterWeapon.findMany({ where: { buildId }, orderBy }),
    artifacts: await prisma.characterArtifact.findMany({ where: { buildId }, orderBy }),
    teams: await prisma.characterTeam.findMany({ where: { buildId }, orderBy, include: { members: { orderBy } } }),
  };
}

async function verifyAll() {
  const manifestChecksum = digest(manifest.orderedCandidateSet);
  assert.equal(manifestChecksum, manifest.manifestChecksum);
  for (const entry of manifest.candidates) {
    const { checksum, ...candidate } = entry.candidate;
    assert.equal(digest(candidate), checksum, entry.candidateId);
    assert.equal(entry.checksum, checksum, entry.candidateId);
  }
  child = spawn(process.execPath, ['-r', 'ts-node/register', 'src/index.ts'], {
    env: { ...process.env, PORT: '4023', DATABASE_URL: url.href,
      ADMIN_JWT_SECRET: randomBytes(32).toString('hex') },
    stdio: 'ignore',
  });
  for (let i = 0;; i++) {
    if (child.exitCode !== null || i === 120) throw Error('Isolated backend unavailable');
    try { if ((await fetch('http://127.0.0.1:4023/health')).ok) break; } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  await prisma.admin.create({ data: {
    username: 'integration_owner', passwordHash: await bcrypt.hash(secret, 12),
    role: 'OWNER', status: 'ACTIVE',
  } });
  const loginResponse = await fetch('http://127.0.0.1:4023/auth/admin/login', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: 'integration_owner', password: secret }),
  });
  const login = await loginResponse.json();
  assert.equal(loginResponse.status, 200, JSON.stringify(login));
  sessionToken = login.token;
  assert.ok(sessionToken, 'Admin session token required');

  const sample = manifest.candidates[0];
  for (const key of [null, 'incorrect-credential']) {
    const result = await call(stageMutation, { id: 'legacy-' + sample.characterId, c: sample.characterId, v: 1, p: sample.candidate.patch }, key);
    assert.match(result.errors[0].message, /Admin access required/);
  }
  const tampered = structuredClone(sample.candidate);
  tampered.patch = { ...tampered.patch, sands: ['ATK%'] };
  assert.notEqual(digest(tampered), sample.checksum);

  const mityaBefore = await prisma.characterBuild.findMany({ where: { characterId: 'mitya' }, orderBy: { id: 'asc' } });
  const unrelatedBefore = await prisma.characterBuild.findMany({ where: { characterId: { in: ['traveler', 'linnea'] } }, orderBy: { id: 'asc' } });

  // Full candidate set: stage, inspect, approve and verify every import.
  let archives = 0, newBuilds = 0, published = 0;
  for (const entry of manifest.candidates) {
    const candidate = entry.candidate;
    const owner = inventory.characters.find(character => character.id === entry.characterId);
    let build;
    if (candidate.baseline) {
      build = await loadBuild(candidate.baseline.buildId);
      assert.equal(build.version, candidate.baseline.version, entry.candidateId);
      assert.equal(digest(build), candidate.baseline.checksum, entry.candidateId);
    } else {
      const created = ok(await call(createMutation, { c: entry.characterId, n: candidate.patch.name, p: candidate.patch.playstyles }));
      build = await prisma.characterBuild.findUniqueOrThrow({ where: { id: created.id } });
      newBuilds++;
    }
    const beforeCollections = await snapshotCollections(build.id);
    const beforePublic = ok(await call(detailQuery, { id: entry.characterId }, null));
    const args = { id: build.id, c: entry.characterId, v: build.version, p: candidate.patch };
    const race = await Promise.all([call(stageMutation, args), call(stageMutation, args)]);
    assert.equal(race.filter(row => !row.errors).length, 1, entry.candidateId);
    assert.equal(race.filter(row => row.errors?.[0]?.extensions?.code === 'CONFLICT').length, 1, entry.candidateId);
    const staged = ok(race.find(row => !row.errors));
    assert.deepEqual(ok(await call(pendingQuery, { id: build.id })), candidate.patch, entry.candidateId);
    assert.deepEqual(await snapshotCollections(build.id), beforeCollections, entry.candidateId + ' staging must not change live rows');
    assert.deepEqual(ok(await call(detailQuery, { id: entry.characterId }, null)), beforePublic, entry.candidateId + ' staging must not change public output');
    const approved = ok(await call(reviewMutation, { id: build.id, c: entry.characterId, v: staged.version, d: 'APPROVE' }));
    assert.equal(approved.reviewStatus, 'APPROVED', entry.candidateId);
    published++;
    const replay = await call(reviewMutation, { id: build.id, c: entry.characterId, v: staged.version, d: 'APPROVE' });
    assert.equal(replay.errors?.[0]?.extensions?.code, 'CONFLICT', entry.candidateId);
    const active = await snapshotCollections(build.id);
    for (const key of ['weapons', 'artifacts', 'teams']) {
      assert.equal(active[key].length, entry.expectedActiveArrayChanges.afterCounts[key], entry.candidateId + ' ' + key);
    }
    if (active.teams.length) {
      assert.equal(active.teams[0].members.length, 4, entry.candidateId);
      assert.ok(active.teams[0].members.every(member => member.role && member.roleDesc), entry.candidateId + ' roles');
    }
    const publicData = ok(await call(detailQuery, { id: entry.characterId }, null));
    assert.equal(publicData.defaultBuild.id, owner.builds.find(row => row.isDefault)?.id ?? publicData.defaultBuild.id, entry.candidateId + ' default preserved');
    const trail = await prisma.characterBuildAudit.findMany({ where: { buildId: build.id }, orderBy: { version: 'asc' } });
    assert.ok(trail.every(row => row.actor === 'authenticated-admin' || row.actor === 'fixture-seed'), entry.candidateId + ' actor');
    assert.equal(trail.at(-1).action, 'PUBLISHED', entry.candidateId);
    assert.deepEqual(trail.at(-1).changes.patch, candidate.patch, entry.candidateId);
    if (candidate.baseline) {
      const archive = await prisma.characterBuild.findUnique({ where: { id: 'baseline-' + entry.characterId } });
      assert.ok(archive && !archive.isDefault && archive.reviewStatus === 'REJECTED', entry.candidateId + ' archive');
      assert.equal(await prisma.characterWeapon.count({ where: { buildId: archive.id } }), beforeCollections.weapons.length);
      assert.equal(await prisma.characterArtifact.count({ where: { buildId: archive.id } }), beforeCollections.artifacts.length);
      const archivedTeams = await prisma.characterTeam.findMany({ where: { buildId: archive.id }, include: { members: true } });
      assert.equal(archivedTeams.length, beforeCollections.teams.length);
      for (const team of archivedTeams) assert.equal(team.members.length, 4);
      archives++;
    }
  }

  // Rejection keeps published content live; default protection and archival remain enforced.
  const rejectionTarget = manifest.candidates.find(row => row.candidate.baseline);
  const rb = await prisma.characterBuild.findUniqueOrThrow({ where: { id: rejectionTarget.candidate.baseline.buildId } });
  const rejectStage = ok(await call(stageMutation, { id: rb.id, c: rejectionTarget.characterId, v: rb.version, p: { notesEn: 'Isolated rejection test' } }));
  const beforeRejectCollections = await snapshotCollections(rb.id);
  ok(await call(reviewMutation, { id: rb.id, c: rejectionTarget.characterId, v: rejectStage.version, d: 'REJECT' }));
  assert.deepEqual(await snapshotCollections(rb.id), beforeRejectCollections);
  assert.equal((await prisma.characterBuild.findUniqueOrThrow({ where: { id: rb.id } })).reviewStatus, 'APPROVED');

  const alt = ok(await call(createMutation, { c: 'mitya', n: 'Isolated rollback exercise', p: ['SUPPORT'] }));
  assert.equal(alt.isDefault, false);
  const altStage = ok(await call(stageMutation, { id: alt.id, c: 'mitya', v: alt.version, p: { sands: ['Energy Recharge'] } }));
  ok(await call(reviewMutation, { id: alt.id, c: 'mitya', v: altStage.version, d: 'APPROVE' }));
  await assert.rejects(prisma.characterBuild.update({ where: { id: alt.id }, data: { isDefault: true } }), error => error.code === 'P2002');
  const archived = ok(await call(archiveMutation, { id: alt.id, c: 'mitya', v: alt.version + 2 }));
  assert.equal(archived.reviewStatus, 'REJECTED');
  const publicMitya = ok(await call(detailQuery, { id: 'mitya' }, null));
  assert.ok(publicMitya.builds.every(row => row.id !== alt.id));
  assert.deepEqual(await prisma.characterBuild.findMany({
    where: { characterId: 'mitya', id: { in: mityaBefore.map(row => row.id) } }, orderBy: { id: 'asc' },
  }), mityaBefore);
  assert.deepEqual(await prisma.characterBuild.findMany({ where: { characterId: { in: ['traveler', 'linnea'] } }, orderBy: { id: 'asc' } }), unrelatedBefore);

  return { database: url.pathname.slice(1), candidates: manifest.candidates.length, published, archives, newBuilds,
    isolatedTestApprovals: published + 1, realApprovals: 0, checks: [
      'full-set checksum and baseline verification', 'anonymous and wrong-key denial', 'tampered payload detection',
      'concurrent stage conflict', 'idempotent replay guard', 'exact pending patch', 'staging leaves live rows and GraphQL unchanged',
      'approval audit and exact patch', 'explicit collection replacement', 'legacy archive preservation', 'new alternate is non-default',
      'default uniqueness', 'rejection preserves published content', 'archive read-only', 'Mitya and unrelated builds unchanged',
      'public Character Detail GraphQL output',
    ] };
}

(async () => {
  const identity = await seed();
  const result = await verifyAll();
  console.log(JSON.stringify({ ...result, migrationsIdentity: identity.database }));
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => {
  if (child?.pid) child.kill();
  await prisma.$disconnect();
});
