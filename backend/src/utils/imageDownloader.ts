import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function downloadAndConvertToWebp(
  url: string,
  outputPath: string,
  maxRetries = 3,
  delayMs = 500
): Promise<boolean> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      await delay(delayMs);
      const response = await axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0 GenshinHubSync/1.0',
        },
        timeout: 15000,
      });

      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      await sharp(response.data)
        .webp({ quality: 80, effort: 4 })
        .toFile(outputPath);

      return true;
    } catch (error: any) {
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
