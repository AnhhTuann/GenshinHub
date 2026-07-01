import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DOWNLOAD_CONCURRENCY = 10;
const FRONTEND_DIR = path.resolve('./frontend/public/assets');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir(path.join(FRONTEND_DIR, 'characters'));
ensureDir(path.join(FRONTEND_DIR, 'weapons'));
ensureDir(path.join(FRONTEND_DIR, 'artifacts'));
ensureDir(path.join(FRONTEND_DIR, 'items'));

const imageUrls = new Set();

const scanDirectory = (dir) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json') || file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Match full enka URLs
      let match;
      const urlRegex = /https:\/\/enka\.network\/ui\/([^"'\s]+)\.png/g;
      while ((match = urlRegex.exec(content)) !== null) {
        imageUrls.add(match[0]);
      }
      
      // Match UI_... filenames in paths or text
      const uiRegex = /UI_[A-Za-z0-9_]+/g;
      while ((match = uiRegex.exec(content)) !== null) {
        imageUrls.add(`https://enka.network/ui/${match[0]}.png`);
      }
    }
  }
};

scanDirectory('./backend/prisma/seeds');
scanDirectory('./frontend');


// 2. Extract character names to build Avatar and Splash URLs
const nameMapping = {
  "Raiden Shogun": "Shougun", "Kamisato Ayaka": "Ayaka", "Kamisato Ayato": "Ayato", "Sangonomiya Kokomi": "Kokomi",
  "Kaedehara Kazuha": "Kazuha", "Yae Miko": "Yae", "Kuki Shinobu": "Shinobu", "Arataki Itto": "Itto",
  "Shikanoin Heizou": "Heizo", "Kujou Sara": "Sara", "Yun Jin": "Yunjin", "Thoma": "Tohma", "Traveler": "PlayerBoy",
  "Hu Tao": "Hutao", "Lan Yan": "Lanyan", "Skirk": "SkirkNew", "Amber": "Ambor", "Jean": "Qin", "Noelle": "Noel",
  "Baizhu": "Baizhuer", "Yanfei": "Feiyan", "Xianyun": "Liuyun", "Alhaitham": "Alhatham", "Kirara": "Momoka",
  "Lyney": "Liney", "Lynette": "Linette", "Ororon": "Olorun"
};

// Regex to capture the big arrays like: ...["Albedo|Geo|Sword|5", ...
const charactersFile = fs.readFileSync('./backend/prisma/seeds/characters.ts', 'utf8');
const charListRegex = /"([^"]+)\|[^"]+\|[^"]+\|[^"]+"/g;
let cMatch;
while ((cMatch = charListRegex.exec(charactersFile)) !== null) {
  let name = cMatch[1];
  if (name.startsWith("Traveler")) {
    name = "Traveler";
  }
  let mappedName = nameMapping[name] || name;
  let cleanName = mappedName.replace(/[^a-zA-Z]/g, '');
  imageUrls.add(`https://enka.network/ui/UI_AvatarIcon_${cleanName}.png`);
  imageUrls.add(`https://enka.network/ui/UI_Gacha_AvatarImg_${cleanName}.png`);
}

// Convert Set to Array
const urls = Array.from(imageUrls);
console.log(`Found ${urls.length} images to download.`);

async function downloadFile(url) {
  let filename = url.split('/').pop().replace('.png', '');
  let subfolder = 'characters';
  
  if (filename.includes('EquipIcon')) subfolder = 'weapons';
  else if (filename.includes('RelicIcon')) subfolder = 'artifacts';
  else if (filename.includes('ItemIcon')) subfolder = 'items';
  else if (filename.includes('Gacha_AvatarImg')) {
    subfolder = 'characters';
    filename = filename + '_splash';
  } else if (filename.includes('AvatarIcon')) {
    subfolder = 'characters';
    filename = filename + '_avatar';
  }

  const destPath = path.join(FRONTEND_DIR, subfolder, filename + '.webp');
  if (fs.existsSync(destPath)) {
    // console.log(`Skipping (already exists): ${filename}.webp`);
    return Promise.resolve();
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`[404] Not Found: ${url}`);
        return;
      }
      throw new Error(`Failed to get '${url}' (${res.status})`);
    }
    const buffer = await res.arrayBuffer();
    
    await sharp(Buffer.from(buffer))
      .webp({ quality: 90 })
      .toFile(destPath);
  } catch (err) {
    throw err;
  }
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
