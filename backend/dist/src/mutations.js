"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const prisma_1 = require("./prisma");
const exportData_1 = require("../scripts/exportData");
const backupService_1 = require("./backupService");
const xss_1 = __importDefault(require("xss"));
const cache_1 = require("./cache");
const resolvers_1 = require("./resolvers");
// === Cơ chế cũ: Export .ts seed files (chỉ chạy ở dev) ===
let exportTimeout = null;
function debouncedExport() {
    if (process.env.NODE_ENV === 'production')
        return; // Tắt trên production
    if (exportTimeout)
        clearTimeout(exportTimeout);
    exportTimeout = setTimeout(() => {
        // Tính năng auto-export đã được bật lại sau khi sửa lỗi xáo trộn
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        // console.log("Auto-export disabled to prevent overriding .ts files.");
    }, 2000);
}
// === Cơ chế mới: JSON backup (chạy ở mọi môi trường) ===
let backupTimeout = null;
function debouncedBackup() {
    if (backupTimeout)
        clearTimeout(backupTimeout);
    backupTimeout = setTimeout(() => {
        (0, backupService_1.createJsonBackup)().catch(console.error);
    }, 5000); // Debounce 5s để gom nhiều thay đổi
}
function sanitize(input) {
    if (typeof input === 'string')
        return (0, xss_1.default)(input);
    if (Array.isArray(input))
        return input.map(sanitize);
    if (typeof input === 'object' && input !== null) {
        const sanitizedObj = {};
        for (const key in input) {
            sanitizedObj[key] = sanitize(input[key]);
        }
        return sanitizedObj;
    }
    return input;
}
function requireAdmin(context) {
    if (!context.isAdmin)
        throw new Error("Unauthorized: Admin access required.");
}
exports.Mutation = {
    upsertWeapon: async (_, { input }, context) => {
        requireAdmin(context);
        const sanitizedInput = sanitize(input);
        const w = await prisma_1.prisma.weapon.upsert({
            where: { id: sanitizedInput.id },
            update: sanitizedInput,
            create: sanitizedInput,
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return w;
    },
    deleteWeapon: async (_, { id }, context) => {
        requireAdmin(context);
        await prisma_1.prisma.weapon.delete({ where: { id } });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    upsertArtifactSet: async (_, { input }, context) => {
        requireAdmin(context);
        const sanitizedInput = sanitize(input);
        const a = await prisma_1.prisma.artifactSet.upsert({
            where: { id: sanitizedInput.id },
            update: sanitizedInput,
            create: sanitizedInput,
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return a;
    },
    deleteArtifactSet: async (_, { id }, context) => {
        requireAdmin(context);
        await prisma_1.prisma.artifactSet.delete({ where: { id } });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    upsertMaterial: async (_, { input }, context) => {
        requireAdmin(context);
        const sanitizedInput = sanitize(input);
        await prisma_1.prisma.material.upsert({
            where: { id: sanitizedInput.id },
            update: sanitizedInput,
            create: sanitizedInput,
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    deleteMaterial: async (_, { id }, context) => {
        requireAdmin(context);
        await prisma_1.prisma.material.delete({ where: { id } });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    upsertCharacter: async (_, { input }, context) => {
        requireAdmin(context);
        const sanitizedInput = sanitize(input);
        // Extract relations
        const { bestWeapons, bestArtifacts, signatureWeapons, teams, ...charData } = sanitizedInput;
        const createData = {
            ...charData,
            titleEn: charData.titleEn || "",
            titleVi: charData.titleVi || "",
            descriptionEn: charData.descriptionEn || "",
            descriptionVi: charData.descriptionVi || "",
            region: charData.region || "",
            baseHp: charData.baseHp || 10000,
            baseAtk: charData.baseAtk || 300,
            baseDef: charData.baseDef || 700,
            talentPriority: charData.talentPriority || [],
            signatureWeapons: signatureWeapons || [],
        };
        const updateData = {
            ...charData,
            ...(charData.titleEn !== undefined && { titleEn: charData.titleEn }),
            ...(charData.titleVi !== undefined && { titleVi: charData.titleVi }),
            ...(charData.descriptionEn !== undefined && { descriptionEn: charData.descriptionEn }),
            ...(charData.descriptionVi !== undefined && { descriptionVi: charData.descriptionVi }),
            ...(charData.region !== undefined && { region: charData.region }),
            ...(charData.baseHp !== undefined && { baseHp: charData.baseHp }),
            ...(charData.baseAtk !== undefined && { baseAtk: charData.baseAtk }),
            ...(charData.baseDef !== undefined && { baseDef: charData.baseDef }),
            ...(charData.talentPriority !== undefined && { talentPriority: charData.talentPriority }),
            ...(signatureWeapons !== undefined && { signatureWeapons: signatureWeapons }),
        };
        // Upsert base character
        const updatedChar = await prisma_1.prisma.character.upsert({
            where: { id: charData.id },
            update: updateData,
            create: createData,
        });
        // Re-create relations if provided
        if (bestWeapons) {
            await prisma_1.prisma.characterWeapon.deleteMany({ where: { characterId: charData.id } });
            for (const w of bestWeapons) {
                let dbWeapon = await prisma_1.prisma.weapon.findFirst({ where: { OR: [{ nameEn: w.nameEn }, { nameVi: w.nameVi }] } });
                await prisma_1.prisma.characterWeapon.create({
                    data: {
                        characterId: charData.id,
                        weaponId: dbWeapon ? dbWeapon.id : "unknown",
                        nameEn: w.nameEn,
                        nameVi: w.nameVi,
                        rank: w.rank,
                        isF2P: w.isF2P,
                        iconUrl: w.iconUrl || dbWeapon?.iconUrl,
                        subStat: w.subStat || dbWeapon?.subStat,
                        passiveDescEn: w.passiveDescEn,
                        passiveDescVi: w.passiveDescVi,
                        refinement: w.refinement
                    }
                });
            }
        }
        if (bestArtifacts) {
            await prisma_1.prisma.characterArtifact.deleteMany({ where: { characterId: charData.id } });
            for (const a of bestArtifacts) {
                await prisma_1.prisma.characterArtifact.create({
                    data: {
                        characterId: charData.id,
                        setNameEn: a.setNameEn,
                        setNameVi: a.setNameVi,
                        pieces: a.pieces,
                        order: a.order || 0
                    }
                });
            }
        }
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return updatedChar;
    },
    deleteCharacter: async (_, { id }, context) => {
        requireAdmin(context);
        // Delete relations first
        await prisma_1.prisma.characterWeapon.deleteMany({ where: { characterId: id } });
        await prisma_1.prisma.characterArtifact.deleteMany({ where: { characterId: id } });
        await prisma_1.prisma.character.delete({ where: { id } });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    // Character Detail Inline Edits
    updateCharacterSplashArt: async (_, { id, splashArtUrl }, context) => {
        requireAdmin(context);
        const c = await prisma_1.prisma.character.update({
            where: { id },
            data: { splashArtUrl },
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return c;
    },
    addCharacterTeam: async (_, args, context) => {
        requireAdmin(context);
        const { characterId, name, rank, description, members } = sanitize(args);
        const newTeam = await prisma_1.prisma.characterTeam.create({
            data: {
                characterId,
                name,
                rank,
                description,
                members: {
                    create: members.map((m, index) => ({
                        characterId: m.characterId,
                        role: m.role,
                        roleDesc: m.roleDesc,
                        weapons: m.weapons,
                        artifacts: m.artifacts,
                        substats: m.substats,
                        order: index
                    }))
                }
            },
            include: {
                members: true
            }
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return newTeam;
    },
    updateCharacterTeam: async (_, args, context) => {
        requireAdmin(context);
        const { teamId, name, rank, description, members } = sanitize(args);
        const team = await prisma_1.prisma.characterTeam.findUnique({ where: { id: teamId } });
        if (!team)
            throw new Error("Team not found");
        await prisma_1.prisma.characterTeam.update({
            where: { id: teamId },
            data: {
                name,
                rank,
                description,
                members: {
                    deleteMany: {},
                    create: members.map((m, index) => ({
                        characterId: m.characterId,
                        role: m.role,
                        roleDesc: m.roleDesc,
                        weapons: m.weapons,
                        artifacts: m.artifacts,
                        substats: m.substats,
                        order: index
                    }))
                }
            }
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    removeCharacterTeam: async (_, { teamId }, context) => {
        requireAdmin(context);
        const team = await prisma_1.prisma.characterTeam.findUnique({ where: { id: teamId } });
        if (!team)
            return false;
        await prisma_1.prisma.characterTeam.delete({ where: { id: teamId } });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    // === Dynamic Tiers ===
    addTierRank: async (_, args, context) => {
        requireAdmin(context);
        const count = await prisma_1.prisma.tierRank.count();
        const newTier = await prisma_1.prisma.tierRank.create({
            data: {
                name: args.name,
                colorBase: args.colorBase,
                order: count,
            }
        });
        debouncedBackup();
        (0, cache_1.clearAllCaches)();
        return newTier;
    },
    updateTierRank: async (_, args, context) => {
        requireAdmin(context);
        const updated = await prisma_1.prisma.tierRank.update({
            where: { id: args.id },
            data: {
                ...(args.name && { name: args.name }),
                ...(args.colorBase && { colorBase: args.colorBase })
            }
        });
        debouncedBackup();
        (0, cache_1.clearAllCaches)();
        return updated;
    },
    deleteTierRank: async (_, args, context) => {
        requireAdmin(context);
        const tier = await prisma_1.prisma.tierRank.findUnique({ where: { id: args.id } });
        if (!tier)
            return false;
        // Unassign tier from characters and weapons
        await prisma_1.prisma.character.updateMany({
            where: { tier: tier.name },
            data: { tier: null }
        });
        await prisma_1.prisma.weapon.updateMany({
            where: { tier: tier.name },
            data: { tier: null }
        });
        await prisma_1.prisma.tierRank.delete({ where: { id: args.id } });
        debouncedBackup();
        (0, cache_1.clearAllCaches)();
        return true;
    },
    reorderTierRanks: async (_, args, context) => {
        requireAdmin(context);
        const { tierIds } = args;
        const transactions = tierIds.map((id, index) => prisma_1.prisma.tierRank.update({ where: { id }, data: { order: index } }));
        await prisma_1.prisma.$transaction(transactions);
        debouncedBackup();
        (0, cache_1.clearAllCaches)();
        return true;
    },
    reorderCharacterTeams: async (_, args, context) => {
        requireAdmin(context);
        const updates = args.teamIds.map((id, index) => prisma_1.prisma.characterTeam.update({ where: { id }, data: { order: index } }));
        await prisma_1.prisma.$transaction(updates);
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    reorderCharacterWeapons: async (_, { weaponIds }, context) => {
        requireAdmin(context);
        const updates = weaponIds.map((id, index) => prisma_1.prisma.characterWeapon.update({ where: { id }, data: { rank: index } }));
        await prisma_1.prisma.$transaction(updates);
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    reorderCharacterArtifacts: async (_, { artifactIds }, context) => {
        requireAdmin(context);
        const updates = artifactIds.map((id, index) => prisma_1.prisma.characterArtifact.update({ where: { id }, data: { order: index } }));
        await prisma_1.prisma.$transaction(updates);
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    updateCharacterTierList: async (_, args, context) => {
        requireAdmin(context);
        const { id, tier, role, recommendedC, tierNoteEn, tierNoteVi } = sanitize(args);
        const c = await prisma_1.prisma.character.update({
            where: { id },
            data: {
                tier,
                role,
                recommendedC,
                tierNoteEn: { set: tierNoteEn || [] },
                tierNoteVi: { set: tierNoteVi || [] }
            },
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return c;
    },
    updateWeaponTierList: async (_, args, context) => {
        requireAdmin(context);
        const { id, tier, role } = sanitize(args);
        const w = await prisma_1.prisma.weapon.update({
            where: { id },
            data: { tier, role },
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return w;
    },
    addCharacterWeapon: async (_, args, context) => {
        requireAdmin(context);
        const { characterId, weaponId, rank, isF2P, refinement } = sanitize(args);
        const weapon = await prisma_1.prisma.weapon.findUnique({ where: { id: weaponId } });
        if (!weapon)
            throw new Error("Weapon not found");
        const newCharWep = await prisma_1.prisma.characterWeapon.create({
            data: {
                characterId,
                weaponId,
                nameEn: weapon.nameEn,
                nameVi: weapon.nameVi,
                rank,
                isF2P,
                refinement: refinement || 1,
                iconUrl: weapon.iconUrl,
            }
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return newCharWep.id;
    },
    updateCharacterWeapon: async (_, args, context) => {
        requireAdmin(context);
        const { id, rank, isF2P, refinement } = sanitize(args);
        await prisma_1.prisma.characterWeapon.update({
            where: { id },
            data: { rank, isF2P, refinement }
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    removeCharacterWeapon: async (_, { id }, context) => {
        requireAdmin(context);
        await prisma_1.prisma.characterWeapon.delete({ where: { id } });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    addCharacterArtifact: async (_, args, context) => {
        requireAdmin(context);
        const { characterId, setNameEn, setNameVi, pieces, constellation } = sanitize(args);
        const newArtifact = await prisma_1.prisma.characterArtifact.create({
            data: {
                characterId,
                setNameEn,
                setNameVi,
                pieces,
                constellation: constellation || "C0"
            }
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return newArtifact.id;
    },
    removeCharacterArtifact: async (_, { id }, context) => {
        requireAdmin(context);
        await prisma_1.prisma.characterArtifact.delete({ where: { id } });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    updateCharacterTalents: async (_, { id, talentPriority }, context) => {
        requireAdmin(context);
        const c = await prisma_1.prisma.character.update({
            where: { id },
            data: { talentPriority: { set: talentPriority } },
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return c;
    },
    updateCharacterArtifactStats: async (_, args, context) => {
        requireAdmin(context);
        const { id, sands, goblet, circlet, subStatsPriority } = sanitize(args);
        console.log("updateCharacterArtifactStats called for characterId:", id, "args:", args);
        // Update the character directly
        await prisma_1.prisma.character.update({
            where: { id },
            data: {
                sands: { set: sands },
                goblet: { set: goblet },
                circlet: { set: circlet },
                subStatsPriority: { set: subStatsPriority }
            },
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return true;
    },
    updateCharacterStats: async (_, { id, stats }, context) => {
        requireAdmin(context);
        const c = await prisma_1.prisma.character.update({
            where: { id },
            data: { stats }
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return c;
    },
    updateCharacterAscensionMats: async (_, { id, ascensionMats }, context) => {
        requireAdmin(context);
        const c = await prisma_1.prisma.character.update({
            where: { id },
            data: { ascensionMats }
        });
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return c;
    },
    generateCharacterAI: async (_, { nameEn }, context) => {
        requireAdmin(context);
        const { generateCharacterBuild } = require('./aiService');
        const axios = require('axios');
        const { data: enData } = await axios.get('https://gi.yatta.moe/api/v2/en/avatar');
        const items = enData?.data?.items || {};
        let ambrId = null;
        let basicData = null;
        for (const key in items) {
            if (items[key].name.toLowerCase() === nameEn.toLowerCase()) {
                ambrId = key;
                basicData = items[key];
                break;
            }
        }
        if (!ambrId)
            throw new Error('Character not found in Yatta API');
        const { data: detailData } = await axios.get(`https://gi.yatta.moe/api/v2/en/avatar/${ambrId}`);
        const detail = detailData.data;
        const aiResult = await generateCharacterBuild(basicData.name, basicData.element, basicData.weaponType);
        const charId = basicData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const avatarUrl = `/assets/characters/UI_AvatarIcon_${basicData.icon.replace('UI_AvatarIcon_', '')}_avatar.webp`;
        const splashArtUrl = `/assets/characters/UI_Gacha_AvatarImg_${basicData.icon.replace('UI_AvatarIcon_', '')}_splash.webp`;
        const charData = {
            id: charId,
            nameEn: basicData.name,
            nameVi: basicData.name,
            titleEn: basicData.route || basicData.name,
            titleVi: basicData.route || basicData.name,
            element: basicData.element,
            rarity: basicData.rank || 5,
            weapon: basicData.weaponType.replace('WEAPON_', '').replace('_ONE_HAND', '').replace('_TWO_HAND', ''),
            region: basicData.region || 'Other',
            avatarUrl,
            splashArtUrl,
            descriptionEn: detail.description || '',
            descriptionVi: detail.description || '',
            baseHp: Math.round(detail.upgrade.prop.find((p) => p.propType === 'FIGHT_PROP_BASE_HP')?.initValue * 12) || 10000,
            baseAtk: Math.round(detail.upgrade.prop.find((p) => p.propType === 'FIGHT_PROP_BASE_ATTACK')?.initValue * 12) || 300,
            baseDef: Math.round(detail.upgrade.prop.find((p) => p.propType === 'FIGHT_PROP_BASE_DEFENSE')?.initValue * 12) || 700,
            talentPriority: aiResult.talentPriority || [],
            tier: aiResult.tier,
            role: aiResult.role,
            recommendedC: aiResult.recommendedC,
            tierNoteEn: aiResult.tierNoteEn,
            tierNoteVi: aiResult.tierNoteVi,
            sands: aiResult.sands || (aiResult.bestArtifacts && aiResult.bestArtifacts[0]?.sands) || [],
            goblet: aiResult.goblet || (aiResult.bestArtifacts && aiResult.bestArtifacts[0]?.goblet) || [],
            circlet: aiResult.circlet || (aiResult.bestArtifacts && aiResult.bestArtifacts[0]?.circlet) || [],
            subStatsPriority: aiResult.subStatsPriority || (aiResult.bestArtifacts && aiResult.bestArtifacts[0]?.subStatsPriority) || [],
        };
        const updatedChar = await prisma_1.prisma.character.upsert({
            where: { id: charId },
            update: charData,
            create: charData,
        });
        if (aiResult.bestWeapons) {
            await prisma_1.prisma.characterWeapon.deleteMany({ where: { characterId: charId } });
            for (const w of aiResult.bestWeapons) {
                let dbWeapon = await prisma_1.prisma.weapon.findFirst({ where: { OR: [{ nameEn: w.nameEn }, { nameVi: w.nameVi }] } });
                await prisma_1.prisma.characterWeapon.create({
                    data: {
                        characterId: charId,
                        weaponId: dbWeapon ? dbWeapon.id : w.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        nameEn: w.nameEn,
                        nameVi: w.nameVi,
                        rank: Number(w.rank) || 4,
                        isF2P: w.isF2P === true,
                        iconUrl: dbWeapon?.iconUrl || '',
                        subStat: w.subStat || dbWeapon?.subStat || '',
                        passiveDescEn: w.passiveDescEn || '',
                        passiveDescVi: w.passiveDescVi || '',
                        refinement: 1
                    }
                });
            }
        }
        if (aiResult.bestArtifacts) {
            await prisma_1.prisma.characterArtifact.deleteMany({ where: { characterId: charId } });
            for (let i = 0; i < aiResult.bestArtifacts.length; i++) {
                const a = aiResult.bestArtifacts[i];
                await prisma_1.prisma.characterArtifact.create({
                    data: {
                        characterId: charId,
                        setNameEn: a.setNameEn,
                        setNameVi: a.setNameVi,
                        pieces: Number(a.pieces) || 4,
                        order: i
                    }
                });
            }
        }
        if (aiResult.teams) {
            await prisma_1.prisma.characterTeam.deleteMany({ where: { characterId: charId } });
            for (let i = 0; i < aiResult.teams.length; i++) {
                const t = aiResult.teams[i];
                await prisma_1.prisma.characterTeam.create({
                    data: {
                        characterId: charId,
                        name: t.name,
                        rank: t.rank || 'A',
                        description: t.description || '',
                        order: i,
                        members: {
                            create: t.members.map((m, index) => ({
                                characterId: m.characterId,
                                role: m.role || '',
                                roleDesc: m.roleDesc || '',
                                weapons: m.weapons || [],
                                artifacts: m.artifacts || [],
                                substats: m.substats || [],
                                order: index
                            }))
                        }
                    }
                });
            }
        }
        (0, cache_1.clearAllCaches)();
        (0, resolvers_1.resetArtifactSetLookup)();
        debouncedExport();
        debouncedBackup();
        return await prisma_1.prisma.character.findUnique({
            where: { id: charId },
            include: {
                bestWeapons: true,
                bestArtifacts: true,
                teams: { include: { members: true } }
            }
        });
    },
    exportDatabaseToSeeds: async (_, __, context) => {
        requireAdmin(context);
        return await (0, exportData_1.exportDatabaseToSeeds)();
    }
};
