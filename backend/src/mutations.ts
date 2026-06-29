import { prisma } from './prisma';
import { exportDatabaseToSeeds } from './exportData';
import { createJsonBackup } from './backupService';
import xss from 'xss';
import { clearAllCaches } from './cache';
import { resetArtifactSetLookup } from './resolvers';

// === Cơ chế cũ: Export .ts seed files (chỉ chạy ở dev) ===
let exportTimeout: NodeJS.Timeout | null = null;
function debouncedExport() {
  if (process.env.NODE_ENV === 'production') return; // Tắt trên production
  if (exportTimeout) clearTimeout(exportTimeout);
  exportTimeout = setTimeout(() => {
    exportDatabaseToSeeds().catch(console.error);
  }, 2000);
}

// === Cơ chế mới: JSON backup (chạy ở mọi môi trường) ===
let backupTimeout: NodeJS.Timeout | null = null;
function debouncedBackup() {
  if (backupTimeout) clearTimeout(backupTimeout);
  backupTimeout = setTimeout(() => {
    createJsonBackup().catch(console.error);
  }, 5000); // Debounce 5s để gom nhiều thay đổi
}
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
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return w;
  },
  deleteWeapon: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.weapon.delete({ where: { id } });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
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
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return a;
  },
  deleteArtifactSet: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.artifactSet.delete({ where: { id } });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
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
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return true;
  },
  deleteMaterial: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.material.delete({ where: { id } });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return true;
  },

  upsertCharacter: async (_: any, { input }: any, context: any) => {
    requireAdmin(context);
    const sanitizedInput = sanitize(input);
    
    // Extract relations
    const { bestWeapons, bestArtifacts, signatureWeapons, teams, ...charData } = sanitizedInput;
    
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
            subStatsPriority: a.subStatsPriority,
            order: a.order || 0
          }
        });
      }
    }

    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return updatedChar;
  },
  deleteCharacter: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    // Delete relations first
    await prisma.characterWeapon.deleteMany({ where: { characterId: id } });
    await prisma.characterArtifact.deleteMany({ where: { characterId: id } });
    await prisma.character.delete({ where: { id } });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return true;
  },

  // Character Detail Inline Edits
  updateCharacterSplashArt: async (_: any, { id, splashArtUrl }: any, context: any) => {
    requireAdmin(context);
    const c = await prisma.character.update({
      where: { id },
      data: { splashArtUrl },
    });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return c;
  },
  
  addCharacterTeam: async (_: any, args: any, context: any) => {
    requireAdmin(context);
    const { characterId, name, rank, description, members } = sanitize(args);
    const newTeam = await prisma.characterTeam.create({
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
      },
      include: {
        members: true
      }
    });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return newTeam;
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
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return true;
  },

  removeCharacterTeam: async (_: any, { teamId }: any, context: any) => {
    requireAdmin(context);
    const team = await prisma.characterTeam.findUnique({ where: { id: teamId } });
    if (!team) return false;
    await prisma.characterTeam.delete({ where: { id: teamId } });
    createJsonBackup();
    return true;
  },

  // === Dynamic Tiers ===
  addTierRank: async (_: any, args: { name: string, colorBase: string }) => {
    const count = await prisma.tierRank.count();
    const newTier = await prisma.tierRank.create({
      data: {
        name: args.name,
        colorBase: args.colorBase,
        order: count,
      }
    });
    createJsonBackup();
    return newTier;
  },
  
  updateTierRank: async (_: any, args: { id: string, name?: string, colorBase?: string }) => {
    const updated = await prisma.tierRank.update({
      where: { id: args.id },
      data: {
        ...(args.name && { name: args.name }),
        ...(args.colorBase && { colorBase: args.colorBase })
      }
    });
    createJsonBackup();
    return updated;
  },

  deleteTierRank: async (_: any, args: { id: string }) => {
    const tier = await prisma.tierRank.findUnique({ where: { id: args.id } });
    if (!tier) return false;
    
    // Unassign tier from characters and weapons
    await prisma.character.updateMany({
      where: { tier: tier.name },
      data: { tier: null }
    });
    await prisma.weapon.updateMany({
      where: { tier: tier.name },
      data: { tier: null }
    });
    
    await prisma.tierRank.delete({ where: { id: args.id } });
    createJsonBackup();
    return true;
  },

  reorderTierRanks: async (_: any, args: { tierIds: string[] }) => {
    const { tierIds } = args;
    const transactions = tierIds.map((id, index) => 
      prisma.tierRank.update({ where: { id }, data: { order: index } })
    );
    await prisma.$transaction(transactions);
    createJsonBackup();
    return true;
  },

  reorderCharacterTeams: async (_: any, args: { teamIds: string[] }, context: any) => {
    requireAdmin(context);
    const updates = args.teamIds.map((id: string, index: number) => 
      prisma.characterTeam.update({ where: { id }, data: { order: index } })
    );
    await prisma.$transaction(updates);
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return true;
  },

  reorderCharacterWeapons: async (_: any, { weaponIds }: any, context: any) => {
    requireAdmin(context);
    const updates = weaponIds.map((id: string, index: number) => 
      prisma.characterWeapon.update({ where: { id }, data: { rank: index } })
    );
    await prisma.$transaction(updates);
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return true;
  },

  reorderCharacterArtifacts: async (_: any, { artifactIds }: any, context: any) => {
    requireAdmin(context);
    const updates = artifactIds.map((id: string, index: number) => 
      prisma.characterArtifact.update({ where: { id }, data: { order: index } })
    );
    await prisma.$transaction(updates);
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return true;
  },
  
  updateCharacterTierList: async (_: any, args: any, context: any) => {
    requireAdmin(context);
    const { id, tier, role, recommendedC, tierNoteEn, tierNoteVi } = sanitize(args);
    const c = await prisma.character.update({
      where: { id },
      data: { tier, role, recommendedC, tierNoteEn, tierNoteVi },
    });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return c;
  },
  
  updateWeaponTierList: async (_: any, args: any, context: any) => {
    requireAdmin(context);
    const { id, tier, role } = sanitize(args);
    const w = await prisma.weapon.update({
      where: { id },
      data: { tier, role },
    });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
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
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return true;
  },

  removeCharacterWeapon: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.characterWeapon.delete({ where: { id } });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
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
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return true;
  },

  removeCharacterArtifact: async (_: any, { id }: any, context: any) => {
    requireAdmin(context);
    await prisma.characterArtifact.delete({ where: { id } });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return true;
  },

  updateCharacterTalents: async (_: any, { id, talentPriority }: any, context: any) => {
    requireAdmin(context);
    const c = await prisma.character.update({
      where: { id },
      data: { talentPriority },
    });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return c;
  },

  updateCharacterArtifactStats: async (_: any, args: any, context: any) => {
    requireAdmin(context);
    const { id, sands, goblet, circlet, subStatsPriority } = sanitize(args);
    await prisma.characterArtifact.update({
      where: { id },
      data: { sands, goblet, circlet, subStatsPriority },
    });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return true;
  },

  updateCharacterStats: async (_: any, { id, stats }: any, context: any) => {
    requireAdmin(context);
    const c = await prisma.character.update({
      where: { id },
      data: { stats }
    });
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    return c;
  },

  updateCharacterAscensionMats: async (_: any, { id, ascensionMats }: any, context: any) => {
    requireAdmin(context);
    const c = await prisma.character.update({
      where: { id },
      data: { ascensionMats }
    });
    clearAllCaches(); resetArtifactSetLookup(); debouncedExport(); debouncedBackup();
    return c;
  },
  
  generateCharacterAI: async (_: any, { nameEn }: any, context: any) => {
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
    
    if (!ambrId) throw new Error('Character not found in Yatta API');
    
    const { data: detailData } = await axios.get(`https://gi.yatta.moe/api/v2/en/avatar/${ambrId}`);
    const detail = detailData.data;
    
    const aiResult = await generateCharacterBuild(basicData.name, basicData.element, basicData.weaponType);
    
    const charId = basicData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const avatarUrl = `/images/avatars/UI_AvatarIcon_${basicData.icon.replace('UI_AvatarIcon_', '')}.png`;
    const splashArtUrl = `/images/splash/UI_Gacha_AvatarImg_${basicData.icon.replace('UI_AvatarIcon_', '')}.png`;
    
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
      baseHp: Math.round(detail.upgrade.prop.find((p:any)=>p.propType==='FIGHT_PROP_BASE_HP')?.initValue * 12) || 10000,
      baseAtk: Math.round(detail.upgrade.prop.find((p:any)=>p.propType==='FIGHT_PROP_BASE_ATTACK')?.initValue * 12) || 300,
      baseDef: Math.round(detail.upgrade.prop.find((p:any)=>p.propType==='FIGHT_PROP_BASE_DEFENSE')?.initValue * 12) || 700,
      talentPriority: aiResult.talentPriority || [],
      tier: aiResult.tier,
      role: aiResult.role,
      recommendedC: aiResult.recommendedC,
      tierNoteEn: aiResult.tierNoteEn,
      tierNoteVi: aiResult.tierNoteVi,
    };
    
    const updatedChar = await prisma.character.upsert({
      where: { id: charId },
      update: charData,
      create: charData,
    });
    
    if (aiResult.bestWeapons) {
      await prisma.characterWeapon.deleteMany({ where: { characterId: charId } });
      for (const w of aiResult.bestWeapons) {
        let dbWeapon = await prisma.weapon.findFirst({ where: { OR: [{ nameEn: w.nameEn }, { nameVi: w.nameVi }] } });
        await prisma.characterWeapon.create({
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
      await prisma.characterArtifact.deleteMany({ where: { characterId: charId } });
      for (let i = 0; i < aiResult.bestArtifacts.length; i++) {
        const a = aiResult.bestArtifacts[i];
        await prisma.characterArtifact.create({
          data: {
            characterId: charId,
            setNameEn: a.setNameEn,
            setNameVi: a.setNameVi,
            pieces: Number(a.pieces) || 4,
            sands: a.sands || [],
            goblet: a.goblet || [],
            circlet: a.circlet || [],
            subStatsPriority: a.subStatsPriority || [],
            order: i
          }
        });
      }
    }
    
    if (aiResult.teams) {
      await prisma.characterTeam.deleteMany({ where: { characterId: charId } });
      for (let i = 0; i < aiResult.teams.length; i++) {
        const t = aiResult.teams[i];
        await prisma.characterTeam.create({
          data: {
            characterId: charId,
            name: t.name,
            rank: t.rank || 'A',
            description: t.description || '',
            order: i,
            members: {
              create: t.members.map((m: any) => ({
                characterId: m.characterId,
                role: m.role || '',
                roleDesc: m.roleDesc || '',
                weapons: m.weapons || [],
                artifacts: m.artifacts || [],
                substats: m.substats || []
              }))
            }
          }
        });
      }
    }
    
    clearAllCaches();
    resetArtifactSetLookup();
    debouncedExport();
    debouncedBackup();
    
    return await prisma.character.findUnique({ 
      where: { id: charId },
      include: {
        bestWeapons: true,
        bestArtifacts: true,
        teams: { include: { members: true } }
      }
    });
  },

  exportDatabaseToSeeds: async (_: any, __: any, context: any) => {
    requireAdmin(context);
    return await exportDatabaseToSeeds();
  }
};
