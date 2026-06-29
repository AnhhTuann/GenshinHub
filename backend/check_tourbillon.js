const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const mats = await prisma.material.findMany({ where: { nameEn: { contains: 'Tourbillon' } } });
  console.log(mats);
}
run().finally(() => prisma.$disconnect());
