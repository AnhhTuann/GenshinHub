const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.weapon.findMany({ take: 5 })
  .then(r => {
    console.log('Sample weapons:', JSON.stringify(r, null, 2));
    return p.$disconnect();
  })
  .catch(e => { console.error(e); return p.$disconnect(); });
