const fs = require('fs');
const https = require('https');
const path = require('path');

const elements = {
  Pyro: 'UI_Buff_Element_Fire',
  Hydro: 'UI_Buff_Element_Water',
  Cryo: 'UI_Buff_Element_Ice',
  Electro: 'UI_Buff_Element_Electric',
  Anemo: 'UI_Buff_Element_Wind',
  Geo: 'UI_Buff_Element_Rock',
  Dendro: 'UI_Buff_Element_Grass'
};

const dir = path.join(__dirname, '../frontend/public/images/elements');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download() {
  for (const [name, file] of Object.entries(elements)) {
    const url = `https://gi.yatta.moe/assets/UI/${file}.png`;
    const dest = path.join(dir, `${name.toLowerCase()}.png`);
    await new Promise((resolve) => {
      https.get(url, (res) => {
        const stream = fs.createWriteStream(dest);
        res.pipe(stream);
        stream.on('finish', () => { stream.close(); resolve(); });
      });
    });
    console.log(`Downloaded ${name}`);
  }
}

download();
