const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const https = require('https');

const html = fs.readFileSync(path.join(__dirname, 'wish_history.html'), 'utf8');
const $ = cheerio.load(html);

const banners = [];
let currentVersion = null;

const elements = $('h2, h3, h4, table.article-table');

const imageTasks = [];

function getOriginalImageUrl(url) {
    if (!url) return null;
    // Fandom URLs look like:
    // https://static.wikia.nocookie.net/gensin-impact/images/5/53/Ballad_in_Goblets_2020-09-28.png/revision/latest/scale-to-width-down/200?cb=20220324230920
    // We want to extract everything before /revision/
    const match = url.match(/^(https:\/\/static\.wikia\.nocookie\.net\/[^\/]+\/images\/[^\/]+\/[^\/]+\/[^\/]+)/);
    if (match) return match[1];
    return url;
}

function cleanFilename(name) {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.png';
}

elements.each((i, el) => {
    if (el.tagName.toLowerCase().match(/^h[234]$/)) {
        const headline = $(el).find('.mw-headline');
        if (headline.length && headline.text().startsWith('Version')) {
            const text = headline.text().trim();
            currentVersion = text.replace('Version ', '');
        }
    } else if (el.tagName.toLowerCase() === 'table' && currentVersion) {
        if ($(el).text().includes('1.01.1')) return;

        const versionBlock = {
            version: currentVersion,
            versionNameEn: '',
            versionNameVi: '',
            phases: []
        };

        const firstTh = $(el).find('tr th').first();
        if (firstTh.length) {
            const htmlTh = firstTh.html();
            if (htmlTh && htmlTh.includes('<br>')) {
                const parts = htmlTh.split('<br>');
                versionBlock.versionNameEn = $('<div>').html(parts[1]).text().trim();
            }
        }

        const phaseMap = new Map();

        $(el).find('tr').each((j, row) => {
            if (j === 0) return;

            const cols = $(row).find('td');
            if (cols.length < 3) return;

            const title = cols.eq(0).text().trim().replace(/\s+/g, ' ');
            if (title.includes('Beginners\' Wish') || title.includes('Wanderlust Invocation') || title.includes('Chronicled Wish')) {
                return;
            }

            const isWeapon = title.includes('Epitome Invocation');
            
            // Get Banner Image
            const imgEl = cols.eq(0).find('img');
            let imgUrl = imgEl.attr('data-src') || imgEl.attr('src');
            imgUrl = getOriginalImageUrl(imgUrl);
            let localImgPath = null;

            if (imgUrl) {
                const filename = cleanFilename(title + '_' + currentVersion);
                localImgPath = `/images/banners/${filename}`;
                imageTasks.push({ url: imgUrl, filename });
            }

            const items = [];
            cols.eq(1).find('.card-container').each((_, card) => {
                let name = $(card).find('.card-caption a').attr('title') || $(card).find('.card-caption a').text();
                if (!name) name = $(card).find('.card-caption').text();
                name = name.replace(/\u00AD/g, '').trim();

                const imgContainer = $(card).find('.card-image-container');
                let rarity = 4;
                if (imgContainer.hasClass('card-quality-5')) rarity = 5;

                if (name && name !== 'None') {
                    if (name === 'Tartaglia') name = 'Childe';
                    items.push({ nameEn: name, rarity });
                }
            });

            let duration = cols.eq(2).text().trim();
            const dates = duration.split('—').map(d => d.trim());
            let startDate = dates[0] || '';
            let endDate = dates[1] || '';
            startDate = startDate.replace(/\[\d+\]/g, '').trim();
            endDate = endDate.replace(/\[\d+\]/g, '').trim();

            try {
                if (startDate) startDate = new Date(startDate).toISOString().split('T')[0];
                if (endDate) endDate = new Date(endDate).toISOString().split('T')[0];
            } catch(e) {}

            const phaseKey = `${startDate}_${endDate}`;
            if (!phaseMap.has(phaseKey)) {
                phaseMap.set(phaseKey, {
                    startDate,
                    endDate,
                    characters: [],
                    weapons: [],
                    characterBanners: [],
                    weaponBanners: []
                });
            }

            const phaseObj = phaseMap.get(phaseKey);
            if (isWeapon) {
                phaseObj.weapons.push(...items);
                if (localImgPath) phaseObj.weaponBanners.push(localImgPath);
            } else {
                phaseObj.characters.push(...items);
                if (localImgPath) phaseObj.characterBanners.push(localImgPath);
            }
        });

        let phaseIndex = 1;
        for (const [key, phaseObj] of phaseMap.entries()) {
            if (phaseObj.characters.length > 0 || phaseObj.weapons.length > 0) {
                versionBlock.phases.push({
                    phase: phaseIndex++,
                    startDate: phaseObj.startDate,
                    endDate: phaseObj.endDate,
                    characterBanners: phaseObj.characterBanners,
                    weaponBanners: phaseObj.weaponBanners,
                    characters: phaseObj.characters,
                    weapons: phaseObj.weapons
                });
            }
        }

        if (versionBlock.phases.length > 0) {
            banners.push(versionBlock);
        }
        currentVersion = null;
    }
});

