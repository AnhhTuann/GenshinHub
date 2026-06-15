const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.character.findFirst({where: {nameEn: 'Xiao'}, select: {nameEn: true, ascensionMats: true}})
  .then(c => console.log(JSON.stringify(c, null, 2)))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
