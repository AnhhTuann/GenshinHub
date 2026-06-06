const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const sets = await prisma.artifactSet.findMany({ take: 2 });
  console.log(JSON.stringify(sets[0], null, 2));
  console.log('\nTotal sets:', (await prisma.artifactSet.count()));
}
main().catch(console.error).finally(() => prisma.$disconnect());
