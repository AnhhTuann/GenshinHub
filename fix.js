const fs = require('fs');
const file = 'backend/prisma/seeds/characters/escoffier.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\{\s*name:\s*"([^"]+)",\s*role:/g, (match, name) => {
    let charId = name.toLowerCase().replace(/ /g, '-');
    return `{\n        characterId: "${charId}",\n        name: "${name}",\n        role:`;
});

fs.writeFileSync(file, content);
console.log('Fixed');
