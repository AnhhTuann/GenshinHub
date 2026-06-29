const genshin = require('genshin-db');
const aloy = genshin.characters('Aloy');
console.log('Aloy substat:', aloy.substat);
console.log('Keys:', Object.keys(aloy));
