"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const user_service_1 = require("./user.service");
/** Traveler char ID dựa theo gender */
const getTravelerCharId = (gender) => gender === 'female' ? 'traveler-girl' : 'traveler-boy';
exports.userResolvers = {
    Query: {
        me: async (_, __, { prisma, userId }) => {
            if (!userId)
                return null;
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: { _count: { select: { favorites: true } } },
            });
            if (!user)
                return null;
            return {
                ...user,
                travelerCharId: getTravelerCharId(user.gender),
                favoritesCount: user._count.favorites,
            };
        },
        myFavorites: async (_, __, { prisma, userId }) => {
            if (!userId)
                return [];
            return user_service_1.userService.getFavorites(prisma, userId);
        },
        myWishlist: async (_, __, { prisma, userId }) => {
            if (!userId)
                return [];
            return user_service_1.userService.getWishlist(prisma, userId);
        },
        myTeams: async (_, __, { prisma, userId }) => {
            if (!userId)
                return [];
            return prisma.userTeam.findMany({
                where: { userId },
                orderBy: { createdAt: 'asc' },
            });
        },
        isFavorite: async (_, { characterId }, { prisma, userId }) => {
            if (!userId)
                return false;
            const fav = await prisma.userFavorite.findUnique({
                where: { userId_characterId: { userId, characterId } },
            });
            return !!fav;
        },
    },
    Mutation: {
        register: async (_, { input }, { prisma }) => {
            const { token, user } = await user_service_1.userService.register(prisma, input);
            return {
                token,
                user: {
                    ...user,
                    travelerCharId: getTravelerCharId(user.gender),
                    favoritesCount: 0,
                },
            };
        },
        login: async (_, { email, password }, { prisma }) => {
            const { token, user } = await user_service_1.userService.login(prisma, email, password);
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
        socialLogin: async (_, args, { prisma }) => {
            const { token, user } = await user_service_1.userService.socialLogin(prisma, args);
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
        updateProfile: async (_, { input }, { prisma, userId }) => {
            if (!userId)
                throw new Error('Chưa đăng nhập');
            const user = await user_service_1.userService.updateProfile(prisma, userId, input);
            const favCount = await prisma.userFavorite.count({ where: { userId } });
            return {
                ...user,
                travelerCharId: getTravelerCharId(user.gender),
                favoritesCount: favCount,
            };
        },
        changePassword: async (_, { oldPassword, newPassword }, { prisma, userId }) => {
            if (!userId)
                throw new Error('Chưa đăng nhập');
            return user_service_1.userService.changePassword(prisma, userId, oldPassword, newPassword);
        },
        requestEmailChangeOtp: async (_, { newEmail }, { prisma, userId }) => {
            if (!userId)
                throw new Error('Chưa đăng nhập');
            return user_service_1.userService.requestEmailChangeOtp(prisma, userId, newEmail);
        },
        verifyEmailChangeOtp: async (_, { newEmail, otp }, { prisma, userId }) => {
            if (!userId)
                throw new Error('Chưa đăng nhập');
            const user = await user_service_1.userService.verifyEmailChangeOtp(prisma, userId, newEmail, otp);
            const favCount = await prisma.userFavorite.count({ where: { userId } });
            return {
                ...user,
                travelerCharId: getTravelerCharId(user.gender),
                favoritesCount: favCount,
            };
        },
        toggleFavorite: async (_, { characterId }, { prisma, userId }) => {
            if (!userId)
                throw new Error('Vui lòng đăng nhập để yêu thích nhân vật');
            return user_service_1.userService.toggleFavorite(prisma, userId, characterId);
        },
        addToWishlist: async (_, { characterId, note }, { prisma, userId }) => {
            if (!userId)
                throw new Error('Vui lòng đăng nhập');
            return user_service_1.userService.addToWishlist(prisma, userId, characterId, note);
        },
        removeFromWishlist: async (_, { wishlistId }, { prisma, userId }) => {
            if (!userId)
                throw new Error('Vui lòng đăng nhập');
            return user_service_1.userService.removeFromWishlist(prisma, userId, wishlistId);
        },
        createTeam: async (_, { name, characters }, { prisma, userId }) => {
            if (!userId)
                throw new Error('Vui lòng đăng nhập');
            return prisma.userTeam.create({
                data: { userId, name, characters },
            });
        },
        updateTeam: async (_, { id, name, characters }, { prisma, userId }) => {
            if (!userId)
                throw new Error('Vui lòng đăng nhập');
            const team = await prisma.userTeam.findUnique({ where: { id } });
            if (!team || team.userId !== userId)
                throw new Error('Không tìm thấy đội hình hoặc không có quyền truy cập');
            const dataToUpdate = {};
            if (name)
                dataToUpdate.name = name;
            if (characters)
                dataToUpdate.characters = characters;
            return prisma.userTeam.update({
                where: { id },
                data: dataToUpdate,
            });
        },
        deleteTeam: async (_, { id }, { prisma, userId }) => {
            if (!userId)
                throw new Error('Vui lòng đăng nhập');
            const team = await prisma.userTeam.findUnique({ where: { id } });
            if (!team || team.userId !== userId)
                throw new Error('Không tìm thấy đội hình hoặc không có quyền truy cập');
            await prisma.userTeam.delete({ where: { id } });
            return true;
        },
        syncGachaUrl: async (_, { url }, { prisma, userId }) => {
            if (!userId)
                throw new Error('Vui lòng đăng nhập');
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
