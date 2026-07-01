import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const prisma = new PrismaClient();

const getMaterialName = async (id: string | number) => {
  try {
    const res = await axios.get(`https://gi.yatta.moe/api/v2/en/item/${id}`);
    if (res.data && res.data.data) {
      return res.data.data.name.toLowerCase().replace(/ /g, '_');
    }
  } catch (e) { }
  return id.toString();
};

const cache = new Map();
const getMaterialId = async (yattaId: string | number) => {
  if (cache.has(yattaId)) return cache.get(yattaId);
  const name = await getMaterialName(yattaId);
  cache.set(yattaId, name);
  return name;
};

async function main() {
  console.log('🔄 Bắt đầu cào dữ liệu Ascension và Talent Materials...');

  const characters = await prisma.character.findMany({ select: { id: true, nameEn: true } });
  
  // Lấy danh sách Ambr
  const { data: enData } = await axios.get('https://gi.yatta.moe/api/v2/en/avatar');
  const items = enData?.data?.items || {};
  const ambrMap = new Map();
  for (const key in items) {
    ambrMap.set(items[key].name.toLowerCase(), key);
  }

  for (const char of characters) {
    let lookupName = char.nameEn.toLowerCase();
    if (lookupName === "raiden shogun") lookupName = "raiden shogun";
    else if (lookupName === "tartaglia") lookupName = "tartaglia";
    else if (lookupName.startsWith("traveler")) lookupName = "traveler (anemo)";

    const ambrId = ambrMap.get(lookupName);
    if (!ambrId) {
      console.log(`Bỏ qua ${char.nameEn} - Không tìm thấy trên API.`);
      continue;
    }

    try {
      const { data: detailData } = await axios.get(`https://gi.yatta.moe/api/v2/en/avatar/${ambrId}`);
      const detail = detailData?.data;
      if (!detail) continue;

      const newAscensionMats: any[] = [];
      const newTalentMats: any[] = [];

      // Parse Ascension Mats
      if (detail.upgrade && detail.upgrade.promote) {
        for (let i = 1; i < detail.upgrade.promote.length; i++) {
          const promo = detail.upgrade.promote[i];
          if (!promo.costItems) continue;
          
          let levelStr = "Lv." + (i === 1 ? "40" : i === 2 ? "50" : i === 3 ? "60" : i === 4 ? "70" : i === 5 ? "80" : "90");
          const itemsArr = [];
          for (const matId of Object.keys(promo.costItems)) {
             itemsArr.push({ materialId: await getMaterialId(matId), count: promo.costItems[matId] });
          }
          newAscensionMats.push({ level: levelStr, mora: promo.coinCost || 0, items: itemsArr });
        }
      }

      // Parse Talent Mats
      if (detail.talent) {
        const talents = Object.values(detail.talent);
        // Find the first talent that has promote
        const combatTalent: any = talents.find((t: any) => t.promote && Object.keys(t.promote).length > 0);
        if (combatTalent && combatTalent.promote) {
          for (const level of Object.keys(combatTalent.promote)) {
            const promo = combatTalent.promote[level];
            if (!promo.costItems) continue;

            const itemsArr = [];
            for (const matId of Object.keys(promo.costItems)) {
               itemsArr.push({ materialId: await getMaterialId(matId), count: promo.costItems[matId] });
            }
            newTalentMats.push({ level: "Lv." + level, mora: promo.coinCost || 0, items: itemsArr });
          }
        }
      }

      await prisma.character.update({
        where: { id: char.id },
        data: {
          ascensionMats: newAscensionMats.length > 0 ? (newAscensionMats as any) : null,
          talentMats: newTalentMats.length > 0 ? (newTalentMats as any) : null
        }
      });
      console.log(`✅ Cập nhật thành công Mats cho ${char.nameEn}`);
    } catch (e: any) {
      console.log(`❌ Lỗi khi tải cho ${char.nameEn}: ${e.message}`);
    }
  }

  console.log('🎉 Hoàn tất cào dữ liệu Mats!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