// Create dir
const dir = path.join(__dirname, '../frontend/public/images/banners');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function downloadImages() {
    console.log(`Starting download of ${imageTasks.length} banner images...`);
    let count = 0;
    
    // Download concurrently with limit
    const limit = 5;
    for (let i = 0; i < imageTasks.length; i += limit) {
        const chunk = imageTasks.slice(i, i + limit);
        await Promise.all(chunk.map(task => new Promise((resolve) => {
            const dest = path.join(dir, task.filename);
            if (fs.existsSync(dest)) {
                count++;
                resolve();
                return;
            }
            
            https.get(task.url, (res) => {
                if (res.statusCode === 200) {
                    const file = fs.createWriteStream(dest);
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        count++;
                        if (count % 10 === 0) console.log(`Downloaded ${count}/${imageTasks.length}...`);
                        resolve();
                    });
                } else {
                    console.error(`Failed to download ${task.url}: ${res.statusCode}`);
                    resolve();
                }
            }).on('error', (err) => {
                console.error(`Error downloading ${task.url}:`, err.message);
                resolve();
            });
        })));
    }
    
    console.log('All images downloaded or already exist!');
    writeTsFile();
}

function writeTsFile() {
    let tsContent = `export type BannerItem = {
  nameEn: string;
  nameVi?: string;
  rarity: 4 | 5;
};

export type BannerPhase = {
  phase: number;
  startDate: string;
  endDate: string;
  characterBanners: string[];
  weaponBanners: string[];
  characters: BannerItem[];
  weapons: BannerItem[];
};

export type BannerVersion = {
  version: string;
  versionNameEn: string;
  versionNameVi: string;
  phases: BannerPhase[];
};

export const BANNERS_HISTORY: BannerVersion[] = ${JSON.stringify(banners, null, 2)};
`;

    // Fix quotes
    tsContent = tsContent.replace(/"nameEn":/g, 'nameEn:').replace(/"rarity":/g, 'rarity:').replace(/"phase":/g, 'phase:').replace(/"startDate":/g, 'startDate:').replace(/"endDate":/g, 'endDate:').replace(/"characters":/g, 'characters:').replace(/"weapons":/g, 'weapons:').replace(/"version":/g, 'version:').replace(/"versionNameEn":/g, 'versionNameEn:').replace(/"versionNameVi":/g, 'versionNameVi:').replace(/"phases":/g, 'phases:').replace(/"characterBanners":/g, 'characterBanners:').replace(/"weaponBanners":/g, 'weaponBanners:');
    
    fs.writeFileSync(path.join(__dirname, '../frontend/data/banners.ts'), tsContent, 'utf8');
    console.log('Saved to frontend/data/banners.ts');
}

downloadImages();
