"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAndConvertToWebp = downloadAndConvertToWebp;
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function downloadAndConvertToWebp(url, outputPath, maxRetries = 3, delayMs = 500) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            await delay(delayMs);
            const response = await (0, axios_1.default)({
                method: 'get',
                url: url,
                responseType: 'arraybuffer',
                headers: {
                    'User-Agent': 'Mozilla/5.0 GenshinHubSync/1.0',
                },
                timeout: 15000,
            });
            const dir = path_1.default.dirname(outputPath);
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir, { recursive: true });
            }
            await (0, sharp_1.default)(response.data)
                .webp({ quality: 80, effort: 4 })
                .toFile(outputPath);
            return true;
        }
        catch (error) {
            attempt++;
            console.warn(`⚠️ [Retry ${attempt}/${maxRetries}] Failed to download ${url}: ${error.message}`);
            if (attempt >= maxRetries) {
                console.error(`❌ Exhausted retries for ${url}`);
                return false;
            }
            await delay(1000 * attempt); // exponential backoff
        }
    }
    return false;
}
