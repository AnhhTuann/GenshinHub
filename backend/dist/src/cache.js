"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialsCache = exports.artifactsCache = exports.showcaseCache = exports.weaponsCache = exports.characterCache = exports.charactersCache = void 0;
exports.clearAllCaches = clearAllCaches;
const lru_cache_1 = require("lru-cache");
exports.charactersCache = new lru_cache_1.LRUCache({ max: 5, ttl: 1000 * 60 * 5 });
exports.characterCache = new lru_cache_1.LRUCache({ max: 500, ttl: 1000 * 60 * 5 });
exports.weaponsCache = new lru_cache_1.LRUCache({ max: 5, ttl: 1000 * 60 * 5 });
exports.showcaseCache = new lru_cache_1.LRUCache({ max: 500, ttl: 1000 * 60 * 5 });
exports.artifactsCache = new lru_cache_1.LRUCache({ max: 5, ttl: 1000 * 60 * 5 });
exports.materialsCache = new lru_cache_1.LRUCache({ max: 5, ttl: 1000 * 60 * 5 });
function clearAllCaches() {
    exports.charactersCache.clear();
    exports.characterCache.clear();
    exports.weaponsCache.clear();
    exports.showcaseCache.clear();
    exports.artifactsCache.clear();
    exports.materialsCache.clear();
}
