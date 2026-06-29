import { PrismaClient } from '@prisma/client';
import * as genshin from 'genshin-db';

const prisma = new PrismaClient();

function formatSpecialized(name: string, value: number) {
  if (name === 'Elemental Mastery') {
    return Math.round(value).toString();
  }
  // Convert 0.288 to "28.8%"
  return (value * 100).toFixed(1) + '%';
}

async function run() {
  const characters = await prisma.character.findMany();
  console.log(`Found ${characters.length} characters in DB.`);

  for (const char of characters) {
    const gChar = genshin.characters(char.nameEn);
    if (!gChar) {
      console.log(`Could not find ${char.nameEn} in genshin-db`);
      continue;
    }

    const levelsToCalculate = [
      { level: 1, ascend: 0, label: 'Lv.1' },
      { level: 20, ascend: 0, label: 'Lv.20' },
      { level: 20, ascend: 1, label: 'Lv.20+' },
      { level: 40, ascend: 1, label: 'Lv.40' },
      { level: 40, ascend: 2, label: 'Lv.40+' },
      { level: 50, ascend: 2, label: 'Lv.50' },
      { level: 50, ascend: 3, label: 'Lv.50+' },
      { level: 60, ascend: 3, label: 'Lv.60' },
      { level: 60, ascend: 4, label: 'Lv.60+' },
      { level: 70, ascend: 4, label: 'Lv.70' },
      { level: 70, ascend: 5, label: 'Lv.70+' },
      { level: 80, ascend: 5, label: 'Lv.80' },
      { level: 80, ascend: 6, label: 'Lv.80+' },
      { level: 90, ascend: 6, label: 'Lv.90' },
    ];

    const stats = [];
    let currentLvStr = '';
    
    for (const req of levelsToCalculate) {
      const isAscended = req.ascend > 0 && req.level !== 90 && req.label.includes('+');
      const s = isAscended ? gChar.stats(req.level, '+') : gChar.stats(req.level);
      
      stats.push({
        level: req.label.replace('+', ''), // Group by Lv.X
        ascend: req.ascend,
        baseHp: Math.round(s?.hp || 0),
        baseAtk: Math.round(s?.attack || 0),
        baseDef: Math.round(s?.defense || 0),
        specialStatName: gChar.substatText,
        specialStatValue: formatSpecialized(gChar.substatText, s?.specialized || 0)
      });
    }

    const s90 = gChar.stats(90);

    await prisma.character.update({
      where: { id: char.id },
      data: {
        stats: stats,
        baseHp: Math.round(s90?.hp || 0),
        baseAtk: Math.round(s90?.attack || 0),
        baseDef: Math.round(s90?.defense || 0)
      }
    });

    console.log(`Updated stats for ${char.nameEn}`);
  }

  console.log('Finished updating all stats!');
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
