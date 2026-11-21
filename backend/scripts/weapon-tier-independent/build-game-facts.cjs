'use strict';

/**
 * Read-only extract of the exact passive facts used by Phase B2.6.
 * Source: installed genshin-db 5.2.15 (local node_modules), no network calls.
 */
const fs = require('node:fs');
const path = require('node:path');
const gdb = require('genshin-db');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const OUT = path.join(ROOT, 'docs', 'weapon-tier-independent', 'game-facts.json');
const WEAPONS = {
  '11401': 'Favonius Sword',
  '11403': 'Sacrificial Sword',
  '11418': "Xiphos' Moonlight",
  '11512': 'Light of Foliar Incision',
  '12401': 'Favonius Greatsword',
  '12502': "Wolf's Gravestone",
  '13407': 'Favonius Lance',
  '13501': 'Staff of Homa',
  '14302': 'Thrilling Tales of Dragon Slayers',
  '14402': 'The Widsith',
  '14406': 'Prototype Amber',
  '14509': "Kagura's Verity",
  '15402': 'The Stringless',
  '15508': 'Aqua Simulacra',
};

function build() {
  const records = [];
  for (const [id, name] of Object.entries(WEAPONS)) {
    const w = gdb.weapons(name);
    if (!w || String(w.id) !== id) throw new Error(`genshin-db mismatch: ${id} / ${name}`);
    records.push({
      weaponId: id,
      name: w.name,
      effectName: w.effectName,
      subStatType: w.mainStatType,
      rarity: w.rarity,
      r1: { description: String(w.r1.description).replace(/\s+/g, ' ').trim(), values: w.r1.values },
      r5: { description: String(w.r5.description).replace(/\s+/g, ' ').trim(), values: w.r5.values },
    });
  }
  const artifact = {
    source: 'genshin-db@5.2.15 local package',
    purpose: 'Exact game facts for Phase B2.6 candidate validation. Facts never auto-derive a tier.',
    records,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(artifact, null, 2) + '\n');
  return artifact;
}

if (require.main === module) {
  const a = build();
  console.log(JSON.stringify({ source: a.source, weapons: a.records.length }, null, 2));
}
module.exports = { build, WEAPONS };
