import { userService } from './user.service';
import { PrismaClient } from '@prisma/client';

interface Context {
  prisma: PrismaClient;
  userId?: string;
  userGender?: string;
}

/** Traveler char ID dựa theo gender */
const getTravelerCharId = (gender: string) =>
  gender === 'female' ? 'traveler-girl' : 'traveler-boy';

export const userResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, { prisma, userId }: Context) => {
      if (!userId) return null;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { _count: { select: { favorites: true } } },
      });
      if (!user) return null;
      return {
        ...user,
        travelerCharId: getTravelerCharId(user.gender),
        favoritesCount: user._count.favorites,
      };
    },

    myFavorites: async (_: unknown, __: unknown, { prisma, userId }: Context) => {
      if (!userId) return [];
      return userService.getFavorites(prisma, userId);
    },

    myWishlist: async (_: unknown, __: unknown, { prisma, userId }: Context) => {
      if (!userId) return [];
      return userService.getWishlist(prisma, userId);
    },

    myTeams: async (_: unknown, __: unknown, { prisma, userId }: Context) => {
      if (!userId) return [];
      return prisma.userTeam.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
      });
    },

    isFavorite: async (_: unknown, { characterId }: { characterId: string }, { prisma, userId }: Context) => {
      if (!userId) return false;
      const fav = await prisma.userFavorite.findUnique({
        where: { userId_characterId: { userId, characterId } },
      });
      return !!fav;
    },
  },

  Mutation: {
    register: async (_: unknown, { input }: { input: any }, { prisma }: Context) => {
      const { token, user } = await userService.register(prisma, input);
      return {
        token,
        user: {
          ...user,
          travelerCharId: getTravelerCharId(user.gender),
          favoritesCount: 0,
        },
      };
    },

    login: async (_: unknown, { email, password }: { email: string; password: string }, { prisma }: Context) => {
      const { token, user } = await userService.login(prisma, email, password);
      const favCount = await prisma.userFavorite.count({ where: { userId: user.id } });
      return {
        token,
        user: {
          ...user,
          travelerCharId: getTravelerCharId(user.gender),
          favoritesCount: favCount,
        },
      };
    },

    updateProfile: async (_: unknown, { input }: { input: any }, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Chưa đăng nhập');
      const user = await userService.updateProfile(prisma, userId, input);
      const favCount = await prisma.userFavorite.count({ where: { userId } });
      return {
        ...user,
        travelerCharId: getTravelerCharId(user.gender),
        favoritesCount: favCount,
      };
    },

    toggleFavorite: async (_: unknown, { characterId }: { characterId: string }, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Vui lòng đăng nhập để yêu thích nhân vật');
      return userService.toggleFavorite(prisma, userId, characterId);
    },

    addToWishlist: async (_: unknown, { characterId, note }: { characterId: string; note?: string }, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Vui lòng đăng nhập');
      return userService.addToWishlist(prisma, userId, characterId, note);
    },

    removeFromWishlist: async (_: unknown, { wishlistId }: { wishlistId: string }, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Vui lòng đăng nhập');
      return userService.removeFromWishlist(prisma, userId, wishlistId);
    },

    createTeam: async (_: unknown, { name, characters }: { name: string; characters: string[] }, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Vui lòng đăng nhập');
      return prisma.userTeam.create({
        data: { userId, name, characters },
      });
    },

    updateTeam: async (_: unknown, { id, name, characters }: { id: string; name?: string; characters?: string[] }, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Vui lòng đăng nhập');
      const team = await prisma.userTeam.findUnique({ where: { id } });
      if (!team || team.userId !== userId) throw new Error('Không tìm thấy đội hình hoặc không có quyền truy cập');
      
      const dataToUpdate: any = {};
      if (name) dataToUpdate.name = name;
      if (characters) dataToUpdate.characters = characters;
      
      return prisma.userTeam.update({
        where: { id },
        data: dataToUpdate,
      });
    },

    deleteTeam: async (_: unknown, { id }: { id: string }, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Vui lòng đăng nhập');
      const team = await prisma.userTeam.findUnique({ where: { id } });
      if (!team || team.userId !== userId) throw new Error('Không tìm thấy đội hình hoặc không có quyền truy cập');
      
      await prisma.userTeam.delete({ where: { id } });
      return true;
    },

    syncGachaUrl: async (_: unknown, { url }: { url: string }, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Vui lòng đăng nhập');
      
      // MOCK LOGIC for parsing Gacha URL and fetching data
      // In a real app, you would parse authkey from URL and fetch hk4e-api-os.mihoyo.com
      // For this demo, we simulate a successful fetch if URL starts with mock:// or is any string
      
      const mockStats = {
        character: { pulls: Math.floor(Math.random() * 50) + 20, pity: 90, guaranteed: Math.random() > 0.5 },
        weapon: { pulls: Math.floor(Math.random() * 30), pity: 80, guaranteed: false },
        standard: { pulls: Math.floor(Math.random() * 70), pity: 90, guaranteed: false },
        winRate: 50 + Math.floor(Math.random() * 30),
        totalPulls: 1000 + Math.floor(Math.random() * 500)
      };

      await prisma.user.update({
        where: { id: userId },
        data: { gachaStats: mockStats }
      });

      return mockStats;
    },
  },
};
