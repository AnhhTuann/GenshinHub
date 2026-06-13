import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import https from 'https';

const prisma = new PrismaClient();
const FRONTEND_DIR = path.resolve(__dirname, '../frontend/public');

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir(path.join(FRONTEND_DIR, 'images/avatars'));
ensureDir(path.join(FRONTEND_DIR, 'images/splash'));
ensureDir(path.join(FRONTEND_DIR, 'images/weapons'));
ensureDir(path.join(FRONTEND_DIR, 'images/artifacts'));
ensureDir(path.join(FRONTEND_DIR, 'images/materials'));

const missing: { type: string, url: string, dest: string }[] = [];

function checkLocal(type: string, iconUrl: string | null) {
  if (!iconUrl) return;
  
  if (iconUrl.startsWith('/images/')) {
    const localPath = path.join(FRONTEND_DIR, iconUrl.replace('/images/', 'images/'));
    if (!fs.existsSync(localPath)) {
      const filename = path.basename(iconUrl);
      missing.push({
        type,
        url: `https://enka.network/ui/${filename}`,
        dest: localPath
      });
    }
  } else if (iconUrl.startsWith('https://enka.network/ui/')) {
    const filename = path.basename(iconUrl);
    // Let's decide to download materials as well
    const subfolder = type === 'material' ? 'materials' : 'misc';
    const localPath = path.join(FRONTEND_DIR, 'images', subfolder, filename);
    if (!fs.existsSync(localPath)) {
      missing.push({
        type,
        url: iconUrl,
        dest: localPath
      });
    }
  }
}

async function run() {
  const chars = await prisma.character.findMany();
  for (const c of chars) {
    checkLocal('avatar', c.avatarUrl);
    checkLocal('splash', c.splashArtUrl);
  }

  const weapons = await prisma.weapon.findMany();
  for (const w of weapons) {
    checkLocal('weapon', w.iconUrl);
  }

  const artifacts = await prisma.artifactSet.findMany();
  for (const a of artifacts) {
    checkLocal('artifact', a.iconUrl);
  }
  
  // materials
  const materials = await prisma.material.findMany();
  for (const m of materials) {
    checkLocal('material', m.iconUrl);
  }

  console.log(`Found ${missing.length} missing images.`);
  
  let success = 0;
  let attempt = 0;
  const CONCURRENCY = 15;
  let activeIndex = 0;

  async function worker() {
    while (activeIndex < missing.length) {
      const index = activeIndex++;
      if (index >= missing.length) break;
      const item = missing[index];

      attempt++;
      if (attempt % 50 === 0) {
        console.log(`Progress: checked/processed ${attempt}/${missing.length} images (Downloaded: ${success})...`);
      }

      try {
        await new Promise<void>((resolve, reject) => {
          const req = https.get(item.url, (res) => {
            if (res.statusCode !== 200) {
              if (res.statusCode === 404) {
                console.warn(`[404] Not Found: ${item.url}`);
                resolve();
              } else {
                reject(new Error(`Status ${res.statusCode}`));
              }
              return;
            }
            const file = fs.createWriteStream(item.dest);
            res.pipe(file);
            file.on('finish', () => {
              file.close();
              success++;
              resolve();
            });
          }).on('error', (err: Error) => {
            fs.unlink(item.dest, () => {});
            reject(err);
          });

          req.setTimeout(8000, () => {
            req.destroy();
            fs.unlink(item.dest, () => {});
            reject(new Error('Request timeout (8s)'));
          });
        });
      } catch (e: any) {
        console.error(`Failed to download ${item.url}: ${e.message}`);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  console.log(`Successfully downloaded ${success} images.`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
