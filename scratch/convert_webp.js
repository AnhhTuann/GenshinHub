const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, '../frontend/public/logo.png');
const output = path.join(__dirname, '../frontend/public/logo.webp');

sharp(input)
  .webp()
  .toFile(output)
  .then(() => {
    console.log('Converted logo.png to webp');
    fs.unlinkSync(input); // Delete original png
  })
  .catch(err => {
    console.error('Error:', err);
  });
