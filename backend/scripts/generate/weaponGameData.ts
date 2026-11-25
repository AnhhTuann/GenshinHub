/**
 * Regenerate the pinned WeaponGameData snapshot from genshin-db 5.2.15.
 *
 * This script is a MAINTENANCE-TIME tool only. The backend server must never
 * import genshin-db: loading it alone allocates ~576 MiB RSS, above the
 * 512 MiB limit of the Render Free plan.
 */
import fs from 'fs';
import path from 'path';
import * as genshinDb from 'genshin-db';
import {
  WeaponGameData,
  buildLevels,
  buildRefinements,
  buildAscension,
  slugify,
} from '../../src/graphql/modules/weapon/weaponGameData.service';

const gdb = genshinDb as any;
const entries: Array<{ sourceId: number; aliases: string[]; data: WeaponGameData }> = [];

const names = (gdb.weapons('names', { matchCategories: true }) as string[] | undefined) || [];
for (const name of names) {
  const source = gdb.weapons(name, { matchName: 'equal' });
  if (!source) continue;
  const sourceId = Number(source.id);
  if (!Number.isFinite(sourceId)) continue;

  const data: WeaponGameData = {
    id: String(source.id),
    sourceId,
    nameEn: String(source.name || ''),
    weaponType: String(source.weaponType || ''),
    weaponText: String(source.weaponText || ''),
    rarity: Number(source.rarity) || 0,
    description: source.description ? String(source.description) : null,
    passiveName: source.effectName ? String(source.effectName) : null,
    mainStatType: source.mainStatType ? String(source.mainStatType) : null,
    mainStatText: source.mainStatText ? String(source.mainStatText) : null,
    version: source.version ? String(source.version) : null,
    levels: buildLevels(source),
    refinements: buildRefinements(source),
    ascension: buildAscension(source),
  };

  entries.push({
    sourceId,
    aliases: [slugify(String(source.name || '')), slugify(String(source.id))].filter(Boolean),
    data,
  });
}

entries.sort((a, b) => a.sourceId - b.sourceId);
const outputPath = path.resolve(__dirname, '../../data/weapon-game-data.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(entries));
console.log(`Wrote ${entries.length} weapon game-data records to ${outputPath}`);
