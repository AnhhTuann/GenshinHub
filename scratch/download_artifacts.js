const https = require('https');
const fs = require('fs');
const path = require('path');

const dl = (url, dest) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(dest);
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    } else {
      file.close();
      fs.unlink(dest, () => reject(new Error(`Failed with status code: ${response.statusCode}`)));
    }
  }).on('error', (err) => {
    fs.unlink(dest, () => reject(err));
  });
});

const run = () => {
  https.get('https://gi.yatta.moe/api/v2/vi/reliquary', (res) => {
    let body = '';
    res.on('data', (c) => body += c);
    res.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const items = Object.values(data.data.items);
        console.log(`Found ${items.length} artifacts to check.`);
        let downloaded = 0;
        let errors = 0;

        for (const item of items) {
          if (!item.icon) continue;
          const filename = `${item.icon}.png`;
          const destPath = path.join('frontend/public/images/artifacts', filename);
          
          if (!fs.existsSync(destPath)) {
            try {
              // Try enka first as yatta blocks sometimes
              await dl(`https://enka.network/ui/${filename}`, destPath);
              downloaded++;
              if (downloaded % 10 === 0) console.log(`Downloaded ${downloaded}...`);
            } catch (e) {
              console.log(`Failed to download ${filename}: ${e.message}`);
              errors++;
            }
          }
        }
        console.log(`Finished downloading ${downloaded} new artifacts. Errors: ${errors}`);
      } catch(e) {
        console.error(e);
      }
    });
  });
};

run();
