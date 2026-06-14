const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const char = await prisma.character.findFirst({ where: { nameEn: 'Aloy' }});
  const weapon = await prisma.weapon.findFirst({ where: { type: char.weapon }});
  const anyWeapon = await prisma.weapon.findFirst();
  console.log('Character weapon:', char.weapon);
  console.log('Sample matching weapon:', weapon ? weapon.type : 'none');
  console.log('Sample any weapon:', anyWeapon.type);
}
main().catch(console.error).finally(() => prisma.$disconnect());
