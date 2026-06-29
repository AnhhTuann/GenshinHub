const axios = require('axios');
async function run() {
  const { data: detailData } = await axios.get('https://gi.yatta.moe/api/v2/en/avatar/10000062');
  const avatar = detailData.data;
  console.log("Aloy promote keys:", Object.keys(avatar.upgrade.promote));
  console.log("Aloy promote[1] keys:", Object.keys(avatar.upgrade.promote[1]));
  console.log("Aloy promote[1].addProps:", avatar.upgrade.promote[1].addProps);
  console.log("Aloy upgrade.prop:", avatar.upgrade.prop);
}
run().catch(console.error);
