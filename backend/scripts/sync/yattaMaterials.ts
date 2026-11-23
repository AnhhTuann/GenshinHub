import axios from 'axios';
import type { MaterialSource } from './detector';
import { materialIconPath } from './idMapper';

interface YattaMaterial {
  id?: number;
  name?: string;
  type?: string;
  rank?: number;
  icon?: string;
}

type MaterialIndex = Record<string, YattaMaterial>;

export function mapYattaMaterials(en: MaterialIndex, vi: MaterialIndex): MaterialSource[] {
  return Object.entries(en).flatMap(([id, item]) => {
    if (!item || !/^[1-9][0-9]*$/.test(id) || String(item.id) !== id ||
        typeof item.name !== 'string' || !item.name.trim() ||
        typeof item.type !== 'string' || !item.type.trim()) return [];
    const localized = vi[id];
    const nameVi = localized?.id === item.id && typeof localized?.name === 'string'
      ? localized.name.trim() : '';
    const rarity = Number.isInteger(item.rank) && item.rank! >= 1 && item.rank! <= 5 ? item.rank! : 0;
    const icon = typeof item.icon === 'string' && /^UI_[a-zA-Z0-9_-]+$/.test(item.icon)
      ? item.icon : undefined;
    return [{
      externalId: id,
      genshinDbName: '',
      nameEn: item.name.trim(),
      nameVi: nameVi || item.name.trim(),
      rarity,
      sourceType: item.type,
      typeText: '',
      iconUrl: materialIconPath(icon),
    }];
  });
}

export async function loadYattaMaterials(): Promise<MaterialSource[]> {
  const [en, vi] = await Promise.all(['en', 'vi'].map(async locale => {
    const { data } = await axios.get(`https://gi.yatta.moe/api/v2/${locale}/material`, { timeout: 10000 });
    const items = data?.data?.items;
    if (!items || Array.isArray(items) || typeof items !== 'object' || !Object.keys(items).length) {
      throw new Error(`Yatta material index invalid (${locale})`);
    }
    return items as MaterialIndex;
  }));
  const materials = mapYattaMaterials(en, vi);
  if (materials.length === 0) throw new Error('Yatta material index contains no valid identities');
  return materials;
}
