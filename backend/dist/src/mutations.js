"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const client_1 = require("@prisma/client");
const exportData_1 = require("./exportData");
const prisma = new client_1.PrismaClient();
function requireAdmin(context) {
    if (!context.isAdmin)
        throw new Error("Unauthorized: Admin access required.");
}
exports.Mutation = {
    upsertWeapon: async (_, { input }, context) => {
        requireAdmin(context);
        const w = await prisma.weapon.upsert({
            where: { id: input.id },
            update: input,
            create: input,
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return w;
    },
    deleteWeapon: async (_, { id }, context) => {
        requireAdmin(context);
        await prisma.weapon.delete({ where: { id } });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    upsertArtifactSet: async (_, { input }, context) => {
        requireAdmin(context);
        const a = await prisma.artifactSet.upsert({
            where: { id: input.id },
            update: input,
            create: input,
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return a;
    },
    deleteArtifactSet: async (_, { id }, context) => {
        requireAdmin(context);
        await prisma.artifactSet.delete({ where: { id } });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    upsertMaterial: async (_, { input }, context) => {
        requireAdmin(context);
        await prisma.material.upsert({
            where: { id: input.id },
            update: input,
            create: input,
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    deleteMaterial: async (_, { id }, context) => {
        requireAdmin(context);
        await prisma.material.delete({ where: { id } });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    upsertCharacter: async (_, { input }, context) => {
        requireAdmin(context);
        // Extract relations
        const { bestWeapons, bestArtifacts, signatureWeapons, ...charData } = input;
        const data = {
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
        // Upsert base character
        const updatedChar = await prisma.character.upsert({
            where: { id: charData.id },
            update: data,
            create: data,
        });
        // Re-create relations if provided
        if (bestWeapons) {
            await prisma.characterWeapon.deleteMany({ where: { characterId: charData.id } });
            for (const w of bestWeapons) {
                let dbWeapon = await prisma.weapon.findFirst({ where: { OR: [{ nameEn: w.nameEn }, { nameVi: w.nameVi }] } });
                await prisma.characterWeapon.create({
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
            await prisma.characterArtifact.deleteMany({ where: { characterId: charData.id } });
            for (const a of bestArtifacts) {
                await prisma.characterArtifact.create({
                    data: {
                        characterId: charData.id,
                        setNameEn: a.setNameEn,
                        setNameVi: a.setNameVi,
                        pieces: a.pieces,
                        sands: a.sands,
                        goblet: a.goblet,
                        circlet: a.circlet,
                        subStatsPriority: a.subStatsPriority
                    }
                });
            }
        }
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return updatedChar;
    },
    deleteCharacter: async (_, { id }, context) => {
        requireAdmin(context);
        // Delete relations first
        await prisma.characterWeapon.deleteMany({ where: { characterId: id } });
        await prisma.characterArtifact.deleteMany({ where: { characterId: id } });
        await prisma.character.delete({ where: { id } });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    // Character Detail Inline Edits
    updateCharacterSplashArt: async (_, { id, splashArtUrl }, context) => {
        requireAdmin(context);
        const c = await prisma.character.update({
            where: { id },
            data: { splashArtUrl },
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return c;
    },
    addCharacterTeam: async (_, { characterId, name, rank, description, members }, context) => {
        requireAdmin(context);
        await prisma.characterTeam.create({
            data: {
                characterId,
                name,
                rank,
                description,
                members: {
                    create: members.map((m) => ({
                        characterId: m.characterId,
                        role: m.role,
                        roleDesc: m.roleDesc,
                        weapons: m.weapons,
                        artifacts: m.artifacts,
                        substats: m.substats
                    }))
                }
            }
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    updateCharacterTeam: async (_, { teamId, name, rank, description, members }, context) => {
        requireAdmin(context);
        const team = await prisma.characterTeam.findUnique({ where: { id: teamId } });
        if (!team)
            throw new Error("Team not found");
        await prisma.characterTeam.update({
            where: { id: teamId },
            data: {
                name,
                rank,
                description,
                members: {
                    deleteMany: {},
                    create: members.map((m) => ({
                        characterId: m.characterId,
                        role: m.role,
                        roleDesc: m.roleDesc,
                        weapons: m.weapons,
                        artifacts: m.artifacts,
                        substats: m.substats
                    }))
                }
            }
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    removeCharacterTeam: async (_, { teamId }, context) => {
        requireAdmin(context);
        await prisma.characterTeam.delete({ where: { id: teamId } });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    updateCharacterTierList: async (_, { id, tier, role, recommendedC, tierNoteEn, tierNoteVi }, context) => {
        requireAdmin(context);
        const c = await prisma.character.update({
            where: { id },
            data: { tier, role, recommendedC, tierNoteEn, tierNoteVi },
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return c;
    },
    updateWeaponTierList: async (_, { id, tier }, context) => {
        requireAdmin(context);
        const w = await prisma.weapon.update({
            where: { id },
            data: { tier },
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return w;
    },
    addCharacterWeapon: async (_, { characterId, weaponId, rank, isF2P }, context) => {
        requireAdmin(context);
        const weapon = await prisma.weapon.findUnique({ where: { id: weaponId } });
        if (!weapon)
            throw new Error("Weapon not found");
        await prisma.characterWeapon.create({
            data: {
                characterId,
                weaponId,
                nameEn: weapon.nameEn,
                nameVi: weapon.nameVi,
                rank,
                isF2P,
                iconUrl: weapon.iconUrl,
            }
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    removeCharacterWeapon: async (_, { id }, context) => {
        requireAdmin(context);
        await prisma.characterWeapon.delete({ where: { id } });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    addCharacterArtifact: async (_, args, context) => {
        requireAdmin(context);
        const { characterId, setNameEn, setNameVi, pieces, sands, goblet, circlet, subStatsPriority } = args;
        await prisma.characterArtifact.create({
            data: {
                characterId,
                setNameEn,
                setNameVi,
                pieces,
                sands,
                goblet,
                circlet,
                subStatsPriority
            }
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    removeCharacterArtifact: async (_, { id }, context) => {
        requireAdmin(context);
        await prisma.characterArtifact.delete({ where: { id } });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    updateCharacterTalents: async (_, { id, talentPriority }, context) => {
        requireAdmin(context);
        const c = await prisma.character.update({
            where: { id },
            data: { talentPriority },
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return c;
    },
    updateCharacterArtifactStats: async (_, { id, sands, goblet, circlet, subStatsPriority }, context) => {
        requireAdmin(context);
        await prisma.characterArtifact.update({
            where: { id },
            data: { sands, goblet, circlet, subStatsPriority },
        });
        (0, exportData_1.exportDatabaseToSeeds)().catch(console.error);
        return true;
    },
    exportDatabaseToSeeds: async (_, __, context) => {
        requireAdmin(context);
        return await (0, exportData_1.exportDatabaseToSeeds)();
    }
};
