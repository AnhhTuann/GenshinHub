import { PrismaClient } from '@prisma/client';
import axios from 'axios';

export async function seedArtifacts(prisma: PrismaClient) {
  console.log('Bắt đầu tải danh sách Artifact Sets...');
  try {
    const { data: aDataVi } = await axios.get('https://gi.yatta.moe/api/v2/vi/reliquary');
    const { data: aDataEn } = await axios.get('https://gi.yatta.moe/api/v2/en/reliquary');
    
    const aItemsVi = aDataVi?.data?.items || {};
    const aItemsEn = aDataEn?.data?.items || {};
    
    const artifactData = Object.values(aItemsVi).map((item: any) => {
      const id = String(item.id);
      const itemEn = aItemsEn[item.id] || {};
      const affixesVi = Object.values(item.affixList || {});
      const affixesEn = Object.values(itemEn.affixList || {});
      return {
        id,
        nameVi: item.name || 'Unknown',
        nameEn: itemEn.name || item.name || 'Unknown',
        rarityList: item.levelList || [],
        piece2DescVi: affixesVi[0] as string || "",
        piece2DescEn: affixesEn[0] as string || affixesVi[0] as string || "",
        piece4DescVi: affixesVi[1] as string || "",
        piece4DescEn: affixesEn[1] as string || affixesVi[1] as string || "",
        iconUrl: item.icon ? `/images/artifacts/${item.icon}.png` : null,
      };
    });
    
    await prisma.artifactSet.deleteMany({});
    await prisma.artifactSet.createMany({ data: artifactData });
    console.log(`Đã seed thành công ${artifactData.length} Artifact Sets.`);
  } catch (e: any) {
    console.log('Lỗi seed Artifact Set:', e.message);
  }
}

