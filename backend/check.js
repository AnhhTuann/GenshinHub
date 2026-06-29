const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function check() {
  const c = await prisma.character.findUnique({ where: { id: 'aloy' } });
  console.log('Aloy element in DB:', c.element);
}
check().catch(console.error).finally(() => prisma.$disconnect());
