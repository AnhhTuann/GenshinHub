'use strict';

/**
 * Read-only source-ID -> local Weapon.id mapping.
 * Resolution order:
 *   1. genshin-db by the source English name (authoritative game data id)
 *   2. local DB row with that exact id and matching canonical type
 *   3. local DB row by normalized English name (fallback, recorded in method)
 * Vietnamese names are used only as a cross-check, never as a join key.
 */
const fs = require('node:fs');
const path = require('node:path');
const gdb = require('genshin-db');
const { openReadOnly } = require('./db.cjs');
const { TYPE_TO_DB, GDB_TYPE_TO_TYPE } = require('./tier-map.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const SOURCE = path.join(ROOT, 'docs', 'weapon-tier-audit', 'source.json');
const OUTPUT = path.join(ROOT, 'docs', 'weapon-tier-audit', 'id-mapping.json');

const normalize = value => String(value ?? '')
  .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9']+/g, ' ').trim();

async function buildMapping() {
  const source = JSON.parse(fs.readFileSync(SOURCE, 'utf8'));
  const { prisma, target } = openReadOnly();
  const mapping = {
    target,
    method: 'source English name -> genshin-db 5.2.15 id -> local Weapon.id; normalized English name fallback; Vietnamese name cross-check only. Type verified from game data, never from artwork.',
    matched: {},
    unmatched: [],
    crossChecks: [],
  };

  try {
    const dbRows = await prisma.weapon.findMany({
      select: { id: true, nameEn: true, nameVi: true, type: true, rarity: true, baseAtk: true, subStat: true },
    });
    const byId = new Map(dbRows.map(row => [String(row.id), row]));
    const byName = new Map(dbRows.map(row => [normalize(row.nameEn), row]));

    const distinct = new Map();
    for (const cell of source.grid) {
      if (!distinct.has(cell.sourceId)) {
        distinct.set(cell.sourceId, {
          sourceId: cell.sourceId,
          sourceNameEn: cell.sourceNameEn,
          sourceRarity: cell.sourceRarity,
          weaponType: cell.weaponType,
        });
      }
    }

    for (const entry of distinct.values()) {
      const g = entry.sourceNameEn ? gdb.weapons(entry.sourceNameEn) : null;
      const gdbType = g ? GDB_TYPE_TO_TYPE[g.weaponType] : null;
      const expectedDbType = TYPE_TO_DB[entry.weaponType];
      const typeConsistent = Boolean(gdbType && gdbType === entry.weaponType);

      let dbRow = g ? byId.get(String(g.id)) : null;
      let via = g ? 'genshin-db id' : null;
      if (dbRow && dbRow.type !== expectedDbType) dbRow = null;
      if (!dbRow && entry.sourceNameEn) {
        dbRow = byName.get(normalize(entry.sourceNameEn)) || null;
        via = 'normalized English name fallback';
      }

      if (!dbRow || !typeConsistent) {
        mapping.unmatched.push({
          ...entry,
          gdbId: g ? String(g.id) : null,
          gdbType: g ? g.weaponType : null,
          reason: !g
            ? 'Không tìm thấy trong genshin-db; không đoán ID.'
            : !typeConsistent
              ? `Loại nguồn (${entry.weaponType}) khác game data (${gdbType}); không gán.`
              : `Không có Weapon.id hợp lệ trong database (${g.id}); không tạo bản ghi mới.`,
        });
        continue;
      }

      mapping.matched[entry.sourceId] = {
        weaponId: String(dbRow.id),
        weaponType: entry.weaponType,
        dbType: dbRow.type,
        nameEn: dbRow.nameEn,
        nameVi: dbRow.nameVi,
        rarity: dbRow.rarity,
        gdbId: String(g.id),
        gdbType: g.weaponType,
        via,
      };
      mapping.crossChecks.push({
        sourceId: entry.sourceId,
        nameEn: dbRow.nameEn,
        nameVi: dbRow.nameVi,
        sourceRarity: entry.sourceRarity,
        dbRarity: dbRow.rarity,
        rarityConsistent: entry.sourceRarity === null || entry.sourceRarity === dbRow.rarity,
      });
    }
  } finally {
    await prisma.$disconnect();
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(mapping, null, 2) + '\n');
  return mapping;
}

if (require.main === module) {
  buildMapping().then(m => {
    console.log(JSON.stringify({
      target: m.target,
      matched: Object.keys(m.matched).length,
      unmatched: m.unmatched.length,
      rarityMismatches: m.crossChecks.filter(c => !c.rarityConsistent).length,
      sampleTestCases: ['light_of_foliar_incision', 'summit_shaper', 'xiphos_moonlight', 'favonius_sword', 'sacrificial_sword', 'thrilling_tales_of_dragon_slayers', 'staff_of_homa', 'aqua_simulacra', 'the_widsith']
        .map(id => [id, m.matched[id] ? m.matched[id].weaponId : 'UNMATCHED']),
    }, null, 2));
  }).catch(error => { console.error(error); process.exitCode = 1; });
}

module.exports = { buildMapping, normalize };
