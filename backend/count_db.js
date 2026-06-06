const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();
prisma.character.count().then(c => {
  console.log('Characters in DB:', c);
  prisma.character.findMany({ select: { name: true } }).then(chars => {
    console.log(chars.map(c => c.name).join(', '));
    prisma.$disconnect();
  });
}).catch(console.error);
