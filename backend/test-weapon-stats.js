const axios = require('axios');

async function main() {
  const { data: wData } = await axios.get('https://gi.yatta.moe/api/v2/vi/weapon');
  const wItems = Object.values(wData?.data?.items || {});

  const rarities = [3, 4, 5];
  for (const rarity of rarities) {
    const item = wItems.find(w => w.rank === rarity);
    if (item) {
      console.log(`\n--- Weapon ${item.name} (${rarity}*) ---`);
      const { data: wDetail } = await axios.get(`https://gi.yatta.moe/api/v2/vi/weapon/${item.id}`);
      const detail = wDetail.data;
      console.log("Upgrade props:", detail.upgrade?.prop);
      console.log("Last Promote:", detail.upgrade?.promote?.[detail.upgrade.promote.length - 1]);
    }
  }
}

main().catch(console.error);
