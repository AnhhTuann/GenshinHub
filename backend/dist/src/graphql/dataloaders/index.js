"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoaders = createLoaders;
const dataloader_1 = __importDefault(require("dataloader"));
function createLoaders(prisma) {
    return {
        // DataLoader for fetching Best Weapons by Character ID
        characterWeaponsLoader: new dataloader_1.default(async (characterIds) => {
            const weapons = await prisma.characterWeapon.findMany({
                where: { characterId: { in: [...characterIds] } },
                orderBy: { rank: 'asc' },
            });
            // Group by characterId
            const grouped = weapons.reduce((acc, curr) => {
                if (!acc[curr.characterId])
                    acc[curr.characterId] = [];
                acc[curr.characterId].push(curr);
                return acc;
            }, {});
            // Return array in the exact same order and length as characterIds
            return characterIds.map(id => grouped[id] || []);
        }),
        // DataLoader for fetching Best Artifacts by Character ID
        characterArtifactsLoader: new dataloader_1.default(async (characterIds) => {
            const artifacts = await prisma.characterArtifact.findMany({
                where: { characterId: { in: [...characterIds] } },
                orderBy: { order: 'asc' },
            });
            const grouped = artifacts.reduce((acc, curr) => {
                if (!acc[curr.characterId])
                    acc[curr.characterId] = [];
                acc[curr.characterId].push(curr);
                return acc;
            }, {});
            return characterIds.map(id => grouped[id] || []);
        }),
        // DataLoader for fetching Teams by Character ID
        characterTeamsLoader: new dataloader_1.default(async (characterIds) => {
            const teams = await prisma.characterTeam.findMany({
                where: { characterId: { in: [...characterIds] } },
                orderBy: { order: 'asc' },
            });
            const grouped = teams.reduce((acc, curr) => {
                if (!acc[curr.characterId])
                    acc[curr.characterId] = [];
                acc[curr.characterId].push(curr);
                return acc;
            }, {});
            return characterIds.map(id => grouped[id] || []);
        }),
        // DataLoader for fetching Team Members by Team ID
        teamMembersLoader: new dataloader_1.default(async (teamIds) => {
            const members = await prisma.teamMember.findMany({
                where: { teamId: { in: [...teamIds] } },
            });
            const grouped = members.reduce((acc, curr) => {
                if (!acc[curr.teamId])
                    acc[curr.teamId] = [];
                acc[curr.teamId].push(curr);
                return acc;
            }, {});
            return teamIds.map(id => grouped[id] || []);
        }),
    };
}
