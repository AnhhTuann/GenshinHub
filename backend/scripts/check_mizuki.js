const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function r() {
  const chars = await prisma.character.findFirst({ where: { nameEn: 'Yumemizuki Mizuki' }});
  console.log(chars);
  await prisma.$disconnect();
}
r();
