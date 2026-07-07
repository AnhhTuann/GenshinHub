const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const dirs = fs.readdirSync('../frontend/public/assets/characters');
  const chars = await prisma.character.findMany({ select: { avatarUrl: true } });
  
  const dbNames = chars.map(c => {
    if (!c.avatarUrl) return '';
    const m = c.avatarUrl.match(/\/assets\/characters\/([^/]+)\//);
    return m ? m[1].toLowerCase() : '';
  }).filter(Boolean);

  const missingData = [];
  for (const dir of dirs) {
    if (dir.includes('.')) continue; // skip files
    if (!dbNames.includes(dir.toLowerCase())) {
      missingData.push(dir);
    }
  }
  
  console.log('Folders (Images) without DB data:', missingData);
  await prisma.$disconnect();
}
run();
