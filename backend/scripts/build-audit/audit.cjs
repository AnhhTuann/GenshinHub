const { isDeepStrictEqual } = require('node:util');

const nameKey = name => name.normalize('NFC').trim().replaceAll('’', "'").toLowerCase();
const statFields = ['sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority'];
const localizedWeaponTypes = new Map([
  ['kiếm đơn', 'sword'],
  ['trọng kiếm', 'claymore'],
  ['vũ khí cán dài', 'polearm'],
  ['cung', 'bow'],
  ['pháp khí', 'catalyst'],
]);
const weaponTypeKey = type => localizedWeaponTypes.get(nameKey(type)) ?? nameKey(type);

function strings(items, field) {
  if (!Array.isArray(items) || items.some(item => typeof item !== 'string' || !item.trim())) {
    throw new Error(`Invalid ${field}: expected a list of nonempty strings`);
  }
  const values = items.map(item => item.trim());
  if (new Set(values.map(nameKey)).size !== values.length) throw new Error(`Invalid ${field}: duplicate entries`);
  return values;
}

function normalize(payload, sourceId) {
  if (payload?.id !== sourceId) throw new Error('Source character identity mismatch');
  const [name, element, weaponType] = ['name', 'element', 'weapon_type'].map(field => {
    if (typeof payload[field] !== 'string' || !payload[field].trim()) throw new Error(`Invalid source ${field}`);
    return payload[field].trim();
  });
  const build = payload.build;
  if (!build || !Array.isArray(build.artifacts) || !Array.isArray(payload.teams)) {
    throw new Error('Unsupported source build or team format');
  }

  const artifacts = build.artifacts.map(option => {
    const sets = strings(option, 'artifact option');
    if (sets.length < 1 || sets.length > 2) throw new Error('Unsupported artifact combination');
    return { sets, pieces: sets.length === 1 ? [4] : [2, 2] };
  });
  strings(artifacts.map(option => JSON.stringify(option.sets.map(nameKey).sort())), 'artifact options');

  const teams = payload.teams.map(team => {
    if (typeof team?.name !== 'string' || !team.name.trim()) throw new Error('Invalid team name');
    const members = strings(team.characters, 'team members');
    if (members.length !== 4 || !members.some(member => nameKey(member) === nameKey(name))) {
      throw new Error('Invalid team: expected four distinct slots including the source character');
    }
    return { name: team.name.trim(), members };
  });
  strings(teams.map(team => JSON.stringify(team.members.map(nameKey).sort())), 'team lineups');

  return {
    id: sourceId, name, element, weaponType,
    category: 'EDITORIAL',
    playstyle: null,
    weapons: strings(build.weapons, 'weapons'),
    artifacts,
    statistics: {
      sands: strings(build.main_stats?.sands, 'sands'),
      goblet: strings(build.main_stats?.goblet, 'goblet'),
      circlet: strings(build.main_stats?.circlet, 'circlet'),
      subStatsPriority: strings(build.sub_stats, 'substats'),
      talentPriority: strings(build.talent_priority, 'talent priority'),
    },
    teams,
  };
}

function validPopularity(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100;
}

function audit(source, character, catalog) {
  if (nameKey(source.name) !== nameKey(character.nameEn) ||
      nameKey(source.element) !== nameKey(character.element) ||
      weaponTypeKey(source.weaponType) !== weaponTypeKey(character.weapon)) {
    throw new Error('Local character identity, element or weapon type mismatch');
  }

  const review = [];
  const match = (name, rows, group, index, extra = () => true) => {
    const matches = rows.filter(row => nameKey(row.nameEn) === nameKey(name));
    if (matches.length === 1 && extra(matches[0])) return matches[0].id;
    review.push({ group, position: index + 1, status: 'NEEDS_REVIEW',
      reason: matches.length === 0 ? 'MISSING_ID' : matches.length > 1 ? 'AMBIGUOUS_ID' : 'TYPE_MISMATCH' });
    return null;
  };

  const weaponIds = source.weapons.map((name, index) => match(name, catalog.weapons, 'weapons', index,
    row => weaponTypeKey(row.type) === weaponTypeKey(character.weapon)));
  const artifactIds = source.artifacts.map((option, index) =>
    option.sets.map(name => match(name, catalog.artifacts, 'artifacts', index)));
  const teamIds = source.teams.map((team, index) =>
    team.members.map(name => nameKey(name) === nameKey(source.name)
      ? character.id : match(name, catalog.characters, 'teams', index)));

  const classify = (stored, candidate, complete = true) => {
    if (!stored.length) return candidate.length ? (complete ? 'EMPTY_WITH_CANDIDATES' : 'EMPTY_REVIEW') : 'EMPTY';
    if (!complete) return 'PROTECTED_REVIEW';
    return isDeepStrictEqual(stored, candidate) ? 'PROTECTED_SAME' : 'PROTECTED_DIFFERENT';
  };
  const storedArtifacts = character.bestArtifacts.map(row => [
    catalog.artifacts.find(artifact => nameKey(artifact.nameEn) === nameKey(row.setNameEn))?.id ?? null,
    row.pieces,
  ]);
  const simpleArtifacts = source.artifacts.every(option => option.sets.length === 1) &&
    storedArtifacts.every(([id, pieces]) => id !== null && pieces === 4);
  const fields = {
    bestWeapons: classify(character.bestWeapons.map(row => row.weaponId), weaponIds, weaponIds.every(Boolean)),
    bestArtifacts: classify(storedArtifacts, artifactIds.map(ids => [ids[0], 4]),
      (!storedArtifacts.length || simpleArtifacts) && artifactIds.every(ids => ids.every(Boolean))),
    teams: classify(character.teams, teamIds, !character.teams.length && teamIds.every(ids => ids.every(Boolean))),
    ...Object.fromEntries(statFields.map(field => [field, classify(character[field], source.statistics[field])])),
  };
  return {
    sourceCounts: { weapons: weaponIds.length, artifacts: artifactIds.length, teams: teamIds.length },
    matched: {
      weapons: weaponIds.filter(Boolean).length,
      artifacts: artifactIds.filter(ids => ids.every(Boolean)).length,
      teams: teamIds.filter(ids => ids.every(Boolean) && new Set(ids).size === 4).length,
    },
    fields, review,
  };
}

module.exports = { audit, normalize, validPopularity };
