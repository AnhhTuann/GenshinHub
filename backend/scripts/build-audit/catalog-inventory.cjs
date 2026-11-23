'use strict';

const fs = require('node:fs');
const { PrismaClient } = require('@prisma/client');

const orderBy = [{ order: 'asc' }, { id: 'asc' }];
const recommendations = {
  bestWeapons: { orderBy },
  bestArtifacts: { orderBy },
  teams: { orderBy, include: { members: { orderBy } } },
};
const buildRelations = {
  ...recommendations,
  audits: { select: { action: true, version: true }, orderBy: [{ version: 'asc' }, { id: 'asc' }] },
};

async function readInventory(prisma) {
  return prisma.$transaction(async tx => {
    await tx.$executeRaw`SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY`;
    const [identity] = await tx.$queryRaw`SELECT current_database() AS database, current_setting('transaction_read_only') AS mode`;
    if (identity.database !== 'genshinhub' || identity.mode !== 'on') throw new Error('Expected read-only local development database');
    const characters = await tx.character.findMany({
      orderBy: { id: 'asc' },
      include: { ...recommendations, builds: { orderBy: { id: 'asc' }, include: buildRelations } },
    });
    const weapons = await tx.weapon.findMany({ orderBy: { id: 'asc' } });
    const artifacts = await tx.artifactSet.findMany({ orderBy: { id: 'asc' } });
    const staged = await tx.characterBuildAudit.findMany({
      where: { action: 'STAGED' },
      select: { buildId: true, version: true, changes: true },
      orderBy: [{ buildId: 'asc' }, { version: 'desc' }],
    });
    const pendingPatches = {};
    for (const event of staged) pendingPatches[event.buildId] ??= event;
    return { identity, characters, weapons, artifacts, pendingPatches };
  });
}

function developmentClient() {
  require('dotenv').config({ quiet: true });
  const url = new URL(process.env.DATABASE_URL);
  if (!['127.0.0.1', 'localhost'].includes(url.hostname) || url.pathname !== '/genshinhub') {
    throw new Error('Expected explicit local development catalog');
  }
  return new PrismaClient({ datasourceUrl: url.href });
}

if (require.main === module) {
  const output = process.argv[2];
  if (!output?.startsWith('/tmp/')) throw new Error('Supply a temporary inventory output path under /tmp');
  const prisma = developmentClient();
  readInventory(prisma).then(inventory => {
    fs.writeFileSync(output, JSON.stringify(inventory), { mode: 0o600 });
    console.log(JSON.stringify({ characters: inventory.characters.length, database: inventory.identity.database }));
  }).catch(error => {
    console.error(error.code ?? error.message);
    process.exitCode = 1;
  }).finally(() => prisma.$disconnect());
}

module.exports = { readInventory, developmentClient };
