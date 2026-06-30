import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fixMaterials() {
  console.log("Fetching Yatta avatar list (EN)...");
  const { data: enData } = await axios.get('https://gi.yatta.moe/api/v2/en/avatar');
  const itemsEn = enData?.data?.items || {};
  
  console.log("Fetching Yatta avatar list (VI)...");
  const { data: viData } = await axios.get('https://gi.yatta.moe/api/v2/vi/avatar');
  const itemsVi = viData?.data?.items || {};

  const chars = await prisma.character.findMany();
  console.log(`Found ${chars.length} characters in DB.`);

  for (const char of chars) {
    let ambrId = null;
    let searchName = char.nameEn.toLowerCase();
    if (searchName === 'traveler-anemo' || searchName.startsWith('traveler')) {
      searchName = 'traveler';
    }

    for (const key in itemsEn) {
      if (itemsEn[key].name.toLowerCase() === searchName) {
        ambrId = key;
        break;
      }
    }

    if (!ambrId) continue;

    try {
      const [{ data: detailEn }, { data: detailVi }] = await Promise.all([
        axios.get(`https://gi.yatta.moe/api/v2/en/avatar/${ambrId}`),
        axios.get(`https://gi.yatta.moe/api/v2/vi/avatar/${ambrId}`)
      ]);

      const avatarEn = detailEn.data;
      const avatarVi = detailVi.data;
      
      const allItemsToUpsert = new Map();

      const extractItems = (promoMap: any) => {
        if (!promoMap) return;
        for (const key in promoMap) {
          const promo = promoMap[key];
          if (promo.costItems) {
            for (const itemId in promo.costItems) {
              const itemInfoEn = avatarEn.items[itemId];
              const itemInfoVi = avatarVi.items[itemId];
              if (itemInfoEn && itemInfoVi) {
                const materialId = itemInfoEn.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
                allItemsToUpsert.set(materialId, {
                  id: materialId,
                  nameEn: itemInfoEn.name,
                  nameVi: itemInfoVi.name,
                  type: 'Material', // Generic type
                  rarity: itemInfoEn.rank || 3,
                  iconUrl: `https://gi.yatta.moe/assets/UI/${itemInfoEn.icon}.png`
                });
              }
            }
          }
        }
      };

      if (avatarEn.upgrade?.promote) {
        extractItems(avatarEn.upgrade.promote);
      }
      
      const talentMap = avatarEn.talent || {};
      const firstTalentId = Object.keys(talentMap)[0];
      if (firstTalentId && talentMap[firstTalentId].promote) {
        extractItems(talentMap[firstTalentId].promote);
      }
      
      for (const [matId, matData] of allItemsToUpsert) {
        await prisma.material.upsert({
          where: { id: matId },
          update: matData,
          create: matData
        });
        console.log(`Upserted material: ${matData.nameEn}`);
      }

      await delay(200);

    } catch (e: any) {
      console.error(`Error processing ${char.nameEn}:`, e.message);
    }
  }

  console.log("Finished upserting all missing materials!");
}

fixMaterials().catch(console.error).finally(() => prisma.$disconnect());
