import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const w = await prisma.weapon.findMany();
  console.log('Total weapons:', w.length);
  console.log('Weapons with tier:', w.filter(x=>x.tier).length);
}
main().finally(() => prisma.$disconnect());
