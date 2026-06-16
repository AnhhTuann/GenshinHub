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
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

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

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Multer config for image uploads
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      const uploadPath = path.join(__dirname, '../../../frontend/public/images/uploads');
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
  const upload = multer({ storage });

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
    const fileUrl = `/images/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
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
