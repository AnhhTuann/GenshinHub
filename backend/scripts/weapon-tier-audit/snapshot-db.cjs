'use strict';

/** Read-only snapshot of current Weapon tier data for rollback comparison. */
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { openReadOnly } = require('./db.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const OUTPUT = path.join(ROOT, 'docs', 'weapon-tier-audit', 'current-db.json');

async function snapshot() {
  const { prisma, target } = openReadOnly();
  try {
    const weapons = await prisma.weapon.findMany({
      select: { id: true, nameEn: true, nameVi: true, type: true, rarity: true, tier: true, role: true, baseAtk: true, subStat: true },
      orderBy: { id: 'asc' },
    });
    const tierRanks = await prisma.tierRank.findMany({ orderBy: { order: 'asc' } });
    const result = {
      target,
      note: 'Read-only snapshot. Zero writes. Rollback reference for any future weapon-tier apply.',
      counts: {
        weapons: weapons.length,
        weaponTiered: weapons.filter(w => Boolean(w.tier)).length,
        weaponRoleSet: weapons.filter(w => Boolean(w.role)).length,
        tierRanks: tierRanks.length,
      },
      tierRanks,
      weapons,
    };
    const bytes = Buffer.from(JSON.stringify(result, null, 2) + '\n');
    result.checksum = createHash('sha256').update(bytes).digest('hex');
    fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2) + '\n');
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  snapshot().then(r => console.log(JSON.stringify(r.counts, null, 2)))
    .catch(error => { console.error(error); process.exitCode = 1; });
}

module.exports = { snapshot };
