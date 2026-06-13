import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

async function startServer() {
  const app = express();
  
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  }));
  app.use(compression());
  app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
  app.use(express.json({ limit: '1mb' }));

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
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
  
  app.use('/graphql', expressMiddleware(server));

  const PORT = Number(process.env.PORT || 4000);
  app.listen(PORT, () => {
    console.log(`🚀 Backend GraphQL Server đang chạy tại: http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
