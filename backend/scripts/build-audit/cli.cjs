const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { parse } = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const { parseArgs } = require('node:util');
const genshin = require('genshin-db');
const { audit, validPopularity } = require('./audit.cjs');
const { lookupCharacter } = require('./genshin-builds.cjs');
const { approve, writeTarget, buildTransaction, readDocument, saveJournal } = require('./apply.cjs');

const protectedStats = ['sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority'];
const localHosts = ['localhost', '127.0.0.1', '[::1]'];

function configuredDatabase() {
  return process.env.DATABASE_URL ?? parse(readFileSync(resolve(__dirname, '../../.env'))).DATABASE_URL;
}

async function readCatalog(characterId) {
  const databaseUrl = configuredDatabase();
  const url = new URL(databaseUrl);
  if (!['postgres:', 'postgresql:'].includes(url.protocol) || !localHosts.includes(url.hostname) ||
      url.searchParams.has('host') || url.searchParams.has('hostaddr') || process.env.NODE_ENV === 'production') {
    throw new Error('Build audit requires a local development Postgres URL');
  }
  const prisma = new PrismaClient({ datasourceUrl: databaseUrl });
  try {
    const names = { id: true, nameEn: true };
    const [character, characters, weapons, artifacts] = await prisma.$transaction([
      prisma.character.findUniqueOrThrow({ where: { id: characterId }, select: {
        ...names, element: true, weapon: true,
        ...Object.fromEntries(protectedStats.map(field => [field, true])),
        bestWeapons: { orderBy: [{ rank: 'asc' }, { order: 'asc' }], select: { weaponId: true } },
        bestArtifacts: { orderBy: { order: 'asc' }, select: { setNameEn: true, pieces: true } },
        teams: { select: { id: true } },
      } }),
      prisma.character.findMany({ select: names }),
      prisma.weapon.findMany({ select: { ...names, type: true } }),
      prisma.artifactSet.findMany({ select: names }),
    ]);
    return { character, characters, weapons, artifacts };
  } finally {
    await prisma.$disconnect();
  }
}

async function verifyApollo(character) {
  const response = await fetch('http://127.0.0.1:4000/graphql', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query BuildAudit($id: String!) {
        character(id: $id) { id nameEn element weapon
          bestWeapons { weaponId } bestArtifacts { setNameEn pieces } teams { id }
          ${protectedStats.join(' ')}
        }
      }`,
      variables: { id: character.id },
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Local Apollo returned HTTP ${response.status}`);
  const result = await response.json();
  if (result.errors?.length) throw new Error('Local Apollo returned GraphQL errors');
  const record = result.data?.character;
  if (!record || ['id', 'nameEn', 'element', 'weapon'].some(key => record[key] !== character[key])) {
    throw new Error('Local Apollo and Prisma character identity differ');
  }
  const differences = protectedStats.filter(field => JSON.stringify(record[field]) !== JSON.stringify(character[field]));
  for (const field of ['bestWeapons', 'bestArtifacts', 'teams']) {
    if (record[field].length !== character[field].length) differences.push(field);
  }
  return { status: differences.length ? 'NEEDS_REVIEW' : 'MATCHED', differences };
}

function countMetadata(items, lookup) {
  return items.filter(item => lookup(item, { matchAliases: false })?.name === item).length;
}

function countMetadataIds(items, lookup, rows) {
  return items.filter(item => {
    const entry = lookup(item, { matchAliases: false });
    return entry?.name === item && rows.some(row => row.nameEn === item && row.id === String(entry.id));
  }).length;
}

async function main(args) {
  if (args[0]?.startsWith('--')) {
    const { values } = parseArgs({
      args,
      options: Object.fromEntries(['dry-run', 'approve', 'apply', 'rollback', 'database',
        'reviewer', 'rights-ref', 'output'].map(option => [option, { type: 'string' }])),
    });
    const actions = ['dry-run', 'approve', 'apply', 'rollback'].filter(action => values[action] !== undefined);
    if (actions.length !== 1) throw new Error('Choose one build operation');
    const [action] = actions;
    if (action === 'approve') {
      if (!values.output || !values.reviewer || !values['rights-ref'] || values.database !== undefined) {
        throw new Error('Approval requires --reviewer, --rights-ref and --output');
      }
      const document = approve(readDocument(values.approve), values.reviewer, values['rights-ref']);
      saveJournal(resolve(values.output), document);
      console.log(JSON.stringify({ status: 'APPROVED', file: values.output, checksum: document.approval.checksum }));
      return;
    }
    if (values.output || values.reviewer || values['rights-ref']) throw new Error('Review flags require --approve');
    const databaseUrl = configuredDatabase();
    const target = writeTarget(databaseUrl, values.database);
    const input = readDocument(values[action]);
    const prisma = new PrismaClient({ datasourceUrl: databaseUrl });
    try {
      const mode = action === 'dry-run' ? 'preview' : action;
      const result = await buildTransaction(prisma, mode, input, target, resolve(__dirname, '../../backups/build-audit'));
      console.log(JSON.stringify(result, null, 2));
      if (result.status === 'PROTECTED_CONFLICT') process.exitCode = 2;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }
  const [characterId, sourceId, flag, popularity, ...extra] = args;
  if (!characterId || !sourceId || extra.length ||
      (flag !== undefined && (flag !== '--observed-popularity' || !/^-?\d+(\.\d+)?$/.test(popularity ?? '')))) {
    throw new Error('Usage: node scripts/build-audit/cli.cjs <local-id> <source-slug> [--observed-popularity <percent>]');
  }

  const catalog = await readCatalog(characterId);
  const { data, provenance } = await lookupCharacter(sourceId);
  const apollo = await verifyApollo(catalog.character);
  const result = audit(data, catalog.character, catalog);
  const observedPopularity = popularity === undefined ? undefined : Number(popularity);
  const distinctSets = [...new Set(data.artifacts.flatMap(option => option.sets))];
  console.log(JSON.stringify({
    mode: 'READ_ONLY_AUDIT',
    reusePermission: 'UNVERIFIED',
    characterId,
    provenance,
    apollo,
    ...result,
    gameMetadata: {
      version: require('genshin-db/package.json').version,
      character: countMetadata([data.name], genshin.characters) === 1,
      weapons: countMetadata(data.weapons, genshin.weapons),
      artifactSets: countMetadata(distinctSets, genshin.artifacts),
      teamMembers: countMetadata([...new Set(data.teams.flatMap(team => team.members))], genshin.characters),
      weaponIdsMatchingLocal: countMetadataIds(data.weapons, genshin.weapons, catalog.weapons),
      artifactIdsMatchingLocal: countMetadataIds(distinctSets, genshin.artifacts, catalog.artifacts),
    },
    localCharacterRecords: catalog.characters.length,
    coverage: 'Unverified beyond explicitly matched source slugs',
    sourceCategory: data.category,
    playstyle: data.playstyle,
    limits: ['API does not identify playstyles, roles or team tiers', 'Popularity is separate from editorial rank'],
    communityObservation: observedPopularity === undefined ? undefined : {
      status: validPopularity(observedPopularity) ? 'IN_RANGE_ONLY' : 'NEEDS_REVIEW',
      observedPercent: observedPopularity,
    },
    writes: 0,
  }, null, 2));
}

main(process.argv.slice(2)).catch(error => {
  console.error(`Build audit failed: ${error.message}`);
  process.exitCode = 1;
});
