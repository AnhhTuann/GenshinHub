import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const teams = await prisma.characterTeam.findMany({
    where: { characterId: 'diona' }
  });
  console.log('Total Diona teams:', teams.length);
}
main().catch(console.error).finally(() => prisma.$disconnect());
