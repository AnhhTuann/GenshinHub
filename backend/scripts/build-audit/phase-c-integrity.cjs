'use strict';
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { isDeepStrictEqual } = require('node:util');
const { PrismaClient } = require('@prisma/client');
const { parse } = require('dotenv');
const { inspect } = require('./multi-build-preflight.cjs');
const { prepare, readDocument, writeTarget } = require('./apply.cjs');

const sort = [{ order: 'asc' }, { id: 'asc' }];
const strip = ({ buildId, reviewStatus, ...row }) => row;

async function audit() {
  const [database, snapshotFile] = process.argv.slice(2);
  const config = process.env.DATABASE_URL ?? parse(readFileSync('.env')).DATABASE_URL;
  const target = writeTarget(config, database);
  assert.equal(new URL(config).host, '127.0.0.1:5434');
  const baseline = readDocument(snapshotFile).before;
  const docs = inspect();
  const prisma = new PrismaClient({ datasourceUrl: config });
  try {
    const result = await prisma.$transaction(async tx => {
      await tx.$executeRaw`SET TRANSACTION READ ONLY`;
      const [identity] = await tx.$queryRaw`SELECT current_database() db,current_schema() schema,pg_is_in_recovery() recovery,
        EXISTS (SELECT FROM pg_subscription) subscriptions`;
      assert.deepEqual(identity, { db: target.database, schema: 'public', recovery: false, subscriptions: false });

      const snapshot = {};
      snapshot.characters = await tx.character.findMany({ orderBy: { id: 'asc' } });
      snapshot.weapons = await tx.characterWeapon.findMany({ where: { build: { id: { startsWith: 'legacy-' } } }, orderBy: { id: 'asc' } });
      snapshot.artifacts = await tx.characterArtifact.findMany({ where: { build: { id: { startsWith: 'legacy-' } } }, orderBy: { id: 'asc' } });
      snapshot.teams = await tx.characterTeam.findMany({ where: { build: { id: { startsWith: 'legacy-' } } }, orderBy: { id: 'asc' } });
      snapshot.members = await tx.teamMember.findMany({ where: { teamId: { in: snapshot.teams.map(team => team.id) } }, orderBy: { id: 'asc' } });
      const counts = Object.fromEntries(Object.entries(snapshot).map(([name, data]) => [name, data.length]));
      const comparison = {};
      for (const [name, data] of Object.entries(snapshot)) {
        const before = new Map(baseline[name].map(row => [row.id, JSON.parse(JSON.stringify(strip(row)))]));
        const now = new Map(data.map(row => [row.id, JSON.parse(JSON.stringify(strip(row)))]));
        comparison[name] = {
          added: [...now.keys()].filter(id => !before.has(id)).length,
          missing: [...before.keys()].filter(id => !now.has(id)).length,
          changed: [...now].filter(([id, row]) => before.has(id) && !isDeepStrictEqual(before.get(id), row)).length,
        };
      }

      const [checks] = await tx.$queryRaw`SELECT
        (SELECT count(*)::int FROM "CharacterBuild" WHERE id LIKE 'legacy-%') AS legacy_profiles,
        (SELECT count(*)::int FROM (SELECT "characterId" FROM "CharacterBuild" WHERE "isDefault" GROUP BY 1 HAVING count(*)>1) d) AS duplicate_defaults,
        (SELECT count(*)::int FROM (SELECT "approvalChecksum" FROM "CharacterBuild" WHERE "approvalChecksum" IS NOT NULL GROUP BY 1 HAVING count(*)>1) d) AS duplicate_approvals,
        (SELECT count(*)::int FROM (SELECT "characterId",name FROM "CharacterBuild" GROUP BY 1,2 HAVING count(*)>1) d) AS duplicate_profiles,
        (SELECT count(*)::int FROM "CharacterBuild" b LEFT JOIN "Character" c ON c.id=b."characterId" WHERE c.id IS NULL) AS orphan_profiles,
        (SELECT count(*)::int FROM "CharacterWeapon" w LEFT JOIN "CharacterBuild" b ON b.id=w."buildId" AND b."characterId"=w."characterId" WHERE w."buildId" IS NOT NULL AND b.id IS NULL) AS orphan_weapons,
        (SELECT count(*)::int FROM "CharacterArtifact" a LEFT JOIN "CharacterBuild" b ON b.id=a."buildId" AND b."characterId"=a."characterId" WHERE a."buildId" IS NOT NULL AND b.id IS NULL) AS orphan_artifacts,
        (SELECT count(*)::int FROM "CharacterTeam" t LEFT JOIN "CharacterBuild" b ON b.id=t."buildId" AND b."characterId"=t."characterId" WHERE t."buildId" IS NOT NULL AND b.id IS NULL) AS orphan_teams,
        (SELECT count(*)::int FROM "TeamMember" m LEFT JOIN "CharacterTeam" t ON t.id=m."teamId" WHERE t.id IS NULL) AS orphan_members,
        (SELECT count(*)::int FROM "TeamMember" m LEFT JOIN "Character" c ON c.id=m."characterId" WHERE c.id IS NULL) AS unresolved_member_catalog_ids,
        (SELECT count(*)::int FROM "CharacterBuildAudit" a LEFT JOIN "CharacterBuild" b ON b.id=a."buildId" AND b."characterId"=a."characterId"
          WHERE b.id IS NULL OR a.version>b.version OR length(trim(a.actor))=0 OR length(trim(a.action))=0) AS invalid_audits`;
      for (const [key, count] of Object.entries(checks)) {
        if (key.startsWith('orphan_') || key.startsWith('duplicate_') || key === 'invalid_audits') assert.equal(count, 0, key);
      }
      const mitya = await tx.character.findUniqueOrThrow({ where: { id: 'mitya' } });
      const builds = [];
      for (const source of docs) {
        const approved = readDocument(source.file);
        const { draft } = approved;
        const expected = prepare(approved, {
          character: mitya,
          weapons: await tx.weapon.findMany({ where: { id: { in: draft.weapons.map(row => row.id) } } }),
          artifacts: await tx.artifactSet.findMany({ where: { id: { in: draft.artifacts.flat() } } }),
          characters: snapshot.characters,
        });
        const build = await tx.characterBuild.findUniqueOrThrow({
          where: { approvalChecksum: approved.approval.checksum }, include: {
            bestWeapons: { orderBy: sort }, bestArtifacts: { orderBy: sort }, teams: { orderBy: sort, include: { members: { orderBy: sort } } },
          },
        });
        assert.equal(build.characterId, draft.characterId);
        assert.equal(build.name, draft.playstyle);
        for (const [field, data] of Object.entries(expected)) {
          assert.deepEqual(['bestWeapons', 'bestArtifacts', 'teams'].includes(field) ? build[field].map(strip) : build[field], data, field);
        }
        builds.push({ id: build.id, name: build.name, isDefault: build.isDefault, approvalChecksum: build.approvalChecksum });
      }
      const migrations = await tx.$queryRaw`SELECT migration_name, checksum, finished_at IS NOT NULL AS finished,
        rolled_back_at IS NOT NULL AS rolled_back, applied_steps_count FROM _prisma_migrations ORDER BY migration_name`;
      return { identity, counts, comparison, checks, builds, migrations };
    }, { timeout: 15000 });
    console.log(JSON.stringify(result,null,2));
  } finally {
    await prisma.$disconnect();
  }
}
audit().catch(error => { console.error(error.message); process.exitCode=1; });
