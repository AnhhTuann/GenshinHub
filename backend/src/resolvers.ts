// Nodemon trigger
import axios from 'axios';
import { charactersCache, characterCache, weaponsCache, showcaseCache, artifactsCache, materialsCache } from './cache';
import { Mutation } from './mutations';
import GraphQLJSON from 'graphql-type-json';
import { prisma } from './prisma';

// Map mix set name → component set Vietnamese names
const mixSetsMap: Record<string, string[]> = {
  "Mix 2 bộ Trái Tim Trầm Luân & 2 bộ Thiên Nham Vững Chắc": ["Trái Tim Trầm Luân", "Thiên Nham Vững Chắc"],
  "Mix 2 bộ Nghi Thức Tông Thất Cổ & 2 bộ Thiên Nham Vững Chắc": ["Nghi Thức Tông Thất Cổ", "Thiên Nham Vững Chắc"],
  "Mix 2 bộ Giấc Mộng Hoàng Kim & 2 bộ Thiên Nham Vững Chắc": ["Giấc Mộng Hoàng Kim", "Thiên Nham Vững Chắc"],
  "Mix 2 bộ Sát Thương Hỏa & 2 bộ Tinh Thông / HP": ["Diệm Liệt Ma Nữ Cháy Rực", "Đoàn Hát Lang Thang Đại Lục", "Thiên Nham Vững Chắc"],
  "Mix 2 bộ Lôi & Tông Thất & Tấn Công & Dấu Ấn": ["Như Sấm Thịnh Nộ", "Nghi Thức Tông Thất Cổ", "Lễ Bế Mạc Của Giác Đấu Sĩ", "Dấu Ấn Ngăn Cách"],
  "Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Thiên Nham Vững Chắc": ["Vầng Sáng Vourukasha", "Thiên Nham Vững Chắc"],
  "Mix 2 bộ Thiên Nham Vững Chắc & 2 bộ Giấc Mộng Hoàng Kim": ["Thiên Nham Vững Chắc", "Giấc Mộng Hoàng Kim"],
  "Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Giấc Mộng Hoàng Kim": ["Vầng Sáng Vourukasha", "Giấc Mộng Hoàng Kim"],
  "Mix 2 bộ Thủy / HP / Thợ Săn": ["Trái Tim Trầm Luân", "Thiên Nham Vững Chắc", "Thợ Săn Marechaussee"],
  "Mix 2 bộ Thủy / Đoàn Kịch / HP / Dấu Ấn": ["Trái Tim Trầm Luân", "Đoàn Kịch Hoàng Kim", "Thiên Nham Vững Chắc", "Dấu Ấn Ngăn Cách"],
  "Mix 2 bộ Lửa Trắng Xám / Kỵ Sĩ Đạo Nhuốm Máu": ["Lửa Trắng Xám", "Kỵ Sĩ Đạo Nhuốm Máu"],
  "Mix 2 bộ Dấu Ấn / Lửa Trắng Xám / Kỵ Sĩ": ["Dấu Ấn Ngăn Cách", "Physical DMG +25% set"],
  "Mix 2 bộ Vật Lý / Tấn Công / Tông Thất / Giáp": ["Lửa Trắng Xám", "Lễ Bế Mạc Của Giác Đấu Sĩ", "Nghi Thức Tông Thất Cổ", "Thiên Nham Vững Chắc"],
  "Mix 2 bộ Dấu Ấn / HP / Thủy / Tông Thất": ["Dấu Ấn Ngăn Cách", "Thiên Nham Vững Chắc", "Trái Tim Trầm Luân", "Nghi Thức Tông Thất Cổ"],
  "Mix 2 bộ Tinh Thông & 2 bộ Ký Ức Rừng Sâu": ["Đoàn Hát Lang Thang Đại Lục", "Ký Ức Rừng Sâu"],
  "Mix 2 bộ Tấn Công / Ma Nữ / Thợ Săn": ["Lễ Bế Mạc Của Giác Đấu Sĩ", "Diệm Liệt Ma Nữ Cháy Rực", "Thợ Săn Marechaussee"],
  "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công": ["Diệm Liệt Ma Nữ Cháy Rực", "Đoàn Hát Lang Thang Đại Lục", "Lễ Bế Mạc Của Giác Đấu Sĩ"],
  "Mix 2 bộ Tinh Thông / Dấu Ấn": ["Đoàn Hát Lang Thang Đại Lục", "Dấu Ấn Ngăn Cách"],
  "Mix 2 bộ Ma Nữ / Tông Thất / Tấn Công": ["Diệm Liệt Ma Nữ Cháy Rực", "Nghi Thức Tông Thất Cổ", "Lễ Bế Mạc Của Giác Đấu Sĩ"],
  "Mix 2 bộ Tấn Công / Hiệu Quả Nạp": ["Lễ Bế Mạc Của Giác Đấu Sĩ", "Dấu Ấn Ngăn Cách"],
  "Mix 2 món Ma Nữ / Tông Thất / Tấn Công / Tinh Thông / Dấu Ấn": ["Diệm Liệt Ma Nữ Cháy Rực", "Nghi Thức Tông Thất Cổ", "Lễ Bế Mạc Của Giác Đấu Sĩ", "Đoàn Hát Lang Thang Đại Lục", "Dấu Ấn Ngăn Cách"],
  "Mix 2 bộ Ma Nữ / Tấn Công / Tinh Thông / Hiệu Quả Nạp": ["Diệm Liệt Ma Nữ Cháy Rực", "Lễ Bế Mạc Của Giác Đấu Sĩ", "Đoàn Hát Lang Thang Đại Lục", "Dấu Ấn Ngăn Cách"],
  "Mix 2 bộ Hiệu Quả Nạp +20%": ["Dấu Ấn Ngăn Cách", "Kẻ Lưu Đày", "Học Sĩ"],
  "Mix 2 bộ Thủy & 2 bộ Tấn Công": ["Trái Tim Trầm Luân", "Giấc Mộng Thủy Tiên", "Lễ Bế Mạc Của Giác Đấu Sĩ", "Dòng Hồi Ức Bất Tận", "Dư Âm Tế Lễ", "Thần Sa Vãng Sinh Lục"],
  "Mix 2 bộ Trị Liệu / Thủy / HP": ["Thiếu Nữ Đáng Yêu", "Xà Cừ Đại Dương", "Trái Tim Trầm Luân", "Giấc Mộng Thủy Tiên", "Thiên Nham Vững Chắc", "Vầng Sáng Vourukasha"],
};

