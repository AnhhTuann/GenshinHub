"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const USER_JWT_SECRET = process.env.USER_JWT_SECRET || 'genshinhub-user-secret-change-in-prod';
exports.userService = {
    // ─── Auth ──────────────────────────────────────────────────
    async register(prisma, input) {
        const existing = await prisma.user.findFirst({
            where: { OR: [{ email: input.email }, { username: input.username }] },
        });
        if (existing) {
            if (existing.email === input.email)
                throw new Error('Email đã được sử dụng');
            throw new Error('Username đã được sử dụng');
        }
        const hashedPassword = await bcryptjs_1.default.hash(input.password, 12);
        const user = await prisma.user.create({
            data: {
                username: input.username,
                email: input.email,
                password: hashedPassword,
                gender: input.gender,
                displayName: input.displayName || input.username,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username, gender: user.gender }, USER_JWT_SECRET, { expiresIn: '30d' });
        return { token, user };
    },
    async login(prisma, email, password) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password)
            throw new Error('Email hoặc mật khẩu không đúng');
        const valid = await bcryptjs_1.default.compare(password, user.password);
        if (!valid)
            throw new Error('Email hoặc mật khẩu không đúng');
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username, gender: user.gender }, USER_JWT_SECRET, { expiresIn: '30d' });
        return { token, user };
    },
    async socialLogin(prisma, input) {
        let user = await prisma.user.findUnique({ where: { email: input.email } });
        if (user) {
            // Link provider if not set
            if (!user.providerId || user.provider === 'local') {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { provider: input.provider, providerId: input.providerId, avatarUrl: user.avatarUrl || input.avatarUrl }
                });
            }
        }
        else {
            // Create new social user
            user = await prisma.user.create({
                data: {
                    email: input.email,
                    username: input.username || `user_${Date.now()}`,
                    gender: input.gender || 'male',
                    displayName: input.displayName || input.username || 'Traveler',
                    avatarUrl: input.avatarUrl,
                    provider: input.provider,
                    providerId: input.providerId,
                }
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username, gender: user.gender }, USER_JWT_SECRET, { expiresIn: '30d' });
        return { token, user };
    },
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, USER_JWT_SECRET);
    },
    // ─── Profile ───────────────────────────────────────────────
    async updateProfile(prisma, userId, input) {
        return prisma.user.update({
            where: { id: userId },
            data: { ...input, updatedAt: new Date() },
        });
    },
    // ─── Favorites ─────────────────────────────────────────────
    async toggleFavorite(prisma, userId, characterId) {
        const existing = await prisma.userFavorite.findUnique({
            where: { userId_characterId: { userId, characterId } },
        });
        if (existing) {
            await prisma.userFavorite.delete({ where: { id: existing.id } });
            return { added: false, characterId };
        }
        else {
            await prisma.userFavorite.create({ data: { userId, characterId } });
            return { added: true, characterId };
        }
    },
    async getFavorites(prisma, userId) {
        return prisma.userFavorite.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    },
    // ─── Wishlist ──────────────────────────────────────────────
    async addToWishlist(prisma, userId, characterId, note) {
        return prisma.userWishlist.create({
            data: { userId, characterId, note },
        });
    },
    async removeFromWishlist(prisma, userId, wishlistId) {
        await prisma.userWishlist.deleteMany({
            where: { id: wishlistId, userId },
        });
        return true;
    },
    async getWishlist(prisma, userId) {
        return prisma.userWishlist.findMany({
            where: { userId },
            orderBy: { priority: 'desc' },
        });
    },
};
