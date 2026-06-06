const fs = require('fs');
let c = fs.readFileSync('backend/prisma/seeds/characters.ts', 'utf8');

c = c.replace(/else if \(lookupName === "traveler"\) lookupName = "traveler \(anemo\)"; \/\/.*$/m, 'if (lookupName.startsWith("traveler")) lookupName = "traveler";');

fs.writeFileSync('backend/prisma/seeds/characters.ts', c);
console.log("Updated traveler logic");
