const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const content = fs.readFileSync(path.resolve(__dirname, '../frontend/data/teams.ts'), 'utf8');
  const regex = /characterId:\s*["']([^"']+)["']/g;
  const idsInTeams = new Set();
  let match;
  while ((match = regex.exec(content)) !== null) {
    idsInTeams.add(match[1]);
  }
  
  const dbCharacters = await prisma.character.findMany({ select: { id: true, name: true } });
  const dbIds = new Set(dbCharacters.map(c => c.id));
  
  console.log("IDs in Teams:", Array.from(idsInTeams));
  console.log("Mismatches (IDs in Teams but NOT in DB):");
  const mismatches = [];
  for (const id of idsInTeams) {
    if (!dbIds.has(id)) {
      mismatches.push(id);
    }
  }
  console.log(mismatches);
}
main().catch(console.error).finally(() => prisma.$disconnect());
