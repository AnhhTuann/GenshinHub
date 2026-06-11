const http = require('http');

http.get('http://localhost:3000/en/characters/xinyan', (res) => {
  console.log(`Status: ${res.statusCode}`);
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    console.log(`Response length: ${data.length}`);
    if (res.statusCode !== 200) {
      console.log(data.substring(0, 500));
    }
  });
}).on('error', (err) => {
  console.error("Fetch page error:", err.message);
});
