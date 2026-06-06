/**
 * Update weapon subStat, passiveName, passiveDesc sang tiếng Anh
 * Using specialProp + affix from yatta.moe detail endpoint
 */
const { PrismaClient } = require('@prisma/client');
const https = require('https');
const p = new PrismaClient();

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'GenshinHub/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

const PROP_MAP = {
  'FIGHT_PROP_ATTACK_PERCENT': 'ATK%',
  'FIGHT_PROP_HP_PERCENT': 'HP%',
  'FIGHT_PROP_DEFENSE_PERCENT': 'DEF%',
  'FIGHT_PROP_CRITICAL': 'CRIT Rate',
  'FIGHT_PROP_CRITICAL_HURT': 'CRIT DMG',
  'FIGHT_PROP_ELEMENT_MASTERY': 'Elemental Mastery',
  'FIGHT_PROP_CHARGE_EFFICIENCY': 'Energy Recharge',
  'FIGHT_PROP_PHYSICAL_ADD_HURT': 'Physical DMG Bonus',
  'FIGHT_PROP_HEAL_ADD': 'Healing Bonus',
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function stripColorTags(s) {
  if (!s) return s;
  return s.replace(/<color=[^>]*>/g, '').replace(/<\/color>/g, '');
}

async function main() {
  // Get list first to get all IDs
  console.log('Fetching weapon list from yatta.moe...');
  const listResp = await fetchJson('https://gi.yatta.moe/api/v2/en/weapon');
  const items = listResp.data?.items || {};
  
  // Build icon → apiId map
  const iconToApiId = {};
  for (const [apiId, w] of Object.entries(items)) {
    if (w.icon) iconToApiId[w.icon] = apiId;
  }
  
  const weapons = await p.weapon.findMany({ orderBy: { rarity: 'desc' } });
  console.log(`Processing ${weapons.length} weapons...`);
  
  let updated = 0, errors = 0;
  
  for (const w of weapons) {
    if (!w.iconUrl) continue;
    const iconFile = w.iconUrl.split('/').pop()?.replace('.png', '');
    const apiId = iconToApiId[iconFile];
    if (!apiId) { errors++; continue; }
    
    try {
      await sleep(50); // Rate limit
      const detail = await fetchJson(`https://gi.yatta.moe/api/v2/en/weapon/${apiId}`);
      const d = detail.data;
      if (!d) continue;
      
      // subStat from specialProp
      const subStat = d.specialProp ? (PROP_MAP[d.specialProp] || null) : null;
      
      // passive from affix (refinement 1 = index "0")
      let passiveName = null, passiveDesc = null;
      if (d.affix) {
        const affixValues = Object.values(d.affix);
        if (affixValues.length > 0) {
          const affix = affixValues[0];
          passiveName = affix.name || null;
          passiveDesc = stripColorTags(affix.upgrade?.['0'] || null);
        }
      }
      
      await p.weapon.update({
        where: { id: w.id },
        data: {
          ...(subStat !== null ? { subStat } : {}),
          ...(passiveName !== null ? { passiveName } : {}),
          ...(passiveDesc !== null ? { passiveDesc } : {}),
        }
      });
      updated++;
      if (updated <= 5 || updated % 50 === 0) {
        console.log(`  [${updated}] ${w.name}: subStat="${subStat}" passive="${passiveName}"`);
      }
    } catch (e) {
      errors++;
      console.error(`  ✗ Error for ${w.name}: ${e.message}`);
    }
  }
  
  console.log(`\n✅ Updated: ${updated}, Errors: ${errors}`);
}

main().catch(console.error).finally(() => p.$disconnect());
