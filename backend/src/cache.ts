import { LRUCache } from 'lru-cache';

const TTL_SHORT = 1000 * 60 * 5;   // 5 min — user-specific data (showcase)
const TTL_LONG  = 1000 * 60 * 30;  // 30 min — mostly-static game data

export const charactersCache = new LRUCache<string, any>({ max: 5,   ttl: TTL_LONG });
export const characterCache  = new LRUCache<string, any>({ max: 500, ttl: TTL_LONG });
export const weaponsCache    = new LRUCache<string, any>({ max: 5,   ttl: TTL_LONG });
export const artifactsCache  = new LRUCache<string, any>({ max: 5,   ttl: TTL_LONG });
export const materialsCache  = new LRUCache<string, any>({ max: 5,   ttl: TTL_LONG });
export const teamsCache      = new LRUCache<string, any>({ max: 20,  ttl: TTL_LONG });
export const bannersCache    = new LRUCache<string, any>({ max: 5,   ttl: TTL_LONG });
export const tcgCache        = new LRUCache<string, any>({ max: 10,  ttl: TTL_LONG });
export const showcaseCache   = new LRUCache<string, any>({ max: 500, ttl: TTL_SHORT });

export function clearAllCaches() {
  charactersCache.clear();
  characterCache.clear();
  weaponsCache.clear();
  artifactsCache.clear();
  materialsCache.clear();
  teamsCache.clear();
  bannersCache.clear();
  tcgCache.clear();
  showcaseCache.clear();
}
