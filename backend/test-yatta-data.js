const axios = require('axios');

async function main() {
  const { data: wData } = await axios.get('https://gi.yatta.moe/api/v2/vi/weapon');
  const wItems = Object.values(wData?.data?.items || {});

  const attackCurves = new Set();
  const criticalCurves = new Set();

  for (const item of wItems) {
    if (item.id) {
      try {
        const { data: wDetail } = await axios.get(`https://gi.yatta.moe/api/v2/vi/weapon/${item.id}`);
        const props = wDetail.data.upgrade?.prop || [];
        for (const prop of props) {
          if (prop.propType === 'FIGHT_PROP_BASE_ATTACK') {
            attackCurves.add(prop.type);
          } else {
            criticalCurves.add(prop.type);
          }
        }
      } catch (e) {
        // ignore
      }
    }
  }

  console.log("Attack curves found:", Array.from(attackCurves));
  console.log("Substat curves found:", Array.from(criticalCurves));
}

main().catch(console.error);
