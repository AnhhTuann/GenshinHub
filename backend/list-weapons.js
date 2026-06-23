const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listWeapons() {
  const weapons = await prisma.weapon.findMany({
    select: { id: true, nameEn: true }
  });
  console.log(weapons.slice(0, 50));
}
listWeapons().finally(() => prisma.$disconnect());
