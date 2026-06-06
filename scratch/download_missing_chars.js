const fs = require('fs');
const path = require('path');
const https = require('https');

const dl = (url, dest) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(dest);
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => { file.close(resolve); });
    } else {
      file.close();
      fs.unlink(dest, () => reject(new Error(`Status ${response.statusCode}`)));
    }
  }).on('error', (err) => {
    fs.unlink(dest, () => reject(err));
  });
});

const content = fs.readFileSync('backend/prisma/seeds/characters.ts', 'utf8');

const avatars = [...content.matchAll(/avatarUrl:\s*["']\/images\/avatars\/([^"']+)["']/g)].map(m => m[1]);
const splashes = [...content.matchAll(/splashArtUrl:\s*["']\/images\/splash\/([^"']+)["']/g)].map(m => m[1]);

async function run() {
  let downloaded = 0;
  console.log(`Checking ${avatars.length} avatars and ${splashes.length} splash arts...`);

  for (const filename of avatars) {
    const dest = path.join('frontend/public/images/avatars', filename);
    if (!fs.existsSync(dest)) {
      try {
        await dl(`https://enka.network/ui/${filename}`, dest);
        console.log(`Downloaded avatar: ${filename}`);
        downloaded++;
      } catch (e) {
        console.log(`Failed to download avatar ${filename}: ${e.message}`);
      }
    }
  }

  for (const filename of splashes) {
    const dest = path.join('frontend/public/images/splash', filename);
    if (!fs.existsSync(dest)) {
      try {
        await dl(`https://enka.network/ui/${filename}`, dest);
        console.log(`Downloaded splash: ${filename}`);
        downloaded++;
      } catch (e) {
        console.log(`Failed to download splash ${filename}: ${e.message}`);
      }
    }
  }
  
  console.log(`Finished. Downloaded ${downloaded} missing images.`);
}

run();
