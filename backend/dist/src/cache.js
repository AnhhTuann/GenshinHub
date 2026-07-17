"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showcaseCache = exports.tcgCache = exports.bannersCache = exports.teamsCache = exports.materialsCache = exports.artifactsCache = exports.weaponsCache = exports.characterCache = exports.charactersCache = void 0;
exports.clearAllCaches = clearAllCaches;
const lru_cache_1 = require("lru-cache");
const TTL_SHORT = 1000 * 60 * 5; // 5 min — user-specific data (showcase)
const TTL_LONG = 1000 * 60 * 30; // 30 min — mostly-static game data
exports.charactersCache = new lru_cache_1.LRUCache({ max: 5, ttl: TTL_LONG });
exports.characterCache = new lru_cache_1.LRUCache({ max: 500, ttl: TTL_LONG });
exports.weaponsCache = new lru_cache_1.LRUCache({ max: 5, ttl: TTL_LONG });
exports.artifactsCache = new lru_cache_1.LRUCache({ max: 5, ttl: TTL_LONG });
exports.materialsCache = new lru_cache_1.LRUCache({ max: 5, ttl: TTL_LONG });
exports.teamsCache = new lru_cache_1.LRUCache({ max: 20, ttl: TTL_LONG });
exports.bannersCache = new lru_cache_1.LRUCache({ max: 5, ttl: TTL_LONG });
exports.tcgCache = new lru_cache_1.LRUCache({ max: 10, ttl: TTL_LONG });
exports.showcaseCache = new lru_cache_1.LRUCache({ max: 500, ttl: TTL_SHORT });
function clearAllCaches() {
    exports.charactersCache.clear();
    exports.characterCache.clear();
    exports.weaponsCache.clear();
    exports.artifactsCache.clear();
    exports.materialsCache.clear();
    exports.teamsCache.clear();
    exports.bannersCache.clear();
    exports.tcgCache.clear();
    exports.showcaseCache.clear();
}
