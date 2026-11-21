'use strict';
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { PrismaClient } = require('@prisma/client');
const { parse } = require('dotenv');
const { prepare, readDocument, saveJournal, writeTarget } = require('./apply.cjs');
const { inspect } = require('./multi-build-preflight.cjs');

const scalars = ['sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority', 'signatureWeapons'];
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const ordered = [{ order: 'asc' }, { id: 'asc' }];
const pilot = approvals => ({
  main: readDocument(approvals.find(row => row.playstyles.includes('MAIN_DPS')).file),
  support: readDocument(approvals.find(row => row.playstyles.includes('SUPPORT')).file),
});
const fields = (row, keys) => Object.fromEntries(keys.map(key => [key, row[key]]));
const payload = row => fields(row, scalars);
const strip = ({ buildId, reviewStatus, ...row }) => row;

async function rows(tx) {
  const characters = await tx.character.findMany({ orderBy: { id: 'asc' } });
  const weapons = await tx.characterWeapon.findMany({ orderBy: { id: 'asc' } });
  const artifacts = await tx.characterArtifact.findMany({ orderBy: { id: 'asc' } });
  const teams = await tx.characterTeam.findMany({ orderBy: { id: 'asc' } });
  const members = await tx.teamMember.findMany({ orderBy: { id: 'asc' } });
  return { characters, weapons, artifacts, teams, members };
}

function legacy(data) {
  return { characters: data.characters, weapons: data.weapons.map(strip), artifacts: data.artifacts.map(strip),
    teams: data.teams.map(strip), members: data.members };
}

async function catalog(tx, draft, character) {
  return {
    character,
    weapons: await tx.weapon.findMany({ where: { id: { in: draft.weapons.map(row => row.id) } } }),
    artifacts: await tx.artifactSet.findMany({ where: { id: { in: draft.artifacts.flat() } } }),
    characters: await tx.character.findMany({ where: { id: { in: draft.teams.flatMap(team => team.members.map(row => row.characterId)) } } }),
  };
}

async function verifyProfile(tx, profile, expected) {
  const actual = await tx.characterBuild.findUniqueOrThrow({ where: { id: profile.id }, include: {
    bestWeapons: { orderBy: ordered }, bestArtifacts: { orderBy: ordered },
    teams: { orderBy: ordered, include: { members: { orderBy: ordered } } },
  } });
  for (const key of Object.keys(expected)) {
    const value = key === 'teams' ? actual.teams.map(strip) :
      key === 'bestWeapons' || key === 'bestArtifacts' ? actual[key].map(strip) : actual[key];
    assert.deepEqual(value, expected[key], `${profile.id} ${key}`);
  }
}

async function safety(tx, target) {
  const [check] = await tx.$queryRaw`SELECT current_database() AS db, current_schema() AS schema,
    inet_server_addr()::text AS address, pg_is_in_recovery() AS recovery,
    EXISTS (SELECT FROM pg_subscription) AS subscriptions,
    coalesce(current_setting('primary_conninfo',true),'') <> '' AS upstream`;
  assert.equal(check.db, target.database);
  assert.equal(check.schema, 'public');
  assert.match(check.address, /^172\.(1[6-9]|2\d|3[01])\./);
  assert.ok(!check.recovery && !check.subscriptions && !check.upstream);
}

