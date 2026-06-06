const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

// Convert Character.weapon field from Vietnamese to English
const WEAPON_MAP = {
  'Kiếm Đơn': 'Sword',
  'Trọng Kiếm': 'Claymore',
  'Vũ Khí Cán Dài': 'Polearm',
  'Cung': 'Bow',
  'Pháp Khí': 'Catalyst',
};

async function main() {
  for (const [vn, en] of Object.entries(WEAPON_MAP)) {
    const result = await p.character.updateMany({
      where: { weapon: vn },
      data: { weapon: en }
    });
    if (result.count > 0) console.log(`${vn} → ${en}: ${result.count} characters`);
  }
  console.log('✅ Character weapon types converted to English!');
}

main().catch(console.error).finally(() => p.$disconnect());
