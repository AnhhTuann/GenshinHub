import { GraphQLError } from 'graphql';
import { CharacterBuild, CharacterBuildPlaystyle, Prisma, CharacterTeamReviewStatus } from '@prisma/client';
import { GraphQLContext } from '../../context';

const publicStatuses = ['APPROVED', 'LEGACY_IMPORT'] as const;
const armorSlots = ['sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority'] as const;
type Patch = {
  name?: string;
  playstyles?: CharacterBuildPlaystyle[];
  constellationAssumptions?: string[];
  notesEn?: string;
  notesVi?: string;
  source?: string;
  weapons?: { weaponId: string; isF2P: boolean; refinement?: number; constellation?: string }[];
  artifacts?: { setIds: string[]; constellation?: string }[];
  teams?: {
    name: string; description?: string; rank?: string; reviewStatus?: CharacterTeamReviewStatus;
    members: { characterId: string; role: string; roleDesc?: string; weapons?: string[]; artifacts?: string[]; substats?: string[] }[];
  }[];
} & Partial<Record<(typeof armorSlots)[number], string[]>>;
type Change = { id: string; characterId: string; expectedVersion: number; input?: Patch; decision?: 'APPROVE' | 'REJECT' };
type Tx = Prisma.TransactionClient;

function requireAdmin(context: GraphQLContext) {
  if (!context.user.isAdmin) throw new GraphQLError('Admin access required', { extensions: { code: 'FORBIDDEN' } });
  return context.user.id ?? 'authenticated-admin';
}

function requireBuildEditor(context: GraphQLContext) {
  const actor = requireAdmin(context);
  if (process.env.CHARACTER_BUILD_READ_MODE === 'legacy') throw new GraphQLError('Build writes are paused in legacy read mode');
  return actor;
}

function text(value: string, field: string) {
  if (!value.trim()) throw new GraphQLError(`${field} cannot be blank`);
  return value.trim();
}

function unique<T>(items: readonly T[], field: string) {
  if (new Set(items).size !== items.length) throw new GraphQLError(`Duplicate ${field}`);
}

async function lockCharacter(tx: Tx, characterId: string) {
  const rows = await tx.$queryRaw<{ id: string }[]>`SELECT id FROM "Character" WHERE id = ${characterId} FOR UPDATE`;
  if (!rows.length) throw new GraphQLError('Character not found');
}

async function audit(tx: Tx, build: CharacterBuild, actor: string, action: string, changes?: Prisma.InputJsonValue) {
  await tx.characterBuildAudit.create({ data: {
    buildId: build.id, characterId: build.characterId, version: build.version, actor, action, changes,
  } });
}

async function pending(tx: Tx, id: string) {
  const latest = await tx.characterBuildAudit.findFirst({
    where: { buildId: id, action: { in: ['STAGED', 'PUBLISHED', 'REJECTED', 'ARCHIVED'] } },
    orderBy: [{ version: 'desc' }, { id: 'desc' }],
  });
  return latest?.action === 'STAGED' ? latest.changes as Patch : null;
}

function weaponTypeKey(value: string) {
  const local: Record<string, string> = {
    'kiếm đơn': 'sword', 'trọng kiếm': 'claymore', 'vũ khí cán dài': 'polearm', cung: 'bow', 'pháp khí': 'catalyst',
  };
  const key = value.toLowerCase().normalize('NFC');
  return local[key] ?? key;
}

