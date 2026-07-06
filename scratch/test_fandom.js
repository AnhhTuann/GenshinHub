const https = require('https');

const url = 'https://genshin-impact.fandom.com/api.php?action=parse&page=Wish/History&format=json';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const json = JSON.parse(data);
        console.log("HTML length:", json.parse.text['*'].length);
        console.log("Starts with:", json.parse.text['*'].substring(0, 100));
    });
});
