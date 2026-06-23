const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listWeapons() {
  const weapons = await prisma.weapon.findMany({
    select: { id: true, nameEn: true, type: true }
  });
  console.log(JSON.stringify(weapons, null, 2));
}
listWeapons().finally(() => prisma.$disconnect());
