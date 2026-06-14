const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.weapon.findMany({ where: { type: 'Cung' }}).then(w => console.log('Bows:', w.map(x=>x.nameEn))).finally(() => prisma.$disconnect());
