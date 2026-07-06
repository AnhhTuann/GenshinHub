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

// ============================================================
// Name mapping: Game display name -> Enka folder name
// ============================================================
const nameMapping = {
  // Inazuma
  "Raiden Shogun": "Shougun",
  "Kamisato Ayaka": "Ayaka",
  "Kamisato Ayato": "Ayato",
  "Sangonomiya Kokomi": "Kokomi",
  "Kaedehara Kazuha": "Kazuha",
  "Yae Miko": "Yae",
  "Kuki Shinobu": "Shinobu",
  "Arataki Itto": "Itto",
  "Shikanoin Heizou": "Heizo",
  "Kujou Sara": "Sara",
  "Yun Jin": "Yunjin",
  // Mondstadt / Liyue
  "Thoma": "Tohma",
  "Hu Tao": "Hutao",
  "Amber": "Ambor",
  "Jean": "Qin",
  "Noelle": "Noel",
  "Baizhu": "Baizhuer",
  "Yanfei": "Feiyan",
  // Sumeru
  "Alhaitham": "Alhatham",
  "Kirara": "Momoka",
  // Fontaine
  "Lyney": "Liney",
  "Lynette": "Linette",
  "Xianyun": "Liuyun",
  // Natlan
  "Ororon": "Olorun",
  "Lan Yan": "Lanyan",
  "Skirk": "SkirkNew",
  // Traveler
  "Traveler": "PlayerBoy",
  "Traveler (Anemo)": "PlayerBoy",
  "Traveler (Geo)": "PlayerBoy",
  "Traveler (Electro)": "PlayerBoy",
  "Traveler (Dendro)": "PlayerBoy",
  "Traveler (Hydro)": "PlayerBoy",
  "Traveler (Pyro)": "PlayerBoy",
  "Manekin": "PlayerBoy",
  "Manekina": "PlayerGirl",
  // New characters - exact Enka names
  "Yumemizuki Mizuki": "YumemizukiMizuki",
  "Iansan": "Iansan",
  "Varesa": "Varesa",
  "Escoffier": "Escoffier",
  "Columbina": "Columbina",
  "Dahlia": "Dahlia",
  "Aino": "Aino",
  "Lauma": "Lauma",
  "Flins": "Flins",
  "Nefer": "Nefer",
  "Durin": "Durin",
  "Jahoda": "Jahoda",
  "Zibai": "Zibai",
  "Illuga": "Illuga",
  "Varka": "Varka",
  "Lohen": "Lohen",
  "Linnea": "Linnea",
  "Nicole": "Nicole",
  "Prune": "Prune",
  "Sandrone": "Sandrone",
  "Ineffa": "Ineffa",
  "Citlali": "Citlali",
  "Chasca": "Chasca",
};

// ============================================================
// All known characters with their Enka folder name
// ============================================================
const ALL_CHARACTERS = [
  "Ayaka", "Qin", "Lisa", "Barbara", "Kaeya", "Diluc", "Razor", "Ambor",
  "Venti", "Xiangling", "Beidou", "Xingqiu", "Xiao", "Ningguang", "Klee",
  "Zhongli", "Fischl", "Bennett", "Tartaglia", "Noel", "Qiqi", "Chongyun",
  "Ganyu", "Albedo", "Diona", "Mona", "Keqing", "Sucrose", "Xinyan",
  "Rosaria", "Hutao", "Kazuha", "Feiyan", "Yoimiya", "Tohma", "Eula",
  "Shougun", "Sayu", "Kokomi", "Gorou", "Sara", "Itto", "Yae", "Heizo",
  "Yelan", "Momoka", "Aloy", "Shenhe", "Yunjin", "Shinobu", "Ayato",
  "Collei", "Dori", "Tighnari", "Nilou", "Cyno", "Candace", "Nahida",
  "Layla", "Wanderer", "Faruzan", "Yaoyao", "Alhatham", "Dehya", "Mika",
  "Kaveh", "Baizhuer", "Linette", "Liney", "Freminet", "Wriothesley",
  "Neuvillette", "Charlotte", "Furina", "Chevreuse", "Navia", "Gaming",
  "Liuyun", "Chiori", "Sigewinne", "Arlecchino", "Sethos", "Clorinde",
  "Emilie", "Kachina", "Kinich", "Mualani", "Xilonen", "Chasca", "Olorun",
  "Mavuika", "Citlali", "Lanyan", "YumemizukiMizuki", "Iansan", "Varesa",
  "Escoffier", "Ifa", "SkirkNew", "Dahlia", "Ineffa", "PlayerBoy",
  "PlayerGirl", "Lauma", "Flins", "Aino", "Nefer", "Durin", "Jahoda",
  "Columbina", "Zibai", "Illuga", "Varka", "Lohen", "Linnea", "Nicole",
  "Prune", "Sandrone",
];

