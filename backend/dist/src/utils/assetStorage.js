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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetStorageRoot = getAssetStorageRoot;
exports.resolveAssetFilePath = resolveAssetFilePath;
exports.publicAssetPath = publicAssetPath;
exports.isValidImageFile = isValidImageFile;
exports.atomicWriteFile = atomicWriteFile;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Central asset storage resolution.
 *
 * Resolution order for the local asset root:
 *   1. ASSET_STORAGE_PATH env var (absolute or relative to backend cwd)
 *   2. <backend>/../frontend/public (dev default, keeps Next.js /assets working)
 *   3. <backend>/../assets fallback
 */
function getAssetStorageRoot() {
    const env = process.env.ASSET_STORAGE_PATH;
    if (env && env.trim()) {
        const p = path.resolve(env.trim());
        return p;
    }
    const candidates = [
        path.resolve(process.cwd(), '../frontend/public'),
        path.resolve(process.cwd(), '../assets'),
        path.resolve(process.cwd(), 'public'),
    ];
    for (const c of candidates) {
        try {
            fs.mkdirSync(c, { recursive: true });
            return c;
        }
        catch {
            // try next
        }
    }
    return candidates[0];
}
/**
 * Resolve a public asset URL path (e.g. "/assets/items/UI_ItemIcon_107016.webp")
 * to an absolute file path inside the storage root. Rejects traversal.
 * Returns null when the path is invalid or escapes the root.
 */
function resolveAssetFilePath(publicPath) {
    if (!publicPath || typeof publicPath !== 'string')
        return null;
    if (publicPath.includes('\0'))
        return null;
    // Strip leading "/assets/" prefix if present; stored files live under <root>/assets/...
    let rel = publicPath.replace(/^\/+/, '');
    if (rel.startsWith('assets/'))
        rel = rel.slice('assets/'.length);
    else if (rel.startsWith('assets'))
        rel = rel.slice('assets'.length).replace(/^\/+/, '');
    if (rel.split(/[\\/]+/).includes('..'))
        return null;
    const root = path.resolve(getAssetStorageRoot());
    const abs = path.resolve(root, 'assets', rel);
    const prefix = root + path.sep;
    if (abs !== root && !abs.startsWith(prefix))
        return null;
    return abs;
}
/**
 * Compute the public URL path for a relative asset key.
 * e.g. resolvePublicAssetPath('items', 'UI_ItemIcon_107016.webp')
 *   -> "/assets/items/UI_ItemIcon_107016.webp"
 */
function publicAssetPath(...segments) {
    const clean = segments
        .map((s) => String(s).replace(/[^a-zA-Z0-9._-]/g, '_'))
        .filter(Boolean);
    return '/assets/' + clean.join('/');
}
function isValidImageFile(filePath, minBytes = 30) {
    try {
        const stat = fs.statSync(filePath);
        if (!stat.isFile() || stat.size < minBytes)
            return false;
        // WebP magic: RIFF....WEBP ; PNG: 89 50 4E 47 ; JPEG: FF D8
        const fd = fs.openSync(filePath, 'r');
        const buf = Buffer.alloc(12);
        fs.readSync(fd, buf, 0, 12, 0);
        fs.closeSync(fd);
        const isWebp = buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
            buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50;
        const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
        const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
        return isWebp || isPng || isJpg;
    }
    catch {
        return false;
    }
}
/**
 * Atomic write: write to temp file in same dir then rename.
 * Ensures parent dir exists and stays inside root.
 */
async function atomicWriteFile(absPath, data) {
    const dir = path.dirname(absPath);
    fs.mkdirSync(dir, { recursive: true });
    const tmp = absPath + '.tmp-' + process.pid + '-' + Date.now();
    fs.writeFileSync(tmp, data);
    fs.renameSync(tmp, absPath);
}
