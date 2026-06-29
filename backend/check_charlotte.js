const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const c = await prisma.character.findUnique({ where: { id: 'charlotte' } });
  console.log('Current weapons:', JSON.stringify(c.bestWeapons, null, 2));
}
run().finally(() => prisma.$disconnect());
