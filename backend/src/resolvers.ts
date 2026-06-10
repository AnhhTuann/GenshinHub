import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { LRUCache } from 'lru-cache';

// Forced restart to flush caches after db seed - final v22
const prisma = new PrismaClient();

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
              { name: parent.name },
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
        if (parent.setName === "Thánh Di Vật Đề Cử" || parent.setName.startsWith("Mix")) {
          return "/images/artifacts/UI_RelicIcon_15001_4.png";
        }
        const set = await prisma.artifactSet.findFirst({
          where: { name: parent.setName }
        });
        return set ? set.iconUrl : null;
      } catch (e) {
        return null;
      }
    },
    rarity: async (parent: any) => {
      try {
        const set = await prisma.artifactSet.findFirst({
          where: { name: parent.setName }
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
      const weaponNames = data.bestWeapons.map((w: any) => w.name).filter(Boolean);
      const weaponRecords = weaponNames.length > 0
        ? await prisma.weapon.findMany({ where: { name: { in: weaponNames } } })
        : [];
      const weaponByName: Record<string, any> = {};
      for (const w of weaponRecords) weaponByName[w.name] = w;

      const enriched = {
        ...data,
        bestWeapons: data.bestWeapons.map((w: any) => {
          const dbWeapon = weaponByName[w.name];
          return {
            ...w,
            id: dbWeapon?.id || w.weaponId || w.id,
            iconUrl: dbWeapon?.iconUrl || w.iconUrl,
            rarity: dbWeapon?.rarity ?? w.rarity,
            subStat: dbWeapon?.subStat || w.subStat,
          };
        }),
        bestArtifacts: await Promise.all(data.bestArtifacts.map(async (a: any) => {
          // Match artifact set by name to get real iconUrl + English name
          const dbArtifact = await prisma.artifactSet.findFirst({
            where: { name: a.setName }
          });
          return {
            ...a,
            setName: dbArtifact?.name || a.setName,
            iconUrl: dbArtifact?.iconUrl || null,
            rarity: dbArtifact ? Math.max(...dbArtifact.rarityList) : (a.rarity ?? 5),
            artifactSetId: dbArtifact?.id || null,
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
        select: { id: true, name: true, element: true, rarity: true, avatarUrl: true, weapon: true },
        orderBy: [{ rarity: 'desc' }, { name: 'asc' }]
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
// Trigger nodemon restart to clear cache v13

