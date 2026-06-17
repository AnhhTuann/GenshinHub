import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const dilucTeams = await prisma.characterTeam.findMany({ where: { characterId: 'diluc' } });
  console.log("Diluc Teams:", dilucTeams);
  
  const arlecchinoTeams = await prisma.characterTeam.findMany({ where: { characterId: 'arlecchino' } });
  console.log("Arlecchino Teams:", arlecchinoTeams);

  const dehyaArtifacts = await prisma.characterArtifact.findMany({ where: { characterId: 'dehya' } });
  console.log("Dehya Artifacts:", dehyaArtifacts);
}
main().catch(console.error).finally(() => prisma.$disconnect());