// ============================================================
// Scan backend seed files for weapon/artifact icon references
// (Frontend scan is skipped to avoid matching compiled .tsbuildinfo)
// ============================================================
const imageUrls = new Set();

const SEED_SCAN_DIRS = [
  './backend/prisma/seeds',
];

const scanSeedFiles = (dir) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (['node_modules', 'dist', 'artifacts-data', 'weapons-data'].includes(file)) continue;
      scanSeedFiles(fullPath);
    } else if (
      file.endsWith('.ts') &&
      // Skip the main characters.ts/weapons.ts/artifacts.ts — these have long concatenated strings
      // that cause false regex matches. Per-character build files are safe.
      !['characters.ts', 'weapons.ts', 'artifacts.ts', 'materials.ts'].includes(file) &&
      stat.size < 100_000
    ) {
      const content = fs.readFileSync(fullPath, 'utf8');

      // Only match weapon/artifact/item icon references
      const uiRegex = /["'`](UI_(?:EquipIcon|RelicIcon|ItemIcon)_[A-Za-z0-9_]{1,60})["'`]/g;
      let match;
      while ((match = uiRegex.exec(content)) !== null) {
        imageUrls.add(`https://enka.network/ui/${match[1]}.png`);
      }
    }
  }
};

for (const dir of SEED_SCAN_DIRS) {
  scanSeedFiles(dir);
}

// Add avatar + splash for all known characters
for (const charName of ALL_CHARACTERS) {
  const cleanName = charName.replace(/[^a-zA-Z]/g, '');
  imageUrls.add(`https://enka.network/ui/UI_AvatarIcon_${cleanName}.png`);
  imageUrls.add(`https://enka.network/ui/UI_Gacha_AvatarImg_${cleanName}.png`);
}

// Note: ALL_CHARACTERS array above covers all known characters.
// No need to parse characters.ts which can cause false regex matches.


// Convert Set to Array
const urls = Array.from(imageUrls);
console.log(`Found ${urls.length} images to check/download.`);

async function downloadFile(url) {
  let filename = url.split('/').pop().replace('.png', '');
  let subfolder = 'characters';

  if (filename.includes('EquipIcon')) subfolder = 'weapons';
  else if (filename.includes('RelicIcon')) subfolder = 'artifacts';
  else if (filename.includes('ItemIcon')) subfolder = 'items';
  else if (filename.includes('Gacha_AvatarImg')) {
    subfolder = 'characters';
    // Extract character name and create proper folder
    const charName = filename.replace('UI_Gacha_AvatarImg_', '');
    const charDir = path.join(FRONTEND_DIR, 'characters', charName);
    ensureDir(charDir);
    const destPath = path.join(charDir, 'splash.webp');
    if (fs.existsSync(destPath)) return; // Skip if already exists
    return downloadAndConvert(url, destPath);
  } else if (filename.includes('AvatarIcon')) {
    subfolder = 'characters';
    // Extract character name and create proper folder
    const charName = filename.replace('UI_AvatarIcon_', '');
    const charDir = path.join(FRONTEND_DIR, 'characters', charName);
    ensureDir(charDir);
    const destPath = path.join(charDir, 'avatar.webp');
    if (fs.existsSync(destPath)) return; // Skip if already exists
    return downloadAndConvert(url, destPath);
  }

  // For weapons, artifacts, items — flat file naming
  const destPath = path.join(FRONTEND_DIR, subfolder, filename + '.webp');
  if (fs.existsSync(destPath)) return; // Skip if already exists
  return downloadAndConvert(url, destPath);
}

async function downloadAndConvert(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        // Silently skip 404s (many characters don't have splash)
        return;
      }
      throw new Error(`Failed to get '${url}' (${res.status})`);
    }
    const buffer = await res.arrayBuffer();
    await sharp(Buffer.from(buffer))
      .webp({ quality: 90 })
      .toFile(destPath);
    return true; // Successfully downloaded
  } catch (err) {
    throw err;
  }
}

async function run() {
  let active = 0;
  let index = 0;
  let downloaded = 0;
  let skipped = 0;

  return new Promise((resolve) => {
    const next = () => {
      if (index >= urls.length) {
        if (active === 0) resolve();
        return;
      }

      const url = urls[index++];
      active++;
      downloadFile(url).then((didDownload) => {
        if (didDownload) downloaded++;
        else skipped++;
        active--;
        if ((downloaded + skipped) % 50 === 0) {
          console.log(`Progress: ${downloaded} downloaded, ${skipped} skipped, ${index}/${urls.length} checked`);
        }
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
  console.log('✅ Asset sync completed!');
}).catch(console.error);
