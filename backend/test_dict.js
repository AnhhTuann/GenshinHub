const axios = require('axios');
async function test() {
  const { data: detailData } = await axios.get('https://gi.yatta.moe/api/v2/en/avatar/10000062');
  const avatar = detailData.data;
  console.log("items type:", typeof avatar.items);
  if (avatar.items) {
    console.log("items first key:", Object.keys(avatar.items)[0]);
    console.log("items first val:", avatar.items[Object.keys(avatar.items)[0]]);
  }
}
test().catch(console.error);
