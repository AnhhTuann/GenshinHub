import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const tiers = (await prisma.tierRank.findMany()).map(t=>t.name);
  console.log('DB Tiers:', tiers);
  const chars = await prisma.character.findMany();
  const missing = chars.filter(c => c.tier && !tiers.includes(c.tier));
  console.log('Characters with unknown tiers:', missing.map(c=>c.id + ':' + c.tier));
}
main().finally(() => prisma.$disconnect());
