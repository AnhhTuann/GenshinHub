'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { openReadOnly } = require('../weapon-tier-audit/db.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const MIGRATIONS = path.join(ROOT, 'backend', 'prisma', 'migrations');
const REPORT = path.join(ROOT, 'docs', 'weapon-tier-audit', 'PHASE_B2_REPORT.md');

test('managed migration checksums match the applied records exactly', async () => {
  const { prisma } = openReadOnly();
  try {
    const rows = await prisma.$queryRawUnsafe('SELECT migration_name, checksum FROM "_prisma_migrations" ORDER BY finished_at');
    const recorded = new Map(rows.map(r => [r.migration_name, r.checksum]));
    const names = fs.readdirSync(MIGRATIONS).filter(n => /^\d{14}_/.test(n)).sort();
    assert.deepEqual(names, [
      '20261120000000_legacy_baseline',
      '20261120145000_add_character_builds',
      '20261120151000_add_character_tier_rankings',
      '20261120153500_add_weapon_tier_rankings',
      '20261120160000_add_weapon_tier_review_workflow',
      '20261121100452_add_database_backed_auth',
      '20261121141000_add_maintenance_build_status',
    ]);
    for (const name of names) {
      const sql = fs.readFileSync(path.join(MIGRATIONS, name, 'migration.sql'));
      assert.equal(recorded.get(name), crypto.createHash('sha256').update(sql).digest('hex'));
    }
  } finally {
    await prisma.$disconnect();
  }
});

test('weapon migration is additive and no ranking row was written', async () => {
  const { prisma } = openReadOnly();
  try {
    const [[ranks], [audits]] = await prisma.$transaction([
      prisma.$queryRawUnsafe('SELECT count(*)::int AS n FROM "WeaponTierRank"'),
      prisma.$queryRawUnsafe('SELECT count(*)::int AS n FROM "WeaponTierAudit"'),
    ]);
    assert.equal(ranks.n, 0);
    assert.equal(audits.n, 0);
    const sql = fs.readFileSync(path.join(MIGRATIONS, '20261120153500_add_weapon_tier_rankings', 'migration.sql'), 'utf8');
    const code = sql.split('\n').filter(l => !l.trimStart().startsWith('--')).join('\n');
    // ON DELETE CASCADE on the two brand-new FKs is allowed; a standalone DELETE is not.
    for (const forbidden of [/\bDROP\b/i, /\bTRUNCATE\b/i, /^\s*DELETE\s+/im, /CharacterBuild/i]) {
      assert.equal(forbidden.test(code), false);
    }
  } finally {
    await prisma.$disconnect();
  }
});

test('character tier migration objects physically exist despite steps count 0', async () => {
  const { prisma } = openReadOnly();
  try {
    const indexes = await prisma.$queryRawUnsafe("SELECT indexname FROM pg_indexes WHERE tablename='CharacterTierRanking'");
    const names = indexes.map(i => i.indexname);
    for (const expected of [
      'CharacterTierRanking_pkey',
      'CharacterTierRanking_characterId_idx',
      'CharacterTierRanking_role_tier_idx',
      'CharacterTierRanking_gameVersion_approvalStatus_idx',
      'CharacterTierRanking_derivation_approvalStatus_idx',
      'CharacterTierRanking_characterId_role_constellation_gameVer_key',
    ]) assert.ok(names.includes(expected), `missing ${expected}`);
    const steps = await prisma.$queryRawUnsafe("SELECT applied_steps_count FROM \"_prisma_migrations\" WHERE migration_name='20261120151000_add_character_tier_rankings'");
    assert.equal(steps[0].applied_steps_count, 0);
  } finally {
    await prisma.$disconnect();
  }
});

test('CharacterBuild drift is documented from audit evidence, not guessed', async () => {
  const { prisma } = openReadOnly();
  try {
    const rows = await prisma.$queryRawUnsafe('SELECT count(*)::int AS n FROM "CharacterBuild"');
    assert.ok(rows[0].n >= 127);
    const audits = await prisma.$queryRawUnsafe(
      'SELECT actor, action FROM "CharacterBuildAudit" WHERE "buildId" LIKE $1 ORDER BY "createdAt" DESC LIMIT 1',
      'approved-%',
    );
    assert.equal(audits[0].action, 'APPROVED_IMPORT');
    assert.match(audits[0].actor, /explicit user approval/);
    assert.ok(fs.existsSync(REPORT));
    const report = fs.readFileSync(REPORT, 'utf8');
    assert.match(report, /APPROVED_IMPORT/);
    assert.match(report, /fresh bootstrap|bootstrap/i);
  } finally {
    await prisma.$disconnect();
  }
});
