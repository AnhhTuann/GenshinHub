const axios = require('axios');
async function test() {
  const { data: detailData } = await axios.get(`https://gi.yatta.moe/api/v2/en/avatar/10000062`); // 10000062 is Aloy
  const avatar = detailData?.data;
  const upgrade = avatar.upgrade;
  
  const talentMap = avatar.talent || {};
  const firstTalentId = Object.keys(talentMap)[0];
  if (firstTalentId) {
    const talent = talentMap[firstTalentId];
    console.log('First talent name:', talent.name);
    console.log('Talent promote keys:', Object.keys(talent.promote));
    console.log('Talent promote 2:', talent.promote['2']);
  }

  if (avatar.upgrade && avatar.upgrade.promote) {
    console.log('Ascension promote keys:', Object.keys(avatar.upgrade.promote));
    console.log('Ascension promote 1:', avatar.upgrade.promote['1']);
  }
}
test().catch(console.error);
