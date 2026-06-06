const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const weaps = await prisma.weapon.findMany({ select: { name: true } });
  const n = weaps.map(x => x.name);
  console.log('Phác', n.filter(x => x.includes('Phác')));
  console.log('Hòa Ph', n.filter(x => x.includes('Hòa Ph')));
  console.log('Trong', n.filter(x => x.includes('Trong')));
  console.log('Dòng', n.filter(x => x.includes('Dòng')));
}
run().catch(console.error).finally(() => prisma.$disconnect());
