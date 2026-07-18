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
  UserFavorite: {
    character: (parent: any, _: any, { prisma }: Context) => {
      if (parent.itemType === 'CHARACTER') return prisma.character.findUnique({ where: { id: parent.itemId } });
      return null;
    },
    weapon: (parent: any, _: any, { prisma }: Context) => {
      if (parent.itemType === 'WEAPON') return prisma.weapon.findUnique({ where: { id: parent.itemId } });
      return null;
    },
    artifact: (parent: any, _: any, { prisma }: Context) => {
      if (parent.itemType === 'ARTIFACT') return prisma.artifactSet.findUnique({ where: { id: parent.itemId } });
      return null;
    }
  },
  
  UserWishlistItem: {
    character: (parent: any, _: any, { prisma }: Context) => {
      if (parent.itemType === 'CHARACTER') return prisma.character.findUnique({ where: { id: parent.itemId } });
      return null;
    },
    weapon: (parent: any, _: any, { prisma }: Context) => {
      if (parent.itemType === 'WEAPON') return prisma.weapon.findUnique({ where: { id: parent.itemId } });
      return null;
    },
    artifact: (parent: any, _: any, { prisma }: Context) => {
      if (parent.itemType === 'ARTIFACT') return prisma.artifactSet.findUnique({ where: { id: parent.itemId } });
      return null;
    }
  },

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

    isFavorite: async (_: unknown, { itemId, itemType }: { itemId: string, itemType: string }, { prisma, userId }: Context) => {
      if (!userId) return false;
      const fav = await prisma.userFavorite.findUnique({
        where: { userId_itemId_itemType: { userId, itemId, itemType } },
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

    socialLogin: async (_: unknown, args: any, { prisma }: Context) => {
      const { token, user } = await userService.socialLogin(prisma, args);
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

    changePassword: async (_: unknown, { oldPassword, newPassword }: any, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Chưa đăng nhập');
      return userService.changePassword(prisma, userId, oldPassword, newPassword);
    },

    requestEmailChangeOtp: async (_: unknown, { newEmail }: any, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Chưa đăng nhập');
      return userService.requestEmailChangeOtp(prisma, userId, newEmail);
    },

    verifyEmailChangeOtp: async (_: unknown, { newEmail, otp }: any, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Chưa đăng nhập');
      const user = await userService.verifyEmailChangeOtp(prisma, userId, newEmail, otp);
      const favCount = await prisma.userFavorite.count({ where: { userId } });
      return {
        ...user,
        travelerCharId: getTravelerCharId(user.gender),
        favoritesCount: favCount,
      };
    },

    // Forgot / Reset Password — no auth required
    forgotPassword: async (_: unknown, { email }: { email: string }, { prisma }: Context) => {
      return userService.forgotPassword(prisma, email);
    },

    resetPassword: async (_: unknown, { email, otp, newPassword }: { email: string; otp: string; newPassword: string }, { prisma }: Context) => {
      return userService.resetPassword(prisma, email, otp, newPassword);
    },

    toggleFavorite: async (_: unknown, { itemId, itemType }: { itemId: string, itemType: string }, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Vui lòng đăng nhập để yêu thích');
      return userService.toggleFavorite(prisma, userId, itemId, itemType);
    },

    addToWishlist: async (_: unknown, { itemId, itemType, note }: { itemId: string, itemType: string; note?: string }, { prisma, userId }: Context) => {
      if (!userId) throw new Error('Vui lòng đăng nhập');
      return userService.addToWishlist(prisma, userId, itemId, itemType, note);
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
        totalPulls: 1000 + Math.floor(Math.random() * 500),
        fiveStarHistory: [
          { id: '1', name: 'furina', type: 'CHARACTER', pity: 78, win: true, date: new Date().toISOString() },
          { id: '2', name: 'keqing', type: 'CHARACTER', pity: 81, win: false, date: new Date(Date.now() - 86400000).toISOString() },
          { id: '3', name: 'nahida', type: 'CHARACTER', pity: 45, win: true, date: new Date(Date.now() - 86400000 * 5).toISOString() },
          { id: '4', name: 'staff-of-homa', type: 'WEAPON', pity: 65, win: true, date: new Date(Date.now() - 86400000 * 10).toISOString() },
          { id: '5', name: 'qiqi', type: 'CHARACTER', pity: 75, win: false, date: new Date(Date.now() - 86400000 * 20).toISOString() },
        ]
      };

      await prisma.user.update({
        where: { id: userId },
        data: { gachaStats: mockStats }
      });

      return mockStats;
    },
  },
};
