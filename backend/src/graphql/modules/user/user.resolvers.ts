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
  },
};
