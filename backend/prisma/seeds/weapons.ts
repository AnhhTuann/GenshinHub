import { PrismaClient } from '@prisma/client';
import axios from 'axios';

export async function seedWeapons(prisma: PrismaClient) {
  console.log('Bắt đầu tải danh sách Weapons...');
  try {
    const { data: wData } = await axios.get('https://gi.yatta.moe/api/v2/vi/weapon');
    const wItems = wData?.data?.items || {};
    const weaponData = Object.values(wItems).map((item: any) => ({
      id: String(item.id),
      name: item.name || 'Unknown',
      rarity: item.rank || 1,
      type: item.type || 'Unknown',
      baseAtk: 400,
      subStat: item.specialProp !== 'NONE' ? item.specialProp : null,
      subStatValue: null,
      passiveName: null,
      passiveDesc: null,
      iconUrl: item.icon ? `https://gi.yatta.moe/assets/UI/${item.icon}.png` : null,
    }));
    await prisma.weapon.createMany({ data: weaponData, skipDuplicates: true });
    console.log(`Đã seed thành công ${weaponData.length} Weapons.`);
  } catch (e: any) {
    console.log('Lỗi seed Weapon:', e.message);
  }
}
