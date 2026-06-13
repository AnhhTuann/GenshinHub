import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { LRUCache } from 'lru-cache';

// Forced restart to flush caches after db seed - final v30
const prisma = new PrismaClient();

const mixSetsMap: { [key: string]: string[] } = {
  "Mix 2 bộ Trái Tim Trầm Luân & 2 bộ Thiên Nham Vững Chắc": [
    "Trái Tim Trầm Luân",
    "Thiên Nham Vững Chắc"
  ],
  "Mix 2 bộ Nghi Thức Tông Thất Cổ & 2 bộ Thiên Nham Vững Chắc": [
    "Nghi Thức Tông Thất Cổ",
    "Thiên Nham Vững Chắc"
  ],
  "Mix 2 bộ Giấc Mộng Hoàng Kim & 2 bộ Thiên Nham Vững Chắc": [
    "Giấc Mộng Hoàng Kim",
    "Thiên Nham Vững Chắc"
  ],
  "Mix 2 bộ Sát Thương Hỏa & 2 bộ Tinh Thông / HP": [
    "Diệm Liệt Ma Nữ Cháy Rực",
    "Đoàn Hát Lang Thang Đại Lục",
    "Thiên Nham Vững Chắc"
  ],
  "Mix 2 bộ Lôi & Tông Thất & Tấn Công & Dấu Ấn": [
    "Như Sấm Thịnh Nộ",
    "Nghi Thức Tông Thất Cổ",
    "Lễ Bế Mạc Của Giác Đấu Sĩ",
    "Dấu Ấn Ngăn Cách"
  ],
  "Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Thiên Nham Vững Chắc": [
    "Vầng Sáng Vourukasha",
    "Thiên Nham Vững Chắc"
  ],
  "Mix 2 bộ Thiên Nham Vững Chắc & 2 bộ Giấc Mộng Hoàng Kim": [
    "Thiên Nham Vững Chắc",
    "Giấc Mộng Hoàng Kim"
  ],
  "Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Giấc Mộng Hoàng Kim": [
    "Vầng Sáng Vourukasha",
    "Giấc Mộng Hoàng Kim"
  ],
  "Mix 2 bộ Thủy / HP / Thợ Săn": [
    "Trái Tim Trầm Luân",
    "Thiên Nham Vững Chắc",
    "Thợ Săn Marechaussee"
  ],
  "Mix 2 bộ Thủy / Đoàn Kịch / HP / Dấu Ấn": [
    "Trái Tim Trầm Luân",
    "Đoàn Kịch Hoàng Kim",
    "Thiên Nham Vững Chắc",
    "Dấu Ấn Ngăn Cách"
  ],
  "Mix 2 bộ Lửa Trắng Xám / Kỵ Sĩ Đạo Nhuốm Máu": [
    "Lửa Trắng Xám",
    "Kỵ Sĩ Đạo Nhuốm Máu"
  ],
  "Mix 2 bộ Dấu Ấn / Lửa Trắng Xám / Kỵ Sĩ": [
    "Dấu Ấn Ngăn Cách",
    "Physical DMG +25% set"
  ],
  "Mix 2 bộ Vật Lý / Tấn Công / Tông Thất / Giáp": [
    "Lửa Trắng Xám",
    "Lễ Bế Mạc Của Giác Đấu Sĩ",
    "Nghi Thức Tông Thất Cổ",
    "Thiên Nham Vững Chắc"
  ],
  "Mix 2 bộ Dấu Ấn / HP / Thủy / Tông Thất": [
    "Dấu Ấn Ngăn Cách",
    "Thiên Nham Vững Chắc",
    "Trái Tim Trầm Luân",
    "Nghi Thức Tông Thất Cổ"
  ],
  "Mix 2 bộ Tinh Thông & 2 bộ Ký Ức Rừng Sâu": [
    "Đoàn Hát Lang Thang Đại Lục",
    "Ký Ức Rừng Sâu"
  ],
  "Mix 2 bộ Tấn Công / Ma Nữ / Thợ Săn": [
    "Lễ Bế Mạc Của Giác Đấu Sĩ",
    "Diệm Liệt Ma Nữ Cháy Rực",
    "Thợ Săn Marechaussee"
  ],
  "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công": [
    "Diệm Liệt Ma Nữ Cháy Rực",
    "Đoàn Hát Lang Thang Đại Lục",
    "Lễ Bế Mạc Của Giác Đấu Sĩ"
  ],
  "Mix 2 bộ Tinh Thông / Dấu Ấn": [
    "Đoàn Hát Lang Thang Đại Lục",
    "Dấu Ấn Ngăn Cách"
  ],
  "Mix 2 bộ Ma Nữ / Tông Thất / Tấn Công": [
    "Diệm Liệt Ma Nữ Cháy Rực",
    "Nghi Thức Tông Thất Cổ",
    "Lễ Bế Mạc Của Giác Đấu Sĩ"
  ],
  "Mix 2 bộ Tấn Công / Hiệu Quả Nạp": [
    "Lễ Bế Mạc Của Giác Đấu Sĩ",
    "Dấu Ấn Ngăn Cách"
  ],
  "Mix 2 món Ma Nữ / Tông Thất / Tấn Công / Tinh Thông / Dấu Ấn": [
    "Diệm Liệt Ma Nữ Cháy Rực",
    "Nghi Thức Tông Thất Cổ",
    "Lễ Bế Mạc Của Giác Đấu Sĩ",
    "Đoàn Hát Lang Thang Đại Lục",
    "Dấu Ấn Ngăn Cách"
  ],
  "Mix 2 bộ Ma Nữ / Tấn Công / Tinh Thông / Hiệu Quả Nạp": [
    "Diệm Liệt Ma Nữ Cháy Rực",
    "Lễ Bế Mạc Của Giác Đấu Sĩ",
    "Đoàn Hát Lang Thang Đại Lục",
    "Dấu Ấn Ngăn Cách"
  ],
  "Mix 2 bộ Hiệu Quả Nạp +20%": [
    "Dấu Ấn Ngăn Cách",
    "Kẻ Lưu Đày",
    "Học Sĩ"
  ],
  "Mix 2 bộ Thủy & 2 bộ Tấn Công": [
    "Trái Tim Trầm Luân",
    "Giấc Mộng Thủy Tiên",
    "Lễ Bế Mạc Của Giác Đấu Sĩ",
    "Dòng Hồi Ức Bất Tận",
    "Dư Âm Tế Lễ",
    "Thần Sa Vãng Sinh Lục"
  ],
  "Mix 2 bộ Trị Liệu / Thủy / HP": [
    "Thiếu Nữ Đáng Yêu",
    "Xà Cừ Đại Dương",
    "Trái Tim Trầm Luân",
    "Giấc Mộng Thủy Tiên",
    "Thiên Nham Vững Chắc",
    "Vầng Sáng Vourukasha"
  ]
};

