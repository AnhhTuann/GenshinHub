/**
 * idMapper.ts
 * ------------------------------------------------------------------
 * Bộ quy tắc chuẩn hóa ID và ánh xạ tên ổn định giữa `genshin-db`
 * và database GenshinHub.
 *
 * Nguyên tắc:
 *  - Character ID trong DB là slug (vd: "hu-tao", "lanyan", "yumemizu").
 *  - Weapon / ArtifactSet / Material ID trong DB là ID số của
 *    game (vd: "11505", "10001", "100011"). Engine ưu tiên ID từ nguồn
 *    genshin-db, tra cứu Yatta khi thiếu và báo pending nếu chưa có ID.
 *  - Mọi ánh xạ đặc biệt (Traveler, Lan Yan, Yumemizuki Mizuki, Kirara…)
 *    phải đi qua file này để đảm bảo tính nhất quán.
 */

/** Chuẩn hóa tên hiển thị -> slug ID (giống prisma/seeds/characters.ts). */
export const toId = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/** ID ép buộc cho các trường hợp đặc biệt (khớp forcedIdMap trong seeds). */
export const forcedIdMap: Record<string, string> = {
  'lan-yan': 'lanyan',
  'yumemizuki-mizuki': 'yumemizu',
  kirara: 'momoka',
  manekin: 'traveler-boy',
  manekina: 'traveler-girl',
  traveler: 'traveler',
};

/**
 * Tên trong genshin-db -> tên chuẩn (nameEn) trong DB.
 * genshin-db gọi nhân vật chính là "Aether"/"Lumine", một số tên
 * khác có thể khác biệt nhỏ so với seed cũ.
 */
export const genshinDbNameAliases: Record<string, string> = {
  aether: 'Traveler (Boy)',
  lumine: 'Traveler (Girl)',
  'kaedehara kazuha': 'Kaedehara Kazuha',
  'yumemizuki mizuki': 'Yumemizuki Mizuki',
  'lan yan': 'Lan Yan',
  'the ravager': 'Arataki Itto', // phòng hờ nếu genshin-db đổi tên
};

/**
 * Tính character ID dự kiến cho một nhân vật từ genshin-db.
 * KHÔNG dùng trực tiếp làm khóa ghi đè — engine luôn match với DB
 * trước bằng normalized name; hàm này chỉ dùng khi CREATE mới.
 */
export function characterSlugId(genshinDbName: string): string {
  const alias = genshinDbNameAliases[genshinDbName.toLowerCase()];
  const baseName = alias || genshinDbName;

  // Traveler variants: "Traveler (Geo)" -> "traveler-geo"
  let slug = toId(baseName);
  if (slug === 'traveler-boy') slug = 'traveler-boy';
  if (forcedIdMap[slug]) slug = forcedIdMap[slug];
  return slug;
}

/**
 * Khóa so khớp tên chuẩn hóa (bỏ dấu, lowercase, chỉ giữ a-z0-9)
 * dùng để so sánh nameEn giữa genshin-db và DB.
 */
export function normalizeName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

/** Map elementType của genshin-db -> element string trong DB. */
export function mapElement(elementType?: string): string {
  switch (elementType) {
    case 'ELEMENT_PYRO':
      return 'Pyro';
    case 'ELEMENT_HYDRO':
      return 'Hydro';
    case 'ELEMENT_ANEMO':
      return 'Anemo';
    case 'ELEMENT_ELECTRO':
      return 'Electro';
    case 'ELEMENT_DENDRO':
      return 'Dendro';
    case 'ELEMENT_CRYO':
      return 'Cryo';
    case 'ELEMENT_GEO':
      return 'Geo';
    case 'ELEMENT_NONE':
      return 'None';
    default:
      return elementType || 'None';
  }
}

/** Map weaponType của genshin-db -> weapon string trong DB (English). */
export function mapWeaponType(weaponType?: string): string {
  switch (weaponType) {
    case 'WEAPON_SWORD_ONE_HAND':
      return 'Sword';
    case 'WEAPON_CLAYMORE':
      return 'Claymore';
    case 'WEAPON_BOW':
      return 'Bow';
    case 'WEAPON_CATALYST':
      return 'Catalyst';
    case 'WEAPON_POLE':
      return 'Polearm';
    default:
      return weaponType || 'Polearm';
  }
}

