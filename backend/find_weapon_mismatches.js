const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const weaps = await prisma.weapon.findMany({ select: { name: true } });
  const weapNames = new Set(weaps.map(x => x.name));
  const chars = await prisma.character.findMany({ include: { bestWeapons: true } });
  const missing = new Set();
  for (const char of chars) {
    for (const weap of char.bestWeapons) {
      if (!weapNames.has(weap.name)) {
        missing.add(weap.name);
      }
    }
  }
  console.log(Array.from(missing));
}
run().catch(console.error).finally(() => prisma.$disconnect());
