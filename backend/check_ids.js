const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  const chars = await p.character.findMany({ select: { id: true, nameEn: true }, take: 5 });
  console.log("Characters:", chars);
  
  const weapons = await p.weapon.findMany({ select: { id: true, nameEn: true }, take: 5 });
  console.log("Weapons:", weapons);
}

run().finally(() => p.$disconnect());
