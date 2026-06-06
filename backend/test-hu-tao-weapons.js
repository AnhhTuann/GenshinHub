const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const ws = await prisma.weapon.findMany({
    where: { type: 'Vũ Khí Cán Dài' }
  });
  console.log(ws.map(w => ({ id: w.id, name: w.name })));
}
main().catch(console.error).finally(() => prisma.$disconnect());
