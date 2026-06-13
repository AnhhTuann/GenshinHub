import { PrismaClient } from '@prisma/client';
import { exportDatabaseToSeeds } from './exportData';

const prisma = new PrismaClient();

function requireAdmin(context: any) {
  if (!context.isAdmin) throw new Error("Unauthorized: Admin access required.");
}

export const Mutation = {
  upsertWeapon: async (_: any, { input }: any, context: any) => {
    requireAdmin(context);
    const w = await prisma.weapon.upsert({
      where: { id: input.id },
      update: input,
      create: input,
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
    const a = await prisma.artifactSet.upsert({
      where: { id: input.id },
      update: input,
      create: input,
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
    await prisma.material.upsert({
      where: { id: input.id },
      update: input,
      create: input,
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
    
    // Extract relations
    const { bestWeapons, bestArtifacts, ...charData } = input;
    
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
      bestTeams: charData.bestTeams || [],
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
  
  updateCharacterTeams: async (_: any, { id, teams }: any, context: any) => {
    requireAdmin(context);
    const c = await prisma.character.update({
      where: { id },
      data: { bestTeams: teams },
    });
    exportDatabaseToSeeds().catch(console.error);
    return c;
  },
  
  updateCharacterTierList: async (_: any, { id, tier, role, recommendedC, tierNoteEn, tierNoteVi }: any, context: any) => {
    requireAdmin(context);
    const c = await prisma.character.update({
      where: { id },
      data: { tier, role, recommendedC, tierNoteEn, tierNoteVi },
    });
    exportDatabaseToSeeds().catch(console.error);
    return c;
  },
  
  updateWeaponTierList: async (_: any, { id, tier }: any, context: any) => {
    requireAdmin(context);
    const w = await prisma.weapon.update({
      where: { id },
      data: { tier },
    });
    exportDatabaseToSeeds().catch(console.error);
    return w;
  },

  addCharacterWeapon: async (_: any, { characterId, weaponId, rank, isF2P }: any, context: any) => {
    requireAdmin(context);
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
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  removeCharacterArtifact: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.characterArtifact.delete({ where: { id } });
    exportDatabaseToSeeds().catch(console.error);
    return true;
  },

  exportDatabaseToSeeds: async (_: any, __: any, context: any) => {
    requireAdmin(context);
    return await exportDatabaseToSeeds();
  }
};
