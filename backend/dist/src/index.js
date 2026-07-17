"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = require("@apollo/server");
const express5_1 = require("@as-integrations/express5");
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const graphql_1 = require("./graphql");
const dataloaders_1 = require("./graphql/dataloaders");
const backupService_1 = require("./backupService");
const prisma_1 = require("./prisma");
async function startServer() {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    }));
    app.use((0, compression_1.default)());
    const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://genshinhub.onrender.com'];
    app.use((0, cors_1.default)({ origin: allowedOrigins, methods: ['GET', 'POST'] }));
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, // limit each IP to 1000 requests per windowMs
        skip: (req) => req.ip === '127.0.0.1' || req.ip === '::1' || (req.ip ? req.ip.includes('127.0.0.1') : false),
        message: { error: 'Too many requests, please try again later.' }
    });
    app.use(limiter);
    app.use(express_1.default.json({ limit: '1mb' }));
    // Removed /env endpoint — was exposing DATABASE_URL publicly (security vulnerability)
    // Health check endpoint
    app.get('/health', (_req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });
    // Multer config for image uploads
    const storage = multer_1.default.diskStorage({
        destination: (_req, _file, cb) => {
            const uploadPath = path_1.default.join(__dirname, '../../../frontend/public/assets/uploads');
            if (!fs_1.default.existsSync(uploadPath)) {
                fs_1.default.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
        }
    });
    const upload = (0, multer_1.default)({
        storage,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
        fileFilter: (_req, file, cb) => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed'));
            }
        }
    });
    // Auth middleware
    const requireAdminMiddleware = (req, res, next) => {
        const adminKey = req.headers['x-admin-key'];
        if (!process.env.ADMIN_PASSWORD) {
            console.warn("Upload rejected: ADMIN_PASSWORD not configured");
            return res.status(500).json({ error: 'ADMIN_PASSWORD not configured' });
        }
        if (adminKey !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        next();
    };
    // Upload endpoint (requires admin key)
    app.post('/upload', requireAdminMiddleware, upload.single('image'), (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Return the relative URL to the frontend
        const fileUrl = `/assets/uploads/${req.file.filename}`;
        res.json({ url: fileUrl });
    });
    // === Backup REST endpoints ===
    // Download a backup file
    app.get('/backups/:id/download', requireAdminMiddleware, (req, res) => {
        const filePath = (0, backupService_1.getBackupFilePath)(req.params.id);
        if (!filePath) {
            return res.status(404).json({ error: 'Backup not found' });
        }
        res.download(filePath);
    });
    // List all backups (lightweight REST alternative to GraphQL)
    app.get('/backups', requireAdminMiddleware, (_req, res) => {
        const backups = (0, backupService_1.listBackups)();
        res.json({ backups });
    });
    const server = new server_1.ApolloServer({
        typeDefs: graphql_1.typeDefs,
        resolvers: graphql_1.resolvers,
        formatError: (err) => {
            console.error('[GraphQL Error]', err.message);
            return err;
        },
    });
    await server.start();
    app.use('/graphql', (0, express5_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            // Admin auth
            const adminKey = req.headers['x-admin-key'];
            const isAdmin = !!process.env.ADMIN_PASSWORD && adminKey === process.env.ADMIN_PASSWORD;
            if (!process.env.ADMIN_PASSWORD) {
                console.warn("GraphQL admin access denied: ADMIN_PASSWORD not configured");
            }
            // User auth
            let userId;
            let userGender;
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.substring(7);
                try {
                    const jwt = require('jsonwebtoken');
                    const USER_JWT_SECRET = process.env.USER_JWT_SECRET || 'genshinhub-user-secret-change-in-prod';
                    const decoded = jwt.verify(token, USER_JWT_SECRET);
                    userId = decoded.id;
                    userGender = decoded.gender;
                }
                catch (err) {
                    console.warn("Invalid user token", err.message);
                }
            }
            return {
                prisma: prisma_1.prisma,
                dataloaders: (0, dataloaders_1.createLoaders)(prisma_1.prisma),
                user: { isAdmin },
                isAdmin,
                userId,
                userGender
            };
        },
    }));
    if (!process.env.ADMIN_PASSWORD) {
        console.warn('⚠️  WARNING: ADMIN_PASSWORD environment variable is not set. All admin requests will be rejected.');
    }
    const PORT = Number(process.env.PORT || 4000);
    const httpServer = app.listen(PORT, () => {
        console.log(`🚀 Backend GraphQL Server đang chạy tại: http://localhost:${PORT}/graphql`);
    });
    // Increase keep-alive timeout to avoid 502 errors on Render.com
    httpServer.keepAliveTimeout = 65000;
    httpServer.headersTimeout = 66000;
    httpServer.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`\n❌ Cổng ${PORT} đang bị sử dụng bởi một tiến trình khác!`);
            console.error(`Vui lòng tắt tiến trình đó hoặc đổi cổng trong file .env\n`);
        }
        else {
            console.error('Lỗi server:', err);
        }
        process.exit(1);
    });
    // Graceful shutdown
    const shutdown = async (signal) => {
        console.log(`\n⚠️  ${signal} received, shutting down gracefully...`);
        httpServer.close(async () => {
            try {
                await prisma_1.prisma.$disconnect();
                console.log('✅ Database disconnected. Goodbye!');
            }
            catch (e) {
                console.error('Error disconnecting database:', e);
            }
            process.exit(0);
        });
        // Force exit if not done in 10s
        setTimeout(() => {
            console.error('⛔ Force exit after timeout');
            process.exit(1);
        }, 10000);
    };
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
}
startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
