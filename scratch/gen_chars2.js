const fs = require('fs');

const d = JSON.parse(fs.readFileSync('c:/Work/GenshinHub/scratch/ambr_data.json', 'utf8') || "{}");
let items = [];
let hasTraveler = false;

for (const k in d) {
  const c = d[k];
  let elem = c.element === 'Ice' ? 'Cryo' : c.element === 'Wind' ? 'Anemo' : c.element === 'Rock' ? 'Geo' : c.element === 'Electric' ? 'Electro' : c.element === 'Water' ? 'Hydro' : c.element === 'Fire' ? 'Pyro' : c.element === 'Grass' ? 'Dendro' : 'None';
  let wep = c.weaponType === 'WEAPON_SWORD_ONE_HAND' ? 'Sword' : c.weaponType === 'WEAPON_CLAYMORE' ? 'Claymore' : c.weaponType === 'WEAPON_POLEARM' ? 'Polearm' : c.weaponType === 'WEAPON_BOW' ? 'Bow' : 'Catalyst';
  let reg = c.region ? c.region.charAt(0).toUpperCase() + c.region.slice(1).toLowerCase() : 'Other';
  
  if (c.name === 'Traveler') {
    if (!hasTraveler) {
      hasTraveler = true;
      ['Anemo','Geo','Electro','Dendro','Hydro','Pyro'].forEach(e => {
        items.push(`"${c.name} (${e})|${e}|Sword|5"`);
      });
    }
  } else {
    // avoid duplicates
    if (!items.find(i => i.startsWith(`"${c.name}|`))) {
      items.push(`"${c.name}|${elem}|${wep}|${c.rank}"`);
    }
  }
}

let out = `  const charactersData = [\n    ...[\n      ${items.join(',\n      ')}\n    ].map(c => ({ ...parseChar(c), region: "Other" }))\n  ];`;
fs.writeFileSync('c:/Work/GenshinHub/scratch/new_chars2.ts', out);
console.log("Done");
