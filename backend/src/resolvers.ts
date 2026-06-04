import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { LRUCache } from 'lru-cache';

const prisma = new PrismaClient();

const charactersCache = new LRUCache({ max: 10, ttl: 1000 * 60 * 60 });
const characterCache = new LRUCache({ max: 500, ttl: 1000 * 60 * 60 });
const weaponsCache = new LRUCache({ max: 10, ttl: 1000 * 60 * 60 });
const showcaseCache = new LRUCache({ max: 500, ttl: 1000 * 60 * 5 });

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
  Query: {
    characters: async () => {
      const cached = charactersCache.get('all');
      if (cached) return cached;
      const data = await prisma.character.findMany({ include: { bestWeapons: true, bestArtifacts: true } });
      charactersCache.set('all', data);
      return data;
    },
    character: async (_: any, args: { id: string }) => {
      const cached = characterCache.get(args.id);
      if (cached) return cached;
      const data = await prisma.character.findUnique({ where: { id: args.id }, include: { bestWeapons: true, bestArtifacts: true } });
      if (data) characterCache.set(args.id, data);
      return data;
    },
    weapons: async () => {
      const cached = weaponsCache.get('all');
      if (cached) return cached;
      const data = await prisma.weapon.findMany();
      weaponsCache.set('all', data);
      return data;
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
