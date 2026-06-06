const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const weapons = await prisma.weapon.findMany({ take: 3 });
  console.log(JSON.stringify(weapons[0], null, 2));
  console.log('Total:', (await prisma.weapon.findMany()).length);
}
main().catch(console.error).finally(() => prisma.$disconnect());
