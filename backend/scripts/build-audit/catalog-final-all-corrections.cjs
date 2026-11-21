'use strict';

// Evidence-backed corrections applied to consolidated R4 successors.
// Each entry targets a demonstrable mistake in a frozen draft payload.
// `apply` receives a structuredClone of the frozen candidate payload.

const set = (candidate, index, ids) => { candidate.patch.artifacts[index].setIds = ids; };
const rationale = (candidate, index, lines) => { candidate.artifactRationale[index] = lines; };

module.exports = {
  chongyunArtifact: {
    ids: ['chongyun:1'], category: 'artifacts',
    reason: 'Reverse-Melt 2+2 used Crimson Witch, whose 2pc is Pyro DMG and whose reaction bonuses are 4pc-only.',
    evidence: 'genshin-db@5.2.15 set 15006 2pc = Pyro DMG +15%, 4pc = Melt bonuses; Chongyun is Cryo. KQM https://keqingmains.com/q/chongyun-quickguide/',
    apply(candidate) {
      set(candidate, 0, ['15007', '14001']);
      rationale(candidate, 0, ['Noblesse 2pc adds Burst DMG +20%', 'Blizzard Strayer 2pc adds Cryo DMG +15% to reverse-Melt hits; Crimson Witch four-piece reaction bonuses are inactive in this 2+2']);
    },
  },
  mualaniArtifact: {
    ids: ['mualani:1'], category: 'artifacts',
    reason: 'Wanderer’s Troupe 4pc boosts Charged Attack DMG, but Sharky’s Bites are Normal Attack DMG.',
    evidence: 'genshin-db@5.2.15 set 15003 4pc = Charged Attack DMG +35%; Mualani skill: Bites deal Normal Attack DMG. KQM https://keqingmains.com/q/mualani-quickguide/',
    apply(candidate) {
      set(candidate, 1, ['15016', '15017']);
      rationale(candidate, 1, ['Heart of Depth 2pc adds Hydro DMG to Sharky’s Bites', 'Tenacity 2pc adds HP +20% for HP-scaled bites; no Charged Attack bonus is claimed']);
    },
  },
  mavuikaArtifact: {
    ids: ['mavuika:1'], category: 'artifacts',
    reason: 'Fragment of Harmonic Whimsy 4pc requires Bond of Life changes, which Mavuika’s Fighting Spirit kit does not use.',
    evidence: 'genshin-db@5.2.15 set 15035 4pc = Bond of Life DMG stacks; Mavuika kit and candidate notes use Fighting Spirit instead.',
    apply(candidate) {
      set(candidate, 1, ['15001', '15006']);
      rationale(candidate, 1, ['Gladiator 2pc adds ATK +18%', 'Crimson Witch 2pc adds Pyro DMG +15%; the four-piece reaction bonus is inactive in this 2+2']);
    },
  },
  raidenName: {
    ids: ['raiden-shogun:1'], category: 'metadata',
    reason: 'Duplicate "C0 C0" in the build name.',
    evidence: 'proposed-builds.json raiden-shogun:1 patch.name.',
    apply(candidate) { candidate.patch.name = 'C0 Burst carry and battery'; },
  },
  raidenArtifactRationale: {
    ids: ['raiden-shogun:1'], category: 'artifacts',
    reason: '2+2 Noblesse/Gladiator rationale credited inactive four-piece effects.',
    evidence: 'genshin-db@5.2.15 sets 15007 and 15001: only the two-piece Burst DMG +20% and ATK +18% apply.',
    apply(candidate) { rationale(candidate, 1, ['Noblesse 2pc adds Burst DMG +20%', 'Gladiator 2pc adds ATK +18%; no four-piece team ATK or melee Normal Attack bonus is active']); },
  },
  shenheArtifactRationale: {
    ids: ['shenhe:1'], category: 'artifacts',
    reason: '2+2 Gladiator/Shimenawa rationale credited inactive four-piece Normal Attack effects.',
    evidence: 'genshin-db@5.2.15 sets 15001 and 15019: only ATK +18% twice applies.',
    apply(candidate) { rationale(candidate, 1, ['Gladiator 2pc adds ATK +18%', 'Shimenawa 2pc adds ATK +18%; four-piece Normal Attack bonuses are inactive']); },
  },
  thomaArtifactRationale: {
    ids: ['thoma:2'], category: 'artifacts',
    reason: '2+2 Tenacity/Vourukasha rationale credited inactive four-piece party ATK and Skill/Burst effects.',
    evidence: 'genshin-db@5.2.15 sets 15017 and 15030: only HP +20% twice applies.',
    apply(candidate) { rationale(candidate, 1, ['Tenacity 2pc adds HP +20%', 'Vourukasha 2pc adds HP +20%; four-piece party ATK and Skill/Burst bonuses are inactive']); },
  },
  wandererArtifact: {
    ids: ['wanderer:1'], category: 'artifacts',
    reason: '2+2 Deepwood/Viridescent rationale credited inactive four-piece Dendro shred and Swirl effects, and Dendro DMG does not help an Anemo carry.',
    evidence: 'genshin-db@5.2.15 sets 15025, 15002 and 15001: use ATK +18% and Anemo DMG +15% two-piece effects instead.',
    apply(candidate) {
      set(candidate, 1, ['15001', '15002']);
      rationale(candidate, 1, ['Gladiator 2pc adds ATK +18%', 'Viridescent Venerer 2pc adds Anemo DMG +15%; no four-piece Swirl resistance reduction is active']);
    },
  },
  xingqiuArtifactRationale: {
    ids: ['xingqiu:1'], category: 'artifacts',
    reason: '2+2 Noblesse/Heart of Depth rationale credited inactive four-piece effects.',
    evidence: 'genshin-db@5.2.15 sets 15007 and 15016: only Burst DMG +20% and Hydro DMG +15% apply.',
    apply(candidate) { rationale(candidate, 1, ['Noblesse 2pc adds Burst DMG +20%', 'Heart of Depth 2pc adds Hydro DMG +15%; four-piece team ATK and Normal Attack bonuses are inactive']); },
  },
  travelerGeoArtifactRationale: {
    ids: ['traveler-geo:1'], category: 'artifacts',
    reason: '2+2 Archaic Petra/Noblesse rationale credited inactive four-piece shard-pickup and team ATK effects.',
    evidence: 'genshin-db@5.2.15 sets 15014 and 15007: only Geo DMG +15% and Burst DMG +20% apply.',
    apply(candidate) { rationale(candidate, 0, ['Archaic Petra 2pc adds Geo DMG +15%', 'Noblesse 2pc adds Burst DMG +20%; the four-piece shard-pickup and team ATK bonuses are inactive in this 2+2']); },
  },
  yoimiyaArtifactRationale: {
    ids: ['yoimiya:1'], category: 'artifacts',
    reason: '2+2 Crimson Witch/Gladiator rationale credited inactive four-piece effects; Gladiator 4pc is melee-only and Yoimiya uses a bow.',
    evidence: 'genshin-db@5.2.15 sets 15006 and 15001: only Pyro DMG +15% and ATK +18% apply.',
    apply(candidate) { rationale(candidate, 1, ['Crimson Witch 2pc adds Pyro DMG +15%', 'Gladiator 2pc adds ATK +18%; four-piece Vaporize/Melt and Normal Attack bonuses are inactive']); },
  },
  yunJinArtifactRationale: {
    ids: ['yun-jin:1'], category: 'artifacts',
    reason: '2+2 Husk/Emblem rationale credited inactive four-piece Curiosity stacks and ER-scaled Burst bonus.',
    evidence: 'genshin-db@5.2.15 sets 15021 and 15020: only DEF +30% and ER +20% apply.',
    apply(candidate) { rationale(candidate, 1, ['Husk 2pc adds DEF +30%', 'Emblem 2pc adds ER +20%; four-piece Husk stacks and Emblem Burst scaling are inactive']); },
  },
  dilucArtifactRationale: {
    ids: ['diluc:1'], category: 'artifacts',
    reason: '2+2 Crimson Witch/Gladiator rationale credited an inactive four-piece reaction bonus.',
    evidence: 'genshin-db@5.2.15 sets 15006 and 15001: only Pyro DMG +15% and ATK +18% apply.',
    apply(candidate) { rationale(candidate, 1, ['Crimson Witch 2pc adds Pyro DMG +15%', 'Gladiator 2pc adds ATK +18%; four-piece Vaporize/Melt bonuses are inactive in this 2+2']); },
  },
  tenacityVourukashaRationale: {
    ids: ['diona:1', 'furina:1'], category: 'artifacts',
    reason: '2+2 Tenacity/Vourukasha rationale credited inactive four-piece party ATK and Skill/Burst effects.',
    evidence: 'genshin-db@5.2.15 sets 15017 and 15030: only HP +20% twice applies.',
    apply(candidate) { rationale(candidate, 1, ['Tenacity 2pc adds HP +20%', 'Vourukasha 2pc adds HP +20%; four-piece party ATK and Skill/Burst bonuses are inactive']); },
  },
  paleFlameBloodstainedRationale: {
    ids: ['eula:1', 'freminet:1'], category: 'artifacts',
    reason: '2+2 Pale Flame/Bloodstained rationale credited inactive Pale Flame four-piece Skill-hit stacks.',
    evidence: 'genshin-db@5.2.15 sets 15018 and 15008: only Physical DMG +25% twice applies.',
    apply(candidate) { rationale(candidate, 1, ['Pale Flame 2pc adds Physical DMG +25%', 'Bloodstained 2pc adds Physical DMG +25%; Pale Flame Skill-hit ATK stacks are inactive in this 2+2']); },
  },
  ayakaArtifactRationale: {
    ids: ['kamisato-ayaka:1'], category: 'artifacts',
    reason: '2+2 Blizzard/Gladiator rationale credited inactive four-piece CRIT against Cryo/Frozen targets.',
    evidence: 'genshin-db@5.2.15 sets 14001 and 15001: only Cryo DMG +15% and ATK +18% apply.',
    apply(candidate) { rationale(candidate, 1, ['Blizzard Strayer 2pc adds Cryo DMG +15%', 'Gladiator 2pc adds ATK +18%; four-piece CRIT against Cryo/Frozen targets is inactive in this 2+2']); },
  },
  keqingArtifactRationale: {
    ids: ['keqing:1'], category: 'artifacts',
    reason: '2+2 Thundering Fury/Gladiator rationale credited inactive four-piece reaction damage and Skill cooldown reduction.',
    evidence: 'genshin-db@5.2.15 sets 15005 and 15001: only Electro DMG +15% and ATK +18% apply.',
    apply(candidate) { rationale(candidate, 1, ['Thundering Fury 2pc adds Electro DMG +15%', 'Gladiator 2pc adds ATK +18%; four-piece reaction damage and cooldown reduction are inactive in this 2+2']); },
  },
  kaeyaArtifactRationale: {
    ids: ['kaeya:1'], category: 'artifacts',
    reason: '2+2 Noblesse/Blizzard rationale credited inactive four-piece team ATK and Frozen CRIT effects.',
    evidence: 'genshin-db@5.2.15 sets 15007 and 14001: only Burst DMG +20% and Cryo DMG +15% apply.',
    apply(candidate) { rationale(candidate, 1, ['Noblesse 2pc adds Burst DMG +20%', 'Blizzard Strayer 2pc adds Cryo DMG +15%; four-piece team ATK and Frozen CRIT bonuses are inactive in this 2+2']); },
  },
  kleeArtifactRationale: {
    ids: ['klee:1'], category: 'artifacts',
    reason: 'Frozen R2 2+2 Crimson Witch/Gladiator option credits an inactive four-piece reaction bonus.',
    evidence: 'genshin-db@5.2.15 sets 15006 and 15001: only Pyro DMG +15% and ATK +18% apply.',
    apply(candidate) { rationale(candidate, 0, ['Crimson Witch 2pc adds Pyro DMG +15%', 'Gladiator 2pc adds ATK +18%; four-piece Vaporize/Melt bonuses are inactive in this 2+2']); },
  },
  duplicateConstellationNames: {
    ids: ['faruzan:1', 'kujou-sara:1'], category: 'metadata',
    reason: 'Duplicate "C0 C0" in the build name.',
    evidence: 'proposed-builds.json patch.name for the affected candidates.',
    apply(candidate) { candidate.patch.name = candidate.patch.name.replace('C0 C0 ', 'C0 '); },
  },
  ittoArtifactRationale: {
    ids: ['arataki-itto:1'], category: 'artifacts',
    reason: '2+2 Husk/Archaic Petra rationale credited inactive four-piece Husk stacks and Archaic Petra shard pickup.',
    evidence: 'genshin-db@5.2.15 sets 15021 and 15014: only DEF +30% and Geo DMG +15% apply.',
    apply(candidate) { rationale(candidate, 1, ['Husk 2pc adds DEF +30%', 'Archaic Petra 2pc adds Geo DMG +15%; four-piece Husk stacks and shard pickup are inactive in this 2+2']); },
  },
  momokaArtifactRationale: {
    ids: ['momoka:1'], category: 'artifacts',
    reason: '2+2 Tenacity/Vourukasha rationale credited inactive four-piece party ATK and Skill/Burst effects.',
    evidence: 'genshin-db@5.2.15 sets 15017 and 15030: only HP +20% twice applies.',
    apply(candidate) { rationale(candidate, 0, ['Tenacity 2pc adds HP +20%', 'Vourukasha 2pc adds HP +20%; four-piece party ATK and Skill/Burst bonuses are inactive in this 2+2']); },
  },
  naviaArtifactRationale: {
    ids: ['navia:1'], category: 'artifacts',
    reason: '2+2 Gladiator/Archaic Petra rationale credited inactive four-piece Normal Attack and shard-pickup effects.',
    evidence: 'genshin-db@5.2.15 sets 15001 and 15014: only ATK +18% and Geo DMG +15% apply.',
    apply(candidate) { rationale(candidate, 1, ['Gladiator 2pc adds ATK +18%', 'Archaic Petra 2pc adds Geo DMG +15%; four-piece shard-pickup and Normal Attack bonuses are inactive in this 2+2']); },
  },
  ningguangArtifactRationale: {
    ids: ['ningguang:1'], category: 'artifacts',
    reason: 'Both Archaic Petra 2+2 options credited the inactive four-piece shard-pickup bonus; the Gladiator/Noblesse lines also credited inactive four-piece effects.',
    evidence: 'genshin-db@5.2.15 sets 15014, 15001 and 15007: only Geo DMG +15%, ATK +18% and Burst DMG +20% apply.',
    apply(candidate) {
      rationale(candidate, 0, ['Archaic Petra 2pc adds Geo DMG +15%', 'Gladiator 2pc adds ATK +18%; four-piece shard-pickup and melee Normal Attack bonuses are inactive in this 2+2']);
      rationale(candidate, 1, ['Archaic Petra 2pc adds Geo DMG +15%', 'Noblesse 2pc adds Burst DMG +20%; four-piece shard-pickup and team ATK bonuses are inactive in this 2+2']);
    },
  },
};
