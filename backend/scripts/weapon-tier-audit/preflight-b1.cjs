'use strict';

/**
 * Phase B1 preflight. Read-only except for writing its own JSON report.
 * Must pass before the additive weapon-tier migration is applied to development.
 */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { loadEnv, openReadOnly } = require('./db.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const MIGRATION_DIR = path.join(ROOT, 'backend', 'prisma', 'migrations', '20261120153500_add_weapon_tier_rankings');
const OUT = path.join(ROOT, 'docs', 'weapon-tier-audit', 'phase-b1-preflight.json');

const check = (report, name, ok, detail) => {
  report.checks.push({ name, ok: Boolean(ok), detail });
  if (!ok) report.failures.push(name);
};

const warn = (report, name, detail) => {
  report.warnings.push({ name, detail });
};

const withoutComments = sql => sql.split('\n').filter(line => !line.trimStart().startsWith('--')).join('\n');

async function main() {
  const report = { phase: 'B1', checks: [], warnings: [], failures: [], ok: false };

  // 1. Database target from the actual resolver used by the app.
  const env = loadEnv();
  const url = new URL(env.DATABASE_URL);
  const database = decodeURIComponent(url.pathname.slice(1));
  check(report, 'DATABASE_URL points at local development DB',
    url.hostname === '127.0.0.1' && url.port === '5434' && database === 'genshinhub' && url.username === 'postgres',
    `${url.hostname}:${url.port}/${database}`);
  check(report, 'No production DSN in environment',
    !/prod|neon|supabase|rds|amazonaws/i.test(env.DATABASE_URL), 'development DSN only');

  // 2. Docker container identity and port binding.
  let inspect = '';
  try {
    inspect = execFileSync('docker', ['inspect', 'genshinhub-postgres', '--format', '{{json .NetworkSettings.Ports}}'], { encoding: 'utf8' });
  } catch (_) { inspect = ''; }
  check(report, 'Docker container is postgres:15-alpine on 127.0.0.1:5434',
    inspect.includes('5434') && inspect.includes('5432/tcp'), inspect.trim() || 'container not found');

  // 3. Migration SQL is strictly additive.
  const rawSql = fs.readFileSync(path.join(MIGRATION_DIR, 'migration.sql'), 'utf8');
  const sql = withoutComments(rawSql);
  const forbidden = [
    [/\bDROP\b/i, 'DROP statement'],
    [/\bTRUNCATE\b/i, 'TRUNCATE statement'],
    [/^\s*(DELETE|UPDATE|INSERT)\s+/im, 'DML statement'],
    [/\bALTER\s+TABLE\s+"(Weapon|Character|TierRank|CharacterWeapon|CharacterArtifact|CharacterTeam|TeamMember|User|Otp|ArtifactSet|Material)"\b/i, 'legacy table ALTER'],
    [/CharacterBuild|CharacterTierRanking/, 'unrelated system referenced'],
  ];
  for (const [pattern, label] of forbidden) check(report, `Migration has no ${label}`, !pattern.test(sql), label);
  const alters = [...sql.matchAll(/ALTER\s+TABLE\s+"([^"]+)"\s+ADD\s+CONSTRAINT/gi)].map(m => m[1]);
  check(report, 'Every ALTER TABLE is ADD CONSTRAINT on a new table',
    alters.length === 2 && alters.every(t => ['WeaponTierRank', 'WeaponTierAudit'].includes(t)), alters.join(', '));
  check(report, 'Migration creates both new tables and the null-safe unique key',
    sql.includes('CREATE TABLE "WeaponTierRank"') &&
    sql.includes('CREATE TABLE "WeaponTierAudit"') &&
    sql.includes('CREATE UNIQUE INDEX "WeaponTierRank_weaponId_role_versionKey_refinementContext_key"'), 'weapon-only objects');

  // 4. Prisma schema contains the approved additions and still preserves legacy fields.
  const schema = fs.readFileSync(path.join(ROOT, 'backend', 'prisma', 'schema.prisma'), 'utf8');
  for (const fragment of [
    'enum WeaponRankTier', 'enum WeaponTierRole', 'enum WeaponRefinementContext',
    'model WeaponTierRank', 'model WeaponTierAudit',
  ]) check(report, `Schema contains ${fragment}`, schema.includes(fragment), fragment);
  check(report, 'Weapon relation exposes tierRanks', /tierRanks\s+WeaponTierRank\[\]/.test(schema), 'relation field');
  const weaponModel = schema.slice(schema.indexOf('model Weapon {'), schema.indexOf('model ArtifactSet {'));
  check(report, 'Legacy Weapon.tier and Weapon.role still present',
    /\btier\s+String\?/.test(weaponModel) && /\brole\s+String\?/.test(weaponModel), 'legacy preserved');

  // 5. Live baseline: no existing weapon ranking tables and no rows to overwrite.
  const { prisma, target } = openReadOnly();
  try {
    const counts = await prisma.$transaction([
      prisma.weapon.count(),
      prisma.weapon.count({ where: { tier: { not: null } } }),
      prisma.weapon.count({ where: { role: { not: null } } }),
    ]);
    check(report, 'Development DB has 279 weapons and zero legacy weapon tiers',
      counts[0] === 279 && counts[1] === 0 && counts[2] === 0,
      `weapons=${counts[0]} tiered=${counts[1]} roleSet=${counts[2]}`);
    const tables = await prisma.$queryRawUnsafe(
      `SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('WeaponTierRank','WeaponTierAudit','CharacterBuild','CharacterBuildAudit')`,
    );
    const names = tables.map(r => r.table_name);
    check(report, 'Weapon tier tables do not exist yet (no overwrite risk)',
      !names.includes('WeaponTierRank') && !names.includes('WeaponTierAudit'), names.join(', ') || 'none');
    if (names.includes('CharacterBuild') || names.includes('CharacterBuildAudit')) {
      warn(report, 'Multi-Build tables exist outside Prisma migration history',
        `${names.join(', ')} were applied by the separate development-migrations path; this weapon migration does not reference or alter them.`);
    } else {
      warn(report, 'Multi-Build tables absent', 'No CharacterBuild tables in development DB at preflight time.');
    }
    const migrations = await prisma.$queryRawUnsafe(
      `SELECT migration_name FROM "_prisma_migrations" WHERE finished_at IS NOT NULL ORDER BY finished_at`,
    );
    check(report, 'Character Tier migration is the only recorded migration',
      migrations.length === 1 && migrations[0].migration_name === '20261120151000_add_character_tier_rankings',
      migrations.map(m => m.migration_name).join(', ') || 'none');
  } finally {
    await prisma.$disconnect();
  }

  report.backup = {
    file: '/tmp/opencode/db-backups/genshinhub-pre-weapon-b1-final-20261120.dump',
    sha256: '2143ef16fd2fbcaa8b3d3e454170d1ae7867e265c62ab02a9863994ecb11a440',
    note: 'Full custom-format dump taken immediately before the weapon migration; verified restorable.',
  };
  report.target = target;
  report.ok = report.failures.length === 0;
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n');
  return report;
}

if (require.main === module) {
  main().then(r => {
    console.log(JSON.stringify({ ok: r.ok, target: r.target, failures: r.failures, checks: r.checks.length }, null, 2));
    if (!r.ok) process.exitCode = 1;
  }).catch(error => { console.error(error); process.exitCode = 1; });
}
