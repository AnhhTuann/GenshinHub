import { GraphQLContext } from '../../context';
import { CharacterService } from './character.service';

const legacyMode = () => process.env.CHARACTER_BUILD_READ_MODE === 'legacy';
const publicBuilds = (characterId: string, context: GraphQLContext) =>
  legacyMode() ? [] : context.dataloaders.characterBuildsLoader.load(characterId);

async function defaultBuild(characterId: string, context: GraphQLContext) {
  return (await publicBuilds(characterId, context)).find(build => build.isDefault) ?? null;
}

async function legacyBaseline(id: string, context: GraphQLContext) {
  if (!legacyMode()) return null;
  return context.prisma.characterBuild.findUnique({
    where: { id: `baseline-${id}` }, select: { id: true },
  });
}

const buildStats = ['sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority'] as const;

export const characterResolvers = {
  Query: {
    characterBuilds: (_: unknown, { characterId }: { characterId: string }, context: GraphQLContext) =>
      publicBuilds(characterId, context),
    characterBuild: (_: unknown, { id }: { id: string }, context: GraphQLContext) =>
      legacyMode() ? null : context.prisma.characterBuild.findFirst({
        where: { id, reviewStatus: { in: ['APPROVED', 'LEGACY_IMPORT', 'MAINTENANCE'] } },
      }),
    characters: async (_: any, __: any, context: GraphQLContext) => {
      const service = new CharacterService(context.prisma);
      return service.getAllCharacters();
    },
    character: async (_: any, args: { id: string }, context: GraphQLContext) => {
      const service = new CharacterService(context.prisma);
      return service.getCharacterById(args.id);
    },
    charactersByWeaponType: async (_: any, args: { weaponType: string }, context: GraphQLContext) => {
      const service = new CharacterService(context.prisma);
      return service.getCharactersByWeaponType(args.weaponType);
    },
  },
  
  // Field Resolvers (Solving N+1 Problem via DataLoader)
  Character: {
    builds: (parent: { id: string }, _: unknown, context: GraphQLContext) => publicBuilds(parent.id, context),
    defaultBuild: (parent: { id: string }, _: unknown, context: GraphQLContext) => defaultBuild(parent.id, context),
    ...Object.fromEntries(buildStats.map(field => [field, async (
      parent: { id: string } & Record<typeof field, string[]>, _: unknown, context: GraphQLContext,
    ) => (await defaultBuild(parent.id, context))?.[field] ?? parent[field]])),
    signatureWeapons: async (parent: any, _: any, context: GraphQLContext) => {
      if (!parent.signatureWeapons || parent.signatureWeapons.length === 0) return [];
      return context.prisma.weapon.findMany({ where: { nameEn: { in: parent.signatureWeapons } } });
    },
    bestWeapons: async (parent: any, _: any, context: GraphQLContext) => {
      const build = await defaultBuild(parent.id, context) ?? await legacyBaseline(parent.id, context);
      return build ? context.dataloaders.buildWeaponsLoader.load(build.id) :
        context.dataloaders.characterWeaponsLoader.load(parent.id);
    },
    bestArtifacts: async (parent: any, _: any, context: GraphQLContext) => {
      const build = await defaultBuild(parent.id, context) ?? await legacyBaseline(parent.id, context);
      return build ? context.dataloaders.buildArtifactsLoader.load(build.id) :
        context.dataloaders.characterArtifactsLoader.load(parent.id);
    },
    teams: async (parent: any, _: any, context: GraphQLContext) => {
      const build = await defaultBuild(parent.id, context) ?? await legacyBaseline(parent.id, context);
      return build ? context.dataloaders.buildTeamsLoader.load(build.id) :
        context.dataloaders.characterTeamsLoader.load(parent.id);
    },
  },

  CharacterBuildAudit: {
    createdAt: (parent: { createdAt: Date }) => parent.createdAt.toISOString(),
  },
  CharacterBuild: {
    source: (parent: { source: string | null }, _: unknown, context: GraphQLContext) =>
      context.user.isAdmin ? parent.source : null,
    approvalChecksum: (parent: { approvalChecksum: string | null }, _: unknown, context: GraphQLContext) =>
      context.user.isAdmin ? parent.approvalChecksum : null,
    bestWeapons: (parent: { id: string }, _: unknown, context: GraphQLContext) =>
      context.dataloaders.buildWeaponsLoader.load(parent.id),
    bestArtifacts: (parent: { id: string }, _: unknown, context: GraphQLContext) =>
      context.dataloaders.buildArtifactsLoader.load(parent.id),
    teams: (parent: { id: string }, _: unknown, context: GraphQLContext) =>
      context.dataloaders.buildTeamsLoader.load(parent.id),
    createdAt: (parent: { createdAt: Date }) => parent.createdAt.toISOString(),
    updatedAt: (parent: { updatedAt: Date }) => parent.updatedAt.toISOString(),
  },
  TeamBuild: {
    members: async (parent: any, _: any, context: GraphQLContext) => {
      return context.dataloaders.teamMembersLoader.load(parent.id);
    }
  },

  CharacterWeapon: {
    catalogWeaponId: async (parent: { weaponId: string; nameEn: string; nameVi?: string }, _: unknown, context: GraphQLContext) => {
      const byId = await context.prisma.weapon.findUnique({ where: { id: parent.weaponId }, select: { id: true } });
      if (byId) return byId.id;
      // Legacy build rows may store a localized weapon alias instead of a catalog ID.
      // Resolve through either localized name, but only when it identifies one catalog weapon.
      const matches = await context.prisma.weapon.findMany({
        where: { OR: [{ nameEn: parent.nameEn }, { nameVi: parent.nameEn }, { nameVi: parent.nameVi }] },
        select: { id: true },
        take: 2,
      });
      const uniqueIds = new Set(matches.map(match => match.id));
      return uniqueIds.size === 1 ? [...uniqueIds][0] : null;
    },
    rarity: async (parent: any, _: any, context: GraphQLContext) => {
      // Find the weapon in DB to get its rarity
      const weapon = await context.prisma.weapon.findFirst({
        where: { nameEn: parent.nameEn }
      });
      return weapon?.rarity || 5; // Default to 5-star if not found
    }
  },

  CharacterArtifact: {
    iconUrl: async (parent: any, _: any, context: GraphQLContext) => {
      if (parent.setNameEn && parent.setNameEn.startsWith('Mix ')) {
        return '/assets/items/UI_RelicIcon_15001_4.webp'; // Hardcode generic icon for Mix sets
      }
      const set = await context.prisma.artifactSet.findFirst({ where: { nameEn: parent.setNameEn } });
      return set?.iconUrl || null;
    },
    rarity: async (parent: any, _: any, context: GraphQLContext) => {
      if (parent.setNameEn && parent.setNameEn.startsWith('Mix ')) return 5;
      const set = await context.prisma.artifactSet.findFirst({ where: { nameEn: parent.setNameEn } });
      if (set?.rarityList && set.rarityList.length > 0) {
        return Math.max(...set.rarityList);
      }
      return 5;
    },
    artifactSetId: async (parent: any, _: any, context: GraphQLContext) => {
      if (parent.setNameEn && parent.setNameEn.startsWith('Mix ')) return null;
      const set = await context.prisma.artifactSet.findFirst({ where: { nameEn: parent.setNameEn } });
      return set?.id || null;
    },
    mixSets: async (parent: any, _: any, context: GraphQLContext) => {
      if (!parent.setNameEn || !parent.setNameEn.startsWith('Mix 2-Piece ')) return [];
      // Example: "Mix 2-Piece Archaic Petra & 2-Piece Noblesse Oblige"
      const match = parent.setNameEn.match(/Mix 2-Piece (.*?) & 2-Piece (.*)/);
      if (!match) return [];
      const set1Name = match[1];
      const set2Name = match[2];
      const sets = await context.prisma.artifactSet.findMany({
        where: { nameEn: { in: [set1Name, set2Name] } }
      });
      const mix1 = sets.find(s => s.nameEn === set1Name);
      const mix2 = sets.find(s => s.nameEn === set2Name);
      
      const result = [];
      if (mix1) result.push({ nameEn: mix1.nameEn, nameVi: mix1.nameVi, iconUrl: mix1.iconUrl, artifactSetId: mix1.id });
      if (mix2) result.push({ nameEn: mix2.nameEn, nameVi: mix2.nameVi, iconUrl: mix2.iconUrl, artifactSetId: mix2.id });
      return result;
    }
  }
};
