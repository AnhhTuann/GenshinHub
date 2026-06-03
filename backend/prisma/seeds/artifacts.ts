import { PrismaClient } from '@prisma/client';
import axios from 'axios';

export async function seedArtifacts(prisma: PrismaClient) {
  console.log('Bắt đầu tải danh sách Artifact Sets...');
  try {
    const { data: aData } = await axios.get('https://gi.yatta.moe/api/v2/vi/reliquary');
    const aItems = aData?.data?.items || {};
    const artifactData = Object.values(aItems).map((item: any) => {
      const affixes = Object.values(item.affixList || {});
      return {
        id: String(item.id),
        name: item.name || 'Unknown',
        rarityList: item.levelList || [],
        piece2Desc: (affixes[0] as string) || '',
        piece4Desc: (affixes[1] as string) || '',
        iconUrl: item.icon ? `https://gi.yatta.moe/assets/UI/${item.icon}.png` : null,
      };
    });
    await prisma.artifactSet.createMany({ data: artifactData, skipDuplicates: true });
    console.log(`Đã seed thành công ${artifactData.length} Artifact Sets.`);
  } catch (e: any) {
    console.log('Lỗi seed Artifact Set:', e.message);
  }
}
