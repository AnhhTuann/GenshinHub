import fs from 'fs';
import path from 'path';
import https from 'https';

const DOWNLOAD_CONCURRENCY = 10;
const FRONTEND_DIR = path.resolve('./frontend/public/images');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir(path.join(FRONTEND_DIR, 'avatars'));
ensureDir(path.join(FRONTEND_DIR, 'splash'));
ensureDir(path.join(FRONTEND_DIR, 'weapons'));
ensureDir(path.join(FRONTEND_DIR, 'artifacts'));

const charactersFile = fs.readFileSync('./backend/prisma/seeds/characters.ts', 'utf8');
const artifactsFile = fs.readFileSync('./frontend/components/ArtifactCard.tsx', 'utf8');

const imageUrls = new Set();

// 1. Get all static URLs from characters.ts and ArtifactCard.tsx
const urlRegex = /https:\/\/enka\.network\/ui\/([^"'\s]+)\.png/g;
let match;
while ((match = urlRegex.exec(charactersFile)) !== null) {
  imageUrls.add(match[0]);
}
while ((match = urlRegex.exec(artifactsFile)) !== null) {
  imageUrls.add(match[0]);
}

// 2. Extract character names to build Avatar and Splash URLs
const nameMapping = {
  "Raiden Shogun": "Shougun", "Kamisato Ayaka": "Ayaka", "Kamisato Ayato": "Ayato", "Sangonomiya Kokomi": "Kokomi",
  "Kaedehara Kazuha": "Kazuha", "Yae Miko": "Yae", "Kuki Shinobu": "Shinobu", "Arataki Itto": "Itto",
  "Shikanoin Heizou": "Heizou", "Kujou Sara": "Sara", "Yun Jin": "Yunjin", "Thoma": "Tohma", "Traveler": "PlayerBoy", "Hu Tao": "Hutao", "Lan Yan": "Lanyan", "Skirk": "SkirkNew"
};

// Regex to capture the big arrays like: ...["Albedo|Geo|Sword|5", ...
const charListRegex = /"([^"]+)\|[^"]+\|[^"]+\|[^"]+"/g;
let cMatch;
while ((cMatch = charListRegex.exec(charactersFile)) !== null) {
  let name = cMatch[1];
  let mappedName = nameMapping[name] || name;
  let cleanName = mappedName.replace(/[^a-zA-Z]/g, '');
  imageUrls.add(`https://enka.network/ui/UI_AvatarIcon_${cleanName}.png`);
  imageUrls.add(`https://enka.network/ui/UI_Gacha_AvatarImg_${cleanName}.png`);
}

// Convert Set to Array
const urls = Array.from(imageUrls);
console.log(`Found ${urls.length} images to download.`);

async function downloadFile(url) {
  const filename = url.split('/').pop();
  let subfolder = 'avatars';
  if (filename.includes('EquipIcon')) subfolder = 'weapons';
  else if (filename.includes('RelicIcon')) subfolder = 'artifacts';
  else if (filename.includes('Gacha_AvatarImg')) subfolder = 'splash';

  const destPath = path.join(FRONTEND_DIR, subfolder, filename);
  if (fs.existsSync(destPath)) {
    // console.log(`Skipping (already exists): ${filename}`);
    return;
  }

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        if (response.statusCode === 404) {
          console.warn(`[404] Not Found: ${url}`);
          resolve(); // Resolve anyway to not break the chain
        } else {
          reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        }
        return;
      }
      const file = fs.createWriteStream(destPath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  let active = 0;
  let index = 0;
  let downloaded = 0;
  
  return new Promise((resolve) => {
    const next = () => {
      if (index >= urls.length) {
        if (active === 0) resolve();
        return;
      }
      
      const url = urls[index++];
      active++;
      downloadFile(url).then(() => {
        downloaded++;
        active--;
        if (downloaded % 50 === 0) console.log(`Downloaded ${downloaded}/${urls.length}...`);
        next();
      }).catch((err) => {
        console.error(`Error downloading ${url}:`, err.message);
        active--;
        next();
      });
    };
    
    for (let i = 0; i < DOWNLOAD_CONCURRENCY; i++) {
      next();
    }
  });
}

run().then(() => {
  console.log('All downloads completed successfully!');
}).catch(console.error);
