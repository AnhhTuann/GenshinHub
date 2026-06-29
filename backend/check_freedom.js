const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const m = await prisma.material.findFirst({ where: { nameEn: { contains: 'Teachings of Freedom', mode: 'insensitive' } } });
  console.log(m ? 'FOUND: ' + m.iconUrl : 'NOT FOUND');
}
run().finally(() => prisma.$disconnect());
