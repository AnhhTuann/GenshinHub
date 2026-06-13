const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  const chars = await p.character.findMany({
    where: {
      nameEn: {
        in: ['Manekin', 'Manekina']
      }
    }
  });
  console.log(chars);
}

run().finally(() => p.$disconnect());
