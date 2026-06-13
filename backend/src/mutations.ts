import { PrismaClient } from '@prisma/client';
import { exportDatabaseToSeeds } from './exportData';

const prisma = new PrismaClient();

function requireAdmin(context: any) {
  if (!context.isAdmin) throw new Error("Unauthorized: Admin access required.");
}

export const Mutation = {
  upsertWeapon: async (_: any, { input }: any, context: any) => {
    requireAdmin(context);
    return await prisma.weapon.upsert({
      where: { id: input.id },
      update: input,
      create: input,
    });
  },
  deleteWeapon: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.weapon.delete({ where: { id } });
    return true;
  },

  upsertArtifactSet: async (_: any, { input }: any, context: any) => {
    requireAdmin(context);
    return await prisma.artifactSet.upsert({
      where: { id: input.id },
      update: input,
      create: input,
    });
  },
  deleteArtifactSet: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.artifactSet.delete({ where: { id } });
    return true;
  },

  upsertMaterial: async (_: any, { input }: any, context: any) => {
    requireAdmin(context);
    await prisma.material.upsert({
      where: { id: input.id },
      update: input,
      create: input,
    });
    return true;
  },
  deleteMaterial: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.material.delete({ where: { id } });
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

    return updatedChar;
  },
  deleteCharacter: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    // Delete relations first
    await prisma.characterWeapon.deleteMany({ where: { characterId: id } });
    await prisma.characterArtifact.deleteMany({ where: { characterId: id } });
    await prisma.character.delete({ where: { id } });
    return true;
  },

  // Character Detail Inline Edits
  updateCharacterSplashArt: async (_: any, { id, splashArtUrl }: any, context: any) => {
    requireAdmin(context);
    return await prisma.character.update({
      where: { id },
      data: { splashArtUrl },
    });
  },
  
  updateCharacterTeams: async (_: any, { id, teams }: any, context: any) => {
    requireAdmin(context);
    return await prisma.character.update({
      where: { id },
      data: { bestTeams: teams },
    });
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
    return true;
  },

  removeCharacterWeapon: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.characterWeapon.delete({ where: { id } });
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
    return true;
  },

  removeCharacterArtifact: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.characterArtifact.delete({ where: { id } });
    return true;
  },

  exportDatabaseToSeeds: async (_: any, __: any, context: any) => {
    requireAdmin(context);
    return await exportDatabaseToSeeds();
  }
};
