const https = require('https');
const fs = require('fs');

https.get('https://genshin-impact.fandom.com/api.php?action=parse&page=Wish/History&format=json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            fs.writeFileSync('c:/Work/GenshinHub/scratch/wiki.json', JSON.stringify(parsed.parse.text['*']).slice(0, 5000));
            console.log('Success');
        } catch (e) {
            console.log('Parse error', e);
        }
    });
}).on('error', err => {
    console.log('Request error', err);
});
