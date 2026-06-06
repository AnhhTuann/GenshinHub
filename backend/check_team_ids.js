const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  const characters = await prisma.character.findMany({ select: { id: true, name: true } });
  const dbIds = new Set(characters.map(c => c.id));
  
  const teamsPath = path.resolve(__dirname, '../frontend/data/teams.ts');
  const content = fs.readFileSync(teamsPath, 'utf-8');
  
  const matches = content.match(/characterId:\s*["']([^"']+)["']/g) || [];
  const teamCharIds = new Set();
  
  for (const m of matches) {
    const match = m.match(/characterId:\s*["']([^"']+)["']/);
    if (match && match[1]) {
      teamCharIds.add(match[1]);
    }
  }

  const missing = [];
  for (const id of teamCharIds) {
    if (!dbIds.has(id)) {
      missing.push(id);
    }
  }

  console.log("Total unique character IDs in teams:", teamCharIds.size);
  console.log("Missing IDs in database:", missing);
}

main().catch(console.error).finally(() => prisma.$disconnect());
