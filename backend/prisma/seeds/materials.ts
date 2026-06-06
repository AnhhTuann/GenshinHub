import { PrismaClient } from '@prisma/client';
import axios from 'axios';

export async function seedMaterials(prisma: PrismaClient) {
  console.log('Bắt đầu tải danh sách Material...');
  try {
    const { data: mData } = await axios.get('https://gi.yatta.moe/api/v2/vi/material');
    const mItems = Object.values(mData?.data?.items || {});
    
    const materialData = mItems.map((item: any) => ({
      id: String(item.id),
      name: item.name || 'Unknown',
      type: item.type || 'Unknown',
      rarity: item.rank || 1,
      iconUrl: item.icon ? `https://enka.network/ui/${item.icon}.png` : null,
    }));

    await prisma.material.deleteMany({});
    await prisma.material.createMany({ data: materialData });
    console.log(`Đã seed thành công ${materialData.length} Materials.`);
  } catch (e: any) {
    console.log('Lỗi seed Material:', e.message);
  }
}