// Collect all unique artifact set names from a mix map key
function getAllMixComponentNames(): string[] {
  const names = new Set<string>();
  for (const components of Object.values(mixSetsMap)) {
    for (const name of components) {
      if (name !== "Physical DMG +25% set") names.add(name);
    }
  }
  return Array.from(names);
}

// LRU Caches are now imported from ./cache

// Pre-warm artifact set lookup cache (all sets + mix components in 1 query)
let artifactSetLookup: Record<string, any> | null = null;
export function resetArtifactSetLookup() { artifactSetLookup = null; }
async function getArtifactSetLookup(): Promise<Record<string, any>> {
  if (artifactSetLookup) return artifactSetLookup;
  const sets = await prisma.artifactSet.findMany();
  const lookup: Record<string, any> = {};
  for (const s of sets) {
    lookup[s.nameVi] = s;
    lookup[s.nameEn] = s;
  }
  artifactSetLookup = lookup;
  return lookup;
}

// Enrich a character's bestArtifacts using a pre-loaded artifact lookup (no extra DB calls)
async function enrichArtifacts(artifacts: any[], setLookup: Record<string, any>) {
  return artifacts.map((a: any) => {
    const isMix = a.setNameVi?.startsWith("Mix") || a.setNameEn?.startsWith("Mix");
    const dbArtifact = setLookup[a.setNameVi] || setLookup[a.setNameEn];

    let mixSets: any[] = [];
    let matchedComponents = mixSetsMap[a.setNameVi];
    
    // Dynamic mix parsing for newly created mixes
    if (isMix && !matchedComponents) {
      const cleanedEn = a.setNameEn.replace("Mix 2-Piece ", "").replace("Mix 2 bộ ", "");
      const cleanedVi = a.setNameVi.replace("Mix 2 bộ ", "").replace("Mix 2-Piece ", "");
      
      const partsEn = cleanedEn.split(/ & 2-Piece | & 2 bộ /);
      const partsVi = cleanedVi.split(/ & 2 bộ | & 2-Piece /);
      
      // Prefer Vi names for internal lookup matching, but fallback to En
      matchedComponents = partsVi.length >= 2 ? partsVi : partsEn;
    }

    if (matchedComponents) {
      mixSets = matchedComponents.map((cName: string) => {
        if (cName === "Physical DMG +25% set") {
          return {
            nameEn: "Physical DMG +25% set",
            nameVi: "Bộ Sát Thương Vật Lý +25%",
            iconUrl: "/images/artifacts/UI_RelicIcon_15008_4.png",
            artifactSetId: "15008",
          };
        }
        const compDb = setLookup[cName];
        return {
          nameEn: compDb?.nameEn || cName,
          nameVi: compDb?.nameVi || cName,
          iconUrl: compDb?.iconUrl || null,
          artifactSetId: compDb?.id || "",
        };
      });
    }

    return {
      ...a,
      setNameEn: dbArtifact?.nameEn || a.setNameEn,
      setNameVi: dbArtifact?.nameVi || a.setNameVi,
      iconUrl: isMix ? "/images/artifacts/UI_RelicIcon_15001_4.png" : (dbArtifact?.iconUrl || null),
      rarity: dbArtifact ? Math.max(...dbArtifact.rarityList) : (a.rarity ?? 5),
      artifactSetId: dbArtifact?.id || null,
      mixSets,
    };
  });
}

