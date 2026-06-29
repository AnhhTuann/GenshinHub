const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const aloy = await prisma.character.findUnique({ where: { id: 'aloy' }});
  console.log('Aloy Ascension:', JSON.stringify(aloy.ascensionMats, null, 2));
}
run().finally(() => prisma.$disconnect());
