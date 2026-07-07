export type AssetType = 'items' | 'characters' | 'weapons' | 'elements';

/**
 * Chuyển charId (slug: hu-tao, kazuha) sang tên folder PascalCase (Hutao, Kazuha)
 * Ví dụ: "hu-tao" → "Hutao", "kazuha" → "Kazuha", "albedo" → "Albedo"
 */
const charIdToFolder = (charId: string): string => {
  return charId
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

/**
 * Lấy đường dẫn ảnh Avatar của Nhân vật
 * Cấu trúc folder: /assets/characters/{CharName}/avatar.webp
 */
export const getCharacterAvatar = (charId: string, userGender?: 'male' | 'female') => {
  if (!charId) return '/assets/fallback-icon.webp';
  
  if (charId.startsWith('traveler')) {
    const folder = userGender === 'female' ? 'PlayerGirl' : 'PlayerBoy';
    return `/assets/characters/${folder}/avatar.webp`;
  }
  
  return `/assets/characters/${charIdToFolder(charId)}/avatar.webp`;
};

/**
 * Lấy đường dẫn ảnh Splash Art của Nhân vật
 * Cấu trúc folder: /assets/characters/{CharName}/splash.webp
 */
export const getCharacterSplash = (charId: string, userGender?: 'male' | 'female') => {
  if (!charId) return '/assets/fallback-icon.webp';

  if (charId.startsWith('traveler')) {
    const folder = userGender === 'female' ? 'PlayerGirl' : 'PlayerBoy';
    return `/assets/characters/${folder}/splash.webp`;
  }

  return `/assets/characters/${charIdToFolder(charId)}/splash.webp`;
};

/**
 * Lấy đường dẫn ảnh Vũ khí
 */
export const getWeaponIcon = (weaponId: string) => {
  if (!weaponId) return '/assets/fallback-icon.webp';
  return `/assets/weapons/${weaponId}.webp`;
};

/**
 * Lấy đường dẫn ảnh Thánh Di Vật / Vật phẩm
 */
export const getItemIcon = (itemId: string | number) => {
  if (!itemId) return '/assets/fallback-icon.webp';
  return `/assets/items/${itemId}.webp`;
};

/**
 * Lấy đường dẫn ảnh Hệ nguyên tố (Element)
 */
export const getElementIcon = (elementName: string) => {
  if (!elementName) return '/assets/fallback-icon.webp';
  return `/assets/elements/${elementName.toLowerCase()}.webp`;
};
