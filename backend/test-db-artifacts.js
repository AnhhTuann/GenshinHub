const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();
async function main() {
  const sets = await prisma.artifactSet.findMany();
  const names = sets.map(s => s.name);
  fs.writeFileSync('db_artifacts.json', JSON.stringify(names, null, 2));
  console.log("Written to db_artifacts.json");
}
main().catch(console.error).finally(() => prisma.$disconnect());
