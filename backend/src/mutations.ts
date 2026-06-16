import { PrismaClient } from '@prisma/client';
import { exportDatabaseToSeeds } from './exportData';
import xss from 'xss';

const prisma = new PrismaClient();

function sanitize(input: any): any {
  if (typeof input === 'string') return xss(input);
  if (Array.isArray(input)) return input.map(sanitize);
  if (typeof input === 'object' && input !== null) {
    const sanitizedObj: any = {};
    for (const key in input) {
      sanitizedObj[key] = sanitize(input[key]);
    }
    return sanitizedObj;
  }
  return input;
}

function requireAdmin(context: any) {
  if (!context.isAdmin) throw new Error("Unauthorized: Admin access required.");
}

export const Mutation = {
  upsertWeapon: async (_: any, { input }: any, context: any) => {
    requireAdmin(context);
    const sanitizedInput = sanitize(input);
    const w = await prisma.weapon.upsert({
      where: { id: sanitizedInput.id },
      update: sanitizedInput,
      create: sanitizedInput,
    });
    exportDatabaseToSeeds().catch(console.error);
    return w;
  },
  deleteWeapon: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.weapon.delete({ where: { id } });
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  upsertArtifactSet: async (_: any, { input }: any, context: any) => {
    requireAdmin(context);
    const sanitizedInput = sanitize(input);
    const a = await prisma.artifactSet.upsert({
      where: { id: sanitizedInput.id },
      update: sanitizedInput,
      create: sanitizedInput,
    });
    exportDatabaseToSeeds().catch(console.error);
    return a;
  },
  deleteArtifactSet: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.artifactSet.delete({ where: { id } });
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  upsertMaterial: async (_: any, { input }: any, context: any) => {
    requireAdmin(context);
    const sanitizedInput = sanitize(input);
    await prisma.material.upsert({
      where: { id: sanitizedInput.id },
      update: sanitizedInput,
      create: sanitizedInput,
    });
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },
  deleteMaterial: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.material.delete({ where: { id } });
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  upsertCharacter: async (_: any, { input }: any, context: any) => {
    requireAdmin(context);
    const sanitizedInput = sanitize(input);
    
    // Extract relations
    const { bestWeapons, bestArtifacts, signatureWeapons, ...charData } = sanitizedInput;
    
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

    exportDatabaseToSeeds().catch(console.error);
    return updatedChar;
  },
  deleteCharacter: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    // Delete relations first
    await prisma.characterWeapon.deleteMany({ where: { characterId: id } });
    await prisma.characterArtifact.deleteMany({ where: { characterId: id } });
    await prisma.character.delete({ where: { id } });
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  // Character Detail Inline Edits
  updateCharacterSplashArt: async (_: any, { id, splashArtUrl }: any, context: any) => {
    requireAdmin(context);
    const c = await prisma.character.update({
      where: { id },
      data: { splashArtUrl },
    });
    exportDatabaseToSeeds().catch(console.error);
    return c;
  },
  
  addCharacterTeam: async (_: any, args: any, context: any) => {
    requireAdmin(context);
    const { characterId, name, rank, description, members } = sanitize(args);
    await prisma.characterTeam.create({
      data: {
        characterId,
        name,
        rank,
        description,
        members: {
          create: members.map((m: any) => ({
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
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  updateCharacterTeam: async (_: any, args: any, context: any) => {
    requireAdmin(context);
    const { teamId, name, rank, description, members } = sanitize(args);
    const team = await prisma.characterTeam.findUnique({ where: { id: teamId } });
    if (!team) throw new Error("Team not found");

    await prisma.characterTeam.update({
      where: { id: teamId },
      data: {
        name,
        rank,
        description,
        members: {
          deleteMany: {},
          create: members.map((m: any) => ({
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
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  removeCharacterTeam: async (_: any, { teamId }: any, context: any) => {
    requireAdmin(context);
    await prisma.characterTeam.delete({ where: { id: teamId } });
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },
  
  updateCharacterTierList: async (_: any, args: any, context: any) => {
    requireAdmin(context);
    const { id, tier, role, recommendedC, tierNoteEn, tierNoteVi } = sanitize(args);
    const c = await prisma.character.update({
      where: { id },
      data: { tier, role, recommendedC, tierNoteEn, tierNoteVi },
    });
    exportDatabaseToSeeds().catch(console.error);
    return c;
  },
  
  updateWeaponTierList: async (_: any, args: any, context: any) => {
    requireAdmin(context);
    const { id, tier } = sanitize(args);
    const w = await prisma.weapon.update({
      where: { id },
      data: { tier },
    });
    exportDatabaseToSeeds().catch(console.error);
    return w;
  },

  addCharacterWeapon: async (_: any, args: any, context: any) => {
    requireAdmin(context);
    const { characterId, weaponId, rank, isF2P } = sanitize(args);
    const weapon = await prisma.weapon.findUnique({ where: { id: weaponId } });
    if (!weapon) throw new Error("Weapon not found");
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
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  removeCharacterWeapon: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.characterWeapon.delete({ where: { id } });
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  addCharacterArtifact: async (_: any, args: any, context: any) => {
    requireAdmin(context);
    const { characterId, setNameEn, setNameVi, pieces, sands, goblet, circlet, subStatsPriority } = sanitize(args);
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
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  removeCharacterArtifact: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.characterArtifact.delete({ where: { id } });
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  updateCharacterTalents: async (_: any, { id, talentPriority }: any, context: any) => {
    requireAdmin(context);
    const c = await prisma.character.update({
      where: { id },
      data: { talentPriority },
    });
    exportDatabaseToSeeds().catch(console.error);
    return c;
  },

  updateCharacterArtifactStats: async (_: any, args: any, context: any) => {
    requireAdmin(context);
    const { id, sands, goblet, circlet, subStatsPriority } = sanitize(args);
    await prisma.characterArtifact.update({
      where: { id },
      data: { sands, goblet, circlet, subStatsPriority },
    });
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  exportDatabaseToSeeds: async (_: any, __: any, context: any) => {
    requireAdmin(context);
    return await exportDatabaseToSeeds();
  }
};
