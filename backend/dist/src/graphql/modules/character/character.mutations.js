"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterMutations = void 0;
const character_service_1 = require("./character.service");
const mutations_1 = require("../../../mutations"); // Temporary reference to old mutations, we will extract them later
exports.characterMutations = {
    Mutation: {
        // We will extract these from mutations.ts into character.service.ts
        // For now, we wire them up to the old mutations to keep things compiling and extract them step-by-step
        upsertCharacter: async (_, args, context) => mutations_1.Mutation.upsertCharacter(_, args, context),
        deleteCharacter: async (_, args, context) => {
            const service = new character_service_1.CharacterService(context.prisma);
            return service.deleteCharacter(args.id);
        },
        updateCharacterSplashArt: async (_, args, context) => mutations_1.Mutation.updateCharacterSplashArt(_, args, context),
        addCharacterTeam: async (_, args, context) => mutations_1.Mutation.addCharacterTeam(_, args, context),
        updateCharacterTeam: async (_, args, context) => mutations_1.Mutation.updateCharacterTeam(_, args, context),
        removeCharacterTeam: async (_, args, context) => mutations_1.Mutation.removeCharacterTeam(_, args, context),
        reorderCharacterTeams: async (_, args, context) => mutations_1.Mutation.reorderCharacterTeams(_, args, context),
        reorderCharacterWeapons: async (_, args, context) => mutations_1.Mutation.reorderCharacterWeapons(_, args, context),
        reorderCharacterArtifacts: async (_, args, context) => mutations_1.Mutation.reorderCharacterArtifacts(_, args, context),
        updateCharacterTierList: async (_, args, context) => mutations_1.Mutation.updateCharacterTierList(_, args, context),
        addCharacterWeapon: async (_, args, context) => mutations_1.Mutation.addCharacterWeapon(_, args, context),
        updateCharacterWeapon: async (_, args, context) => mutations_1.Mutation.updateCharacterWeapon(_, args, context),
        removeCharacterWeapon: async (_, args, context) => mutations_1.Mutation.removeCharacterWeapon(_, args, context),
        addCharacterArtifact: async (_, args, context) => mutations_1.Mutation.addCharacterArtifact(_, args, context),
        removeCharacterArtifact: async (_, args, context) => mutations_1.Mutation.removeCharacterArtifact(_, args, context),
        updateCharacterTalents: async (_, args, context) => mutations_1.Mutation.updateCharacterTalents(_, args, context),
        updateCharacterArtifactStats: async (_, args, context) => mutations_1.Mutation.updateCharacterArtifactStats(_, args, context),
        updateCharacterStats: async (_, args, context) => mutations_1.Mutation.updateCharacterStats(_, args, context),
        updateCharacterAscensionMats: async (_, args, context) => mutations_1.Mutation.updateCharacterAscensionMats(_, args, context),
        generateCharacterAI: async (_, args, context) => mutations_1.Mutation.generateCharacterAI(_, args, context),
    }
};
