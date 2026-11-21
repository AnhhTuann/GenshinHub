'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  parseArgs,
  safeTarget,
  selectEnvironment,
  validateManifest,
  recordFingerprint,
  dbFingerprint,
  planCorrections,
  generatedNotes,
} = require('./replay-corrections.cjs');

function makeRecord(overrides = {}) {
  return {
    characterId: 'bennett',
    buildId: 'maint-bennett-7.2-alias-r1',
    name: 'C0 Burst buffer',
    reviewStatus: 'MAINTENANCE',
    sourceUrl: 'https://genshin-builds.com/en/character/bennett',
    version: 2,
    playstyles: ['SUPPORT'],
    constellationAssumptions: ['C0'],
    sands: ['Energy Recharge'],
    goblet: ['Pyro DMG Bonus'],
    circlet: ['CRIT Rate'],
    subStatsPriority: ['Energy Recharge'],
    talentPriority: ['Burst'],
    weapons: [{ weaponId: '11401', refinement: 1, order: 0 }],
    artifacts: [{ setId: '15007', pieces: 4, order: 0, nameEn: 'Noblesse Oblige' }],
    teams: [{
      id: 'maint-bennett-7.2-alias-r1-team-1',
      name: 'Reference team 1',
      rank: 'SS',
      reviewStatus: 'EXPERIMENTAL',
      order: 0,
      members: [{ characterId: 'bennett', role: 'Build owner', order: 0 }],
    }],
    ...overrides,
  };
}

function makeManifest(records = [makeRecord()]) {
  return { schemaVersion: 1, retrievedAt: '2026-11-21', recordCount: records.length, records };
}

function makeDbBuild(record, isDefault = true) {
  return {
    id: record.buildId,
    characterId: record.characterId,
    name: record.name,
    source: record.sourceUrl,
    version: record.version,
    isDefault,
    playstyles: record.playstyles,
    constellationAssumptions: record.constellationAssumptions,
    sands: record.sands,
    goblet: record.goblet,
    circlet: record.circlet,
    subStatsPriority: record.subStatsPriority,
    talentPriority: record.talentPriority,
    bestWeapons: record.weapons.map(w => ({ weaponId: w.weaponId, refinement: w.refinement, order: w.order })),
    bestArtifacts: record.artifacts.map(a => ({ setNameEn: a.nameEn, pieces: a.pieces, order: a.order })),
    teams: record.teams.map(t => ({
      id: t.id,
      name: t.name,
      rank: t.rank,
      reviewStatus: t.reviewStatus,
      order: t.order,
      members: t.members.map(m => ({ characterId: m.characterId, role: m.role, order: m.order })),
    })),
  };
}

test('parseArgs supports valued and boolean flags', () => {
  assert.deepEqual(parseArgs(['--env=development', '--apply', '--backup=/tmp/x.dump']), {
    _: [],
    env: 'development',
    apply: true,
    backup: '/tmp/x.dump',
  });
});

test('safeTarget never returns the password', () => {
  const marker = 'not-a-real-secret';
  const target = new URL('postgresql://postgres@127.0.0.1:5434/genshinhub');
  target.password = marker;
  const url = target.href;
  assert.deepEqual(safeTarget(url), {
    protocol: 'postgresql',
    host: '127.0.0.1',
    port: '5434',
    database: 'genshinhub',
    user: 'postgres',
  });
  assert.equal(JSON.stringify(safeTarget(url)).includes(marker), false);
});

test('selectEnvironment requires an explicit non-production target', () => {
  const previous = {
    DEVELOPMENT_DATABASE_URL: process.env.DEVELOPMENT_DATABASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    STAGING_DATABASE_URL: process.env.STAGING_DATABASE_URL,
  };
  try {
    delete process.env.DATABASE_URL;
    delete process.env.STAGING_DATABASE_URL;
    assert.throws(() => selectEnvironment({}), /Explicit --env=development\|staging is required/);
    assert.throws(() => selectEnvironment({ env: 'production' }), /Production replay is blocked/);
    assert.throws(() => selectEnvironment({ env: 'staging' }), /--allow-staging/);
    const fakePassword = 'x'.repeat(8);
    const staging = new URL('postgresql://postgres@127.0.0.1:5432/genshinhub_staging_x');
    staging.password = fakePassword;
    process.env.STAGING_DATABASE_URL = staging.href;
    assert.equal(selectEnvironment({ env: 'staging', 'allow-staging': true }).target.database, 'genshinhub_staging_x');
    const remote = new URL('postgresql://postgres@example.test:5434/genshinhub');
    remote.password = fakePassword;
    process.env.DEVELOPMENT_DATABASE_URL = remote.href;
    assert.throws(() => selectEnvironment({ env: 'development' }), /must target localhost/);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test('validateManifest accepts canonical dotted build and team IDs', () => {
  assert.deepEqual(validateManifest(makeManifest()), []);
});

test('validateManifest preserves null review status on legacy alias teams', () => {
  const record = makeRecord();
  record.teams[0].reviewStatus = null;
  assert.deepEqual(validateManifest(makeManifest([record])), []);
});

test('validateManifest rejects forbidden editorial and approval keys', () => {
  const manifest = makeManifest([makeRecord({ description: 'do not import' })]);
  assert.match(validateManifest(manifest).join(' '), /Forbidden editorial\/approval keys: .*description/);
});

test('validateManifest rejects top-level sourceUrl', () => {
  const manifest = makeManifest();
  manifest.sourceUrl = 'https://genshin-builds.com/en/characters';
  assert.match(validateManifest(manifest).join(' '), /Top-level sourceUrl is not allowed/);
});

test('generatedNotes includes the manifest provenance without a global manifest', () => {
  const note = generatedNotes(makeRecord(), 'abc123', '2026-11-21');
  assert.match(note, /retrieved 2026-11-21/);
  assert.match(note, /sha256:abc123/);
  assert.match(note, /genshin-builds\.com\/en\/character\/bennett/);
});

test('fingerprints match for an unchanged stored build', () => {
  const record = makeRecord();
  const build = makeDbBuild(record);
  assert.equal(dbFingerprint(build, new Map([['Noblesse Oblige', '15007']])), recordFingerprint(record));
});

test('planCorrections classifies create, default change, skip and conflict', () => {
  const record = makeRecord();
  const manifest = makeManifest([record]);
  const artifactSets = [{ id: '15007', nameEn: 'Noblesse Oblige' }];

  assert.deepEqual(planCorrections(manifest, { builds: [], artifactSets }), [
    { characterId: record.characterId, buildId: record.buildId, action: 'CREATE' },
  ]);

  assert.deepEqual(planCorrections(manifest, { builds: [makeDbBuild(record, false)], artifactSets }), [
    { characterId: record.characterId, buildId: record.buildId, action: 'SET_DEFAULT' },
  ]);

  assert.deepEqual(planCorrections(manifest, { builds: [makeDbBuild(record, true)], artifactSets }), [
    { characterId: record.characterId, buildId: record.buildId, action: 'SKIP' },
  ]);

  const changed = makeDbBuild(record, true);
  changed.playstyles = ['MAIN_DPS'];
  assert.deepEqual(planCorrections(manifest, { builds: [changed], artifactSets }), [
    { characterId: record.characterId, buildId: record.buildId, action: 'CONFLICT' },
  ]);
});
