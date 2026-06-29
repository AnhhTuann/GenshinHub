const axios = require('axios');
async function run() {
  const { data: detailData } = await axios.get('https://gi.yatta.moe/api/v2/en/avatar/10000062');
  const avatar = detailData.data;
  console.log("Avatar top level keys:", Object.keys(avatar));
  console.log("Avatar curves?", avatar.curve);
}
run().catch(console.error);
