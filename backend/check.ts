import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const chars = await prisma.character.findMany({ where: { tier: { not: null } }});
  console.log('Characters with tier:', chars.map(x=>x.id+':'+x.tier));
}
main().finally(() => prisma.$disconnect());
