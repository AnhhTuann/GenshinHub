import { prisma } from './src/prisma';
import axios from 'axios';

async function insertAloy() {
  const { data: enData } = await axios.get('https://gi.yatta.moe/api/v2/en/avatar');
  const items = enData?.data?.items || {};
  let ambrId = null;
  let basicData = null;
  for (const key in items) {
    if (items[key].name.toLowerCase() === 'aloy') {
      ambrId = key;
      basicData = items[key];
      break;
    }
  }

  if (!ambrId) throw new Error('Aloy not found in Yatta API');
  const { data: detailData } = await axios.get(`https://gi.yatta.moe/api/v2/en/avatar/${ambrId}`);
  const detail = detailData.data;

  const charId = 'aloy';
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
    baseHp: Math.round(detail.upgrade.prop.find((p:any)=>p.propType==='FIGHT_PROP_BASE_HP')?.initValue * 12) || 10899,
    baseAtk: Math.round(detail.upgrade.prop.find((p:any)=>p.propType==='FIGHT_PROP_BASE_ATTACK')?.initValue * 12) || 234,
    baseDef: Math.round(detail.upgrade.prop.find((p:any)=>p.propType==='FIGHT_PROP_BASE_DEFENSE')?.initValue * 12) || 676,
    talentPriority: ["Elemental Burst", "Elemental Skill", "Normal Attack"],
    tier: "C",
    role: "Sub DPS",
    recommendedC: "C0",
    tierNoteEn: [],
    tierNoteVi: [],
  };

  await prisma.character.upsert({
    where: { id: charId },
    update: charData,
    create: charData,
  });

  const bestWeapons = [
    { nameEn: "Thundering Pulse", rank: 1, isF2P: false },
    { nameEn: "Polar Star", rank: 2, isF2P: false },
    { nameEn: "Skyward Harp", rank: 3, isF2P: false },
    { nameEn: "The Stringless", rank: 4, isF2P: false },
    { nameEn: "The Viridescent Hunt", rank: 5, isF2P: false },
  ];

  await prisma.characterWeapon.deleteMany({ where: { characterId: charId } });
  for (const w of bestWeapons) {
    let dbWeapon = await prisma.weapon.findFirst({ where: { nameEn: w.nameEn } });
    await prisma.characterWeapon.create({
      data: {
        characterId: charId,
        weaponId: dbWeapon ? dbWeapon.id : w.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        nameEn: w.nameEn,
        nameVi: w.nameEn,
        rank: w.rank,
        isF2P: w.isF2P,
        iconUrl: dbWeapon?.iconUrl || '',
        subStat: dbWeapon?.subStat || '',
        passiveDescEn: '',
        passiveDescVi: '',
        refinement: 1
      }
    });
  }

  const bestArtifacts = [
    { setNameEn: "Noblesse Oblige", setNameVi: "Nghi Thức Tông Thất Cổ", pieces: 4, sands: ["ATK%"], goblet: ["Cryo DMG Bonus"], circlet: ["CRIT Rate", "CRIT DMG"] },
    { setNameEn: "Blizzard Strayer", setNameVi: "Dũng Sĩ Trong Băng Giá", pieces: 2, sands: ["ATK%"], goblet: ["Cryo DMG Bonus"], circlet: ["CRIT Rate", "CRIT DMG"] },
    { setNameEn: "Emblem of Severed Fate", setNameVi: "Dấu Ấn Ngăn Cách", pieces: 4, sands: ["ATK%", "ER"], goblet: ["Cryo DMG Bonus"], circlet: ["CRIT Rate", "CRIT DMG"] },
  ];

  await prisma.characterArtifact.deleteMany({ where: { characterId: charId } });
  for (let i = 0; i < bestArtifacts.length; i++) {
    const a = bestArtifacts[i];
    await prisma.characterArtifact.create({
      data: {
        characterId: charId,
        setNameEn: a.setNameEn,
        setNameVi: a.setNameVi,
        pieces: a.pieces,
        sands: a.sands,
        goblet: a.goblet,
        circlet: a.circlet,
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "ER"],
        order: i
      }
    });
  }

  const teams = [
    { name: "Ayaka Freeze", rank: "A", description: "Ayaka Freeze with Aloy as battery", members: [
      { characterId: "ayaka", role: "Main DPS", roleDesc: "", weapons: [], artifacts: [], substats: [] },
      { characterId: "aloy", role: "Sub DPS/Battery", roleDesc: "", weapons: [], artifacts: [], substats: [] },
      { characterId: "kokomi", role: "Healer/Hydro Applier", roleDesc: "", weapons: [], artifacts: [], substats: [] },
      { characterId: "venti", role: "Crowd Control/VV", roleDesc: "", weapons: [], artifacts: [], substats: [] },
    ]},
    { name: "Ganyu Freeze", rank: "A", description: "Ganyu Freeze with Aloy as battery", members: [
      { characterId: "ganyu", role: "Main DPS", roleDesc: "", weapons: [], artifacts: [], substats: [] },
      { characterId: "aloy", role: "Sub DPS/Battery", roleDesc: "", weapons: [], artifacts: [], substats: [] },
      { characterId: "mona", role: "Buffer/Hydro Applier", roleDesc: "", weapons: [], artifacts: [], substats: [] },
      { characterId: "jean", role: "Healer/VV", roleDesc: "", weapons: [], artifacts: [], substats: [] },
    ]},
    { name: "Aloy Reverse Melt", rank: "A", description: "Aloy Reverse Melt with Xiangling", members: [
      { characterId: "bennett", role: "Buffer/Healer", roleDesc: "", weapons: [], artifacts: [], substats: [] },
      { characterId: "rosaria", role: "Sub DPS/Cryo Applier", roleDesc: "", weapons: [], artifacts: [], substats: [] },
      { characterId: "aloy", role: "Main DPS/Melt Trigger", roleDesc: "", weapons: [], artifacts: [], substats: [] },
      { characterId: "xiangling", role: "Off-field Pyro", roleDesc: "", weapons: [], artifacts: [], substats: [] },
    ]},
  ];

  await prisma.characterTeam.deleteMany({ where: { characterId: charId } });
  for (let i = 0; i < teams.length; i++) {
    const t = teams[i];
    await prisma.characterTeam.create({
      data: {
        characterId: charId,
        name: t.name,
        rank: t.rank,
        description: t.description,
        order: i,
        members: {
          create: t.members.map(m => ({
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
  }

  console.log("Aloy inserted successfully!");
}

insertAloy().catch(console.error).finally(() => prisma.$disconnect());