async function resolvePatch(tx: Tx, characterId: string, patch: Patch) {
  if (patch.name !== undefined) text(patch.name, 'Build name');
  if (patch.playstyles) unique(patch.playstyles, 'playstyles');
  for (const key of armorSlots) {
    const entries = patch[key];
    if (entries) unique(entries.map(entry => text(entry, key)), key);
  }
  if (patch.constellationAssumptions?.some(value => !/^C[0-6]$/.test(value))) throw new GraphQLError('Invalid constellation');
  if (patch.constellationAssumptions) unique(patch.constellationAssumptions, 'constellations');
  const { weapons, artifacts, teams } = patch;
  if (weapons) unique(weapons.map(row => `${row.weaponId}:${row.constellation ?? 'C0'}`), 'weapon options');
  if (artifacts) unique(artifacts.map(row => `${[...row.setIds].sort().join(',')}:${row.constellation ?? 'C0'}`), 'artifact options');
  if (teams) unique(teams.map(row => row.members.map(member => member.characterId).sort().join(',')), 'team lineups');
  const weaponRows = weapons && await tx.weapon.findMany({ where: { id: { in: weapons.map(row => row.weaponId) } } });
  const catalog = artifacts && await tx.artifactSet.findMany({ where: { id: { in: artifacts.flatMap(row => row.setIds) } } });
  const memberIds = teams?.flatMap(row => row.members.map(member => member.characterId)) ?? [];
  const members = teams && new Set((await tx.character.findMany({ where: { id: { in: memberIds } }, select: { id: true } })).map(row => row.id));
  const character = weapons && await tx.character.findUniqueOrThrow({ where: { id: characterId }, select: { weapon: true } });
  const constellation = (value?: string | null) => {
    const level = value ?? 'C0';
    if (!/^C[0-6]$/.test(level)) throw new GraphQLError('Invalid constellation');
    return level;
  };
  return {
    weapons: weapons?.map((row, order) => {
      const weapon = weaponRows?.find(item => item.id === row.weaponId);
      if (!weapon || !character || weaponTypeKey(weapon.type) !== weaponTypeKey(character.weapon)) {
        throw new GraphQLError('Unknown or incompatible weapon');
      }
      const refinement = row.refinement ?? 1;
      if (refinement < 1 || refinement > 5) throw new GraphQLError('Invalid refinement');
      return { characterId, weaponId: weapon.id, nameEn: weapon.nameEn, nameVi: weapon.nameVi,
        iconUrl: weapon.iconUrl, subStat: weapon.subStat, refinement, isF2P: row.isF2P,
        constellation: constellation(row.constellation), rank: order + 1, order };
    }),
    artifacts: artifacts?.map((row, order) => {
      if (row.setIds.length < 1 || row.setIds.length > 2) throw new GraphQLError('Artifact option requires one or two sets');
      unique(row.setIds, 'sets in one option');
      const sets = row.setIds.map(id => {
        const found = catalog?.find(item => item.id === id);
        if (!found) throw new GraphQLError('Unknown artifact set');
        return found;
      });
      const label = (key: 'nameEn' | 'nameVi') => sets.length === 1 ? sets[0][key] :
        `Mix 2-Piece ${sets[0][key]} & 2-Piece ${sets[1][key]}`;
      return { characterId, setNameEn: label('nameEn'), setNameVi: label('nameVi'), pieces: sets.length === 1 ? 4 : 2,
        constellation: constellation(row.constellation), order };
    }),
    teams: teams?.map((row, order) => {
      const ids = row.members.map(member => member.characterId);
      unique(ids, 'team slots');
      if (ids.length !== 4 || !ids.includes(characterId) || ids.some(id => !members?.has(id))) {
        throw new GraphQLError('Teams require four catalog characters including the build owner');
      }
      return { name: text(row.name, 'Team name'), description: row.description ?? '', rank: row.rank ?? '',
        reviewStatus: row.reviewStatus, characterId, order,
        members: row.members.map((member, order) => ({
          characterId: member.characterId, role: member.role, roleDesc: member.roleDesc ?? '',
          weapons: member.weapons ?? [], artifacts: member.artifacts ?? [], substats: member.substats ?? [], order,
        })),
      };
    }),
  };
}

async function preserveLegacyRows(tx: Tx, build: CharacterBuild, patch: Patch) {
  if (!build.id.startsWith('legacy-') || (!patch.weapons && !patch.artifacts && !patch.teams)) return;
  const baselineId = `baseline-${build.characterId}`;
  if (await tx.characterBuild.findUnique({ where: { id: baselineId } })) return;
  const owner = { buildId: build.id, characterId: build.characterId };
  await tx.characterBuild.create({ data: {
    id: baselineId, characterId: build.characterId, name: `Archived baseline ${build.id}`,
    reviewStatus: 'REJECTED', playstyles: [], constellationAssumptions: [], signatureWeapons: [],
    sands: [], goblet: [], circlet: [], subStatsPriority: [], talentPriority: [],
  } });
  await tx.characterWeapon.updateMany({ where: owner, data: { buildId: baselineId } });
  await tx.characterArtifact.updateMany({ where: owner, data: { buildId: baselineId } });
  await tx.characterTeam.updateMany({ where: owner, data: { buildId: baselineId } });
  const original = { buildId: baselineId, characterId: build.characterId };
  if (!patch.weapons) {
    const rows = await tx.characterWeapon.findMany({ where: original });
    await tx.characterWeapon.createMany({ data: rows.map(({ id: _id, ...row }) => ({ ...row, buildId: build.id })) });
  }
  if (!patch.artifacts) {
    const rows = await tx.characterArtifact.findMany({ where: original });
    await tx.characterArtifact.createMany({ data: rows.map(({ id: _id, ...row }) => ({ ...row, buildId: build.id })) });
  }
  if (!patch.teams) {
    const rows = await tx.characterTeam.findMany({ where: original, include: { members: true } });
    for (const { id: _id, members, ...row } of rows) {
      const team = await tx.characterTeam.create({ data: { ...row, buildId: build.id } });
      await tx.teamMember.createMany({ data: members.map(({ id: _memberId, ...member }) => ({ ...member, teamId: team.id })) });
    }
  }
}

