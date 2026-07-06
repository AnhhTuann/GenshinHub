const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../backend/prisma/seeds/artifacts-data.ts');
let content;
try {
  content = fs.readFileSync(src, 'utf8');
} catch(e) {
  console.error('File not found:', src);
  process.exit(1);
}

// Extract all artifact objects
const match = content.match(/\[\r?\n([\s\S]*)\r?\n\];?\s*$/);
if (!match) { console.error('Cannot find array'); process.exit(1); }

const rawText = match[1];

// Split by }, then { pattern
const items = [];
let depth = 0;
let start = -1;
for (let i = 0; i < rawText.length; i++) {
  if (rawText[i] === '{') {
    if (depth === 0) start = i;
    depth++;
  } else if (rawText[i] === '}') {
    depth--;
    if (depth === 0 && start !== -1) {
      items.push(rawText.slice(start, i+1).trim());
      start = -1;
    }
  }
}

console.log(`Found ${items.length} artifacts`);

// Split roughly by thirds
const third = Math.ceil(items.length / 3);
const early = items.slice(0, third);
const mid = items.slice(third, third * 2);
const latest = items.slice(third * 2);

console.log(`Early: ${early.length}, Mid: ${mid.length}, Latest: ${latest.length}`);

const outDir = path.join(__dirname, '../backend/prisma/seeds/artifacts-data');
fs.mkdirSync(outDir, { recursive: true });

const header = '// Auto-generated - DO NOT EDIT MANUALLY\n// Run scripts/split-artifacts.js to regenerate\n';

const writeFile = (name, data) => {
  const content = `${header}export const ${name}Data = [\n  ${data.join(',\n  ')}\n];\n`;
  fs.writeFileSync(path.join(outDir, `${name}.ts`), content, 'utf8');
  console.log(`Written ${name}.ts (${data.length} artifacts)`);
};

writeFile('early', early);
writeFile('mid', mid);
writeFile('latest', latest);

// Write index.ts
const indexContent = `// Auto-generated - DO NOT EDIT MANUALLY
import { earlyData } from './early';
import { midData } from './mid';
import { latestData } from './latest';

export const artifactsData = [
  ...earlyData,
  ...midData,
  ...latestData,
];
`;
fs.writeFileSync(path.join(outDir, 'index.ts'), indexContent, 'utf8');
console.log('Written index.ts');
console.log('Total:', early.length + mid.length + latest.length);
