"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoaders = createLoaders;
const dataloader_1 = __importDefault(require("dataloader"));
function createLoaders(prisma) {
    const byKey = (load, key) => new dataloader_1.default(async (keys) => {
        const buckets = new Map();
        for (const row of await load([...keys])) {
            const id = key(row);
            if (id === null)
                continue;
            const bucket = buckets.get(id) ?? [];
            bucket.push(row);
            buckets.set(id, bucket);
        }
        return keys.map(id => buckets.get(id) ?? []);
    });
    return {
        // MAINTENANCE is public but explicitly distinct from human APPROVED / legacy imports.
        characterBuildsLoader: byKey(keys => prisma.characterBuild.findMany({
            where: { characterId: { in: keys }, reviewStatus: { in: ['APPROVED', 'LEGACY_IMPORT', 'MAINTENANCE'] } },
            orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }, { id: 'asc' }],
        }), row => row.characterId),
        buildWeaponsLoader: byKey(keys => prisma.characterWeapon.findMany({
            where: { buildId: { in: keys } }, orderBy: [{ rank: 'asc' }, { order: 'asc' }, { id: 'asc' }],
        }), row => row.buildId),
        buildArtifactsLoader: byKey(keys => prisma.characterArtifact.findMany({
            where: { buildId: { in: keys } }, orderBy: [{ order: 'asc' }, { id: 'asc' }],
        }), row => row.buildId),
        buildTeamsLoader: byKey(keys => prisma.characterTeam.findMany({
            where: { buildId: { in: keys } }, orderBy: [{ order: 'asc' }, { id: 'asc' }],
        }), row => row.buildId),
        // DataLoader for fetching Best Weapons by Character ID
        characterWeaponsLoader: new dataloader_1.default(async (characterIds) => {
            const weapons = await prisma.characterWeapon.findMany({
                where: { characterId: { in: [...characterIds] }, OR: [
                        { buildId: null }, { buildId: { in: characterIds.map(id => `legacy-${id}`) } },
                    ] },
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
                where: { characterId: { in: [...characterIds] }, OR: [
                        { buildId: null }, { buildId: { in: characterIds.map(id => `legacy-${id}`) } },
                    ] },
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
                where: { characterId: { in: [...characterIds] }, OR: [
                        { buildId: null }, { buildId: { in: characterIds.map(id => `legacy-${id}`) } },
                    ] },
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
                orderBy: [{ order: 'asc' }, { id: 'asc' }],
            });
            const grouped = members.reduce((acc, curr) => {
                if (!acc[curr.teamId])
                    acc[curr.teamId] = [];
                acc[curr.teamId].push(curr);
                return acc;
            }, {});
            return teamIds.map(id => grouped[id] || []);
        }),
        // Public weapon rankings only. Never loads drafts, source-derived research or disputed rows.
        weaponTierRanksLoader: byKey(keys => prisma.weaponTierRank.findMany({
            where: {
                weaponId: { in: [...keys] },
                derivation: 'INDEPENDENT',
                reviewStatus: 'APPROVED',
                publishRightsVerified: true,
                versionKey: '7.2',
            },
            orderBy: [{ versionKey: 'desc' }, { role: 'asc' }, { refinementContext: 'asc' }],
        }), row => row.weaponId),
    };
}
