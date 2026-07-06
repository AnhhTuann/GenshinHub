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
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
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
    const upload = (0, multer_1.default)({ storage });
    // Upload endpoint (requires admin key)
    app.post('/upload', upload.single('image'), (req, res) => {
        const adminKey = req.headers['x-admin-key'];
        if (adminKey !== (process.env.ADMIN_PASSWORD || 'admin123')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Return the relative URL to the frontend
        const fileUrl = `/assets/uploads/${req.file.filename}`;
        res.json({ url: fileUrl });
    });
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        formatError: (err) => {
            console.error('[GraphQL Error]', err.message);
            return err;
        },
    });
    await server.start();
    app.use('/graphql', (0, express5_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            const adminKey = req.headers['x-admin-key'];
            const isAdmin = adminKey === (process.env.ADMIN_PASSWORD || 'admin123');
            return { isAdmin };
        },
    }));
    const PORT = Number(process.env.PORT || 4000);
    app.listen(PORT, () => {
        console.log(`🚀 Backend GraphQL Server đang chạy tại: http://localhost:${PORT}/graphql`);
    });
}
startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
