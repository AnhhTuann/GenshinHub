const { createHash, randomUUID } = require('node:crypto');
const { mkdirSync, readFileSync, openSync, closeSync, writeFileSync, fsyncSync } = require('node:fs');
const { join } = require('node:path');
const { isDeepStrictEqual } = require('node:util');

const stats = ['sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority'];
const relations = ['bestWeapons', 'bestArtifacts', 'teams'];
const fields = [...relations, ...stats];
const weaponTypes = new Map([
  ['kiếm đơn', 'sword'], ['trọng kiếm', 'claymore'], ['vũ khí cán dài', 'polearm'],
  ['cung', 'bow'], ['pháp khí', 'catalyst'],
]);
const weaponType = value => weaponTypes.get(value.normalize('NFC').toLowerCase()) ?? value.toLowerCase();
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

function requiredText(value, field) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing or invalid ${field}`);
  return value.trim();
}

function distinctStrings(list, field) {
  if (!Array.isArray(list)) throw new Error(`Expected a list for ${field}`);
  const items = list.map(item => requiredText(item, field));
  if (new Set(items.map(item => item.toLowerCase())).size !== items.length) throw new Error(`Duplicate ${field}`);
  return items;
}

function checkDraft(draft) {
  if (draft?.status !== 'PENDING_REVIEW' || !['INDEPENDENT', 'LICENSED'].includes(draft.source?.kind)) {
    throw new Error('Approval requires a pending independent or licensed draft');
  }
  requiredText(draft.characterId, 'character ID');
  requiredText(draft.playstyle, 'one reviewed playstyle');
  requiredText(draft.source.reference, 'source reference');
  return draft;
}

function approve(draft, reviewer, rightsRef) {
  checkDraft(draft);
  const review = {
    reviewer: requiredText(reviewer, 'reviewer'),
    rightsRef: requiredText(rightsRef, 'rights evidence'),
    reviewedAt: new Date().toISOString(),
  };
  return { approval: { ...review, checksum: digest({ draft, review }) }, draft };
}

function verifyApproval(document) {
  const { approval, draft } = document ?? {};
  if (!approval || !draft) throw new Error('Explicit approval is required before apply');
  const { checksum, ...review } = approval;
  if (checksum !== digest({ draft, review })) throw new Error('Approval checksum mismatch');
  checkDraft(draft);
  requiredText(review.reviewer, 'reviewer');
  requiredText(review.rightsRef, 'rights evidence');
  if (!Number.isFinite(Date.parse(review.reviewedAt))) throw new Error('Invalid approval timestamp');
  return document;
}

function prepare(document, catalog) {
  const { draft, approval } = verifyApproval(document);
  return prepareDraft(draft, approval.checksum, catalog);
}

function prepareDraft(draft, fingerprint, catalog) {
  const characterId = draft.characterId;
  if (characterId !== catalog.character.id) throw new Error('Approved character ID does not match catalog');
  const id = (group, index) => `build-${digest([fingerprint, group, index])}`;
  const match = (rows, itemId, field) => {
    const row = rows.find(row => row.id === itemId);
    if (!row) throw new Error(`Unknown catalog ${field} ID: ${itemId}`);
    return row;
  };
  for (const field of ['weapons', 'artifacts', 'teams']) {
    if (!Array.isArray(draft[field])) throw new Error(`Expected a list for ${field}`);
  }
  distinctStrings(draft.weapons.map(item => item?.id), 'weapon IDs');
  const bestWeapons = draft.weapons.map((entry, index) => {
    const weapon = match(catalog.weapons, entry.id, 'weapon');
    if (weaponType(weapon.type) !== weaponType(catalog.character.weapon)) throw new Error('Weapon type mismatch');
    const refinement = entry.refinement ?? 1;
    if (typeof entry.isF2P !== 'boolean' || !Number.isInteger(refinement) || refinement < 1 || refinement > 5) {
      throw new Error('Weapon requires reviewed isF2P and a valid refinement');
    }
    return {
      id: id('weapon', index), characterId, weaponId: weapon.id, nameEn: weapon.nameEn, nameVi: weapon.nameVi,
      rank: index + 1, order: index, isF2P: entry.isF2P, refinement, constellation: 'C0',
      iconUrl: /^\/assets\/.*\.webp$/.test(weapon.iconUrl ?? '') ? weapon.iconUrl : null,
      subStat: weapon.subStat ?? null, passiveDescEn: null, passiveDescVi: null,
    };
  });
  const options = draft.artifacts.map(option => distinctStrings(option, 'artifact set IDs'));
  distinctStrings(options.map(option => JSON.stringify([...option].sort())), 'artifact configurations');
  const bestArtifacts = options.map((option, index) => {
    if (![1, 2].includes(option.length)) throw new Error('Artifact option must be 4-piece or 2+2');
    const sets = option.map(setId => match(catalog.artifacts, setId, 'artifact'));
    const label = field => sets.length === 1 ? sets[0][field] :
      `Mix 2-Piece ${sets[0][field]} & 2-Piece ${sets[1][field]}`;
    return {
      id: id('artifact', index), characterId, setNameEn: label('nameEn'), setNameVi: label('nameVi'),
      pieces: sets.length === 1 ? 4 : 2, constellation: 'C0', order: index,
    };
  });
  const usedLineups = new Set();
  const teams = draft.teams.map((team, index) => {
    const memberIds = distinctStrings(team.members?.map(member => member?.characterId), 'team member IDs');
    if (memberIds.length !== 4 || !memberIds.includes(characterId)) throw new Error('Team requires four unique slots including the build character');
    const lineup = JSON.stringify([...memberIds].sort());
    if (usedLineups.has(lineup)) throw new Error('Duplicate team lineup');
    usedLineups.add(lineup);
    const teamId = id('team', index);
    return {
      id: teamId, characterId, name: requiredText(team.name, 'team name'), rank: '',
      description: team.description === undefined ? '' : requiredText(team.description, 'team description'),
      order: index,
      members: team.members.map((member, order) => {
        match(catalog.characters, memberIds[order], 'character');
        return {
          id: id(`team-member-${index}`, order), teamId, characterId: memberIds[order], order,
          role: member.role === undefined ? '' : requiredText(member.role, 'team role'),
          roleDesc: '', weapons: [], artifacts: [], substats: [],
        };
      }),
    };
  });
  const statValues = Object.fromEntries(stats.map(field => [field, distinctStrings(draft[field], field)]));
  if (statValues.talentPriority.some(talent => !['Normal Attack', 'Skill', 'Burst'].includes(talent))) {
    throw new Error('Invalid talent priority');
  }
  const candidate = { bestWeapons, bestArtifacts, teams, ...statValues };
  if (fields.every(field => !candidate[field].length)) throw new Error('Approved build has no data');
  return candidate;
}

function plan(current, candidate) {
  const changes = [];
  const protectedFields = [];
  for (const field of fields) {
    if (isDeepStrictEqual(current[field], candidate[field])) continue;
    if (current[field].length) protectedFields.push(field);
    else if (candidate[field].length) changes.push(field);
  }
  return { changes, protectedFields };
}

function rollbackFields(current, before, expected) {
  return Object.keys(expected).filter(field => {
    if (!fields.includes(field) || !Array.isArray(before[field]) || before[field].length ||
        !Array.isArray(expected[field]) || !expected[field].length) {
      throw new Error('Invalid rollback snapshot');
    }
    if (isDeepStrictEqual(current[field], before[field])) return false;
    if (!isDeepStrictEqual(current[field], expected[field])) {
      throw new Error(`Cannot roll back ${field}: data changed after apply`);
    }
    return true;
  });
}

function writeTarget(databaseUrl, confirmation, environment = process.env.NODE_ENV) {
  const url = new URL(databaseUrl);
  if (!['postgres:', 'postgresql:'].includes(url.protocol) ||
      !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) ||
      [...url.searchParams.keys()].some(key => key !== 'schema') ||
      (url.searchParams.has('schema') && url.searchParams.get('schema') !== 'public')) {
    throw new Error('Write target requires a loopback Postgres URL with the public schema');
  }
  const database = decodeURIComponent(url.pathname.slice(1));
  if (environment === 'production' || /prod|live/i.test(database)) throw new Error('Refusing a production write target');
  const knownDevelopment = database === 'genshinhub' && url.port === '5434';
  if (!/^[a-z0-9_]+$/i.test(database) || confirmation !== database ||
      (!knownDevelopment && !/(^|_)(dev|test)(_|$)/i.test(database))) {
    throw new Error('Explicit --database must match a development or test database name');
  }
  return { database, endpoint: `${url.hostname}:${url.port || '5432'}/${database}`, localDockerPort: url.port === '5434' };
}

const include = {
  bestWeapons: { orderBy: [{ order: 'asc' }, { id: 'asc' }] },
  bestArtifacts: { orderBy: [{ order: 'asc' }, { id: 'asc' }] },
  teams: { orderBy: [{ order: 'asc' }, { id: 'asc' }], include: { members: { orderBy: [{ order: 'asc' }, { id: 'asc' }] } } },
};

function saveJournal(path, data) {
  const fd = openSync(path, 'wx', 0o600);
  try {
    writeFileSync(fd, JSON.stringify(data, null, 2) + '\n');
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
}

async function readCurrent(tx, characterId) {
  return tx.character.findUniqueOrThrow({ where: { id: characterId }, include });
}

async function lockWrites(tx, characterId, target) {
  const [server] = await tx.$queryRaw`SELECT current_database() AS database, current_schema() AS schema,
    inet_server_addr()::text AS address, inet_server_port() AS port`;
  const address = server.address?.split('/')[0];
  const loopback = ['127.0.0.1', '::1'].includes(address);
  const localDocker = target.localDockerPort && server.port === 5432 &&
    /^172\.(1[6-9]|2\d|3[01])\./.test(address ?? '');
  if (server.database !== target.database || server.schema !== 'public' ||
      (!loopback && !localDocker)) {
    throw new Error('Postgres server identity did not match the local write target');
  }
  await tx.$executeRaw`SET LOCAL lock_timeout = '3s'`;
  // Admin mutations can write child rows without taking the character lock.
  await tx.$executeRaw`LOCK TABLE "CharacterWeapon", "CharacterArtifact", "CharacterTeam", "TeamMember" IN SHARE ROW EXCLUSIVE MODE`;
  await tx.$queryRaw`SELECT id FROM "Character" WHERE id = ${characterId} FOR UPDATE`;
  const [schema] = await tx.$queryRaw`SELECT to_regclass('public."CharacterBuild"') IS NOT NULL AS enabled`;
  if (schema.enabled) {
    const profiles = await tx.$queryRaw`SELECT id FROM "CharacterBuild" WHERE "characterId" = ${characterId} LIMIT 1`;
    if (profiles.length) throw new Error('Character uses build profiles. Single-build apply and rollback are disabled for this character.');
  }
}

async function buildTransaction(prisma, mode, input, target, journalDir) {
  const pendingPreview = mode === 'preview' && input?.status === 'PENDING_REVIEW';
  const draft = mode === 'rollback' ? null : pendingPreview ? checkDraft(input) : verifyApproval(input).draft;
  const characterId = draft ? draft.characterId : input.characterId;
  const logPath = mode === 'preview' ? null : join(journalDir, `${mode}-${randomUUID()}`);
  if (logPath) mkdirSync(journalDir, { recursive: true, mode: 0o700 });
  const result = await prisma.$transaction(async tx => {
    if (mode !== 'preview') await lockWrites(tx, characterId, target);
    const current = await readCurrent(tx, characterId);

    if (mode === 'rollback') {
      if (input.version !== 1 || input.target !== target.endpoint || input.checksum !== digest({
        characterId, target: input.target, before: input.before, expected: input.expected,
      })) throw new Error('Snapshot does not match this target or its checksum');
      const changes = rollbackFields(current, input.before, input.expected);
      saveJournal(`${logPath}.snapshot.json`, { operation: 'rollback', characterId, target: target.endpoint,
        createdAt: new Date().toISOString(), before: Object.fromEntries(changes.map(field => [field, current[field]])) });
      if (changes.includes('bestWeapons')) await tx.characterWeapon.deleteMany({ where: { characterId, id: { in: current.bestWeapons.map(row => row.id) } } });
      if (changes.includes('bestArtifacts')) await tx.characterArtifact.deleteMany({ where: { characterId, id: { in: current.bestArtifacts.map(row => row.id) } } });
      if (changes.includes('teams')) await tx.characterTeam.deleteMany({ where: { characterId, id: { in: current.teams.map(row => row.id) } } });
      const data = Object.fromEntries(stats.filter(field => changes.includes(field)).map(field => [field, []]));
      if (Object.keys(data).length) await tx.character.update({ where: { id: characterId }, data });
      return { characterId, changes, status: changes.length ? 'ROLLED_BACK' : 'NO_CHANGES' };
    }

    const weapons = await tx.weapon.findMany({ where: { id: { in: draft.weapons?.map(item => item.id) ?? [] } } });
    const artifacts = await tx.artifactSet.findMany({ where: { id: { in: draft.artifacts?.flat() ?? [] } } });
    const characters = await tx.character.findMany({ where: { id: { in: draft.teams?.flatMap(team => team.members?.map(member => member.characterId) ?? []) ?? [] } }, select: { id: true } });
    const catalog = { character: current, weapons, artifacts, characters };
    const candidate = pendingPreview ? prepareDraft(draft, digest(draft), catalog) : prepare(input, catalog);
    const diff = plan(current, candidate);
    if (mode === 'preview') {
      const summaries = Object.fromEntries(fields.map(field => [field, relations.includes(field)
        ? { currentCount: current[field].length, proposedCount: candidate[field].length }
        : { current: current[field], proposed: candidate[field] }]));
      return { characterId, playstyle: draft.playstyle, ...diff, summaries, status: 'PREVIEW' };
    }
    if (diff.protectedFields.length) return { characterId, ...diff, status: 'PROTECTED_CONFLICT' };
    if (!diff.changes.length) return { characterId, ...diff, status: 'NO_CHANGES' };

    const before = Object.fromEntries(diff.changes.map(field => [field, current[field]]));
    const expected = Object.fromEntries(diff.changes.map(field => [field, candidate[field]]));
    const snapshot = { characterId, target: target.endpoint, before, expected };
    const snapshotPath = `${logPath}.snapshot.json`;
    saveJournal(snapshotPath, { ...snapshot, version: 1, checksum: digest(snapshot),
      approval: input.approval, source: draft.source, playstyle: draft.playstyle, createdAt: new Date().toISOString() });

    if (expected.bestWeapons) await tx.characterWeapon.createMany({ data: expected.bestWeapons });
    if (expected.bestArtifacts) await tx.characterArtifact.createMany({ data: expected.bestArtifacts });
    if (expected.teams) {
      for (const { members, ...team } of expected.teams) {
        await tx.characterTeam.create({ data: team });
        await tx.teamMember.createMany({ data: members });
      }
    }
    const data = Object.fromEntries(stats.filter(field => field in expected).map(field => [field, expected[field]]));
    if (Object.keys(data).length) await tx.character.update({ where: { id: characterId }, data });
    const saved = await readCurrent(tx, characterId);
    for (const field of diff.changes) {
      if (!isDeepStrictEqual(saved[field], expected[field])) throw new Error(`Post-write verification failed for ${field}`);
    }
    return { characterId, ...diff, snapshot: snapshotPath, status: 'APPLIED' };
  }, { timeout: 15000 }).catch(error => {
    if (logPath) saveJournal(`${logPath}.audit.json`, {
      status: 'FAILED', characterId, operation: mode, target: target.endpoint, at: new Date().toISOString(),
    });
    throw error;
  });
  if (logPath) saveJournal(`${logPath}.audit.json`, { ...result, operation: mode, target: target.endpoint, at: new Date().toISOString() });
  return result;
}

function readDocument(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

module.exports = { approve, verifyApproval, prepare, plan, rollbackFields, writeTarget, buildTransaction, readDocument, saveJournal };
