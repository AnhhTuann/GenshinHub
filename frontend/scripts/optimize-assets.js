const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '../_raw_assets');
const OUT_DIR = path.join(__dirname, '../public/assets');

const DIR_MAPPING = {
  'artifacts': 'items',
  'materials': 'items',
  'weapons': 'weapons',
  'elements': 'elements',
  'avatars': 'characters',
  'splash': 'characters',
};

// Ensure output directories exist
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
Object.values(DIR_MAPPING).forEach(folder => {
  const p = path.join(OUT_DIR, folder);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

async function processDirectory(dir, targetSubdir = '') {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const folderName = path.basename(fullPath);
      const mappedTarget = DIR_MAPPING[folderName] || folderName;
      await processDirectory(fullPath, targetSubdir ? targetSubdir : mappedTarget);
    } else {
      if (file.match(/\.(png|jpe?g)$/i)) {
        const ext = path.extname(file);
        const name = path.basename(file, ext);
        
        let finalTargetSubdir = targetSubdir;
        let finalName = name;
        
        // Handle characters suffix matching
        if (dir.includes('avatars')) {
           finalName = name + '_avatar';
        } else if (dir.includes('splash')) {
           if (name.includes('gacha')) {
             finalName = name.replace('_gacha', '') + '_gacha';
           } else {
             finalName = name + '_splash';
           }
        }
        
        const outPath = path.join(OUT_DIR, finalTargetSubdir, `${finalName}.webp`);
        const outDirForFile = path.dirname(outPath);
        if (!fs.existsSync(outDirForFile)) {
          fs.mkdirSync(outDirForFile, { recursive: true });
        }
        
        // Skip if already optimized and newer than original
        if (fs.existsSync(outPath)) {
          const outStat = fs.statSync(outPath);
          if (outStat.mtime > stat.mtime) {
            continue; // Skip
          }
        }

        try {
          await sharp(fullPath)
            .webp({ quality: 80, effort: 4 })
            .toFile(outPath);
          console.log(`✅ Optimized: ${finalTargetSubdir}/${finalName}.webp`);
        } catch (e) {
          console.error(`❌ Failed: ${file}`, e);
        }
      }
    }
  }
}

async function run() {
  console.log('🚀 Bắt đầu nén ảnh sang WebP...');
  await processDirectory(RAW_DIR);
  console.log('🎉 Hoàn tất nén ảnh!');
}

run();
