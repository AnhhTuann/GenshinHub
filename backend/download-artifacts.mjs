import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const artifactsDataPath = './prisma/seeds/artifacts-data.ts';
const outDir = path.resolve('../frontend/public/assets/artifacts');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Extract artifact icon names from artifacts-data.ts
const code = fs.readFileSync(artifactsDataPath, 'utf8');
const iconRegex = /iconUrl:\s*['"]\/images\/artifacts\/(UI_RelicIcon_\d+_\d)\.png['"]/g;
let match;
const icons = new Set();

while ((match = iconRegex.exec(code)) !== null) {
  icons.add(match[1]);
}

console.log(`Found ${icons.size} artifact icons to download.`);

async function downloadAndConvert() {
  let count = 0;
  for (const icon of icons) {
    const url = `https://api.ambr.top/assets/UI/relic/${icon}.png`;
    const destPath = path.join(outDir, `${icon}.webp`);
    
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed to download ${url}: ${res.statusText}`);
        continue;
      }
      const buffer = await res.arrayBuffer();
      
      await sharp(Buffer.from(buffer))
        .webp({ quality: 90 })
        .toFile(destPath);
        
      count++;
      if (count % 10 === 0) console.log(`Processed ${count}/${icons.size}`);
    } catch (err) {
      console.error(`Error processing ${icon}:`, err.message);
    }
  }
  console.log(`Successfully converted ${count} artifact images to webp.`);
}

downloadAndConvert();
