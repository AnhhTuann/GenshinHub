import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function syncWeapons() {
  console.log('Syncing weapons...');
  try {
    // Genshin.dev API fallback
    const { data } = await axios.get('https://genshin.dev/api/weapons');
    console.log(`Fetched ${data.length} weapons.`);
    for (const w of data) {
      if (typeof w === 'string') {
         const weaponDetail = await axios.get(`https://genshin.dev/api/weapons/${w}`);
         await prisma.weapon.upsert({
           where: { id: w },
           update: {
             name: weaponDetail.data.name,
             rarity: weaponDetail.data.rarity || 4,
             type: weaponDetail.data.type,
             baseAtk: weaponDetail.data.baseAttack || 42,
             subStat: weaponDetail.data.subStat || '',
             passiveName: weaponDetail.data.passiveName || '',
             passiveDesc: weaponDetail.data.passiveDesc || '',
           },
           create: {
             id: w,
             name: weaponDetail.data.name,
             rarity: weaponDetail.data.rarity || 4,
             type: weaponDetail.data.type,
             baseAtk: weaponDetail.data.baseAttack || 42,
             subStat: weaponDetail.data.subStat || '',
             passiveName: weaponDetail.data.passiveName || '',
             passiveDesc: weaponDetail.data.passiveDesc || '',
             iconUrl: `https://genshin.dev/api/weapons/${w}/icon`,
           }
         });
      }
    }
  } catch (error) {
    console.log('Failed to fetch from Genshin.dev, using dummy data.');
    await prisma.weapon.upsert({
      where: { id: 'staff-of-homa' },
      update: {},
      create: {
        id: 'staff-of-homa',
        name: 'Staff of Homa',
        rarity: 5,
        type: 'Polearm',
        baseAtk: 46,
        subStat: 'CRIT DMG',
        subStatValue: 14.4,
        passiveName: 'Reckless Cinnabar',
        passiveDesc: 'HP increased by 20%...',
        iconUrl: '/weapons/staff-of-homa.webp'
      }
    });
  }
}

async function syncCharacters() {
  console.log('Syncing character encyclopedia data...');
  try {
    // Update Hu Tao with lore and base stats
    await prisma.character.updateMany({
      where: { id: 'hu-tao' },
      data: {
        lore: 'Hu Tao is the 77th Director of the Wangsheng Funeral Parlor...',
        baseStats: { hp: 1211, atk: 27, def: 68, speed: 1.0 },
        fandomUrl: 'https://genshin-impact.fandom.com/wiki/Hu_Tao'
      }
    });
    console.log('Characters updated.');
  } catch (err) {
    console.error('Error updating characters', err);
  }
}

async function main() {
  await syncWeapons();
  await syncCharacters();
  console.log('Data synchronization complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
