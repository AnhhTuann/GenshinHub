const fs = require('fs');
let c = fs.readFileSync('backend/prisma/seeds/characters.ts', 'utf8');

// Update metaBuilds characterIds
c = c.replace(/characterId:\s*"kazuha"/g, 'characterId: "kaedehara-kazuha"');
c = c.replace(/characterId:\s*"ayaka"/g, 'characterId: "kamisato-ayaka"');
c = c.replace(/characterId:\s*"ayato"/g, 'characterId: "kamisato-ayato"');
c = c.replace(/characterId:\s*"kokomi"/g, 'characterId: "sangonomiya-kokomi"');
c = c.replace(/characterId:\s*"itto"/g, 'characterId: "arataki-itto"');
c = c.replace(/characterId:\s*"shinobu"/g, 'characterId: "kuki-shinobu"');

// Update toAvatar and toSplash
c = c.replace(
  /const toAvatar = \(name: string\) => `\/images\/avatars\/UI_AvatarIcon_\$\{name.replace\(\/\[\^a-zA-Z\]\/g, ''\)\}.png`;/g,
  'const toAvatar = (name: string) => `/images/avatars/${toId(name)}.png`;'
);
c = c.replace(
  /const toSplash = \(name: string\) => `\/images\/splash\/UI_Gacha_AvatarImg_\$\{name.replace\(\/\[\^a-zA-Z\]\/g, ''\)\}.png`;/g,
  'const toSplash = (name: string) => `/images/splash/${toId(name)}.png`;'
);

// Update avatarUrl and splashArtUrl in parseChar to NOT use avatarKey
c = c.replace(/avatarUrl: toAvatar\(avatarKey\)/g, 'avatarUrl: toAvatar(name)');
c = c.replace(/splashArtUrl: toSplash\(avatarKey\)/g, 'splashArtUrl: toSplash(name)');

fs.writeFileSync('backend/prisma/seeds/characters.ts', c);
console.log("Updated characters.ts");
