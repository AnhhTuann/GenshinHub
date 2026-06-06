const https = require('https');
const fs = require('fs');
const path = require('path');

const toId = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

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
  https.get('https://gi.yatta.moe/api/v2/en/avatar', (res) => {
    let b = '';
    res.on('data', c => b += c);
    res.on('end', async () => {
      const data = JSON.parse(b).data.items;
      let downloaded = 0;
      let errors = 0;
      
      for (const key of Object.keys(data)) {
        const item = data[key];
        const name = item.name;
        if (name === "Traveler") {
            // we will handle traveler elements manually in DB
            // but the image for traveler can just be playerboy
            // icon = UI_AvatarIcon_PlayerBoy
        }

        const id = toId(name);
        
        // Avatar
        if (item.icon) {
          const avatarUrl = `https://enka.network/ui/${item.icon}.png`;
          const avatarDest = path.join('c:/Work/GenshinHub/frontend/public/images/avatars', `${id}.png`);
          if (!fs.existsSync(avatarDest)) {
            try {
              await dl(avatarUrl, avatarDest);
              downloaded++;
            } catch (e) {
              console.log(`Failed avatar ${name}: ${e.message}`);
              errors++;
            }
          }
        }

        // Splash
        const splashName = item.icon.replace('AvatarIcon', 'Gacha_AvatarImg');
        const splashUrl = `https://enka.network/ui/${splashName}.png`;
        const splashDest = path.join('c:/Work/GenshinHub/frontend/public/images/splash', `${id}.png`);
        
        if (!fs.existsSync(splashDest)) {
          try {
            await dl(splashUrl, splashDest);
            downloaded++;
          } catch (e) {
            console.log(`Failed splash ${name}: ${e.message}`);
            errors++;
          }
        }
      }
      
      console.log(`Finished. Downloaded ${downloaded} new clean images. Errors: ${errors}`);
    });
  });
}

run();
