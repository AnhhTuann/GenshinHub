const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const mats = await prisma.material.findMany();
  const quoted = mats.filter(m => m.nameEn.includes('"'));
  console.log(quoted.map(m => m.nameEn));
}
run().finally(() => prisma.$disconnect());
