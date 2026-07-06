export type AssetType = 'items' | 'characters' | 'weapons' | 'elements';

/**
 * Lấy đường dẫn ảnh Avatar của Nhân vật
 */
export const getCharacterAvatar = (charId: string) => {
  if (!charId) return '/assets/fallback-icon.webp';
  return `/assets/characters/avatars/${charId}_avatar.webp`;
};

/**
 * Lấy đường dẫn ảnh Splash Art của Nhân vật
 */
export const getCharacterSplash = (charId: string) => {
  if (!charId) return '/assets/fallback-icon.webp';
  return `/assets/characters/splash/${charId}_splash.webp`;
};

/**
 * Lấy đường dẫn ảnh Gacha Splash của Nhân vật
 */
export const getCharacterGachaSplash = (charId: string) => {
  if (!charId) return '/assets/fallback-icon.webp';
  return `/assets/characters/splash/${charId}_splash.webp`;
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
