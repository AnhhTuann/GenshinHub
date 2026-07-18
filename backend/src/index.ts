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

async function startServer() {
  // ─── Startup Security Checks ───────────────────────────
  const requiredEnvVars = ['USER_JWT_SECRET', 'ADMIN_JWT_SECRET', 'ADMIN_PASSWORD', 'DATABASE_URL'];
  const missingVars = requiredEnvVars.filter(v => !process.env[v]);
  if (missingVars.length > 0 && process.env.NODE_ENV === 'production') {
    console.error(`\n⛔ FATAL: Missing required environment variables in production: ${missingVars.join(', ')}`);
    console.error('Server cannot start without these secrets. Set them in your .env file.');
    process.exit(1);
  } else if (missingVars.length > 0) {
    console.warn(`\n⚠️  WARNING: Missing env vars (using insecure defaults for dev): ${missingVars.join(', ')}`);
    console.warn('DO NOT deploy to production without setting these!');
  }

  const app = express();
  
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  }));
  app.use(compression());
  
  const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://genshinhub.onrender.com'];
  app.use(cors({ origin: allowedOrigins, methods: ['GET', 'POST'] }));
  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    skip: (req) => req.ip === '127.0.0.1' || req.ip === '::1' || (req.ip ? req.ip.includes('127.0.0.1') : false),
    message: { error: 'Too many requests, please try again later.' }
  });
  app.use(limiter);

  app.use(express.json({ limit: '1mb' }));
  
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

  // Auth middleware
  const requireAdminMiddleware = (req: any, res: any, next: any) => {
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
    const filePath = getBackupFilePath(req.params.id);
    if (!filePath) {
      return res.status(404).json({ error: 'Backup not found' });
    }
    res.download(filePath);
  });

  // List all backups (lightweight REST alternative to GraphQL)
  app.get('/backups', requireAdminMiddleware, (_req, res) => {
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
      // Admin auth
      const adminKey = req.headers['x-admin-key'];
      const isAdmin = !!process.env.ADMIN_PASSWORD && adminKey === process.env.ADMIN_PASSWORD;
      if (!process.env.ADMIN_PASSWORD) {
        console.warn("GraphQL admin access denied: ADMIN_PASSWORD not configured");
      }

      // User auth
      let userId: string | undefined;
      let userGender: string | undefined;
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
          const jwt = require('jsonwebtoken');
          const USER_JWT_SECRET = process.env.USER_JWT_SECRET || 'genshinhub-user-secret-change-in-prod';
          const decoded = jwt.verify(token, USER_JWT_SECRET) as any;
          userId = decoded.id;
          userGender = decoded.gender;
        } catch (err) {
          console.warn("Invalid user token", (err as Error).message);
        }
      }

      return { 
        prisma,
        dataloaders: createLoaders(prisma),
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

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
 
