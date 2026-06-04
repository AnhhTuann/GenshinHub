const https = require('https');

https.get('https://gi.yatta.moe/api/v2/vi/reliquary', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      const items = Object.values(parsed.data?.items || {});
      const item = items.find(i => i.name.includes("Diệm Liệt"));
      console.log("Diệm Liệt item:", item);
    } catch (e) {
      console.error("Parse error:", e);
    }
  });
}).on('error', console.error);
