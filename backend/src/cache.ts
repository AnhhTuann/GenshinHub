import { LRUCache } from 'lru-cache';

export const charactersCache = new LRUCache<string, any>({ max: 5, ttl: 1000 * 60 * 5 });
export const characterCache = new LRUCache<string, any>({ max: 500, ttl: 1000 * 60 * 5 });
export const weaponsCache = new LRUCache<string, any>({ max: 5, ttl: 1000 * 60 * 5 });
export const showcaseCache = new LRUCache<string, any>({ max: 500, ttl: 1000 * 60 * 5 });
export const artifactsCache = new LRUCache<string, any>({ max: 5, ttl: 1000 * 60 * 5 });
export const materialsCache = new LRUCache<string, any>({ max: 5, ttl: 1000 * 60 * 5 });

export function clearAllCaches() {
  charactersCache.clear();
  characterCache.clear();
  weaponsCache.clear();
  showcaseCache.clear();
  artifactsCache.clear();
  materialsCache.clear();
}
