const axios = require('axios');

async function main() {
  const { data } = await axios.get('https://gi.yatta.moe/api/v2/vi/reliquary');
  const items = Object.values(data?.data?.items || {});
  
  console.log("All reliquary items:");
  for (const item of items) {
    console.log(`${item.id}: ${item.name} (${item.route})`);
  }
}

main().catch(console.error);
