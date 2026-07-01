import { PrismaClient } from '@prisma/client';
import axios from 'axios';

export async function seedMaterials(prisma: PrismaClient) {
  console.log('Bắt đầu tải danh sách Material...');
  try {
    const { data: mDataVi } = await axios.get('https://gi.yatta.moe/api/v2/vi/material');
    const { data: mDataEn } = await axios.get('https://gi.yatta.moe/api/v2/en/material');
    
    const mItemsVi = Object.values(mDataVi?.data?.items || {});
    const mItemsEn = mDataEn?.data?.items || {};
    
    const materialData = mItemsVi.map((item: any) => {
      const id = String(item.id);
      const itemEn = mItemsEn[item.id] || {};
      return {
        id,
        nameVi: item.name || 'Unknown',
        nameEn: itemEn.name || item.name || 'Unknown',
        type: item.type || 'Unknown',
        rarity: item.rank || 1,
        iconUrl: item.icon ? `/assets/items/${item.icon}.webp` : null,
      };
    });

    const manualMaterials = [
      { id: "112001", nameVi: "Tinh Chất Slime", nameEn: "Slime Condensate", type: "MATERIAL", rarity: 1, iconUrl: "/assets/items/UI_ItemIcon_112001.webp" },
      { id: "100019", nameVi: "Nấm Phila", nameEn: "Philanemo Mushroom", type: "MATERIAL", rarity: 1, iconUrl: "/assets/items/UI_ItemIcon_100019.webp" }
    ];

    for (const m of manualMaterials) {
      if (!materialData.find((x: any) => x.id === m.id)) {
        materialData.push(m);
      }
    }

    await prisma.material.deleteMany({});
    await prisma.material.createMany({ data: materialData });
    console.log(`Đã seed thành công ${materialData.length} Materials.`);
  } catch (e: any) {
    console.log('Lỗi seed Material:', e.message);
  }
}

