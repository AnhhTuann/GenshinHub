const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const sets = await prisma.artifactSet.findMany({ select: { name: true } });
  const setNames = new Set(sets.map(x => x.name));
  const chars = await prisma.character.findMany({ include: { bestArtifacts: true } });
  const missing = new Set();
  for (const char of chars) {
    for (const art of char.bestArtifacts) {
      if (!setNames.has(art.setName) && !art.setName.toLowerCase().includes('mix') && !art.setName.toLowerCase().includes('+')) {
        missing.add(art.setName);
      }
    }
  }
  console.log(Array.from(missing));
}
run().catch(console.error).finally(() => prisma.$disconnect());
