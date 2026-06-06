const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const TYPE_MAP = {
  'Kiếm Đơn': 'Sword',
  'Trọng Kiếm': 'Claymore',
  'Vũ Khí Cán Dài': 'Polearm',
  'Cung': 'Bow',
  'Pháp Khí': 'Catalyst',
};

async function main() {
  for (const [vn, en] of Object.entries(TYPE_MAP)) {
    const result = await p.weapon.updateMany({
      where: { type: vn },
      data: { type: en }
    });
    console.log(`${vn} → ${en}: ${result.count} updated`);
  }
  console.log('✅ Weapon types converted to English!');
}

main().catch(console.error).finally(() => p.$disconnect());
