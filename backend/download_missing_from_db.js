const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const https = require('https');

const prisma = new PrismaClient();

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

async function run() {
  const chars = await prisma.character.findMany({
    select: { name: true, avatarUrl: true, splashArtUrl: true }
  });

  let downloaded = 0;
  let errors = 0;

  for (const char of chars) {
    if (char.avatarUrl) {
      const filename = path.basename(char.avatarUrl);
      const dest = path.join('c:/Work/GenshinHub/frontend/public/images/avatars', filename);
      if (!fs.existsSync(dest)) {
        try {
          // If the file is missing, try downloading from enka.network
          await dl(`https://enka.network/ui/${filename}`, dest);
          console.log(`Downloaded avatar for ${char.name}: ${filename}`);
          downloaded++;
        } catch (e) {
          console.log(`Failed avatar for ${char.name} (${filename}): ${e.message}`);
          errors++;
        }
      }
    }

    if (char.splashArtUrl) {
      const filename = path.basename(char.splashArtUrl);
      const dest = path.join('c:/Work/GenshinHub/frontend/public/images/splash', filename);
      if (!fs.existsSync(dest)) {
        try {
          await dl(`https://enka.network/ui/${filename}`, dest);
          console.log(`Downloaded splash for ${char.name}: ${filename}`);
          downloaded++;
        } catch (e) {
          console.log(`Failed splash for ${char.name} (${filename}): ${e.message}`);
          errors++;
        }
      }
    }
  }

  console.log(`Finished. Downloaded ${downloaded} missing images. Errors: ${errors}`);
}

run().catch(console.error).finally(() => prisma.$disconnect());
