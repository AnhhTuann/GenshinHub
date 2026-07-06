/**
 * sync_character_data.mjs
 *
 * Script tự động:
 * 1. Đọc danh sách nhân vật từ characters.ts
 * 2. Phát hiện nhân vật chưa có seed data folder
 * 3. Tạo seed files (profile, stats, build, teams, index) cho nhân vật mới
 * 4. Cập nhật characters.ts để import + thêm vào metaBuilds
 *
 * Ảnh đã có thì SKIP, chỉ tạo data.
 */

import fs from 'fs';
import path from 'path';

const SEEDS_DIR = path.resolve('./backend/prisma/seeds/characters');
const CHARACTERS_TS = path.resolve('./backend/prisma/seeds/characters.ts');

// ============================================================
// Name → ID mapping (same logic as characters.ts)
// ============================================================
const forcedIdMap = {
  "yumemizuki-mizuki": "yumemizu",
  "lan-yan": "lanyan",
  "kirara": "momoka",
  "manekin": "traveler-boy",
  "manekina": "traveler-girl",
  "traveler": "traveler",
};

const toId = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ============================================================
// Weapon defaults per type (for bestWeapons template)
// ============================================================
const weaponDefaults = {
  Sword: [
    { rank: 5, nameVi: 'Bàn Nham Kết Lục', nameEn: 'Primordial Jade Cutter', subStat: 'Tỷ Lệ Bạo Kích', isF2P: false, refinement: 'R1', passiveDescVi: 'Tăng HP và Tấn Công dựa trên HP tối đa.', passiveDescEn: 'Increases HP. Based on Max HP, the wielder gains ATK bonus.', iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Morax.webp' },
    { rank: 4, nameVi: 'Đoản Đao Amenoma', nameEn: 'Amenoma Kageuchi', subStat: 'Tấn Công%', isF2P: true, refinement: 'R5', passiveDescVi: 'Hồi năng lượng sau khi dùng Kỹ Năng Nộ.', passiveDescEn: 'Regenerates Energy after using Elemental Burst.', iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Bakufu.webp' },
  ],
  Claymore: [
    { rank: 5, nameVi: 'Đường Cùng Của Sói', nameEn: "Wolf's Gravestone", subStat: 'Tấn Công%', isF2P: false, refinement: 'R1', passiveDescVi: 'Tăng mạnh Tấn Công cho cả đội.', passiveDescEn: 'Increases ATK. On hit, attacks have a chance to increase all party members ATK.', iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Wolfmound.webp' },
    { rank: 4, nameVi: 'Mẫu Cổ Hoa', nameEn: 'Prototype Archaic', subStat: 'Tấn Công%', isF2P: true, refinement: 'R5', passiveDescVi: 'Có xác suất gây sát thương AoE khi tấn công.', passiveDescEn: 'On hit, Normal or Charged Attacks have a chance to deal AoE ATK DMG.', iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Proto.webp' },
  ],
  Bow: [
    { rank: 5, nameVi: 'Cánh Thiên Không', nameEn: 'Skyward Harp', subStat: 'Tỷ Lệ Bạo Kích', isF2P: false, refinement: 'R1', passiveDescVi: 'Tăng Sát Thương Bạo Kích và gây sát thương vật lý AoE.', passiveDescEn: 'Increases CRIT DMG. Hits have a chance to deal AoE Physical DMG.', iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Dvalin.webp' },
    { rank: 4, nameVi: 'Tuyệt Huyền', nameEn: 'The Stringless', subStat: 'Tinh Thông Nguyên Tố', isF2P: false, refinement: 'R5', passiveDescVi: 'Tăng sát thương Kỹ năng Nguyên tố và Kỹ Năng Nộ.', passiveDescEn: 'Increases Elemental Skill and Elemental Burst DMG.', iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Troupe.webp' },
  ],
  Catalyst: [
    { rank: 5, nameVi: 'Điển Tích Tây Phong', nameEn: 'Lost Prayer to the Sacred Winds', subStat: 'Tỷ Lệ Bạo Kích', isF2P: false, refinement: 'R1', passiveDescVi: 'Tăng tốc độ di chuyển và sát thương nguyên tố theo thời gian.', passiveDescEn: 'Increases Movement SPD and Elemental DMG Bonus every 4s in combat.', iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Fourwinds.webp' },
    { rank: 4, nameVi: 'Chương Nhạc Lang Thang', nameEn: 'The Widsith', subStat: 'Sát Thương Bạo Kích', isF2P: false, refinement: 'R5', passiveDescVi: 'Nhận ngẫu nhiên 1 trong 3 buff cực mạnh khi ra trận.', passiveDescEn: 'When a character takes the field, they gain a random buff for 10s.', iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Troupe.webp' },
  ],
  Polearm: [
    { rank: 5, nameVi: 'Thương Diệu', nameEn: 'Engulfing Lightning', subStat: 'Hiệu Quả Nạp Nguyên Tố', isF2P: false, refinement: 'R1', passiveDescVi: 'ATK tăng dựa trên Hiệu Quả Nạp Nguyên Tố vượt quá 100%.', passiveDescEn: 'ATK increased by 28% of Energy Recharge over the base 100%.', iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Narukami.webp' },
    { rank: 4, nameVi: 'Lao Xiên Cá', nameEn: "The Catch", subStat: 'Hiệu Quả Nạp Nguyên Tố', isF2P: true, refinement: 'R5', passiveDescVi: 'Tăng sát thương Kỹ Năng Nộ và Tỷ Lệ Bạo Kích của Kỹ Năng Nộ.', passiveDescEn: 'Increases Elemental Burst DMG and CRIT Rate.', iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Mori.webp' },
  ],
};

// Element → recommended artifact sets
const elementArtifacts = {
  Pyro:    [{ setNameVi: 'Thơ Ca Chiến Binh Ngọn Lửa', setNameEn: "Crimson Witch of Flames", pieces: 4 }],
  Hydro:   [{ setNameVi: 'Lòng Đại Dương Sâu Thẳm', setNameEn: "Heart of Depth", pieces: 4 }],
  Cryo:    [{ setNameVi: 'Băng Phong Hoa Kiếm', setNameEn: "Blizzard Strayer", pieces: 4 }],
  Electro: [{ setNameVi: 'Sấm Sét Nấm Thiên Lôi', setNameEn: "Thundering Fury", pieces: 4 }],
  Anemo:   [{ setNameVi: 'Bão Tố Viễn Cổ', setNameEn: "Viridescent Venerer", pieces: 4 }],
  Geo:     [{ setNameVi: 'Hoa Cương Thạch Sơn', setNameEn: "Husk of Opulent Dreams", pieces: 4 }],
  Dendro:  [{ setNameVi: 'Mảnh Vỡ Thảo Nguyên Sâu', setNameEn: "Deepwood Memories", pieces: 4 }],
  Ice:     [{ setNameVi: 'Băng Phong Hoa Kiếm', setNameEn: "Blizzard Strayer", pieces: 4 }],
  Wind:    [{ setNameVi: 'Bão Tố Viễn Cổ', setNameEn: "Viridescent Venerer", pieces: 4 }],
  Water:   [{ setNameVi: 'Lòng Đại Dương Sâu Thẳm', setNameEn: "Heart of Depth", pieces: 4 }],
  Fire:    [{ setNameVi: 'Thơ Ca Chiến Binh Ngọn Lửa', setNameEn: "Crimson Witch of Flames", pieces: 4 }],
  Electric:[{ setNameVi: 'Sấm Sét Nấm Thiên Lôi', setNameEn: "Thundering Fury", pieces: 4 }],
  Rock:    [{ setNameVi: 'Hoa Cương Thạch Sơn', setNameEn: "Husk of Opulent Dreams", pieces: 4 }],
  Grass:   [{ setNameVi: 'Mảnh Vỡ Thảo Nguyên Sâu', setNameEn: "Deepwood Memories", pieces: 4 }],
  None:    [{ setNameVi: 'Thánh Di Vật Đề Cử', setNameEn: "Recommended Set", pieces: 4 }],
};

// ============================================================
// Parse characters from characters.ts
// ============================================================
function parseCharactersFromFile() {
  const content = fs.readFileSync(CHARACTERS_TS, 'utf8');
  const chars = [];
  const regex = /"([^"]+)\|([^|"]+)\|([^|"]+)\|([^|"]+)"/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const [, name, element, weapon, rarity] = m;
    let id = toId(name);
    if (forcedIdMap[id]) id = forcedIdMap[id];
    chars.push({ name, element: element.trim(), weapon: weapon.trim(), rarity: rarity.trim(), id });
  }
  return chars;
}

// ============================================================
// Check existing seed directories
// ============================================================
function getExistingSeedDirs() {
  if (!fs.existsSync(SEEDS_DIR)) return new Set();
  return new Set(fs.readdirSync(SEEDS_DIR).filter(f =>
    fs.statSync(path.join(SEEDS_DIR, f)).isDirectory()
  ));
}

// ============================================================
// Generate seed file contents
// ============================================================
function genProfileTs(id, element, weapon, rarity) {
  const tier = rarity === '5' ? 'A' : 'B';
  const role = weapon === 'Bow' || weapon === 'Catalyst' ? 'Sub DPS' : 'Main DPS';
  return `export const profile = {
  characterId: '${id}',
  tier: '${tier}',
  role: '${role}',
  recommendedC: 'C0',
  tierNoteEn: [],
  tierNoteVi: []
};
`;
}

function genStatsTs() {
  // Generic placeholder stats - will be overwritten by Ambr data on seed
  return `export const stats = [
  { level: 'Lv.1',  ascend: 0, baseHp: 1000, baseAtk: 25, baseDef: 60, specialStatName: 'ATK', specialStatValue: '0.0%' },
  { level: 'Lv.20', ascend: 0, baseHp: 2500, baseAtk: 60, baseDef: 150, specialStatName: 'ATK', specialStatValue: '0.0%' },
  { level: 'Lv.20', ascend: 1, baseHp: 3200, baseAtk: 77, baseDef: 192, specialStatName: 'ATK', specialStatValue: '0.0%' },
  { level: 'Lv.40', ascend: 1, baseHp: 4800, baseAtk: 115, baseDef: 288, specialStatName: 'ATK', specialStatValue: '0.0%' },
  { level: 'Lv.40', ascend: 2, baseHp: 5300, baseAtk: 127, baseDef: 318, specialStatName: 'ATK', specialStatValue: '6.0%' },
  { level: 'Lv.50', ascend: 2, baseHp: 6100, baseAtk: 147, baseDef: 366, specialStatName: 'ATK', specialStatValue: '6.0%' },
  { level: 'Lv.50', ascend: 3, baseHp: 6800, baseAtk: 164, baseDef: 408, specialStatName: 'ATK', specialStatValue: '12.0%' },
  { level: 'Lv.60', ascend: 3, baseHp: 7600, baseAtk: 183, baseDef: 456, specialStatName: 'ATK', specialStatValue: '12.0%' },
  { level: 'Lv.60', ascend: 4, baseHp: 8100, baseAtk: 195, baseDef: 486, specialStatName: 'ATK', specialStatValue: '12.0%' },
  { level: 'Lv.70', ascend: 4, baseHp: 8900, baseAtk: 215, baseDef: 534, specialStatName: 'ATK', specialStatValue: '12.0%' },
  { level: 'Lv.70', ascend: 5, baseHp: 9400, baseAtk: 227, baseDef: 564, specialStatName: 'ATK', specialStatValue: '18.0%' },
  { level: 'Lv.80', ascend: 5, baseHp: 10200, baseAtk: 246, baseDef: 612, specialStatName: 'ATK', specialStatValue: '18.0%' },
  { level: 'Lv.80', ascend: 6, baseHp: 10700, baseAtk: 258, baseDef: 642, specialStatName: 'ATK', specialStatValue: '24.0%' },
  { level: 'Lv.90', ascend: 6, baseHp: 11500, baseAtk: 277, baseDef: 690, specialStatName: 'ATK', specialStatValue: '24.0%' },
];
`;
}

function genBuildTs(weapon, element) {
  const weapons = weaponDefaults[weapon] || weaponDefaults['Polearm'];
  const artifacts = elementArtifacts[element] || elementArtifacts['None'];

  const weaponsJson = JSON.stringify(weapons, null, 4)
    .replace(/"([^"]+)":/g, '$1:') // Remove quotes from keys
    .split('\n').map(l => '    ' + l).join('\n').trimStart();

  const artifactsJson = JSON.stringify(artifacts, null, 4)
    .replace(/"([^"]+)":/g, '$1:')
    .split('\n').map(l => '    ' + l).join('\n').trimStart();

  return `export const build = {
  talentPriority: ['Elemental Burst', 'Elemental Skill', 'Normal Attack'],
  signatureWeapons: [],
  sands: ['ATK%'],
  goblet: ['Elemental DMG Bonus'],
  circlet: ['CRIT Rate'],
  subStatsPriority: ['CRIT Rate', 'CRIT DMG', 'ATK%', 'Energy Recharge'],
  bestWeapons: ${weaponsJson},
  bestArtifacts: ${artifactsJson}
};
`;
}

function genTeamsTs() {
  return `export const teams = [];
`;
}

function genIndexTs(id, varName) {
  return `import { profile } from './profile';
import { stats } from './stats';
import { build } from './build';
import { teams } from './teams';

export const ${varName} = {
  ...profile,
  stats,
  ...build,
  teams
};
`;
}

// Convert id to camelCase variable name
function toCamelCase(id) {
  return id
    .split('-')
    .map((part, i) => i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// ============================================================
// Update characters.ts: add import + metaBuilds entry
// ============================================================
function updateCharactersTs(newChars) {
  if (newChars.length === 0) return;
  
  let content = fs.readFileSync(CHARACTERS_TS, 'utf8');
  
  for (const { id, varName, folderName } of newChars) {
    // Add import if not already there
    const importLine = `import { ${varName} } from './characters/${folderName}';`;
    if (!content.includes(importLine) && !content.includes(`from './characters/${folderName}'`)) {
      // Insert before "const metaBuilds"
      content = content.replace(
        /\nconst metaBuilds/,
        `\n${importLine}\nconst metaBuilds`
      );
      console.log(`  ✅ Added import for ${varName}`);
    }
    
    // Add to metaBuilds array if not already there
    if (!content.includes(`  ${varName},`) && !content.includes(`  ${varName}\n`)) {
      content = content.replace(
        /(\s+raidenShogun,?\n\];)/,
        `  raidenShogun,\n  ${varName},\n];`
      );
      // Fallback: insert before closing ] of metaBuilds
      if (!content.includes(`  ${varName},`)) {
        content = content.replace(
          /(\s+sandrone,?\n\];)/,
          `  sandrone,\n  ${varName},\n];`
        );
      }
      console.log(`  ✅ Added ${varName} to metaBuilds`);
    }
  }
  
  fs.writeFileSync(CHARACTERS_TS, content, 'utf8');
}

// ============================================================
// Main
// ============================================================
async function main() {
  console.log('🔍 Parsing characters from characters.ts...');
  const chars = parseCharactersFromFile();
  console.log(`   Found ${chars.length} characters in seed list.`);
  
  const existingDirs = getExistingSeedDirs();
  console.log(`   Found ${existingDirs.size} existing seed directories.`);
  
  const newCharsToCreate = [];
  
  for (const char of chars) {
    const { id, name, element, weapon, rarity } = char;
    
    // Skip traveler variants and manekin (they have special handling)
    if (id.startsWith('traveler') || id === 'manekin' || id === 'manekina') continue;
    
    if (existingDirs.has(id)) {
      // Seed folder exists — check if it has all required files
      const dir = path.join(SEEDS_DIR, id);
      const required = ['profile.ts', 'stats.ts', 'build.ts', 'teams.ts', 'index.ts'];
      const missing = required.filter(f => !fs.existsSync(path.join(dir, f)));
      
      if (missing.length > 0) {
        console.log(`⚠️  ${name} (${id}): Missing files: ${missing.join(', ')} — will create`);
        // Create missing files only
        for (const missingFile of missing) {
          const filePath = path.join(dir, missingFile);
          const varName = toCamelCase(id);
          if (missingFile === 'profile.ts') fs.writeFileSync(filePath, genProfileTs(id, element, weapon, rarity));
          else if (missingFile === 'stats.ts') fs.writeFileSync(filePath, genStatsTs());
          else if (missingFile === 'build.ts') fs.writeFileSync(filePath, genBuildTs(weapon, element));
          else if (missingFile === 'teams.ts') fs.writeFileSync(filePath, genTeamsTs());
          else if (missingFile === 'index.ts') fs.writeFileSync(filePath, genIndexTs(id, varName));
          console.log(`     Created: ${missingFile}`);
        }
      }
      continue;
    }
    
    // New character — create seed directory
    console.log(`🆕 New character: ${name} (id: ${id}, ${element} ${weapon} ${rarity}★)`);
    
    const dir = path.join(SEEDS_DIR, id);
    fs.mkdirSync(dir, { recursive: true });
    
    const varName = toCamelCase(id);
    
    fs.writeFileSync(path.join(dir, 'profile.ts'), genProfileTs(id, element, weapon, rarity));
    fs.writeFileSync(path.join(dir, 'stats.ts'), genStatsTs());
    fs.writeFileSync(path.join(dir, 'build.ts'), genBuildTs(weapon, element));
    fs.writeFileSync(path.join(dir, 'teams.ts'), genTeamsTs());
    fs.writeFileSync(path.join(dir, 'index.ts'), genIndexTs(id, varName));
    
    console.log(`   📁 Created seed directory: ${id}/`);
    
    newCharsToCreate.push({ id, varName, folderName: id, name });
  }
  
  if (newCharsToCreate.length > 0) {
    console.log(`\n📝 Updating characters.ts with ${newCharsToCreate.length} new imports...`);
    updateCharactersTs(newCharsToCreate);
  }
  
  console.log('\n✅ Sync complete!');
  console.log(`   - Skipped (already have data): ${chars.length - newCharsToCreate.length - 1}`);
  console.log(`   - New seed data created: ${newCharsToCreate.length}`);
  
  if (newCharsToCreate.length > 0) {
    console.log('\n📋 New characters added:');
    newCharsToCreate.forEach(c => console.log(`   - ${c.name} → ${c.id}/`));
  }
}

main().catch(console.error);
