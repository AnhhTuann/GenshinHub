'use strict';

// Replay authorized v7.2 MAINTENANCE build corrections from an operator-supplied manifest.
// The manifest is deliberately NOT stored in this repository: it contains catalog IDs and
// build selections derived from a third-party guide and must be handled as a controlled artifact.

const fs = require('node:fs');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { PrismaClient } = require('@prisma/client');

const ACTOR = 'SYSTEM_REFERENCE_COMPARISON_REPLAY';
const FORBIDDEN_MANIFEST_KEYS = new Set([
  'description', 'rotation', 'coreIdea', 'buildNotes', 'weaponNotes', 'artifactNotes',
  'faq', 'editorial', 'sourceText', 'prose', 'approvalChecksum', 'approve', 'approvedBy',
]);
const PLAYSTYLES = new Set(['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);
// Legacy maintenance builds may preserve a null team review status; newly imported
// source-attributed teams use EXPERIMENTAL unless a human has verified the rotation.
const TEAM_REVIEW = new Set(['EXPERIMENTAL', 'VERIFIED', null]);
const ID_PATTERN = /^[a-z0-9][a-z0-9_.-]*$/;

function parseArgs(argv) {
  const args = { _: [] };
  for (const token of argv) {
    if (!token.startsWith('--')) { args._.push(token); continue; }
    const eq = token.indexOf('=');
    const key = token.slice(2, eq === -1 ? undefined : eq);
    const value = eq === -1 ? true : token.slice(eq + 1);
    args[key] = value;
  }
  return args;
}

function sha256File(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function safeTarget(urlString) {
  const u = new URL(urlString);
  return {
    protocol: u.protocol.replace(':', ''),
    host: u.hostname,
    port: u.port || (u.protocol === 'https:' ? '443' : '80'),
    database: decodeURIComponent(u.pathname.slice(1)),
    user: decodeURIComponent(u.username) || '(default)',
  };
}

function selectEnvironment(args) {
  const env = args.env;
  if (!env) throw new Error('Explicit --env=development|staging is required.');
  if (env === 'production') throw new Error('Production replay is blocked by this tool. Use the separately reviewed release process.');
  if (!['development', 'staging'].includes(env)) throw new Error(`Unknown environment: ${env}`);

  if (env === 'development') {
    const url = process.env.DEVELOPMENT_DATABASE_URL || process.env.DATABASE_URL;
    if (!url) throw new Error('Set DEVELOPMENT_DATABASE_URL (or DATABASE_URL) before running.');
    const target = safeTarget(url);
    if (target.host !== '127.0.0.1' && target.host !== 'localhost') throw new Error('Development replay must target localhost.');
    if (target.port !== '5434' || target.database !== 'genshinhub') {
      throw new Error('Development replay must target 127.0.0.1:5434/genshinhub.');
    }
    return { env, url, target };
  }

  if (args['allow-staging'] !== true && args['allow-staging'] !== 'true') {
    throw new Error('Staging replay requires --allow-staging after reviewing the target URL.');
  }
  const url = process.env.STAGING_DATABASE_URL;
  if (!url) throw new Error('Set STAGING_DATABASE_URL before running a staging replay.');
  const target = safeTarget(url);
  if (!/^genshinhub_(staging|replay|test)/.test(target.database)) {
    throw new Error('STAGING_DATABASE_URL database name must begin with genshinhub_staging_, genshinhub_replay_ or genshinhub_test.');
  }
  return { env, url, target };
}

function findForbiddenKeys(value, trail = '') {
  const found = [];
  if (Array.isArray(value)) {
    value.forEach((v, i) => found.push(...findForbiddenKeys(v, `${trail}[${i}]`)));
  } else if (value && typeof value === 'object') {
    for (const [key, v] of Object.entries(value)) {
      if (FORBIDDEN_MANIFEST_KEYS.has(key)) found.push(`${trail}.${key}`);
      found.push(...findForbiddenKeys(v, `${trail}.${key}`));
    }
  }
  return found;
}

function validateManifest(manifest) {
  const errors = [];
  if (!manifest || typeof manifest !== 'object') return ['Manifest is not an object.'];
  if (manifest.schemaVersion !== 1) errors.push('schemaVersion must be 1.');
  if (typeof manifest.sourceUrl !== 'undefined') errors.push('Top-level sourceUrl is not allowed; use per-record sourceUrl.');
  const forbidden = findForbiddenKeys(manifest);
  if (forbidden.length) errors.push(`Forbidden editorial/approval keys: ${forbidden.slice(0, 5).join(', ')}`);
  if (!Array.isArray(manifest.records)) return [...errors, 'records must be an array.'];
  if (manifest.recordCount !== manifest.records.length) errors.push('recordCount does not match records.length.');

  const seenBuilds = new Set();
  const seenCharacters = new Set();
  manifest.records.forEach((r, i) => {
    const p = `records[${i}]`;
    if (!r || typeof r !== 'object') { errors.push(`${p} is not an object.`); return; }
    if (!ID_PATTERN.test(r.characterId || '')) errors.push(`${p}.characterId invalid`);
    if (!ID_PATTERN.test(r.buildId || '')) errors.push(`${p}.buildId invalid`);
    if (seenBuilds.has(r.buildId)) errors.push(`${p}.buildId duplicated`);
    seenBuilds.add(r.buildId);
    if (seenCharacters.has(r.characterId)) errors.push(`${p}.characterId has more than one target build`);
    seenCharacters.add(r.characterId);
    if (r.reviewStatus !== 'MAINTENANCE') errors.push(`${p}.reviewStatus must be MAINTENANCE`);
    if (!/^https:\/\/genshin-builds\.com\/en\/character\//.test(r.sourceUrl || '')) errors.push(`${p}.sourceUrl invalid`);
    if (!Number.isInteger(r.version) || r.version < 1) errors.push(`${p}.version invalid`);
    for (const key of ['playstyles', 'constellationAssumptions', 'sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority', 'weapons', 'artifacts', 'teams']) {
      if (!Array.isArray(r[key])) errors.push(`${p}.${key} must be an array`);
    }
    for (const ps of r.playstyles || []) if (!PLAYSTYLES.has(ps)) errors.push(`${p}.playstyles has unknown value ${ps}`);
    for (const w of r.weapons || []) {
      if (!ID_PATTERN.test(w.weaponId || '')) errors.push(`${p}.weaponId invalid`);
      if (!Number.isInteger(w.refinement) || w.refinement < 1 || w.refinement > 5) errors.push(`${p}.refinement invalid`);
      if (!Number.isInteger(w.order)) errors.push(`${p}.weapon order invalid`);
    }
    for (const a of r.artifacts || []) {
      if (!ID_PATTERN.test(a.setId || '')) errors.push(`${p}.setId invalid`);
      if (![2, 4].includes(a.pieces)) errors.push(`${p}.pieces must be 2 or 4`);
      if (!Number.isInteger(a.order)) errors.push(`${p}.artifact order invalid`);
    }
    for (const t of r.teams || []) {
      if (!ID_PATTERN.test(t.id || '')) errors.push(`${p}.team id invalid`);
      if (!TEAM_REVIEW.has(t.reviewStatus ?? null)) errors.push(`${p}.team reviewStatus invalid`);
      if (!Array.isArray(t.members) || t.members.length < 1) errors.push(`${p}.team members invalid`);
      for (const m of t.members || []) {
        if (!ID_PATTERN.test(m.characterId || '')) errors.push(`${p}.team member invalid`);
        if (!Number.isInteger(m.order)) errors.push(`${p}.team member order invalid`);
      }
    }
  });
  return errors;
}

function normalizedList(list) {
  return JSON.stringify(list);
}

function recordFingerprint(r) {
  return JSON.stringify({
    name: r.name,
    sourceUrl: r.sourceUrl,
    version: r.version,
    playstyles: r.playstyles,
    constellationAssumptions: r.constellationAssumptions,
    sands: r.sands,
    goblet: r.goblet,
    circlet: r.circlet,
    subStatsPriority: r.subStatsPriority,
    talentPriority: r.talentPriority,
    weapons: r.weapons.map(w => [w.weaponId, w.refinement, w.order]),
    artifacts: r.artifacts.map(a => [a.setId, a.pieces, a.order]),
    teams: r.teams.map(t => [t.name, t.rank, t.reviewStatus, t.order, t.members.map(m => [m.characterId, m.role, m.order])]),
  });
}

function dbFingerprint(build, artifactSetByName) {
  return JSON.stringify({
    name: build.name,
    sourceUrl: build.source,
    version: build.version,
    playstyles: build.playstyles,
    constellationAssumptions: build.constellationAssumptions,
    sands: build.sands,
    goblet: build.goblet,
    circlet: build.circlet,
    subStatsPriority: build.subStatsPriority,
    talentPriority: build.talentPriority,
    weapons: build.bestWeapons.map(w => [w.weaponId, w.refinement ?? 1, w.order ?? 0]),
    artifacts: build.bestArtifacts.map(a => [artifactSetByName.get(a.setNameEn) || null, a.pieces, a.order ?? 0]),
    teams: build.teams.map(t => [t.name, t.rank, t.reviewStatus, t.order ?? 0, t.members.map(m => [m.characterId, m.role, m.order ?? 0])]),
  });
}

function planCorrections(manifest, current) {
  const builds = new Map((current.builds || []).map(b => [b.id, b]));
  const setByName = new Map((current.artifactSets || []).map(s => [s.nameEn, s.id]));
  return manifest.records.map(r => {
    const existing = builds.get(r.buildId);
    if (!existing) return { characterId: r.characterId, buildId: r.buildId, action: 'CREATE' };
    if (dbFingerprint(existing, setByName) !== recordFingerprint(r)) {
      return { characterId: r.characterId, buildId: r.buildId, action: 'CONFLICT' };
    }
    return {
      characterId: r.characterId,
      buildId: r.buildId,
      action: existing.isDefault ? 'SKIP' : 'SET_DEFAULT',
    };
  });
}

function generatedNotes(r, manifestSha, retrievedAt = '2026-11-21') {
  return `Curated primary build from Genshin-Builds v7.2 (${r.sourceUrl}), retrieved ${retrievedAt}. Weapon and artifact identities resolved to canonical local catalog IDs. Team membership is source-attributed; rotations and combat timings were not independently measured. Original historical build preserved. Replay manifest sha256:${manifestSha}.`;
}

function generatedTeamDescription(r) {
  return `Source-attributed v7.2 composition (${r.sourceUrl}). Membership and listed tiers come from the source guide; the rotation has not been independently measured, so treat execution details as experimental.`;
}

function generatedRoleDescription(role) {
  return `${role} is listed in this source-attributed composition; canonical identity verified, rotation not independently measured.`;
}

async function loadState(prisma) {
  const [characters, weapons, artifactSets, builds] = await Promise.all([
    prisma.character.findMany({ orderBy: { id: 'asc' } }),
    prisma.weapon.findMany({ orderBy: { id: 'asc' } }),
    prisma.artifactSet.findMany({ orderBy: { id: 'asc' } }),
    prisma.characterBuild.findMany({
      orderBy: { id: 'asc' },
      include: {
        bestWeapons: { orderBy: [{ order: 'asc' }, { rank: 'asc' }] },
        bestArtifacts: { orderBy: { order: 'asc' } },
        teams: { orderBy: { order: 'asc' }, include: { members: { orderBy: { order: 'asc' } } } },
      },
    }),
  ]);
  return { characters, weapons, artifactSets, builds };
}

function validateCatalog(manifest, state) {
  const errors = [];
  const charIds = new Set(state.characters.map(c => c.id));
  const weaponById = new Map(state.weapons.map(w => [w.id, w]));
  const setById = new Map(state.artifactSets.map(s => [s.id, s]));
  for (const r of manifest.records) {
    if (!charIds.has(r.characterId)) errors.push(`${r.buildId}: unknown character ${r.characterId}`);
    for (const w of r.weapons) if (!weaponById.has(w.weaponId)) errors.push(`${r.buildId}: unknown weapon ${w.weaponId}`);
    for (const a of r.artifacts) if (!setById.has(a.setId)) errors.push(`${r.buildId}: unknown artifact set ${a.setId}`);
    for (const t of r.teams) for (const m of t.members) if (!charIds.has(m.characterId)) errors.push(`${r.buildId}: unknown teammate ${m.characterId}`);
  }
  return { errors, weaponById, setById };
}

function connectionParts(urlString) {
  const u = new URL(urlString);
  return {
    container: process.env.REFERENCE_REPLAY_CONTAINER || 'genshinhub-postgres',
    user: decodeURIComponent(u.username) || 'postgres',
    password: decodeURIComponent(u.password),
    database: decodeURIComponent(u.pathname.slice(1)),
  };
}

function createBackup(urlString, file) {
  const c = connectionParts(urlString);
  if (!c.password) throw new Error('Database URL must include a password for Docker-based backup.');
  const fd = fs.openSync(file, 'w');
  try {
    const r = spawnSync('docker', [
      'exec', '-e', `PGPASSWORD=${c.password}`, c.container,
      'pg_dump', '-U', c.user, '-d', c.database, '-Fc', '--no-owner', '--no-privileges',
    ], { stdio: ['ignore', fd, 'pipe'] });
    if (r.status !== 0) throw new Error(`pg_dump failed: ${String(r.stderr || '').slice(-500)}`);
  } finally {
    fs.closeSync(fd);
  }
  return { file, sha256: sha256File(file), target: safeTarget(urlString) };
}

function restoreBackup(urlString, file) {
  const c = connectionParts(urlString);
  if (!c.password) throw new Error('Database URL must include a password for Docker-based rollback.');
  const input = fs.readFileSync(file);
  const r = spawnSync('docker', [
    'exec', '-i', '-e', `PGPASSWORD=${c.password}`, c.container,
    'pg_restore', '-U', c.user, '-d', c.database, '--clean', '--if-exists',
    '--no-owner', '--no-privileges', '--exit-on-error',
  ], { input, stdio: ['pipe', 'pipe', 'pipe'] });
  if (r.status !== 0) throw new Error(`pg_restore failed: ${String(r.stderr || '').slice(-500)}`);
  return { file, sha256: sha256File(file), target: safeTarget(urlString) };
}

async function applyManifest(prisma, manifest, manifestSha, state, plan, catalog) {
  const retrievedAt = manifest.retrievedAt || '2026-11-21';
  const result = { created: 0, defaultsChanged: 0, audits: 0 };
  await prisma.$transaction(async (tx) => {
    for (const item of plan) {
      if (item.action === 'SKIP') continue;
      const r = manifest.records.find(x => x.buildId === item.buildId);
      if (item.action === 'CREATE') {
        await tx.characterBuild.create({
          data: {
            id: r.buildId,
            characterId: r.characterId,
            name: r.name,
            reviewStatus: 'MAINTENANCE',
            source: r.sourceUrl,
            version: r.version,
            isDefault: false,
            playstyles: r.playstyles,
            constellationAssumptions: r.constellationAssumptions,
            sands: r.sands,
            goblet: r.goblet,
            circlet: r.circlet,
            subStatsPriority: r.subStatsPriority,
            talentPriority: r.talentPriority,
            notesEn: generatedNotes(r, manifestSha, retrievedAt),
            notesVi: generatedNotes(r, manifestSha, retrievedAt),
            bestWeapons: {
              create: r.weapons.map(w => {
                const weapon = catalog.weaponById.get(w.weaponId);
                return {
                  characterId: r.characterId,
                  weaponId: w.weaponId,
                  nameEn: weapon.nameEn,
                  nameVi: weapon.nameVi,
                  rank: weapon.rarity,
                  isF2P: weapon.rarity <= 4,
                  iconUrl: weapon.iconUrl,
                  refinement: w.refinement,
                  order: w.order,
                };
              }),
            },
            bestArtifacts: {
              create: r.artifacts.map(a => {
                const set = catalog.setById.get(a.setId);
                return {
                  characterId: r.characterId,
                  setNameEn: set.nameEn,
                  setNameVi: set.nameVi,
                  pieces: a.pieces,
                  order: a.order,
                };
              }),
            },
            teams: {
              create: r.teams.map(t => ({
                id: t.id,
                characterId: r.characterId,
                name: t.name,
                rank: t.rank,
                reviewStatus: t.reviewStatus,
                description: generatedTeamDescription(r),
                order: t.order,
                members: {
                  create: t.members.map(m => ({
                    characterId: m.characterId,
                    role: m.role,
                    roleDesc: generatedRoleDescription(m.role),
                    order: m.order,
                    weapons: [],
                    artifacts: [],
                    substats: [],
                  })),
                },
              })),
            },
          },
        });
        await tx.characterBuildAudit.create({
          data: {
            characterId: r.characterId,
            buildId: r.buildId,
            action: 'CREATED',
            actor: ACTOR,
            version: r.version,
            changes: { manifestSha256: manifestSha, sourceUrl: r.sourceUrl, weaponIds: r.weapons.length, artifactSets: r.artifacts.length, teams: r.teams.length },
          },
        });
        result.created++;
        result.audits++;
      }

      await tx.characterBuild.updateMany({
        where: { characterId: item.characterId, isDefault: true, id: { not: item.buildId } },
        data: { isDefault: false },
      });
      await tx.characterBuild.update({ where: { id: item.buildId }, data: { isDefault: true } });
      await tx.characterBuildAudit.create({
        data: {
          characterId: item.characterId,
          buildId: item.buildId,
          action: 'DEFAULT_CHANGED',
          actor: ACTOR,
          version: r.version,
          changes: { manifestSha256: manifestSha, from: 'prior default cleared', to: item.buildId },
        },
      });
      result.defaultsChanged++;
      result.audits++;
    }
  });
  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args['rollback']) {
    if (args.apply !== true && args.apply !== 'true') throw new Error('Rollback requires --apply.');
    if (args['i-understand-destructive-restore'] !== true && args['i-understand-destructive-restore'] !== 'true') {
      throw new Error('Rollback requires --i-understand-destructive-restore.');
    }
    const selected = selectEnvironment(args);
    const out = restoreBackup(selected.url, String(args.rollback));
    console.log(JSON.stringify({ mode: 'rollback', ...out }, null, 2));
    return;
  }

  const selected = selectEnvironment(args);
  const manifestFile = args.manifest;
  if (typeof manifestFile !== 'string') throw new Error('--manifest=/path/to/manifest.json is required.');
  const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  const manifestSha = sha256File(manifestFile);
  const errors = validateManifest(manifest);
  if (errors.length) throw new Error(`Manifest validation failed:\n- ${errors.join('\n- ')}`);

  const write = args.apply === true || args.apply === 'true';
  let backup = null;
  if (write) {
    if (typeof args.backup !== 'string' || !args.backup) throw new Error('--apply requires --backup=/path/to/fresh.dump');
    if (fs.existsSync(args.backup)) throw new Error('Backup file already exists; choose a fresh path.');
    backup = createBackup(selected.url, args.backup);
  }

  const prisma = new PrismaClient({ datasources: { db: { url: selected.url } } });
  try {
    const state = await loadState(prisma);
    const catalog = validateCatalog(manifest, state);
    if (catalog.errors.length) throw new Error(`Catalog validation failed:\n- ${catalog.errors.slice(0, 20).join('\n- ')}`);
    const plan = planCorrections(manifest, state);
    const conflicts = plan.filter(p => p.action === 'CONFLICT');
    if (conflicts.length) throw new Error(`${conflicts.length} target builds differ from the manifest; refusing to overwrite: ${conflicts.slice(0, 5).map(c => c.buildId).join(', ')}`);
    const counts = Object.fromEntries(['CREATE', 'SET_DEFAULT', 'SKIP'].map(k => [k, plan.filter(p => p.action === k).length]));
    let applied = null;
    if (write) {
      applied = await applyManifest(prisma, manifest, manifestSha, state, plan, catalog);
      const after = await loadState(prisma);
      const afterPlan = planCorrections(manifest, after);
      if (afterPlan.some(p => p.action !== 'SKIP')) throw new Error('Post-apply verification failed.');
      const defaults = after.builds.reduce((m, b) => { if (b.isDefault) m.set(b.characterId, (m.get(b.characterId) || 0) + 1); return m; }, new Map());
      const badDefaults = [...defaults.entries()].filter(([, n]) => n !== 1);
      if (badDefaults.length) throw new Error(`Default invariant failed: ${JSON.stringify(badDefaults.slice(0, 5))}`);
    }
    const out = {
      mode: write ? 'apply' : 'dry-run',
      environment: selected.env,
      target: selected.target,
      manifest: manifestFile,
      manifestSha256: manifestSha,
      recordCount: manifest.records.length,
      planned: counts,
      applied,
      backup,
      postApplyVerified: write ? true : null,
      approvalsWritten: 0,
    };
    if (typeof args.report === 'string') fs.writeFileSync(args.report, JSON.stringify(out, null, 2));
    console.log(JSON.stringify(out, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  parseArgs, safeTarget, selectEnvironment, validateManifest, recordFingerprint, dbFingerprint,
  planCorrections, generatedNotes, generatedTeamDescription, generatedRoleDescription,
};

if (require.main === module) {
  main().catch(e => { console.error(e.message || e); process.exitCode = 1; });
}
