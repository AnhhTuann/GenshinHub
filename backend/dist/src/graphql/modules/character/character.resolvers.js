"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterResolvers = void 0;
const character_service_1 = require("./character.service");
exports.characterResolvers = {
    Query: {
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
        signatureWeapons: async (parent, _, context) => {
            if (!parent.signatureWeapons || parent.signatureWeapons.length === 0)
                return [];
            return context.prisma.weapon.findMany({ where: { nameEn: { in: parent.signatureWeapons } } });
        },
        bestWeapons: async (parent, _, context) => {
            return context.dataloaders.characterWeaponsLoader.load(parent.id);
        },
        bestArtifacts: async (parent, _, context) => {
            return context.dataloaders.characterArtifactsLoader.load(parent.id);
        },
        teams: async (parent, _, context) => {
            return context.dataloaders.characterTeamsLoader.load(parent.id);
        },
    },
    TeamBuild: {
        members: async (parent, _, context) => {
            return context.dataloaders.teamMembersLoader.load(parent.id);
        }
    },
    CharacterWeapon: {
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