// Enrich bestWeapons using a pre-loaded weapon lookup (no extra DB calls)
function enrichWeapons(weapons: any[], weaponByName: Record<string, any>) {
  return weapons
    .map((w: any) => {
      const dbWeapon = weaponByName[w.nameVi] || weaponByName[w.nameEn];
      return {
        ...w,
        id: w.id || w.weaponId || dbWeapon?.id,
        iconUrl: dbWeapon?.iconUrl || w.iconUrl,
        rarity: dbWeapon?.rarity ?? w.rarity,
        subStat: dbWeapon?.subStat || w.subStat,
        nameEn: dbWeapon?.nameEn || w.nameEn || w.nameVi,
        nameVi: dbWeapon?.nameVi || w.nameVi,
      };
    })
    .sort((a: any, b: any) => a.rank - b.rank);
}

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    characters: async () => {
      const cached = charactersCache.get('all_basic');
      if (cached) return cached;
      const data = await prisma.character.findMany({
        orderBy: [{ rarity: 'desc' }, { nameEn: 'asc' }],
      });
      charactersCache.set('all_basic', data);
      return data;
    },

    character: async (_: any, args: { id: string }) => {
      const cached = characterCache.get(args.id);
      if (cached) return cached;

      const data = await prisma.character.findUnique({
        where: { id: args.id },
        include: { bestWeapons: true, bestArtifacts: { orderBy: { order: 'asc' } }, teams: { include: { members: true }, orderBy: { order: 'asc' } } },
      });
      if (!data) return null;

      // --- BATCH: Load all needed weapons in 1 query ---
      const weaponNames = data.bestWeapons
        .map((w: any) => [w.nameVi, w.nameEn])
        .flat()
        .filter(Boolean);
      const weaponRecords = weaponNames.length > 0
        ? await prisma.weapon.findMany({
            where: { OR: [{ nameVi: { in: weaponNames } }, { nameEn: { in: weaponNames } }] },
          })
        : [];
      const weaponByName: Record<string, any> = {};
      for (const w of weaponRecords) {
        if (w.nameVi) weaponByName[w.nameVi] = w;
        if (w.nameEn) weaponByName[w.nameEn] = w;
      }

      // --- BATCH: Use pre-warmed artifact set lookup (1 global query, cached) ---
      const setLookup = await getArtifactSetLookup();

      const enriched = {
        ...data,
        bestWeapons: enrichWeapons(data.bestWeapons, weaponByName),
        bestArtifacts: await enrichArtifacts(data.bestArtifacts, setLookup),
      };

      characterCache.set(args.id, enriched);
      return enriched;
    },

    weapons: async () => {
      const cached = weaponsCache.get('all');
      if (cached) return cached;
      const data = await prisma.weapon.findMany({
        orderBy: [{ rarity: 'desc' }, { nameEn: 'asc' }],
      });
      weaponsCache.set('all', data);
      return data;
    },

    weapon: async (_: any, args: { id: string }) => {
      return await prisma.weapon.findUnique({ where: { id: args.id } });
    },

    charactersByWeaponType: async (_: any, args: { weaponType: string }) => {
      return await prisma.character.findMany({
        where: { weapon: args.weaponType },
        select: { id: true, nameEn: true, nameVi: true, element: true, rarity: true, avatarUrl: true, weapon: true },
        orderBy: [{ rarity: 'desc' }, { nameEn: 'asc' }],
      });
    },

    artifacts: async () => {
      const cached = artifactsCache.get('all');
      if (cached) return cached;
      const data = await prisma.artifactSet.findMany({ orderBy: [{ id: 'asc' }] });
      artifactsCache.set('all', data);
      return data;
    },

    artifactSet: async (_: any, args: { id: string }) => {
      return await prisma.artifactSet.findUnique({ where: { id: args.id } });
    },

    materials: async () => {
      const cached = materialsCache.get('all');
      if (cached) return cached;
      const data = await prisma.material.findMany({ orderBy: { nameEn: 'asc' } });
      materialsCache.set('all', data);
      return data;
    },

    showcase: async (_: any, args: { uid: string }) => {
      const cached = showcaseCache.get(args.uid);
      if (cached) return cached;
      try {
        const response = await axios.get(`https://enka.network/api/uid/${args.uid}`);
        const data = response.data;
        const result = {
          uid: args.uid,
          nickname: data.playerInfo?.nickname || 'Unknown',
          level: data.playerInfo?.level || 1,
          avatarUrl: data.playerInfo?.profilePicture?.avatarId ? `/images/avatars/UI_AvatarIcon_${data.playerInfo.profilePicture.avatarId}.png` : null,
          characters: data.avatarInfoList?.map((a: any) => a.avatarId.toString()) || [],
        };
        showcaseCache.set(args.uid, result);
        return result;
      } catch (error) {
        console.error("Lỗi fetch Enka:", error);
        return null;
      }
    }
  },
  Character: {
    signatureWeapons: async (parent: any) => {
      if (!parent.signatureWeapons || parent.signatureWeapons.length === 0) return [];
      return prisma.weapon.findMany({ where: { nameEn: { in: parent.signatureWeapons } } });
    },
    bestWeapons: async (parent: any) => {
      if (parent.bestWeapons) return parent.bestWeapons;
      return prisma.characterWeapon.findMany({ where: { characterId: parent.id } });
    },
    bestArtifacts: async (parent: any) => {
      if (parent.bestArtifacts) return parent.bestArtifacts;
      return prisma.characterArtifact.findMany({ where: { characterId: parent.id } });
    }
  },
  Mutation
};
