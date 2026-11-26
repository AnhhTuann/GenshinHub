/**
 * Seed a disposable test database with the baseline used by the historical
 * Phase B2/B2.5/C1 GraphQL assertions. The source database is read-only; all
 * writes go to DATABASE_URL, which must be a local `genshinhub_test*` database.
 */
import 'dotenv/config';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';

const sourceUrl = process.env.VERIFY_SOURCE_DATABASE_URL;
const targetUrl = process.env.DATABASE_URL;
assert.ok(sourceUrl, 'VERIFY_SOURCE_DATABASE_URL is required');
assert.ok(targetUrl, 'DATABASE_URL is required');
assert.notEqual(sourceUrl, targetUrl, 'source and target databases must differ');

const target = new URL(targetUrl);
assert.ok(['127.0.0.1', 'localhost', '::1'].includes(target.hostname), 'target must be local');
assert.match(target.pathname, /^\/genshinhub_test/, 'target must be a genshinhub_test* database');

const draftPath = process.env.VERIFY_DRAFT_PATH ||
  path.resolve(__dirname, '../../../docs/tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json');
const rankings = JSON.parse(fs.readFileSync(draftPath, 'utf8')).rankings as Array<{ characterId: string }>;
const ids = [...new Set(rankings.map((r) => r.characterId))].sort();
const expectedBuildNames = ['C0 Off-Field Support / Sub DPS', 'C0 On-Field Main DPS'];

const source = new PrismaClient({ datasources: { db: { url: sourceUrl } } });
const dest = new PrismaClient({ datasources: { db: { url: targetUrl } } });

async function main() {
  try {
    const characters = await source.character.findMany({ where: { id: { in: ids } } });
    assert.equal(characters.length, ids.length, 'source is missing B2 character IDs');
    await dest.character.createMany({ data: characters as any[] });

    const builds = await source.characterBuild.findMany({
      where: { characterId: 'mitya', name: { in: expectedBuildNames } },
    });
    assert.equal(builds.length, 2, 'source does not have the two approved Mitya builds');
    await dest.characterBuild.createMany({
      data: builds.map((build) => ({ ...build, isDefault: build.id === 'legacy-mitya' })),
    });

    assert.equal(await (dest as any).characterTierRanking.count(), 0);
    assert.equal(await (dest as any).weaponTierRank.count(), 0);
    console.log(`seeded ${characters.length} characters and ${builds.length} Mitya builds into the disposable baseline`);
  } finally {
    await source.$disconnect();
    await dest.$disconnect();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
