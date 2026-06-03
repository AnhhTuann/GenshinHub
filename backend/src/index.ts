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
  
  app.use(helmet({ crossOriginEmbedderPolicy: false, contentSecurityPolicy: (process.env.NODE_ENV === 'production' ? undefined : false) }));
  app.use(compression());
  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  
  app.use('/graphql', expressMiddleware(server));

  app.listen(4000, () => {
    console.log(`🚀 Backend GraphQL Server đang chạy tại: http://localhost:4000/graphql`);
  });
}
startServer();