async function backfill(tx, before, support) {
  assert.ok(before.weapons.every(row => !row.buildId || row.buildId === `legacy-${row.characterId}`));
  assert.ok(before.artifacts.every(row => !row.buildId || row.buildId === `legacy-${row.characterId}`));
  assert.ok(before.teams.every(row => !row.buildId || row.buildId === `legacy-${row.characterId}`));
  const owners = new Set([...before.weapons, ...before.artifacts, ...before.teams].map(row => row.characterId));
  const existing = await tx.characterBuild.findMany();
  const character = before.characters.find(row => row.id === support.draft.characterId);
  const expectedSupport = prepare(support, await catalog(tx, support.draft, character));
  const chars = before.characters.filter(row => owners.has(row.id) || scalars.some(key => row[key].length > 0));
  const supportId = `legacy-${character.id}`;
  const expectedProfiles = chars.map(row => {
    const isSupport = row.id === character.id;
    return {
      id: `legacy-${row.id}`, characterId: row.id, name: isSupport ? support.draft.playstyle : 'Legacy build',
      isDefault: true, reviewStatus: isSupport ? 'APPROVED' : 'LEGACY_IMPORT',
      playstyles: isSupport ? ['SUB_DPS', 'SUPPORT'] : [], constellationAssumptions: isSupport ? ['C0'] : [],
      approvalChecksum: isSupport ? support.approval.checksum : null,
      source: isSupport ? support.draft.source.reference : 'Legacy development build',
      notesEn: isSupport ? 'Off-field Support / Sub DPS. Check each team’s conditions and experimental status.' : null,
      ...payload(row),
    };
  });
  for (const profile of existing) {
    const expected = expectedProfiles.find(row => row.id === profile.id);
    assert.ok(expected, `Unexpected existing profile: ${profile.id}`);
    assert.deepEqual(fields(profile, Object.keys(expected)), expected);
    assert.equal(profile.version, 1);
  }
  const fresh = expectedProfiles.filter(row => !existing.some(profile => profile.id === row.id));
  if (fresh.length) {
    await tx.characterBuild.createMany({ data: fresh });
    await tx.characterBuildAudit.createMany({ data: fresh.map(row => ({
      id: `backfill-${row.id}`, buildId: row.id, characterId: row.characterId, version: 1,
      actor: 'development-backfill', action: 'LEGACY_BACKFILLED',
      changes: { approvalChecksum: row.approvalChecksum, baselineHash: hash(payload(row)) },
    })) });
  }
  const attached = await tx.$executeRaw`UPDATE "CharacterWeapon" w SET "buildId" = b.id
    FROM "CharacterBuild" b WHERE w."characterId" = b."characterId" AND b.id = 'legacy-' || w."characterId" AND w."buildId" IS NULL`
    + await tx.$executeRaw`UPDATE "CharacterArtifact" a SET "buildId" = b.id
    FROM "CharacterBuild" b WHERE a."characterId" = b."characterId" AND b.id = 'legacy-' || a."characterId" AND a."buildId" IS NULL`
    + await tx.$executeRaw`UPDATE "CharacterTeam" t SET "buildId" = b.id
    FROM "CharacterBuild" b WHERE t."characterId" = b."characterId" AND b.id = 'legacy-' || t."characterId" AND t."buildId" IS NULL`;
  const experimental = expectedSupport.teams.filter(team => /experimental/i.test(`${team.name} ${team.description}`));
  const tagged = await tx.characterTeam.updateMany({
    where: { buildId: supportId, id: { in: experimental.map(team => team.id) }, reviewStatus: null },
    data: { reviewStatus: 'EXPERIMENTAL' },
  });
  const after = await rows(tx);
  assert.deepEqual(legacy(after), legacy(before), 'Legacy rows changed');
  for (const child of [...after.weapons, ...after.artifacts, ...after.teams]) {
    assert.equal(child.buildId, `legacy-${child.characterId}`);
  }
  for (const profile of await tx.characterBuild.findMany()) {
    const expected = expectedProfiles.find(row => row.id === profile.id);
    assert.deepEqual(fields(profile, Object.keys(expected)), expected);
  }
  await verifyProfile(tx, { id: supportId }, expectedSupport);
  return { created: fresh.length, attached, experimentalTagged: tagged.count, characters: chars.length };
}

