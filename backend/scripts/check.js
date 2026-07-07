const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const chars = await prisma.character.findMany({ take: 2, select: { avatarUrl: true } });
  console.log(chars);
  await prisma.$disconnect();
}
run();
