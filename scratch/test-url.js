const https = require('https');

const urls = [
  'https://gi.yatta.moe/assets/UI/UI_RelicIcon_15006_4.png',
  'https://ambr.top/assets/UI/UI_RelicIcon_15006_4.png',
  'https://gi.yatta.moe/assets/UI/relic/UI_RelicIcon_15006_4.png',
  'https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15006_4.png',
  'https://gi.yatta.moe/assets/UI/UI_RelicIcon_15006_1.png',
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: err.message });
    });
  });
}

async function main() {
  for (const url of urls) {
    const res = await checkUrl(url);
    console.log(`${res.url} -> ${res.status}`);
  }
}

main();
