"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAndConvertToWebp = downloadAndConvertToWebp;
exports.downloadWithFallback = downloadWithFallback;
const axios_1 = __importDefault(require("axios"));
const path = __importStar(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const assetStorage_1 = require("./assetStorage");
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB guard
function resolveOutputPath(url, outputPath) {
    if (outputPath) {
        // Accept either absolute path or "/assets/..." public path
        if (outputPath.startsWith('/assets/')) {
            return (0, assetStorage_1.resolveAssetFilePath)(outputPath);
        }
        const abs = path.resolve(outputPath);
        const root = path.resolve((0, assetStorage_1.getAssetStorageRoot)());
        const prefix = root + path.sep;
        if (abs !== root && !abs.startsWith(prefix))
            return null;
        return abs;
    }
    // Derive from URL filename, sanitize, place under <root>/assets/_remote/
    try {
        const u = new URL(url);
        let name = path.basename(u.pathname) || 'image';
        name = name.replace(/[^a-zA-Z0-9._-]/g, '_');
        return path.join((0, assetStorage_1.getAssetStorageRoot)(), 'assets', '_remote', name);
    }
    catch {
        return null;
    }
}
async function fetchBuffer(url, timeoutMs = 15000) {
    const res = await axios_1.default.get(url, {
        responseType: 'arraybuffer',
        timeout: timeoutMs,
        maxContentLength: MAX_FILE_BYTES,
        maxBodyLength: MAX_FILE_BYTES,
        headers: { 'User-Agent': 'GenshinHub-AssetSync/1.0' },
        validateStatus: (s) => s >= 200 && s < 300,
    });
    return Buffer.from(res.data);
}
/**
 * Download an image URL and save as WebP inside the configured asset root.
 * - Skips when target exists and is a valid image (no overwrite).
 * - Retries up to MAX_RETRIES with delay.
 * - Atomic write via temp file + rename.
 * - Returns { ok, path?, skipped?, error? }.
 */
async function downloadAndConvertToWebp(url, outputPath, options = {}) {
    const { skipExisting = true } = options;
    const target = resolveOutputPath(url, options.outputPath ?? outputPath);
    if (!target) {
        return { ok: false, error: `Invalid output path for ${url}` };
    }
    if (skipExisting && await (0, assetStorage_1.isDecodableImageFile)(target)) {
        return { ok: true, path: target, skipped: true };
    }
    let lastErr = '';
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const buf = await fetchBuffer(url);
            if (!buf || buf.length < 50) {
                lastErr = 'empty or too small response';
                throw new Error(lastErr);
            }
            // Validate it's actually an image via sharp metadata
            const meta = await (0, sharp_1.default)(buf, { failOn: 'error' }).metadata();
            if (!meta.format || !meta.width || !meta.height) {
                throw new Error('not a valid image');
            }
            const webp = await (0, sharp_1.default)(buf)
                .webp({ quality: 80 })
                .toBuffer();
            if (webp.length < 50)
                throw new Error('webp output too small');
            if (skipExisting && await (0, assetStorage_1.isDecodableImageFile)(target)) {
                return { ok: true, path: target, skipped: true };
            }
            await (0, assetStorage_1.atomicWriteFile)(target, webp);
            return { ok: true, path: target };
        }
        catch (err) {
            const e = err;
            lastErr = e?.response?.status
                ? `HTTP ${e.response.status}`
                : e?.message || String(err);
            if (e?.response?.status === 404)
                break;
            if (attempt < MAX_RETRIES) {
                await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
            }
        }
    }
    return { ok: false, error: lastErr };
}
/**
 * Try multiple source URLs in order until one succeeds.
 * Returns first success; collects errors for reporting.
 */
async function downloadWithFallback(urls, outputPath, options = {}) {
    const tried = [];
    let lastErr = 'no sources';
    for (const url of urls) {
        if (!url)
            continue;
        tried.push(url);
        const res = await downloadAndConvertToWebp(url, outputPath, options);
        if (res.ok)
            return { ...res, tried };
        lastErr = res.error || lastErr;
    }
    return { ok: false, error: lastErr, tried };
}