/** Map weaponType -> type tiếng Việt (khớp translateType trong seeds/weapons.ts). */
export function mapWeaponTypeVi(weaponType?: string): string {
  switch (weaponType) {
    case 'WEAPON_SWORD_ONE_HAND':
      return 'Kiếm Đơn';
    case 'WEAPON_CLAYMORE':
      return 'Trọng Kiếm';
    case 'WEAPON_POLE':
      return 'Vũ Khí Cán Dài';
    case 'WEAPON_BOW':
      return 'Cung';
    case 'WEAPON_CATALYST':
      return 'Pháp Khí';
    default:
      return weaponType || 'Unknown';
  }
}

/** Map FIGHT_PROP_* -> subStat tiếng Việt (khớp translateProp trong seeds/weapons.ts). */
export function mapSubStatVi(prop?: string): string | null {
  const map: Record<string, string> = {
    FIGHT_PROP_HP_PERCENT: 'HP%',
    FIGHT_PROP_ATTACK_PERCENT: 'Tấn Công%',
    FIGHT_PROP_DEFENSE_PERCENT: 'Phòng Ngự%',
    FIGHT_PROP_CRITICAL: 'Tỷ Lệ Bạo Kích',
    FIGHT_PROP_CRITICAL_HURT: 'Sát Thương Bạo Kích',
    FIGHT_PROP_CHARGE_EFFICIENCY: 'Hiệu Quả Nạp',
    FIGHT_PROP_ELEMENT_MASTERY: 'Tinh Thông Nguyên Tố',
    FIGHT_PROP_PHYSICAL_ADD_HURT: 'Sát Thương Vật Lý%',
  };
  return prop ? map[prop] || prop : null;
}

/**
 * Ánh xạ tên -> tên thư mục asset Enka (copy từ prisma/seeds/characters.ts).
 * BẮT BUỘC giữ đồng bộ với seed cũ để đường dẫn avatar/splash không đổi.
 */
export const enkaNameMap: Record<string, string> = {
  'Raiden Shogun': 'Shougun',
  'Kamisato Ayaka': 'Ayaka',
  'Kamisato Ayato': 'Ayato',
  'Sangonomiya Kokomi': 'Kokomi',
  'Kaedehara Kazuha': 'Kazuha',
  'Yae Miko': 'Yae',
  'Kuki Shinobu': 'Shinobu',
  'Arataki Itto': 'Itto',
  'Shikanoin Heizou': 'Heizo',
  'Kujou Sara': 'Sara',
  'Yun Jin': 'Yunjin',
  Thoma: 'Tohma',
  Traveler: 'PlayerBoy',
  'Hu Tao': 'Hutao',
  'Lan Yan': 'Lanyan',
  Skirk: 'SkirkNew',
  Amber: 'Ambor',
  Jean: 'Qin',
  Noelle: 'Noel',
  Baizhu: 'Baizhuer',
  Yanfei: 'Feiyan',
  Xianyun: 'Liuyun',
  Alhaitham: 'Alhatham',
  Kirara: 'Momoka',
  Lyney: 'Liney',
  Lynette: 'Linette',
  Ororon: 'Olorun',
  'Yumemizuki Mizuki': 'YumemizukiMizuki',
  Manekin: 'PlayerBoy',
  Manekina: 'PlayerGirl',
};

/** Tên thư mục asset an toàn (chỉ chữ cái) cho một nhân vật. */
export function assetFolderName(genshinDbName: string): string {
  let cleanName = genshinDbName;
  if (genshinDbName.startsWith('Traveler')) cleanName = 'Traveler';
  const mapped = enkaNameMap[cleanName] || genshinDbNameAliases[genshinDbName.toLowerCase()] || cleanName;
  return mapped.replace(/[^a-zA-Z]/g, '');
}

/**
 * Đường dẫn asset tương đối trong frontend/public.
 * Giữ nguyên convention `/assets/<loại>/<Tên>/<file>.webp` đang dùng.
 */
export function characterAvatarPath(genshinDbName: string, filenameIcon?: string): string {
  return `/assets/characters/${assetFolderName(genshinDbName)}/avatar.webp`;
}

export function characterSplashPath(genshinDbName: string): string {
  return `/assets/characters/${assetFolderName(genshinDbName)}/splash.webp`;
}

export function weaponIconPath(filenameIcon?: string): string | null {
  return filenameIcon ? `/assets/weapons/${filenameIcon}.webp` : null;
}

export function artifactIconPath(filename?: string): string | null {
  return filename ? `/assets/artifacts/${filename}.webp` : null;
}

export function materialIconPath(filename?: string): string | null {
  return filename ? `/assets/items/${filename}.webp` : null;
}
