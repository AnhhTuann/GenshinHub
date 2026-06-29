import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateMaterials() {
  console.log("Fetching Yatta avatar list...");
  const { data: enData } = await axios.get('https://gi.yatta.moe/api/v2/en/avatar');
  const items = enData?.data?.items || {};
  
  const chars = await prisma.character.findMany();
  console.log(`Found ${chars.length} characters in DB.`);

  for (const char of chars) {
    let ambrId = null;
    let basicData = null;
    
    // special cases
    let searchName = char.nameEn.toLowerCase();
    if (searchName === 'traveler-anemo' || searchName.startsWith('traveler')) {
      searchName = 'traveler'; // rough approximation, traveler is complex
    }

    for (const key in items) {
      if (items[key].name.toLowerCase() === searchName) {
        ambrId = key;
        basicData = items[key];
        break;
      }
    }

    if (!ambrId) {
      console.log(`Warning: Could not find Yatta ID for ${char.nameEn}`);
      continue;
    }

    console.log(`Processing ${char.nameEn}...`);
    try {
      const { data: detailData } = await axios.get(`https://gi.yatta.moe/api/v2/en/avatar/${ambrId}`);
      const avatar = detailData.data;

      // --- Process Ascension Materials ---
      const ascensionMats: any[] = [];
      let totalAscMora = 0;

      if (avatar.upgrade && avatar.upgrade.promote) {
        const promoteKeys = Object.keys(avatar.upgrade.promote).sort((a, b) => Number(a) - Number(b));
        for (const key of promoteKeys) {
          const promo = avatar.upgrade.promote[key];
          if (!promo.costItems && !promo.coinCost) continue;

          const levelLabel = `Lv.${promo.unlockMaxLevel}`;
          const levelItems = [];
          
          if (promo.coinCost) {
             totalAscMora += promo.coinCost;
          }

          if (promo.costItems) {
            for (const itemId in promo.costItems) {
              const amount = promo.costItems[itemId];
              const itemInfo = avatar.items[itemId];
              if (itemInfo) {
                // Ensure Material exists in DB
                const materialId = itemInfo.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
                levelItems.push({
                  materialId,
                  count: amount
                });
              }
            }
          }

          ascensionMats.push({
            level: levelLabel,
            mora: promo.coinCost || 0,
            items: levelItems
          });
        }
      }

      // --- Process Talent Materials ---
      const talentMats: any[] = [];

      const talentMap = avatar.talent || {};
      const firstTalentId = Object.keys(talentMap)[0];
      if (firstTalentId) {
        const talent = talentMap[firstTalentId];
        if (talent.promote) {
          const promoteKeys = Object.keys(talent.promote).sort((a, b) => Number(a) - Number(b));
          for (const key of promoteKeys) {
            const promo = talent.promote[key];
            if (!promo.costItems && !promo.coinCost) continue;

            const levelLabel = `Lv.${Number(promo.level) - 1}→${promo.level}`;
            const levelItems = [];

            if (promo.costItems) {
              for (const itemId in promo.costItems) {
                const amount = promo.costItems[itemId];
                const itemInfo = avatar.items[itemId];
                if (itemInfo) {
                  const materialId = itemInfo.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
                  levelItems.push({
                    materialId,
                    count: amount
                  });
                }
              }
            }

            talentMats.push({
              level: levelLabel,
              mora: promo.coinCost || 0,
              items: levelItems
            });
          }
        }
      }

      const updateData: any = {};
      if (ascensionMats.length > 0) {
        updateData.ascensionMats = ascensionMats;
      }
      if (talentMats.length > 0) {
        updateData.talentMats = talentMats;
      }

      if (Object.keys(updateData).length > 0) {
        await prisma.character.update({
          where: { id: char.id },
          data: updateData
        });
      }

      // Sleep a bit to avoid hitting Yatta API limits
      await delay(200);

    } catch (e: any) {
      console.error(`Error processing ${char.nameEn}:`, e.message);
    }
  }

  console.log("Finished updating all materials!");
}

updateMaterials().catch(console.error).finally(() => prisma.$disconnect());
