import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const huTaoStats = [
  { level: 'Lv.1', ascend: 0, baseHp: 1211, baseAtk: 8, baseDef: 68, specialStatName: 'CRIT DMG', specialStatValue: '50.0%' },
  { level: 'Lv.20', ascend: 0, baseHp: 3141, baseAtk: 22, baseDef: 177, specialStatName: 'CRIT DMG', specialStatValue: '50.0%' },
  { level: 'Lv.20', ascend: 1, baseHp: 4185, baseAtk: 30, baseDef: 236, specialStatName: 'CRIT DMG', specialStatValue: '50.0%' },
  { level: 'Lv.40', ascend: 1, baseHp: 6265, baseAtk: 45, baseDef: 353, specialStatName: 'CRIT DMG', specialStatValue: '50.0%' },
  { level: 'Lv.40', ascend: 2, baseHp: 7004, baseAtk: 50, baseDef: 395, specialStatName: 'CRIT DMG', specialStatValue: '59.6%' },
  { level: 'Lv.50', ascend: 2, baseHp: 8063, baseAtk: 58, baseDef: 454, specialStatName: 'CRIT DMG', specialStatValue: '59.6%' },
  { level: 'Lv.50', ascend: 3, baseHp: 9062, baseAtk: 65, baseDef: 511, specialStatName: 'CRIT DMG', specialStatValue: '69.2%' },
  { level: 'Lv.60', ascend: 3, baseHp: 10134, baseAtk: 73, baseDef: 571, specialStatName: 'CRIT DMG', specialStatValue: '69.2%' },
  { level: 'Lv.60', ascend: 4, baseHp: 10872, baseAtk: 78, baseDef: 613, specialStatName: 'CRIT DMG', specialStatValue: '69.2%' },
  { level: 'Lv.70', ascend: 4, baseHp: 11953, baseAtk: 86, baseDef: 674, specialStatName: 'CRIT DMG', specialStatValue: '69.2%' },
  { level: 'Lv.70', ascend: 5, baseHp: 12692, baseAtk: 91, baseDef: 715, specialStatName: 'CRIT DMG', specialStatValue: '78.8%' },
  { level: 'Lv.80', ascend: 5, baseHp: 13783, baseAtk: 99, baseDef: 777, specialStatName: 'CRIT DMG', specialStatValue: '78.8%' },
  { level: 'Lv.80', ascend: 6, baseHp: 14521, baseAtk: 104, baseDef: 818, specialStatName: 'CRIT DMG', specialStatValue: '88.4%' },
  { level: 'Lv.90', ascend: 6, baseHp: 15552, baseAtk: 106, baseDef: 876, specialStatName: 'CRIT DMG', specialStatValue: '88.4%' },
];

const huTaoMats = [
  { level: 'Lv.40', mora: 20000, items: [{ materialId: 'Agnidus Agate Sliver', count: 1 }, { materialId: 'Silk Flower', count: 3 }, { materialId: 'Whopperflower Nectar', count: 3 }] },
  { level: 'Lv.50', mora: 40000, items: [{ materialId: 'Agnidus Agate Fragment', count: 3 }, { materialId: 'Juvenile Jade', count: 2 }, { materialId: 'Silk Flower', count: 10 }, { materialId: 'Whopperflower Nectar', count: 15 }] },
  { level: 'Lv.60', mora: 60000, items: [{ materialId: 'Agnidus Agate Fragment', count: 6 }, { materialId: 'Juvenile Jade', count: 4 }, { materialId: 'Silk Flower', count: 20 }, { materialId: 'Shimmering Nectar', count: 12 }] },
  { level: 'Lv.70', mora: 80000, items: [{ materialId: 'Agnidus Agate Chunk', count: 3 }, { materialId: 'Juvenile Jade', count: 8 }, { materialId: 'Silk Flower', count: 30 }, { materialId: 'Shimmering Nectar', count: 18 }] },
  { level: 'Lv.80', mora: 100000, items: [{ materialId: 'Agnidus Agate Chunk', count: 6 }, { materialId: 'Juvenile Jade', count: 12 }, { materialId: 'Silk Flower', count: 45 }, { materialId: 'Energy Nectar', count: 12 }] },
  { level: 'Lv.90', mora: 120000, items: [{ materialId: 'Agnidus Agate Gemstone', count: 6 }, { materialId: 'Juvenile Jade', count: 20 }, { materialId: 'Silk Flower', count: 60 }, { materialId: 'Energy Nectar', count: 24 }] },
];

async function main() {
  const hutaoId = 'hutao'; // ID might be 'hutao'
  
  // Wait, let's find Hu Tao's ID
  const hutao = await prisma.character.findFirst({ where: { nameEn: 'Hu Tao' } });
  if (!hutao) {
    console.log("Hu Tao not found in DB.");
    process.exit(1);
  }

  await prisma.character.update({
    where: { id: hutao.id },
    data: {
      stats: huTaoStats,
      ascensionMats: huTaoMats,
    }
  });

  console.log("Hu Tao stats and materials updated!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
});
