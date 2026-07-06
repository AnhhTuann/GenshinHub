const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../backend/prisma/seeds/weapons-data.ts');
let content = fs.readFileSync(src, 'utf8');

// Extract all weapon objects between [ and ];
const match = content.match(/\[\r?\n([\s\S]*)\r?\n\];?\s*$/);
if (!match) { console.error('Cannot find array'); process.exit(1); }

// Split into individual weapon objects
// Each starts with a newline + 2 spaces + {
const rawItems = match[1].split(/(?<=\}),\r?\n  /);

const groups = {
  sword: [],      // Kiếm Đơn
  claymore: [],   // Trường Kiếm
  polearm: [],    // Vũ Khí Cán Dài  
  bow: [],        // Cung
  catalyst: [],   // Pháp Khí
};

// Vietnamese type names used in the data
const typeMap = {
  sword:    ['Ki\\u1ebfm \\u0110\\u01a1n', '"type":"Ki'],
  claymore: ['Tr\\u01b0\\u1eddng Ki\\u1ebfm', '"type":"Tr'],
  polearm:  ['V\\u0169 Kh\\u00ed C\\u00e1n D\\u00e0i', '"type":"V'],
  bow:      ['Cung', '"type":"Cu'],
  catalyst: ['Ph\\u00e1p Kh\\u00ed', '"type":"Ph'],
};

let parsed = 0;
for (const item of rawItems) {
  const cleaned = item.trim().replace(/^,/, '');
  try {
    // Extract type field
    const typeMatch = cleaned.match(/"type":"([^"]+)"/);
    if (!typeMatch) { console.log('No type in:', cleaned.substring(0, 100)); continue; }
    const type = typeMatch[1];
    
    if (type.includes('iếm Đ')) groups.sword.push(cleaned);
    else if (type.includes('rường') || type.includes('rọng')) groups.claymore.push(cleaned);
    else if (type.includes('ũ') || type.includes('ài')) groups.polearm.push(cleaned);
    else if (type.includes('ung') && !type.includes('rường')) groups.bow.push(cleaned);
    else if (type.includes('háp')) groups.catalyst.push(cleaned);
    else {
      // fallback: try English type names
      if (type === 'Sword' || type.includes('Sword')) groups.sword.push(cleaned);
      else if (type.includes('Claymore')) groups.claymore.push(cleaned);
      else if (type.includes('Pole') || type.includes('Spear')) groups.polearm.push(cleaned);
      else if (type === 'Bow') groups.bow.push(cleaned);
      else if (type.includes('Catalyst')) groups.catalyst.push(cleaned);
      else { console.log('Unknown type:', type); groups.catalyst.push(cleaned); }
    }
    parsed++;
  } catch(e) {
    console.error('Error parsing item:', e.message);
  }
}

console.log(`Parsed: ${parsed} weapons`);
console.log(`Sword: ${groups.sword.length}, Claymore: ${groups.claymore.length}, Polearm: ${groups.polearm.length}, Bow: ${groups.bow.length}, Catalyst: ${groups.catalyst.length}`);

// Write weapon type files
const outDir = path.join(__dirname, '../backend/prisma/seeds/weapons-data');
fs.mkdirSync(outDir, { recursive: true });

const header = '// Auto-generated - DO NOT EDIT MANUALLY\n// Run scripts/split-weapons.js to regenerate\n';

for (const [type, items] of Object.entries(groups)) {
  const fileContent = `${header}export const ${type}Data = [\n  ${items.join(',\n  ')}\n];\n`;
  fs.writeFileSync(path.join(outDir, `${type}.ts`), fileContent, 'utf8');
  console.log(`Written ${type}.ts (${items.length} weapons)`);
}

// Write index.ts
const indexContent = `// Auto-generated - DO NOT EDIT MANUALLY
import { swordData } from './sword';
import { claymoreData } from './claymore';
import { polearmData } from './polearm';
import { bowData } from './bow';
import { catalystData } from './catalyst';

export const weaponsData = [
  ...swordData,
  ...claymoreData,
  ...polearmData,
  ...bowData,
  ...catalystData,
];
`;
fs.writeFileSync(path.join(outDir, 'index.ts'), indexContent, 'utf8');
console.log('Written index.ts');
console.log('Done! Total:', groups.sword.length + groups.claymore.length + groups.polearm.length + groups.bow.length + groups.catalyst.length);
