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
import rateLimit from 'express-rate-limit';
import { typeDefs, resolvers } from './graphql';
import { createLoaders } from './graphql/dataloaders';
import { getBackupFilePath, listBackups as listBackupFiles } from './backupService';
import { prisma } from './prisma';
import { mailerService } from './services/mailer.service';
import { registerAuthRoutes } from './auth/auth.routes';
import { authService } from './auth/auth.service';
import { createAdminSessionMiddleware, sessionTokenFromRequest } from './auth/adminHttp';
import { isStatelessHost, STATELESS_STORAGE_MESSAGE } from './utils/storageMode';
import {
  chooseUploadMode,
  getUploadedImage,
  putUploadedImage,
} from './utils/objectStorage';

/**
 * Build the Express/Apollo application without binding a TCP port.
 * Exported for the Vercel Function entrypoint in `api/index.ts`.
 */
export async function createServerApp() {
  // ─── Startup Security Checks ───────────────────────────
  // Authentication is database-backed; no shared Admin password or JWT secret
  // is required at runtime. A bootstrap owner is created explicitly via CLI.
  const requiredEnvVars = ['DATABASE_URL'];
  const missingVars = requiredEnvVars.filter(v => !process.env[v]);
  if (missingVars.length > 0) {
    // A serverless function must not terminate the whole process on bad config;
    // the entrypoint turns this into an explicit 503.
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  const app = express();
  
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
    message: { error: 'Too many requests, please try again later.' }
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

  // Upload handling: memory + Neon Object Storage on stateless hosts, with the
  // original filesystem flow preserved for local development.
  const uploadLimits = { fileSize: 5 * 1024 * 1024 }; // 5MB max
  const imageFileFilter = (_req: any, file: any, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed'));
    }
  };
  const memoryUpload = multer({ storage: multer.memoryStorage(), limits: uploadLimits, fileFilter: imageFileFilter });
  const diskUpload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        const uploadPath = path.join(__dirname, '../../../frontend/public/assets/uploads');
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
      },
      filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
      },
    }),
    limits: uploadLimits,
    fileFilter: imageFileFilter,
  });

  // Only a verified, active DB-backed Admin session grants upload/backup access.
  const requireAdminMiddleware = createAdminSessionMiddleware(
    (token) => authService.resolveSession(prisma, token),
  );

  function runUpload(uploader: any, req: any, res: any): Promise<{ file?: any; error?: any }> {
    return new Promise((resolve) => {
      uploader.single('image')(req, res, (error: any) => resolve({ file: req.file, error }));
    });
  }

  app.post('/upload', requireAdminMiddleware, async (req, res) => {
    const mode = chooseUploadMode();
    if (mode === 'stateless') {
      return res.status(503).json({ error: STATELESS_STORAGE_MESSAGE });
    }

    const uploader = mode === 'object' ? memoryUpload : diskUpload;
    const { file, error } = await runUpload(uploader, req, res);
    if (error) {
      if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'File exceeds 5 MB limit' });
      }
      return res.status(400).json({ error: error.message || 'Invalid upload' });
    }
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    if (mode === 'local') {
      return res.json({ url: `/assets/uploads/${file.filename}`, storage: 'local-filesystem' });
    }

    try {
      const result = await putUploadedImage({
        buffer: file.buffer,
        mime: file.mimetype,
        originalName: file.originalname,
      });
      return res.json({
        url: result.publicPath,
        storage: 'neon-object-storage',
        contentType: result.contentType,
        size: result.size,
        checksum: result.checksum,
      });
    } catch (uploadError) {
      const message = uploadError instanceof Error ? uploadError.message : String(uploadError);
      console.error('[Upload] object storage write failed:', message);
      const clientError = /valid image|MIME/i.test(message);
      return res.status(clientError ? 400 : 502).json({ error: clientError ? message : 'Image upload failed' });
    }
  });

  // Controlled public read proxy for uploaded images. It never lists buckets
  // and can only read the narrow uploads/ prefix of the private asset bucket.
  app.use('/assets/uploads', async (req, res, next) => {
    if (req.method !== 'GET') return next();
    try {
      const pathname = new URL(req.originalUrl || req.url, 'http://local').pathname;
      const object = await getUploadedImage(pathname);
      if (!object) return res.status(404).end();
      res.set('Content-Type', object.contentType);
      res.set('Cache-Control', object.cacheControl);
      return res.send(object.body);
    } catch (proxyError) {
      console.error('[Asset proxy] object read failed:', proxyError instanceof Error ? proxyError.message : String(proxyError));
      return res.status(502).json({ error: 'Asset retrieval failed' });
    }
  });

  // === Backup REST endpoints ===
  
  // Download a backup file
  app.get('/backups/:id/download', requireAdminMiddleware, (req, res) => {
    if (isStatelessHost()) {
      return res.status(503).json({ error: STATELESS_STORAGE_MESSAGE });
    }
    const filePath = getBackupFilePath(req.params.id);
    if (!filePath) {
      return res.status(404).json({ error: 'Backup not found' });
    }
    res.download(filePath);
  });

  // List all backups (lightweight REST alternative to GraphQL)
  app.get('/backups', requireAdminMiddleware, (_req, res) => {
    if (isStatelessHost()) {
      return res.status(503).json({ error: STATELESS_STORAGE_MESSAGE });
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
  // Bind explicitly to all IPv4 interfaces: Render's port scanner probes
  // 0.0.0.0, and Node's implicit `::` bind is not reliably detected there.
  const httpServer = app.listen(PORT, '0.0.0.0', async () => {
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

// Import-safe for Vercel Functions: `api/index.ts` imports this module without
// starting a TCP listener. The CLI/server container still starts normally.
if (require.main === module) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
 
