const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const c = await prisma.character.findUnique({ where: { id: 'furina' } });
  console.log(JSON.stringify(c.bestWeapons, null, 2));
}
run().finally(() => prisma.$disconnect());
