const https = require('https');
const fs = require('fs');

https.get('https://gi.yatta.moe/api/v2/en/avatar', res => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    const d = JSON.parse(b).data.items;
    let items = [];
    for (const k in d) {
      const c = d[k];
      let elem = c.element === 'Ice' ? 'Cryo' : c.element === 'Wind' ? 'Anemo' : c.element === 'Rock' ? 'Geo' : c.element === 'Electric' ? 'Electro' : c.element === 'Water' ? 'Hydro' : c.element === 'Fire' ? 'Pyro' : c.element === 'Grass' ? 'Dendro' : 'None';
      let wep = c.weaponType === 'WEAPON_SWORD_ONE_HAND' ? 'Sword' : c.weaponType === 'WEAPON_CLAYMORE' ? 'Claymore' : c.weaponType === 'WEAPON_POLEARM' ? 'Polearm' : c.weaponType === 'WEAPON_BOW' ? 'Bow' : 'Catalyst';
      let reg = c.region ? c.region.charAt(0).toUpperCase() + c.region.slice(1).toLowerCase() : 'Other';
      
      if (c.name === 'Traveler') {
        ['Anemo','Geo','Electro','Dendro','Hydro','Pyro'].forEach(e => {
          items.push(`"${c.name} (${e})|${e}|Sword|5"`);
        });
      } else {
        items.push(`"${c.name}|${elem}|${wep}|${c.rank}"`);
      }
    }
    
    let out = `  const charactersData = [\n    ...[\n      ${items.join(',\n      ')}\n    ].map(c => ({ ...parseChar(c), region: "Other" }))\n  ];`;
    fs.writeFileSync('c:/Work/GenshinHub/scratch/new_chars.ts', out);
    console.log("Done");
  });
});
