'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { isDeepStrictEqual } = require('node:util');
const game = require('genshin-db');

const revision = 'character-build-catalog-7.2-r1';
const output = path.resolve(__dirname, '../../../docs/character-builds');
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const key = value => String(value ?? '').normalize('NFC').toLowerCase().replaceAll('’', "'").replaceAll('"', '').trim();
const weaponTypes = { 'kiếm đơn': 'sword', 'trọng kiếm': 'claymore', 'vũ khí cán dài': 'polearm', cung: 'bow', 'pháp khí': 'catalyst' };
const weaponType = value => weaponTypes[key(value)] ?? key(value);
const identityAliases = { traveler: 'Aether', 'traveler-boy': 'Manekin', 'traveler-girl': 'Manekina' };
const alternateEvidence = {
  xiangling: 'https://keqingmains.com/xiangling/', 'raiden-shogun': 'https://keqingmains.com/q/raiden-quickguide/',
  varesa: 'https://keqingmains.com/q/varesa-quickguide/', fischl: 'https://keqingmains.com/q/fischl-quickguide/',
  baizhu: 'https://keqingmains.com/q/baizhu-quickguide/', 'sangonomiya-kokomi': 'https://keqingmains.com/q/kokomi-quickguide/',
};
const unresolved = new Set(['linnea', 'lohen', 'nicole', 'prune', 'sandrone', 'varka']);
const scopeBlocked = new Map([
  ['traveler', 'Generic Traveler identity does not specify an element or combat kit. Review an element-specific profile.'],
  ['traveler-boy', 'Manekin has no conventional character talent record in this package. Avoid assuming Traveler talents or a combat role.'],
  ['traveler-girl', 'Manekina has no conventional character talent record in this package. Avoid assuming Traveler talents or a combat role.'],
]);
const statMap = {
  ATK: ['ATK%'], DEF: ['DEF%'], HP: ['HP%'], EM: ['Elemental Mastery'], ER: ['Energy Recharge'],
  Crit: ['CRIT Rate', 'CRIT DMG'], CritRate: ['CRIT Rate'], CritDMG: ['CRIT DMG'], Heal: ['Healing Bonus'],
  Phys: ['Physical DMG Bonus'],
};
const stat = token => statMap[token] ?? [token + ' DMG Bonus'];
const talentsMap = { N: 'Normal Attack', S: 'Skill', B: 'Burst' };
const artifactReasons = {
  10007: 'Team EM after the holder triggers a reaction on field', 10009: 'Team energy after Burst at the cost of four-star stat ceilings',
  14001: 'Cryo damage and conditional CRIT against Cryo-affected or Frozen targets', 14003: 'Extra damage while Pyro aura persists',
  14004: 'Healing-focused set bonuses', 15001: 'ATK and, on eligible melee weapons, Normal Attack damage',
  15002: 'Anemo damage and Swirl utility, with matching resistance reduction triggered on field',
  15003: 'EM and eligible catalyst or bow Charged Attack damage', 15005: 'Electro and reaction damage plus eligible reaction-triggered Skill cooldown reduction',
  15006: 'Pyro damage and reaction bonuses', 15007: 'Burst damage and a non-stacking team ATK bonus after Burst',
  15008: 'Physical damage at two pieces', 15014: 'Geo DMG at two pieces, with element-matched shard pickup required for the four-piece bonus',
  15016: 'Hydro damage and a timed Normal/Charged Attack bonus after Skill', 15017: 'HP and a party bonus while Skill hits can sustain it',
  15018: 'Physical damage with timed Skill-hit stacks', 15019: 'ATK at two pieces or normals and charged damage in exchange for Energy at four pieces',
  15020: 'ER at two pieces and ER-based Burst damage at four pieces', 15021: 'DEF and conditional Geo bonus while stacking the four-piece effect',
  15022: 'Healing and additional damage from accumulated healing', 15023: 'Burst and HP-loss-driven ATK for a fixed field window',
  15025: 'Dendro damage and team Dendro resistance reduction from Skill or Burst hits',
  15026: 'EM at two pieces and team-element-dependent reaction stats at four pieces',
  15027: 'Anemo bonus and Normal/Charged/Plunge damage after a charged hit', 15028: 'EM and Bloom-family bonuses for the actual trigger',
  15029: 'Hydro damage and attack-type-dependent stacks', 15030: 'HP at two pieces and Skill/Burst bonuses that grow when the holder takes damage at four pieces',
  15031: 'Normal/Charged damage and CRIT Rate from HP change', 15032: 'Skill damage with a larger off-field effect',
  15033: 'Healing Bonus and a time-limited damage contribution from recorded healing',
  15034: 'ATK and Geo damage linked to Skill and Crystallize',
  15035: 'ATK and damage while Bond of Life changes', 15036: 'ATK and sustained damage bonus in a Burning rotation',
  15037: 'Party element bonuses from a reaction the wearer triggers, with the full effect tied to Nightsoul',
  15038: 'On-field Nightsoul usage enables damage and CRIT bonuses',
  15039: 'Plunge damage and stacking benefits that require plunge hits',
  15040: 'Cryo damage and zero-Energy bonuses with mutually affected Normal/Burst windows',
  15041: 'EM and Crit from on-field Lunar reactions, subject to Moonsign',
  15042: 'ER and an off-field-capable Lunar team EM buff subject to Moonsign and overlap rules',
  15044: 'ATK with a short on-hit buff. Extra Crit requires the Witch-specific unlock',
  15046: 'ATK and Stellar-Conduct damage with conditional Crit against affected targets',
  15047: 'ATK and Stellar Swirl damage with Crit after the wearer triggers Stellar Swirl',
  15048: 'ATK and non-stacking party Stellar Glimmer damage. The wearer must trigger or deal Stellar Glimmer damage',
};
function burstEnergy(talent) {
  const attributes = talent?.combat3?.attributes;
  const label = attributes?.labels.find(item => item.startsWith('Energy Cost|'));
  const param = label?.match(/\{(param\d+):/)?.[1];
  return param ? attributes.parameters[param]?.[0] ?? null : null;
}
function unique(items) { return [...new Set(items)]; }
function mechanics(owner) {
  const identity = game.characters(identityAliases[owner.id] ?? owner.nameEn);
  const talent = game.talents(owner.nameEn);
  const elementForm = owner.id.startsWith('traveler-') && talent?.name === owner.nameEn;
  assert.ok(identity || elementForm, 'Missing game identity: ' + owner.id);
  if (identity && !elementForm) {
    assert.equal(key(identity.elementText), key(owner.element), owner.id + ' element');
    assert.equal(weaponType(identity.weaponText), weaponType(owner.weapon), owner.id + ' weapon type');
  }
  return { package: 'genshin-db@' + require('genshin-db/package.json').version,
    id: identity?.id ?? talent?.id, characterVersion: identity?.version ?? talent?.version,
    talentVersion: talent?.version ?? null, burstEnergy: burstEnergy(talent),
    talents: Object.fromEntries(['combat1','combat2','combat3'].map((k, i) => [Object.values(talentsMap)[i], talent?.[k]?.name ?? null])),
    constellations: Object.keys(game.constellations(owner.nameEn) ?? {}).filter(k => /^c[1-6]$/.test(k)),
  };
}
const equip = list => list.map(key);
function artifactOptions(build, sets) {
  return build.bestArtifacts.map(row => {
    const names = row.setNameEn.replace(/^Mix 2-Piece /, '').split(' & ').map(name => name.replace(/^2-Piece /, ''));
    const ids = names.map(name => sets.get(key(name))?.id ?? null);
    const valid = ids.every(Boolean) && new Set(ids).size === ids.length &&
      ((ids.length === 1 && [2,4].includes(row.pieces)) || (ids.length === 2 && row.pieces === 2));
    return { label: row.setNameEn, pieces: row.pieces, ids, valid };
  });
}
function profile(build, owner, weapons, weaponNames, sets, characters) {
  const artifacts = artifactOptions(build,sets);
  const weaponRows = build.bestWeapons.map(row => {
    const match = weapons.get(row.weaponId) ?? weaponNames.get(key(row.nameEn)) ?? weaponNames.get(key(row.nameVi));
    return { id: row.weaponId, catalogId: match?.id ?? null, refinement: row.refinement,
      constellation: row.constellation, isF2P: row.isF2P,
      valid: Boolean(match) && weaponType(match.type) === weaponType(owner.weapon) };
  });
  const teams = build.teams.map(team => {
    const members = team.members.map(member => member.characterId);
    return { id: team.id, label: team.name, reviewStatus: team.reviewStatus, members,
      valid: members.length === 4 && new Set(members).size === 4 && members.includes(owner.id) && members.every(id => characters.has(id)) };
  });
  const fields = Object.fromEntries(['sands','goblet','circlet','subStatsPriority','talentPriority'].map(field => [field,build[field]]));
  const repeatedTemplate = isDeepStrictEqual(Object.values(fields), [
    ['ATK%'], ['Elemental DMG Bonus'], ['CRIT Rate'], ['CRIT Rate','CRIT DMG','ATK%'], ['Normal Attack','Elemental Skill','Elemental Burst'],
  ]);
  const gaps = [
    ...Object.entries({ ...fields, weapons: weaponRows, artifacts, teams }).filter(([,v]) => !v.length).map(([field]) => 'MISSING_' + field),
    ...(repeatedTemplate ? ['GENERIC_STAT_AND_TALENT_TEMPLATE'] : []),
    ...(weaponRows.some(w => !w.valid) ? ['WEAPON_REFERENCE_OR_TYPE'] : []),
    ...(weaponRows.some(w => w.valid && w.id !== w.catalogId) ? ['LEGACY_WEAPON_ALIAS'] : []),
    ...(artifacts.some(a => !a.valid) ? ['UNRESOLVED_ARTIFACT_LABEL_OR_PIECES'] : []),
    ...(teams.some(t => !t.valid) ? ['TEAM_MEMBER_INTEGRITY'] : []),
  ];
  return {
    id: build.id, name: build.name, version: build.version, status: build.reviewStatus,
    approvalChecksum: build.approvalChecksum, default: build.isDefault, playstyles: build.playstyles,
    assumptions: build.constellationAssumptions, updatedAt: build.updatedAt, source: build.source,
    audit: build.audits, ...fields, weapons: weaponRows, artifacts, teams, issues: gaps,
    snapshotChecksum: digest(build),
  };
}
function comparison(reference, patch, weapons, artifacts, characters) {
  if (reference?.status !== 'AVAILABLE') return null;
  const sourceWeapons = new Set(reference.weapons.filter(value => typeof value === 'string').map(key));
  const sourceArtifacts = new Set(reference.artifacts.filter(Array.isArray).map(option => JSON.stringify(equip(option).sort())));
  const sourceTeams = new Set(reference.teams.filter(Array.isArray).map(option => JSON.stringify(equip(option).sort())));
  const stats = {};
  for (const [ours, theirs] of [['sands','sands'],['goblet','goblet'],['circlet','circlet'],['subStatsPriority','substats'],['talentPriority','talents']]) {
    const source = reference.statistics[theirs];
    stats[ours] = patch[ours] && Array.isArray(source) && source.length
      ? { compared: patch[ours].length, overlap: equip(patch[ours]).filter(value => equip(source).includes(value)).length,
        firstChoiceAgrees: key(patch[ours][0]) === key(source[0]) } : null;
  }
  return {
    weapons: { compared: patch.weapons.length, overlap: patch.weapons.filter(w => sourceWeapons.has(key(weapons.get(w.weaponId).nameEn))).length,
      firstChoiceAgrees: sourceWeapons.size ? (key(weapons.get(patch.weapons[0]?.weaponId)?.nameEn) === key(reference.weapons[0])) : null },
    artifacts: { compared: patch.artifacts.length, overlap: patch.artifacts.filter(a => sourceArtifacts.has(JSON.stringify(a.setIds.map(id => key(artifacts.get(id).nameEn)).sort()))).length },
    teams: patch.teams ? { compared: patch.teams.length, overlap: patch.teams.filter(team => sourceTeams.has(JSON.stringify(team.members.map(member => key(characters.get(member.characterId).nameEn)).sort()))).length } : null,
    stats,
  };
}
function generate(catalog, references, evidenceText) {
  assert.equal(catalog.identity.mode, 'on');
  const characters = new Map(catalog.characters.map(row => [row.id,row]));
  const weapons = new Map(catalog.weapons.map(row => [row.id,row]));
  const artifacts = new Map(catalog.artifacts.map(row => [row.id,row]));
  const weaponNames = new Map(catalog.weapons.flatMap(row => [row.nameEn,row.nameVi].map(name => [key(name),row])));
  const artifactNames = new Map(catalog.artifacts.flatMap(row => [row.nameEn,row.nameVi].map(name => [key(name),row])));
  const coverage = catalog.characters.map(character => ({
    id: character.id, name: character.nameEn, weapon: character.weapon, element: character.element,
    mechanics: mechanics(character), legacyUnscoped: {
      weapons: character.bestWeapons.filter(w => !w.buildId).length,
      artifacts: character.bestArtifacts.filter(a => !a.buildId).length,
      teams: character.teams.filter(t => !t.buildId).length,
    },
    builds: character.builds.map(b => profile(b,character,weapons,weaponNames,artifactNames,characters)),
    source: Object.fromEntries(Object.entries(references[character.id] ?? {status:'NOT_CHECKED'})
      .filter(([field]) => ['status','url','checkedAt','version','indexed'].includes(field))),
  }));
  const byId = new Map(coverage.map(row => [row.id,row]));
  const proposals = []; const seen = new Set();
  for (const [index,line] of evidenceText.split('\n').entries()) {
    if (!line || line.startsWith('#')) continue;
    const [id,name,roles,weaponNamesRaw,artifactIds,slots,substats,priorities,teammates,reason,...extra] = line.split('|');
    assert.equal(extra.length,0, 'Unexpected delimiter at ' + (index + 1));
    assert.ok(reason && name && !seen.has(id+'|'+name), 'Invalid or duplicate dossier at ' + (index + 1));
    seen.add(id+'|'+name);
    const owner = byId.get(id);
    assert.ok(owner && !scopeBlocked.has(id) && id !== 'mitya', 'Protected or unknown owner ' + id);
    assert.ok(owner.mechanics.talentVersion, 'No combat mechanics ' + id);
    const weaponList = weaponNamesRaw.split(';').map(entry => {
      const [name, ref = '1'] = entry.replace(/^!/, '').split('~');
      const local = weaponNames.get(key(name));
      assert.ok(local && weaponType(local.type) === weaponType(owner.weapon), id + ' incompatible weapon ' + name);
      const mechanical = game.weapons(local.nameEn);
      assert.equal(String(mechanical?.id), local.id, id + ' weapon ' + name);
      const refinement = Number(ref);
      assert.ok(Number.isInteger(refinement) && refinement >= 1 && refinement <= 5);
      return { weaponId: local.id, isF2P: entry.startsWith('!'), refinement, constellation: 'C0' };
    });
    assert.equal(new Set(weaponList.map(w=>w.weaponId)).size,weaponList.length);
    const sets = artifactIds.split(';').map(option => {
      const parts = option.split('+');
      assert.ok(parts.length <= 2 && unique(parts).length === parts.length);
      for (const part of parts) {
        const local = artifacts.get(part);
        assert.equal(String(game.artifacts(local?.nameEn)?.id), part, id + ' artifact ' + part);
        assert.ok(artifactReasons[part], id + ' missing artifact rationale ' + part);
      }
      return { setIds: parts, constellation: 'C0' };
    });
    const playstyles = roles.split(',');
    assert.ok(playstyles.every(role => ['MAIN_DPS','SUB_DPS','SUPPORT'].includes(role)));
    const [sands,goblet,circlet] = slots.split('/').map(stat);
    const patch = { name: 'C0 ' + name, playstyles, constellationAssumptions:['C0'],
      notesEn: reason, source: revision, weapons: weaponList, artifacts: sets };
    if (!unresolved.has(id)) Object.assign(patch,{sands,goblet,circlet,
      subStatsPriority: unique(substats.split(',').flatMap(stat)),
      talentPriority: priorities.split(',').map(token => talentsMap[token])});
    const members = teammates ? [id,...teammates.split(';')] : [];
    if (members.length) {
      assert.ok(members.length === 4 && unique(members).length === 4 && members.every(member => characters.has(member)), 'Invalid lineup ' + id);
      patch.teams = [{ name, description: reason, reviewStatus:'EXPERIMENTAL',
        members: members.map((characterId,i) => ({ characterId, role: i === 0 ? playstyles[0] : 'TEAMMATE' })) }];
    }
    const position = proposals.filter(p => p.characterId === id).length;
    const baseline = position === 0 ? owner.builds.find(b => b.default) : undefined;
    const provenance = {
      method: 'Independent contextual shortlist checked against local catalog and talent records',
      mechanics: owner.mechanics,
      externalReference: owner.source,
      corroboration: alternateEvidence[id] ?? null,
      externalComparison: comparison(references[id],patch,weapons,artifacts,characters),
      evidenceLine: index + 1,
    };
    const missingEvidence = [
      ...(!patch.teams ? ['Team lineup and rotation coverage'] : ['Rotation, energy and matchup checks before making performance claims']),
      ...(unresolved.has(id) ? ['Kit scaling, main stats and talent order'] : []),
      ...(!weaponList.some(w=>w.isF2P) ? ['Accessible no-payment acquisition option'] : []),
    ];
    const item = { revision, candidateId: id + ':' + (position + 1), characterId: id,
      operation: baseline ? 'PROPOSE_REVISION' : 'PROPOSE_NEW_BUILD',
      baseline: baseline ? { buildId:baseline.id, version:baseline.version, checksum:baseline.snapshotChecksum, status:baseline.status } : null,
      defaultPolicy: 'PRESERVE', stage: 'PENDING_ADMIN_REVIEW', confidence: unresolved.has(id) ? 'LOW' : 'MODERATE',
      patch, weaponAccess: weaponList.map(w => {
        const name = weapons.get(w.weaponId).nameEn;
        const commonWish = new Set(['Black Tassel', 'Magic Guide', 'Slingshot', 'Thrilling Tales of Dragon Slayers', 'Bloodtainted Greatsword']);
        const retiredEvent = new Set(['Mailed Flower', 'Missive Windspear', 'Windblume Ode']);
        const availability = retiredEvent.has(name) ? 'PAST_EVENT_IF_OWNED' :
          commonWish.has(name) ? 'COMMON_WISH_NO_PAYMENT_REQUIRED' :
          w.isF2P ? 'CRAFT_FISHING_OR_EXPLORATION' : 'CHECK_WISH_SHOP_OR_PASS_AVAILABILITY';
        const note = name.startsWith('Favonius') ? 'Proc ordinarily needs the wearer on field and a critical hit.' :
          name.startsWith('Sacrificial') ? 'Check proc eligibility, cooldown and refinement against the rotation.' :
          w.refinement > 1 ? 'The listed refinement is part of this option.' : null;
        return { weaponId:w.weaponId, availability, note };
      }), artifactRationale: sets.map(set => set.setIds.map(setId => artifactReasons[setId])),
      missingEvidence, provenance };
    proposals.push({ ...item, checksum:digest(item) });
  }
  const changes = proposals.map(item => {
    const owner = byId.get(item.characterId);
    const baseline = owner.builds.find(b => b.id === item.baseline?.buildId);
    const prior = baseline ? { ...baseline,
      weapons:baseline.weapons.map(w=>({weaponId:w.id,refinement:w.refinement,isF2P:w.isF2P,constellation:w.constellation})),
      artifacts:baseline.artifacts.map(a=>({setIds:a.ids,constellation:'C0'})),
      teams:baseline.teams.map(t=>({name:t.label,reviewStatus:t.reviewStatus,members:t.members.map(characterId=>({characterId}))})),
      constellationAssumptions:baseline.assumptions } : {};
    const fields = Object.fromEntries(Object.entries(item.patch).filter(([k,v]) => !isDeepStrictEqual(prior[k],v))
      .map(([k,v]) => [k,{before:prior[k]??null,after:v}]));
    return { candidateId:item.candidateId, characterId:item.characterId, existingBuildId:baseline?.id??null, fields };
  });
  for (const owner of coverage) {
    const entries = proposals.filter(p=>p.characterId===owner.id);
    owner.candidates = entries.map(p=>p.candidateId);
    owner.disposition = owner.id === 'mitya' ? 'PROTECT_APPROVED' : scopeBlocked.has(owner.id)
      ? 'BLOCKED_IDENTITY_OR_KIT' : !owner.builds.length ? 'MISSING' : owner.builds.some(b=>b.issues.length)
      ? 'INCOMPLETE_OR_INVALID' : 'PRESENT_NEEDS_EDITORIAL_VALIDATION';
    owner.missingEvidence = owner.id === 'mitya' ? ['Experimental team is still experimental. Existing two builds retained.'] :
      scopeBlocked.has(owner.id) ? [scopeBlocked.get(owner.id)] :
      unique(entries.flatMap(p=>p.missingEvidence));
    assert.ok(entries.length || scopeBlocked.has(owner.id) || owner.id === 'mitya');
  }
  const plan = proposals.map(item => ({
    candidateId:item.candidateId, characterId:item.characterId, checksum:item.checksum,
    expectedBaseline:item.baseline, requestedDefaultChange:false, writeEligible:false,
    outcome:item.confidence==='LOW'?'EVIDENCE_HOLD':'REQUIRES_EXPLICIT_ADMIN_REVIEW',
  }));
  const perCharacter = coverage.map(row => ({ id:row.id, disposition:row.disposition,
    missingEvidence:row.missingEvidence, changes:changes.filter(c=>c.characterId===row.id) }));
  return { coverage, proposals, perCharacter, plan };
}
if (require.main === module) {
  const [inventory, comparisonPath] = process.argv.slice(2);
  const read = file => JSON.parse(fs.readFileSync(file,'utf8'));
  const result = generate(read(inventory),read(comparisonPath),fs.readFileSync(path.join(output,'recommendation-evidence.tsv'),'utf8'));
  const write = (name,value) => fs.writeFileSync(path.join(output,name),JSON.stringify({revision,...value},null,2)+'\n');
  write('coverage.json',{characters:result.coverage});
  write('proposed-builds.json',{builds:result.proposals});
  write('character-diffs.json',{characters:result.perCharacter});
  const csv = rows => rows.map(row=>row.map(cell=>'"'+String(cell??'').replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
  fs.writeFileSync(path.join(output,'coverage.csv'),csv([
    ['characterId','name','disposition','existingBuilds','defaults','proposedBuilds','externalReference','sourceStatus','evidenceGaps'],
    ...result.coverage.map(row=>[row.id,row.name,row.disposition,row.builds.length,row.builds.filter(b=>b.default).length,
      row.candidates.length,row.source.url,row.source.status,row.missingEvidence.join(' / ')]),
  ]));
  write('import-dry-run.json',{mode:'DRY_RUN',writes:0,selection:{character:'ALL',build:'ALL'},candidates:result.plan});
  console.log(JSON.stringify({coverage:result.coverage.length,candidates:result.proposals.length,eligibleWrites:0}));
}
module.exports = { generate, digest };
