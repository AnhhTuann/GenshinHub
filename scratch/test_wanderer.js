const fs = require('fs');
let c = fs.readFileSync('backend/prisma/seeds/characters.ts', 'utf8');

const s = c.indexOf('const charactersData = [');
const e = c.indexOf('function parseChar');

const newC = c.substring(0, s) + `const charactersData = ["Wanderer|Anemo|Catalyst|5", "Alhaitham|Dendro|Sword|5"].map(c => ({ ...parseChar(c), region: "Other" }));\n` + c.substring(e);

fs.writeFileSync('backend/prisma/seeds/characters.ts', newC);
