const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('C:\\Users\\atuan\\.gemini\\antigravity-ide\\brain\\8f006563-26ba-4261-ac17-36b24f9ebcf2\\.system_generated\\steps\\190\\content.md', 'utf8');
const $ = cheerio.load(html);

const tables = $('table.article-table');
const table = tables.eq(1); // Version 1.0

table.find('tr').each((i, row) => {
    if (i === 0) return; // header
    const cols = $(row).find('td');
    if (cols.length >= 3) {
        const title = cols.eq(0).text().trim().replace(/\s+/g, ' ');
        
        const featured = [];
        cols.eq(1).find('.card-caption a').each((_, a) => {
            let name = $(a).attr('title') || $(a).text();
            // remove shy hyphens
            name = name.replace(/\u00AD/g, '');
            featured.push(name);
        });

        const duration = cols.eq(2).text().trim();
        console.log(`Row ${i}: ${title} | ${featured.join(', ')} | ${duration}`);
    }
});
