const https = require('https');
const fs = require('fs');

const url = 'https://genshin-impact.fandom.com/api.php?action=parse&page=Wish/History&prop=wikitext&format=json';

https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            const wikitext = json.parse.wikitext['*'];
            fs.writeFileSync('c:/Work/GenshinHub/scratch/wish_history.txt', wikitext);
            console.log('Successfully saved wikitext length:', wikitext.length);
        } catch(e) {
            console.error('Error parsing JSON:', e.message);
        }
    });
}).on('error', e => console.error(e));
