const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const weapons = await prisma.weapon.findMany();
  const types = new Set(weapons.map(w => w.type));
  console.log(Array.from(types));
}
main().catch(console.error).finally(() => prisma.$disconnect());
