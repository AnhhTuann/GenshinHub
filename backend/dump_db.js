const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const char = await prisma.character.findUnique({
    where: { id: "nilou" },
    include: {
      bestArtifacts: true
    }
  });
  console.dir(char.bestArtifacts, { depth: null });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
