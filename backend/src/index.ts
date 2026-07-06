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

async function startServer() {
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
  
  app.get('/env', (req, res) => res.json({ db: process.env.DATABASE_URL }));

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
    formatError: (err) => {
      console.error('[GraphQL Error]', err.message);
      return err;
    },
  });
  await server.start();
  
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      const adminKey = req.headers['x-admin-key'];
      const isAdmin = !!process.env.ADMIN_PASSWORD && adminKey === process.env.ADMIN_PASSWORD;
      if (!process.env.ADMIN_PASSWORD) {
        console.warn("GraphQL admin access denied: ADMIN_PASSWORD not configured");
      }
      return { 
        prisma,
        dataloaders: createLoaders(prisma),
        user: { isAdmin },
        isAdmin
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

  httpServer.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Cổng ${PORT} đang bị sử dụng bởi một tiến trình khác!`);
      console.error(`Vui lòng tắt tiến trình đó hoặc đổi cổng trong file .env\n`);
    } else {
      console.error('Lỗi server:', err);
    }
    process.exit(1);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
 
