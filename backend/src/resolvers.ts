import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    characters: async () => await prisma.character.findMany(),
    character: async (_: any, args: { id: string }) => await prisma.character.findUnique({ where: { id: args.id }, include: { bestWeapons: true, bestArtifacts: true } }),
    weapons: async () => await prisma.weapon.findMany(),
    showcase: async (_: any, args: { uid: string }) => {
      try {
        const { data } = await axios.get(`https://enka.network/api/uid/${args.uid}`);
        if (!data || !data.playerInfo) return null;
        return {
          uid: args.uid,
          nickname: data.playerInfo.nickname,
          level: data.playerInfo.level,
          avatarUrl: data.playerInfo.profilePicture?.avatarId ? `https://enka.network/ui/${data.playerInfo.profilePicture.avatarId}.png` : null,
          characters: data.avatarInfoList ? data.avatarInfoList.map((a: any) => String(a.avatarId)) : [],
        };
      } catch (e) {
        console.error("Enka fetch error:", e);
        return null;
      }
    }
  }
};
