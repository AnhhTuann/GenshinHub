"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterResolvers = void 0;
const character_service_1 = require("./character.service");
const legacyMode = () => process.env.CHARACTER_BUILD_READ_MODE === 'legacy';
const publicBuilds = (characterId, context) => legacyMode() ? [] : context.dataloaders.characterBuildsLoader.load(characterId);
async function defaultBuild(characterId, context) {
    return (await publicBuilds(characterId, context)).find(build => build.isDefault) ?? null;
}
async function legacyBaseline(id, context) {
    if (!legacyMode())
        return null;
    return context.prisma.characterBuild.findUnique({
        where: { id: `baseline-${id}` }, select: { id: true },
    });
}
const buildStats = ['sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority'];
exports.characterResolvers = {
    Query: {
        characterBuilds: (_, { characterId }, context) => publicBuilds(characterId, context),
        characterBuild: (_, { id }, context) => legacyMode() ? null : context.prisma.characterBuild.findFirst({
            where: { id, reviewStatus: { in: ['APPROVED', 'LEGACY_IMPORT', 'MAINTENANCE'] } },
        }),
        characters: async (_, __, context) => {
            const service = new character_service_1.CharacterService(context.prisma);
            return service.getAllCharacters();
        },
        character: async (_, args, context) => {
            const service = new character_service_1.CharacterService(context.prisma);
            return service.getCharacterById(args.id);
        },
        charactersByWeaponType: async (_, args, context) => {
            const service = new character_service_1.CharacterService(context.prisma);
            return service.getCharactersByWeaponType(args.weaponType);
        },
    },
    // Field Resolvers (Solving N+1 Problem via DataLoader)
    Character: {
        builds: (parent, _, context) => publicBuilds(parent.id, context),
        defaultBuild: (parent, _, context) => defaultBuild(parent.id, context),
        ...Object.fromEntries(buildStats.map(field => [field, async (parent, _, context) => (await defaultBuild(parent.id, context))?.[field] ?? parent[field]])),
        signatureWeapons: async (parent, _, context) => {
            if (!parent.signatureWeapons || parent.signatureWeapons.length === 0)
                return [];
            return context.prisma.weapon.findMany({ where: { nameEn: { in: parent.signatureWeapons } } });
        },
        bestWeapons: async (parent, _, context) => {
            const build = await defaultBuild(parent.id, context) ?? await legacyBaseline(parent.id, context);
            return build ? context.dataloaders.buildWeaponsLoader.load(build.id) :
                context.dataloaders.characterWeaponsLoader.load(parent.id);
        },
        bestArtifacts: async (parent, _, context) => {
            const build = await defaultBuild(parent.id, context) ?? await legacyBaseline(parent.id, context);
            return build ? context.dataloaders.buildArtifactsLoader.load(build.id) :
                context.dataloaders.characterArtifactsLoader.load(parent.id);
        },
        teams: async (parent, _, context) => {
            const build = await defaultBuild(parent.id, context) ?? await legacyBaseline(parent.id, context);
            return build ? context.dataloaders.buildTeamsLoader.load(build.id) :
                context.dataloaders.characterTeamsLoader.load(parent.id);
        },
    },
    CharacterBuildAudit: {
        createdAt: (parent) => parent.createdAt.toISOString(),
    },
    CharacterBuild: {
        source: (parent, _, context) => context.user.isAdmin ? parent.source : null,
        approvalChecksum: (parent, _, context) => context.user.isAdmin ? parent.approvalChecksum : null,
        bestWeapons: (parent, _, context) => context.dataloaders.buildWeaponsLoader.load(parent.id),
        bestArtifacts: (parent, _, context) => context.dataloaders.buildArtifactsLoader.load(parent.id),
        teams: (parent, _, context) => context.dataloaders.buildTeamsLoader.load(parent.id),
        createdAt: (parent) => parent.createdAt.toISOString(),
        updatedAt: (parent) => parent.updatedAt.toISOString(),
    },
    TeamBuild: {
        members: async (parent, _, context) => {
            return context.dataloaders.teamMembersLoader.load(parent.id);
        }
    },
    CharacterWeapon: {
        catalogWeaponId: async (parent, _, context) => {
            const byId = await context.prisma.weapon.findUnique({ where: { id: parent.weaponId }, select: { id: true } });
            if (byId)
                return byId.id;
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
        rarity: async (parent, _, context) => {
            // Find the weapon in DB to get its rarity
            const weapon = await context.prisma.weapon.findFirst({
                where: { nameEn: parent.nameEn }
            });
            return weapon?.rarity || 5; // Default to 5-star if not found
        }
    },
    CharacterArtifact: {
        iconUrl: async (parent, _, context) => {
            if (parent.setNameEn && parent.setNameEn.startsWith('Mix ')) {
                return '/assets/items/UI_RelicIcon_15001_4.webp'; // Hardcode generic icon for Mix sets
            }
            const set = await context.prisma.artifactSet.findFirst({ where: { nameEn: parent.setNameEn } });
            return set?.iconUrl || null;
        },
        rarity: async (parent, _, context) => {
            if (parent.setNameEn && parent.setNameEn.startsWith('Mix '))
                return 5;
            const set = await context.prisma.artifactSet.findFirst({ where: { nameEn: parent.setNameEn } });
            if (set?.rarityList && set.rarityList.length > 0) {
                return Math.max(...set.rarityList);
            }
            return 5;
        },
        artifactSetId: async (parent, _, context) => {
            if (parent.setNameEn && parent.setNameEn.startsWith('Mix '))
                return null;
            const set = await context.prisma.artifactSet.findFirst({ where: { nameEn: parent.setNameEn } });
            return set?.id || null;
        },
        mixSets: async (parent, _, context) => {
            if (!parent.setNameEn || !parent.setNameEn.startsWith('Mix 2-Piece '))
                return [];
            // Example: "Mix 2-Piece Archaic Petra & 2-Piece Noblesse Oblige"
            const match = parent.setNameEn.match(/Mix 2-Piece (.*?) & 2-Piece (.*)/);
            if (!match)
                return [];
            const set1Name = match[1];
            const set2Name = match[2];
            const sets = await context.prisma.artifactSet.findMany({
                where: { nameEn: { in: [set1Name, set2Name] } }
            });
            const mix1 = sets.find(s => s.nameEn === set1Name);
            const mix2 = sets.find(s => s.nameEn === set2Name);
            const result = [];
            if (mix1)
                result.push({ nameEn: mix1.nameEn, nameVi: mix1.nameVi, iconUrl: mix1.iconUrl, artifactSetId: mix1.id });
            if (mix2)
                result.push({ nameEn: mix2.nameEn, nameVi: mix2.nameVi, iconUrl: mix2.iconUrl, artifactSetId: mix2.id });
            return result;
        }
    }
};
