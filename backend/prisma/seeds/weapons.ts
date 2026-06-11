import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const translateProp = (prop: string) => {
  const map: Record<string, string> = {
    "FIGHT_PROP_HP_PERCENT": "HP%",
    "FIGHT_PROP_ATTACK_PERCENT": "Tấn Công%",
    "FIGHT_PROP_DEFENSE_PERCENT": "Phòng Ngự%",
    "FIGHT_PROP_CRITICAL": "Tỷ Lệ Bạo Kích",
    "FIGHT_PROP_CRITICAL_HURT": "Sát Thương Bạo Kích",
    "FIGHT_PROP_CHARGE_EFFICIENCY": "Hiệu Quả Nạp",
    "FIGHT_PROP_ELEMENT_MASTERY": "Tinh Thông Nguyên Tố",
    "FIGHT_PROP_PHYSICAL_ADD_HURT": "Sát Thương Vật Lý%"
  };
  return map[prop] || null;
};

const translateType = (type: string) => {
  const map: Record<string, string> = {
    "WEAPON_SWORD_ONE_HAND": "Kiếm Đơn",
    "WEAPON_CLAYMORE": "Trọng Kiếm",
    "WEAPON_POLE": "Vũ Khí Cán Dài",
    "WEAPON_BOW": "Cung",
    "WEAPON_CATALYST": "Pháp Khí"
  };
  return map[type] || type;
};

const stripColorTags = (s: string | null) => {
  if (!s) return s;
  return s.replace(/<color=[^>]*>/g, '').replace(/<\/color>/g, '');
};

export async function seedWeapons(prisma: PrismaClient) {
  console.log('Bắt đầu tải danh sách Weapons...');
  try {
    const { data: wDataVi } = await axios.get('https://gi.yatta.moe/api/v2/vi/weapon');
    const { data: wDataEn } = await axios.get('https://gi.yatta.moe/api/v2/en/weapon');
    
    const wItemsVi = Object.values(wDataVi?.data?.items || {}) as any[];
    const wItemsEn = wDataEn?.data?.items || {};
    
    console.log(`Đã tìm thấy ${wItemsVi.length} vũ khí. Bắt đầu tải chi tiết từng vũ khí...`);

    const weaponData = [];

    for (const item of wItemsVi) {
      const id = String(item.id);
      const nameVi = item.name || 'Unknown';
      const nameEn = wItemsEn[item.id]?.name || nameVi;
      const rarity = item.rank || 1;
      const type = translateType(item.type || 'Unknown');
      
      let baseAtk = 400;
      let subStat = item.specialProp !== 'NONE' ? translateProp(item.specialProp) : null;
      let subStatValue = null;
      let passiveNameVi = null;
      let passiveDescVi = null;
      let passiveNameEn = null;
      let passiveDescEn = null;

      try {
        await new Promise(r => setTimeout(r, 50)); // Small delay to avoid rate limiting
        const { data: wDetailVi } = await axios.get(`https://gi.yatta.moe/api/v2/vi/weapon/${id}`);
        const detailVi = wDetailVi?.data;

        if (detailVi) {
          // Calculate level 90 Base ATK
          const props = detailVi.upgrade?.prop || [];
          const initAtkProp = props.find((p: any) => p.propType === 'FIGHT_PROP_BASE_ATTACK');
          const initAtk = initAtkProp?.initValue || 0;
          const curveType = initAtkProp?.type;

          let curveMult = 1.0;
          if (curveType === 'GROW_CURVE_ATTACK_101') curveMult = 7.34685;
          else if (curveType === 'GROW_CURVE_ATTACK_204') curveMult = 9.98292;
          else if (curveType === 'GROW_CURVE_ATTACK_302') curveMult = 10.25206;
          else if (rarity === 5) curveMult = 10.25206;
          else if (rarity === 4) curveMult = 9.98292;
          else if (rarity === 3) curveMult = 7.34685;
          else curveMult = 5.0;

          const lastPromote = detailVi.upgrade?.promote?.[detailVi.upgrade.promote.length - 1];
          const addAtk = lastPromote?.addProps?.FIGHT_PROP_BASE_ATTACK || 0;
          baseAtk = Math.round(initAtk * curveMult + addAtk) || 400;

          // Substat value
          const subProp = props.find((p: any) => p.propType !== 'FIGHT_PROP_BASE_ATTACK');
          if (subProp) {
            const subInit = subProp.initValue || 0;
            const subCurve = subProp.type;
            let subMult = 4.6; // Default curve for 4*/5*
            if (subCurve === 'GROW_CURVE_CRITICAL_101') subMult = 6.0; // 3* weapons
            
            // EM is flat, not percent, so it has different curve
            if (subProp.propType === 'FIGHT_PROP_ELEMENT_MASTERY') {
              subStatValue = Math.round(subInit * 5.2);
            } else {
              subStatValue = parseFloat((subInit * subMult * 100).toFixed(1));
            }
          }

          // Passive info Vi
          const affixValVi = detailVi.affix ? Object.values(detailVi.affix)[0] as any : null;
          if (affixValVi) {
            passiveNameVi = affixValVi.name || null;
            passiveDescVi = affixValVi.upgrade?.['0'] || null;
          }
        }

        // Fetch English details for rarity >= 3
        if (rarity >= 3) {
          const { data: wDetailEn } = await axios.get(`https://gi.yatta.moe/api/v2/en/weapon/${id}`);
          const detailEn = wDetailEn?.data;
          if (detailEn) {
            const affixValEn = detailEn.affix ? Object.values(detailEn.affix)[0] as any : null;
            if (affixValEn) {
              passiveNameEn = affixValEn.name || null;
              passiveDescEn = stripColorTags(affixValEn.upgrade?.['0'] || null);
            }
          }
        }

        console.log(`Đã tải chi tiết thành công: ${nameVi} (ATK: ${baseAtk}, SubStat: ${subStat} ${subStatValue || ''})`);
      } catch (e: any) {
        console.log(`Bỏ qua chi tiết cho ${nameVi}: ${e.message}`);
      }

      weaponData.push({
        id,
        nameEn,
        nameVi,
        rarity,
        type,
        baseAtk,
        subStat,
        subStatValue,
        passiveNameEn,
        passiveNameVi,
        passiveDescEn,
        passiveDescVi,
        iconUrl: item.icon ? `/images/weapons/${item.icon}.png` : null,
      });
    }

    await prisma.weapon.deleteMany({});
    await prisma.weapon.createMany({ data: weaponData });
    console.log(`Đã seed thành công ${weaponData.length} Weapons.`);
  } catch (e: any) {
    console.log('Lỗi seed Weapon:', e.message);
  }
}
