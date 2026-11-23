import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { typeDefs, resolvers } from './graphql';
import { createLoaders } from './graphql/dataloaders';
import { getBackupFilePath, listBackups as listBackupFiles } from './backupService';
import { prisma } from './prisma';
import { mailerService } from './services/mailer.service';
import { registerAuthRoutes } from './auth/auth.routes';
import { authService } from './auth/auth.service';

export async function createServerApp() {
  // ─── Startup Security Checks ───────────────────────────
  // Authentication is database-backed; no shared Admin password or JWT secret
  // is required at runtime. A bootstrap owner is created explicitly via CLI.
  const requiredEnvVars = ['DATABASE_URL'];
  const missingVars = requiredEnvVars.filter(v => !process.env[v]);
  if (missingVars.length > 0) {
    console.error(`\n⛔ FATAL: Missing required environment variables: ${missingVars.join(', ')}`);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  const app = express();
  // Vercel sits behind a trusted proxy. Normalize the IP for rate limits.
  if (process.env.VERCEL === '1') app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  }));
  app.use(compression());
  
  const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://genshinhub.onrender.com'];
  if (app.get('env') === 'development') {
    allowedOrigins.push('http://localhost:3010', 'http://127.0.0.1:3010');
  }
  app.use(cors({ origin: allowedOrigins, methods: ['GET', 'POST'] }));
  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    skip: (req) => req.ip === '127.0.0.1' || req.ip === '::1' || (req.ip ? req.ip.includes('127.0.0.1') : false),
    message: { error: 'Too many requests, please try again later.' },
    keyGenerator: (req) => ipKeyGenerator(req.ip || req.socket.remoteAddress || 'unknown'),
  });
  app.use(limiter);

  app.use(express.json({ limit: '1mb' }));

  // Unified DB-backed authentication endpoints (customer + Admin).
  registerAuthRoutes(app, prisma);
  
  // Removed /env endpoint — was exposing DATABASE_URL publicly (security vulnerability)

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Multer config for image uploads
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      const uploadPath = path.join(__dirname, '../../../frontend/public/assets/uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (_req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed'));
      }
    }
  });

  // Auth middleware: only a verified, active DB-backed Admin session grants access.
  const sessionTokenFromRequest = (req: any): string | undefined => {
    const headerToken = req.headers['x-admin-session'] ?? req.headers['x-session-token'];
    if (typeof headerToken === 'string' && headerToken) return headerToken;
    const authorization = req.headers.authorization;
    return authorization?.startsWith('Bearer ') ? authorization.substring(7) : undefined;
  };

  const requireAdminMiddleware = async (req: any, res: any, next: any) => {
    try {
      const session = await authService.resolveSession(prisma, sessionTokenFromRequest(req));
      if (!session?.isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.adminSession = session;
      next();
    } catch (error) {
      console.error('[Admin auth] session verification failed:', error);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };

  // Upload endpoint (requires admin key)
  app.post('/upload', requireAdminMiddleware, (req, res, next) => {
    if (process.env.VERCEL === '1') {
      return res.status(503).json({ error: 'Persistent object storage must be configured for uploads' });
    }
    next();
  }, upload.single('image'), (req, res) => {
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
    if (process.env.VERCEL === '1') {
      return res.status(503).json({ error: 'Serverless filesystem cannot store durable backups' });
    }
    const filePath = getBackupFilePath(req.params.id);
    if (!filePath) {
      return res.status(404).json({ error: 'Backup not found' });
    }
    res.download(filePath);
  });

  // List all backups (lightweight REST alternative to GraphQL)
  app.get('/backups', requireAdminMiddleware, (_req, res) => {
    if (process.env.VERCEL === '1') {
      return res.status(503).json({ error: 'Serverless filesystem cannot store durable backups' });
    }
    const backups = listBackupFiles();
    res.json({ backups });
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production', // ← Disable in production
    formatError: (formattedError, error) => {
      // Log full error server-side
      console.error('[GraphQL Error]', formattedError.message, error);
      // In production, hide internal error details
      if (process.env.NODE_ENV === 'production') {
        const authCode = (formattedError.extensions as Record<string, unknown> | undefined)?.code;
        if (typeof authCode === 'string' && authCode.startsWith('AUTH_')) return formattedError;
        // Allow user-facing errors to pass through
        const message = formattedError.message;
        const isUserFacingError = [
          'Email', 'Password', 'Username', 'OTP', 'token', 'đăng nhập',
          'không đúng', 'đã được', 'hết hạn', 'Unauthorized', 'Not found'
        ].some(kw => message.toLowerCase().includes(kw.toLowerCase()));
        if (isUserFacingError) return formattedError;
        // Hide internal errors
        return { ...formattedError, message: 'Internal server error', extensions: undefined };
      }
      return formattedError;
    },
  });
  await server.start();
  
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      // One verified DB session supplies both customer and Admin identity.
      // x-admin-key is no longer accepted anywhere.
      const sessionToken = sessionTokenFromRequest(req);
      const session = await authService.resolveSession(prisma, sessionToken);
      const isAdmin = session?.isAdmin ?? false;
      const userId = session?.kind === 'CUSTOMER' ? session.customer.id : undefined;
      const userGender = session?.kind === 'CUSTOMER' ? session.customer.gender : undefined;

      // Audit actor is derived server-side from the verified Admin record and
      // is never read from request JSON or logged.
      const adminActor = session?.kind === 'ADMIN' ? session.admin.id : undefined;

      return {
        prisma,
        dataloaders: createLoaders(prisma),
        user: { isAdmin, id: adminActor ?? userId },
        isAdmin,
        adminActor,
        userId,
        userGender,
        session,
        sessionToken,
      };
    },
  }));

  return app;
}

async function startServer() {
  const app = await createServerApp();
  const PORT = Number(process.env.PORT || 4000);
  const httpServer = app.listen(PORT, async () => {
    console.log(`🚀 Backend GraphQL Server đang chạy tại: http://localhost:${PORT}/graphql`);
    // Verify SMTP on startup
    await mailerService.verifyConnection();
  });

  // Increase keep-alive timeout to avoid 502 errors on Render.com
  httpServer.keepAliveTimeout = 65000;
  httpServer.headersTimeout = 66000;

  httpServer.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Cổng ${PORT} đang bị sử dụng bởi một tiến trình khác!`);
      console.error(`Vui lòng tắt tiến trình đó hoặc đổi cổng trong file .env\n`);
    } else {
      console.error('Lỗi server:', err);
    }
    process.exit(1);
  });

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`\n⚠️  ${signal} received, shutting down gracefully...`);
    httpServer.close(async () => {
      try {
        await prisma.$disconnect();
        console.log('✅ Database disconnected. Goodbye!');
      } catch (e) {
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
  process.on('SIGINT',  () => shutdown('SIGINT'));
}

// Import-safe for Vercel Functions; CLI still launches the normal HTTP server.
if (require.main === module) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
 

// Vercel Express zero-config entrypoint. Keep the CLI startup path separate.
let vercelAppPromise: ReturnType<typeof createServerApp> | undefined;
export default async function vercelHandler(req: express.Request, res: express.Response) {
  try {
    vercelAppPromise ??= createServerApp().catch((error) => {
      vercelAppPromise = undefined;
      throw error;
    });
    const app = await vercelAppPromise;
    return app(req, res);
  } catch (error) {
    console.error('[GenshinHub] API startup failed:', error instanceof Error ? error.message : 'unknown');
    if (!res.headersSent) res.status(503).json({ error: 'API initialization unavailable' });
  }
}
