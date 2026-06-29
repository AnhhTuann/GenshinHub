const genshin = require('genshin-db');

async function test() {
  const aloy = genshin.characters('Aloy');
  console.log('Aloy stats at Lv 1:', aloy.stats(1));
  console.log('Aloy stats at Lv 20:', aloy.stats(20));
  console.log('Aloy stats at Lv 20+:', aloy.stats(20, '+'));
  console.log('Aloy stats at Lv 90:', aloy.stats(90));
}

test();
