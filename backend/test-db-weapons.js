const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const weapons = await prisma.weapon.findMany({
    where: {
      OR: [
        { name: { contains: 'Nịnh' } },
        { name: { contains: 'Vanquisher' } },
        { name: { contains: 'Kunwu' } },
        { iconUrl: { contains: 'Kunwu' } }
      ]
    }
  });
  console.log(weapons);
}
main().catch(console.error).finally(() => prisma.$disconnect());