const charactersCache = new LRUCache<string, any>({ max: 10, ttl: 1000 * 60 * 60 });
const characterCache = new LRUCache<string, any>({ max: 500, ttl: 1000 * 60 * 60 });
const weaponsCache = new LRUCache<string, any>({ max: 10, ttl: 1000 * 60 * 60 });
const showcaseCache = new LRUCache<string, any>({ max: 500, ttl: 1000 * 60 * 5 });

export const resolvers = {
  WeaponBuild: {
    rarity: async (parent: any) => {
      try {
        const weapon = await prisma.weapon.findFirst({
          where: {
            OR: [
              { nameEn: parent.nameEn },
              { nameVi: parent.nameVi },
              { id: parent.weaponId }
            ]
          }
        });
        return weapon ? weapon.rarity : 4;
      } catch (e) {
        return 4;
      }
    }
  },
  ArtifactBuild: {
    iconUrl: async (parent: any) => {
      try {
        if (parent.setNameVi === "Thánh Di Vật Đề Cử" || parent.setNameVi.startsWith("Mix") || parent.setNameEn === "Recommended Artifacts" || parent.setNameEn.startsWith("Mix")) {
          return "/images/artifacts/UI_RelicIcon_15001_4.png";
        }
        const set = await prisma.artifactSet.findFirst({
          where: { OR: [{ nameVi: parent.setNameVi }, { nameEn: parent.setNameEn }] }
        });
        return set ? set.iconUrl : null;
      } catch (e) {
        return null;
      }
    },
    rarity: async (parent: any) => {
      try {
        const set = await prisma.artifactSet.findFirst({
          where: { OR: [{ nameVi: parent.setNameVi }, { nameEn: parent.setNameEn }] }
        });
        if (set && set.rarityList && set.rarityList.length > 0) {
          return Math.max(...set.rarityList);
        }
        return 5;
      } catch (e) {
        return 5;
      }
    }
  },
  Query: {
    characters: async () => {
      const cached = charactersCache.get('all');
      if (cached) {
        console.log('Returning characters from cache (count: ' + cached.length + ')');
        return cached;
      }
      console.log('Fetching characters from DB...');
      const data = await prisma.character.findMany({ include: { bestWeapons: true, bestArtifacts: true } });
      console.log('Fetched ' + data.length + ' characters from DB');
      charactersCache.set('all', data);
      return data;
    },
    character: async (_: any, args: { id: string }) => {
      const cached = characterCache.get(args.id);
      if (cached) return cached;
      const data = await prisma.character.findUnique({ where: { id: args.id }, include: { bestWeapons: true, bestArtifacts: true } });
      if (!data) return null;

      // Enrich bestWeapons with real iconUrl, rarity, id from Weapon table (match by name)
      const weaponNames = data.bestWeapons.map((w: any) => w.nameVi).filter(Boolean);
      const weaponRecords = weaponNames.length > 0
        ? await prisma.weapon.findMany({ where: { nameVi: { in: weaponNames } } })
        : [];
      const weaponByName: Record<string, any> = {};
      for (const w of weaponRecords) weaponByName[w.nameVi] = w;

      const enriched = {
        ...data,
        bestWeapons: data.bestWeapons.map((w: any) => {
          const dbWeapon = weaponByName[w.nameVi];
          return {
            ...w,
            id: dbWeapon?.id || w.weaponId || w.id,
            iconUrl: dbWeapon?.iconUrl || w.iconUrl,
            rarity: dbWeapon?.rarity ?? w.rarity,
            subStat: dbWeapon?.subStat || w.subStat,
            nameEn: dbWeapon?.nameEn || w.nameEn || w.nameVi,
            nameVi: dbWeapon?.nameVi || w.nameVi,
          };
        }).sort((a: any, b: any) => a.rank - b.rank),
        bestArtifacts: await Promise.all(data.bestArtifacts.map(async (a: any) => {
          // Match artifact set by name to get real iconUrl + English name
          const dbArtifact = await prisma.artifactSet.findFirst({
            where: { nameVi: a.setNameVi }
          });
          
          let mixSets: any[] = [];
          const matchedComponents = mixSetsMap[a.setNameVi];
          if (matchedComponents) {
            mixSets = await Promise.all(matchedComponents.map(async (cName: string) => {
              if (cName === "Physical DMG +25% set") {
                return {
                  nameEn: "Physical DMG +25% set",
                  nameVi: "Bộ Sát Thương Vật Lý +25%",
                  iconUrl: "/images/artifacts/UI_RelicIcon_15008_4.png",
                  artifactSetId: "15008",
                };
              }
              const compDb = await prisma.artifactSet.findFirst({
                where: { nameVi: cName }
              });
              return {
                nameEn: compDb?.nameEn || cName,
                nameVi: compDb?.nameVi || cName,
                iconUrl: compDb?.iconUrl || null,
                artifactSetId: compDb?.id || "",
              };
            }));
          }

          return {
            ...a,
            setNameEn: dbArtifact?.nameEn || a.setNameEn,
            setNameVi: dbArtifact?.nameVi || a.setNameVi,
            iconUrl: dbArtifact?.iconUrl || null,
            rarity: dbArtifact ? Math.max(...dbArtifact.rarityList) : (a.rarity ?? 5),
            artifactSetId: dbArtifact?.id || null,
            mixSets,
          };
        })),
      };
      characterCache.set(args.id, enriched);
      return enriched;
    },

    weapons: async () => {
      const cached = weaponsCache.get('all');
      if (cached) return cached;
      const data = await prisma.weapon.findMany();
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
        orderBy: [{ rarity: 'desc' }, { nameEn: 'asc' }]
      });
    },
    artifacts: async () => {
      return await prisma.artifactSet.findMany({ orderBy: [{ id: 'asc' }] });
    },
    artifactSet: async (_: any, args: { id: string }) => {
      return await prisma.artifactSet.findUnique({ where: { id: args.id } });
    },
    showcase: async (_: any, args: { uid: string }) => {
      const cached = showcaseCache.get(args.uid);
      if (cached) return cached;
      try {
        const { data } = await axios.get(`https://enka.network/api/uid/${args.uid}`, { timeout: 5000 });
        if (!data || !data.playerInfo) return null;
        const result = {
          uid: args.uid,
          nickname: data.playerInfo.nickname,
          level: data.playerInfo.level,
          avatarUrl: data.playerInfo.profilePicture?.avatarId ? `https://enka.network/ui/${data.playerInfo.profilePicture.avatarId}.png` : null,
          characters: data.avatarInfoList ? data.avatarInfoList.map((a: any) => String(a.avatarId)) : [],
        };
        showcaseCache.set(args.uid, result);
        return result;
      } catch (e) {
        console.error("Enka fetch error:", e);
        return null;
      }
    }
  }
};
// Trigger nodemon restart to clear cache v16

