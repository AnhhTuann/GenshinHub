const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const characters = await prisma.character.findMany({
    select: { nameEn: true, avatarUrl: true, element: true, rarity: true }
  });
  
  const weapons = await prisma.weapon.findMany({
    select: { nameEn: true, iconUrl: true, rarity: true }
  });

  const charMap = {};
  characters.forEach(c => charMap[c.nameEn] = c);
  
  const wpMap = {};
  weapons.forEach(w => wpMap[w.nameEn] = w);

  console.log("Found characters:", characters.length);
  console.log("Found weapons:", weapons.length);
  
  fs.writeFileSync('db_dump.json', JSON.stringify({ characters: charMap, weapons: wpMap }, null, 2));
}

main().finally(() => prisma.$disconnect());