async function previousContent(tx: Tx, build: CharacterBuild, patch: Patch) {
  const where = { buildId: build.id, characterId: build.characterId };
  const orderBy = [{ order: 'asc' as const }, { id: 'asc' as const }];
  const metadata = Object.fromEntries([...armorSlots, 'name', 'playstyles', 'constellationAssumptions', 'notesEn', 'notesVi', 'source']
    .filter(field => field in patch).map(field => [field, build[field as keyof CharacterBuild]]));
  return {
    ...metadata,
    ...(patch.weapons ? { weapons: await tx.characterWeapon.findMany({ where, orderBy }) } : {}),
    ...(patch.artifacts ? { artifacts: await tx.characterArtifact.findMany({ where, orderBy }) } : {}),
    ...(patch.teams ? { teams: await tx.characterTeam.findMany({ where, orderBy, include: { members: { orderBy } } }) } : {}),
  };
}

async function publish(tx: Tx, build: CharacterBuild, patch: Patch) {
  const data = await resolvePatch(tx, build.characterId, patch);
  await preserveLegacyRows(tx, build, patch);
  const where = { buildId: build.id, characterId: build.characterId };
  if (data.weapons) {
    await tx.characterWeapon.deleteMany({ where });
    await tx.characterWeapon.createMany({ data: data.weapons.map(row => ({ ...row, buildId: build.id })) });
  }
  if (data.artifacts) {
    await tx.characterArtifact.deleteMany({ where });
    await tx.characterArtifact.createMany({ data: data.artifacts.map(row => ({ ...row, buildId: build.id })) });
  }
  if (data.teams) {
    await tx.characterTeam.deleteMany({ where });
    for (const { members, ...team } of data.teams) {
      const saved = await tx.characterTeam.create({ data: { ...team, buildId: build.id } });
      await tx.teamMember.createMany({ data: members.map(member => ({ ...member, teamId: saved.id })) });
    }
  }
  const metadata = Object.fromEntries([...armorSlots, 'name', 'playstyles', 'constellationAssumptions', 'notesEn', 'notesVi', 'source']
    .filter(field => field in patch).map(field => [field, patch[field as keyof Patch]]));
  const hasContent = armorSlots.some(key => (patch[key] ?? build[key]).length > 0) ||
    (await tx.characterWeapon.count({ where })) > 0 ||
    (await tx.characterArtifact.count({ where })) > 0 ||
    (await tx.characterTeam.count({ where })) > 0;
  if (!hasContent) throw new GraphQLError('Add build content before publishing');
  const defaultCount = await tx.characterBuild.count({ where: { characterId: build.characterId, isDefault: true } });
  return tx.characterBuild.update({ where: { id: build.id }, data: {
    ...metadata, reviewStatus: 'APPROVED', isDefault: build.isDefault || defaultCount === 0, version: { increment: 1 },
    // The original checksum remains in history. The reviewed Admin edit carries its own audit record.
  } });
}

