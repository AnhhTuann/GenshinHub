const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function update() {
  await p.character.update({ where: { id: 'manekin' }, data: { avatarUrl: '/images/avatars/UI_AvatarIcon_MannequinBoy.png' }});
  await p.character.update({ where: { id: 'manekina' }, data: { avatarUrl: '/images/avatars/UI_AvatarIcon_MannequinGirl.png' }});
  console.log("Updated avatar URLs for Manekin and Manekina");
}

update().finally(()=>p.$disconnect());
