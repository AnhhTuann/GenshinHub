const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const mats = await prisma.material.findMany({ take: 10 });
  console.log(mats);
  const aloy = await prisma.character.findUnique({ where: { id: 'aloy' }});
  console.log('Aloy Ascension:', JSON.stringify(aloy.ascensionMats, null, 2));
}
run().finally(() => prisma.$disconnect());
