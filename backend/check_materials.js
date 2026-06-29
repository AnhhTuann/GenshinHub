const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function checkMaterials() {
  const count = await prisma.characterMaterial.count();
  console.log('Total CharacterMaterial records:', count);
}
checkMaterials().catch(console.error).finally(() => prisma.$disconnect());
