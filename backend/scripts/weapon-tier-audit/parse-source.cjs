'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { parseSource } = require('./tier-map.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const RAW = path.join(ROOT, 'docs', 'weapon-tier-audit', 'source-raw.json');
const OUTPUT = path.join(ROOT, 'docs', 'weapon-tier-audit', 'source.json');

function parse() {
  const bytes = fs.readFileSync(RAW);
  const raw = JSON.parse(bytes.toString('utf8'));
  const parsed = parseSource(raw);
  parsed.rawChecksum = createHash('sha256').update(bytes).digest('hex');
  fs.writeFileSync(OUTPUT, JSON.stringify(parsed, null, 2) + '\n');
  return parsed;
}

if (require.main === module) {
  const parsed = parse();
  const byType = {};
  for (const cell of parsed.grid) byType[cell.weaponType] = (byType[cell.weaponType] || 0) + 1;
  console.log(JSON.stringify({
    rankedCells: parsed.grid.length,
    excludedUnlabelledCells: parsed.unranked.length,
    byType,
    gameVersion: parsed.gameVersion,
    gameVersionStatus: parsed.gameVersionStatus,
    rawChecksum: parsed.rawChecksum,
  }, null, 2));
}

module.exports = { parse };
