const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const mats = await prisma.material.findMany({ 
    where: { 
      nameEn: { contains: 'Shivada', mode: 'insensitive' } 
    } 
  });
  console.log('Found mats:', mats);
}
run().finally(() => prisma.$disconnect());
