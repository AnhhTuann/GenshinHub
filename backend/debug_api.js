const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'GenshinHub/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

async function main() {
  // Amos' Bow - known to have Crit DMG substat
  const resp = await fetchJson('https://gi.yatta.moe/api/v2/en/weapon/15501');
  const d = resp.data;
  console.log('specialProp:', JSON.stringify(d.specialProp, null, 2));
  if (d.affix) {
    const keys = Object.keys(d.affix);
    console.log('affix keys:', keys);
    if (keys.length) console.log('first affix:', JSON.stringify(d.affix[keys[0]], null, 2));
  }
}

main().catch(console.error);
