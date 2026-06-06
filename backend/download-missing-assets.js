const { PrismaClient } = require('@prisma/client');
const https = require('https');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const PUBLIC_DIR = path.resolve(__dirname, '../frontend/public');
const AMBR_BASE = 'https://api.ambr.top/assets/UI';
const ENKA_BASE = 'https://enka.network/ui';

let downloaded = 0;
let skipped = 0;
let failed = 0;

function downloadFile(url, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath)) {
      skipped++;
      return resolve(false);
    }
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          downloaded++;
          console.log(`✅ ${path.basename(destPath)}`);
          resolve(true);
        });
      } else {
        file.close();
        fs.unlink(destPath, () => {});
        failed++;
        console.log(`❌ ${res.statusCode} ${path.basename(destPath)} <- ${url}`);
        resolve(false);
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      failed++;
      console.log(`❌ ERROR ${path.basename(destPath)}: ${err.message}`);
      resolve(false);
    });
  });
}

// Try multiple CDN sources for a file
async function tryDownload(filename, destPath) {
  const urls = [
    `${ENKA_BASE}/${filename}`,
    `${AMBR_BASE}/${filename}`,
  ];
  for (const url of urls) {
    const ok = await downloadFile(url, destPath);
    if (ok) return true;
    // If file exists (skipped), return
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 500) return true;
  }
  return false;
}

async function main() {
  console.log('\n🔍 Checking missing images...\n');

  // ─── 1. WEAPONS ──────────────────────────────────────────────────
  console.log('═══ WEAPONS ═══');
  const weapons = await prisma.weapon.findMany();
  for (const w of weapons) {
    if (!w.iconUrl) continue;
    const filename = path.basename(w.iconUrl);
    const dest = path.join(PUBLIC_DIR, 'images', 'weapons', filename);
    await tryDownload(filename, dest);
  }

  // ─── 2. ARTIFACT SETS ────────────────────────────────────────────
  console.log('\n═══ ARTIFACTS ═══');
  const artifactSets = await prisma.artifactSet.findMany();
  for (const a of artifactSets) {
    if (!a.iconUrl) continue;
    const filename = path.basename(a.iconUrl);
    const dest = path.join(PUBLIC_DIR, 'images', 'artifacts', filename);
    await tryDownload(filename, dest);
  }

  // ─── 3. CHARACTER AVATARS & SPLASH ARTS ──────────────────────────
  console.log('\n═══ CHARACTERS (Avatar + Splash) ═══');
  const characters = await prisma.character.findMany();
  for (const c of characters) {
    // Avatar
    if (c.avatarUrl) {
      const filename = path.basename(c.avatarUrl);
      const dest = path.join(PUBLIC_DIR, 'images', 'avatars', filename);
      await tryDownload(filename, dest);
    }
    // Splash art
    if (c.splashArtUrl) {
      const filename = path.basename(c.splashArtUrl);
      const dest = path.join(PUBLIC_DIR, 'images', 'splash', filename);
      await tryDownload(filename, dest);
    }
  }

  console.log('\n════════════════════════════════════════');
  console.log(`✅ Downloaded: ${downloaded}`);
  console.log(`⏭️  Skipped (already exist): ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('════════════════════════════════════════\n');
}

main().catch(console.error).finally(() => prisma.$disconnect());