async function importMain(tx, before, { main, support }) {
  const character = before.characters.find(row => row.id === main.draft.characterId);
  const supportProfile = await tx.characterBuild.findUniqueOrThrow({ where: { id: `legacy-${character.id}` } });
  assert.equal(supportProfile.approvalChecksum, support.approval.checksum);
  assert.equal(supportProfile.isDefault, true);
  const supportExpected = prepare(support, await catalog(tx, support.draft, character));
  await verifyProfile(tx, supportProfile, supportExpected);
  const expected = prepare(main, await catalog(tx, main.draft, character));
  const existing = await tx.characterBuild.findUnique({ where: { approvalChecksum: main.approval.checksum } });
  if (existing) {
    assert.equal(existing.characterId, character.id);
    await verifyProfile(tx, existing, expected);
    return { created: false, id: existing.id };
  }
  const profile = await tx.characterBuild.create({ data: {
    id: `approved-${main.approval.checksum}`, characterId: character.id,
    name: main.draft.playstyle, playstyles: ['MAIN_DPS'], constellationAssumptions: ['C0'],
    source: main.draft.source.reference, approvalChecksum: main.approval.checksum,
    reviewStatus: 'APPROVED', notesEn: 'On-field Main DPS. See team descriptions for rotation assumptions.',
    ...fields(expected, scalars.filter(key => key !== 'signatureWeapons')), signatureWeapons: [],
  } });
  await tx.characterWeapon.createMany({ data: expected.bestWeapons.map(row => ({ ...row, buildId: profile.id })) });
  await tx.characterArtifact.createMany({ data: expected.bestArtifacts.map(row => ({ ...row, buildId: profile.id })) });
  for (const { members, ...team } of expected.teams) {
    await tx.characterTeam.create({ data: { ...team, buildId: profile.id } });
    await tx.teamMember.createMany({ data: members });
  }
  await tx.characterBuildAudit.create({ data: {
    buildId: profile.id, characterId: character.id, action: 'APPROVED_IMPORT', actor: main.approval.reviewer,
    version: 1, changes: { approval: main.approval, source: main.draft.source },
  } });
  await verifyProfile(tx, profile, expected);
  await verifyProfile(tx, supportProfile, supportExpected);
  const after = await rows(tx);
  const mainTeams = new Set(expected.teams.map(team => team.id));
  assert.deepEqual(legacy({
    ...after,
    weapons: after.weapons.filter(row => row.buildId !== profile.id),
    artifacts: after.artifacts.filter(row => row.buildId !== profile.id),
    teams: after.teams.filter(row => row.buildId !== profile.id),
    members: after.members.filter(row => !mainTeams.has(row.teamId)),
  }), legacy(before));
  return { created: true, id: profile.id };
}

async function run() {
  const [action, database, snapshot] = process.argv.slice(2);
  if (!['backfill', 'mitya-main'].includes(action) || !snapshot) {
    throw new Error('Usage: node scripts/build-audit/multi-build.cjs <backfill|mitya-main> <database> <snapshot file>');
  }
  const config = process.env.DATABASE_URL ?? parse(readFileSync(resolve('.env'))).DATABASE_URL;
  const target = writeTarget(config, database);
  assert.ok(target.localDockerPort && ['genshinhub', 'genshinhub_multibuild_test_b49'].includes(database));
  const approvals = pilot(inspect());
  const prisma = new PrismaClient({ datasourceUrl: config });
  try {
    const result = await prisma.$transaction(async tx => {
      await safety(tx, target);
      await tx.$executeRaw`SET LOCAL lock_timeout = '5s'`;
      await tx.$executeRaw`LOCK TABLE "Character", "CharacterWeapon", "CharacterArtifact", "CharacterTeam", "TeamMember",
        "CharacterBuild", "CharacterBuildAudit" IN SHARE ROW EXCLUSIVE MODE`;
      const before = await rows(tx);
      const checksum = hash(legacy(before));
      if (process.env.BUILD_EXPECTED_BASELINE) assert.equal(checksum, process.env.BUILD_EXPECTED_BASELINE, 'Development data differs from the restored snapshot');
      saveJournal(snapshot, { action, target, checksum, before });
      const result = action === 'backfill' ? await backfill(tx, before, approvals.support) : await importMain(tx, before, approvals);
      return { ...result, baseline: Object.fromEntries(Object.entries(before).map(([key, value]) => [key, value.length])), checksum };
    }, { timeout: 30000 });
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) run().catch(error => { console.error(error); process.exitCode = 1; });
