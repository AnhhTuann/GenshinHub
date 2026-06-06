/**
 * Script chuyển tên vũ khí sang tiếng Anh
 * Match bằng icon filename (UI_EquipIcon_...) - giống nhau ở mọi ngôn ngữ
 * Source: yatta.moe API (English)
 */
const { PrismaClient } = require('@prisma/client');
const https = require('https');

const p = new PrismaClient();

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching English weapon data from yatta.moe...');
  const resp = await fetchJson('https://gi.yatta.moe/api/v2/en/weapon');
  
  if (!resp.data || !resp.data.items) {
    throw new Error('Bad API response: ' + JSON.stringify(resp).slice(0, 200));
  }
  
  const items = resp.data.items;
  console.log(`Got ${Object.keys(items).length} weapons from API`);
  
  // Build map: iconName -> { name, id }
  // icon from API: "UI_EquipIcon_Pole_Homa"
  // our DB: "/images/weapons/UI_EquipIcon_Pole_Homa.png"
  const iconToEnglish = {};
  for (const [id, w] of Object.entries(items)) {
    const iconName = w.icon; // e.g. "UI_EquipIcon_Pole_Homa"
    if (iconName) {
      iconToEnglish[iconName] = { name: w.name, apiId: id };
    }
  }
  console.log(`Built icon→name map with ${Object.keys(iconToEnglish).length} entries`);
  
  // --- Update Weapon table ---
  const weapons = await p.weapon.findMany();
  console.log(`\nUpdating ${weapons.length} weapons in Weapon table...`);
  
  let weaponUpdated = 0, weaponMissed = 0;
  for (const w of weapons) {
    if (!w.iconUrl) { weaponMissed++; continue; }
    // Extract icon name from path: "/images/weapons/UI_EquipIcon_Pole_Homa.png" → "UI_EquipIcon_Pole_Homa"
    const iconFile = w.iconUrl.split('/').pop()?.replace('.png', '');
    const enData = iconToEnglish[iconFile];
    if (enData) {
      await p.weapon.update({
        where: { id: w.id },
        data: { name: enData.name }
      });
      weaponUpdated++;
      if (weaponUpdated <= 5) console.log(`  ✓ ${w.name} → ${enData.name}`);
    } else {
      weaponMissed++;
      if (weaponMissed <= 5) console.log(`  ✗ No match for: ${w.name} (icon: ${iconFile})`);
    }
  }
  console.log(`Weapon table: ${weaponUpdated} updated, ${weaponMissed} skipped`);
  
  // --- Update CharacterWeapon table ---
  const charWeapons = await p.characterWeapon.findMany();
  console.log(`\nUpdating ${charWeapons.length} CharacterWeapon records...`);
  
  let cwUpdated = 0, cwMissed = 0;
  for (const w of charWeapons) {
    if (!w.iconUrl) { cwMissed++; continue; }
    const iconFile = w.iconUrl.split('/').pop()?.replace('.png', '');
    const enData = iconToEnglish[iconFile];
    if (enData) {
      await p.characterWeapon.update({
        where: { id: w.id },
        data: { name: enData.name }
      });
      cwUpdated++;
      if (cwUpdated <= 5) console.log(`  ✓ ${w.name} → ${enData.name}`);
    } else {
      cwMissed++;
      if (cwMissed <= 5) console.log(`  ✗ No match for: ${w.name} (icon: ${iconFile})`);
    }
  }
  console.log(`CharacterWeapon: ${cwUpdated} updated, ${cwMissed} skipped`);
  
  console.log('\n✅ Done! All weapon names converted to English.');
}

main()
  .catch(e => { console.error('Error:', e.message); process.exit(1); })
  .finally(() => p.$disconnect());
