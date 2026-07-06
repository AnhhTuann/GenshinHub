const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, '../frontend/public/assets/characters/UI_Gacha_AvatarImg_Sandrone_splash.png');
const output = path.join(__dirname, '../frontend/public/assets/characters/UI_Gacha_AvatarImg_Sandrone_splash.webp');

sharp(input)
  .webp()
  .toFile(output)
  .then(() => {
    console.log('Converted to webp');
    fs.unlinkSync(input); // Delete original png
  })
  .catch(err => {
    console.error('Error:', err);
  });