async function change(context: GraphQLContext, args: Change, operation: 'stage' | 'review' | 'default' | 'archive') {
  const actor = requireBuildEditor(context);
  return context.prisma.$transaction(async tx => {
    await lockCharacter(tx, args.characterId);
    const build = await tx.characterBuild.findUnique({
      where: { id_characterId: { id: args.id, characterId: args.characterId } },
    });
    if (!build) throw new GraphQLError('Build does not belong to the selected character', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
    if (build.id.startsWith('baseline-')) throw new GraphQLError('The legacy baseline is immutable');
    if (build.version !== args.expectedVersion) {
      throw new GraphQLError('Build changed. Reload before editing.', { extensions: { code: 'CONFLICT' } });
    }
    if (await tx.characterBuildAudit.findFirst({
      where: { buildId: build.id, action: 'ARCHIVED' }, select: { id: true },
    })) throw new GraphQLError('Archived builds are read-only');
    const published = publicStatuses.some(status => status === build.reviewStatus);
    if (operation === 'stage') {
      if (!args.input || Object.values(args.input).some(value => value === null)) {
        throw new GraphQLError('Use an empty string or array to clear a build field');
      }
      const input = { ...await pending(tx, build.id), ...args.input };
      await resolvePatch(tx, build.characterId, input);
      const next = await tx.characterBuild.update({ where: { id: build.id }, data: {
        version: { increment: 1 }, reviewStatus: published ? build.reviewStatus : 'PENDING_REVIEW',
      } });
      await audit(tx, next, actor, 'STAGED', input as Prisma.InputJsonValue);
      return next;
    }
    if (operation === 'review') {
      const draft = await pending(tx, build.id);
      if (!draft) throw new GraphQLError('No pending revision');
      if (args.decision === 'APPROVE') {
        const before = await previousContent(tx, build, draft);
        const next = await publish(tx, build, draft);
        await audit(tx, next, actor, 'PUBLISHED', { before, patch: draft } as Prisma.InputJsonValue);
        return next;
      }
      const next = await tx.characterBuild.update({ where: { id: build.id }, data: {
        version: { increment: 1 }, reviewStatus: published ? build.reviewStatus : 'REJECTED',
      } });
      await audit(tx, next, actor, 'REJECTED', draft as Prisma.InputJsonValue);
      return next;
    }
    if (operation === 'default') {
      if (!published) throw new GraphQLError('Only a published build can be default');
      const previous = await tx.characterBuild.findFirst({ where: { characterId: build.characterId, isDefault: true } });
      if (previous?.id === build.id) return build;
      if (previous) {
        const old = await tx.characterBuild.update({ where: { id: previous.id }, data: { isDefault: false, version: { increment: 1 } } });
        await audit(tx, old, actor, 'DEFAULT_REMOVED');
      }
      const next = await tx.characterBuild.update({ where: { id: build.id }, data: { isDefault: true, version: { increment: 1 } } });
      await audit(tx, next, actor, 'DEFAULT_SET');
      return next;
    }
    if (build.id.startsWith('legacy-') || build.id.startsWith('baseline-') || build.isDefault) {
      throw new GraphQLError('Preserve the baseline and choose another default before removing a build');
    }
    const next = await tx.characterBuild.update({ where: { id: build.id }, data: {
      reviewStatus: 'REJECTED', version: { increment: 1 },
    } });
    await audit(tx, next, actor, 'ARCHIVED');
    return next;
  });
}

export const characterBuildAdmin = {
  Query: {
    adminCharacterBuilds: (_: unknown, { characterId }: { characterId: string }, context: GraphQLContext) => {
      requireAdmin(context);
      return context.prisma.characterBuild.findMany({
        where: { characterId, NOT: { id: { startsWith: 'baseline-' } } },
        orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
      });
    },
    characterBuildAudits: (_: unknown, { buildId }: { buildId: string }, context: GraphQLContext) => {
      requireAdmin(context);
      return context.prisma.characterBuildAudit.findMany({ where: { buildId }, orderBy: [{ version: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }] });
    },
    characterBuildPending: (_: unknown, { buildId }: { buildId: string }, context: GraphQLContext) => {
      requireAdmin(context);
      return pending(context.prisma, buildId);
    },
  },
  Mutation: {
    createCharacterBuild: (_: unknown, { characterId, name, playstyles }: {
      characterId: string; name: string; playstyles: CharacterBuildPlaystyle[];
    }, context: GraphQLContext) => {
      const actor = requireBuildEditor(context);
      unique(playstyles, 'playstyles');
      return context.prisma.$transaction(async tx => {
        await lockCharacter(tx, characterId);
        const build = await tx.characterBuild.create({ data: { characterId, name: text(name, 'Build name'),
          playstyles, reviewStatus: 'DRAFT', constellationAssumptions: [], signatureWeapons: [],
          sands: [], goblet: [], circlet: [], subStatsPriority: [], talentPriority: [] } });
        await audit(tx, build, actor, 'CREATED');
        return build;
      });
    },
    updateCharacterBuild: (_: unknown, args: Change, context: GraphQLContext) => change(context, args, 'stage'),
    reviewCharacterBuild: (_: unknown, args: Change, context: GraphQLContext) => change(context, args, 'review'),
    setDefaultCharacterBuild: (_: unknown, args: Change, context: GraphQLContext) => change(context, args, 'default'),
    archiveCharacterBuild: (_: unknown, args: Change, context: GraphQLContext) => change(context, args, 'archive'),
  },
};
