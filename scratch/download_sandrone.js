const fs = require('fs');
const stream = require('stream');
const { promisify } = require('util');

const pipeline = promisify(stream.pipeline);

const iconUrl = 'https://gi.yatta.moe/assets/UI/UI_AvatarIcon_MarionetteNew.png';
const splashUrl = 'https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_MarionetteNew.png';

const download = async (url, dest) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  await pipeline(response.body, fs.createWriteStream(dest));
};

async function run() {
  console.log('Downloading Avatar...');
  await download(iconUrl, 'c:/Users/atuan/.gemini/antigravity-ide/scratch/GenshinHub/frontend/public/assets/characters/UI_AvatarIcon_Sandrone_avatar.webp');
  console.log('Downloading Splash...');
  await download(splashUrl, 'c:/Users/atuan/.gemini/antigravity-ide/scratch/GenshinHub/frontend/public/assets/characters/UI_Gacha_AvatarImg_Sandrone_splash.webp');
  console.log('Done!');
}

run().catch(console.error);
