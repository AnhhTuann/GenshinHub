"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showcaseCache = exports.weaponsCache = exports.characterCache = exports.charactersCache = void 0;
const lru_cache_1 = require("lru-cache");
exports.charactersCache = new lru_cache_1.LRUCache({ max: 5, ttl: 1000 * 60 * 5 });
exports.characterCache = new lru_cache_1.LRUCache({ max: 500, ttl: 1000 * 60 * 5 });
exports.weaponsCache = new lru_cache_1.LRUCache({ max: 5, ttl: 1000 * 60 * 5 });
exports.showcaseCache = new lru_cache_1.LRUCache({ max: 500, ttl: 1000 * 60 * 5 });
