const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const chars = await prisma.character.findMany({});
  console.log(JSON.stringify(chars.map(c => ({ id: c.id, nameEn: c.nameEn })), null, 2));
}

main().catch(console.error);
