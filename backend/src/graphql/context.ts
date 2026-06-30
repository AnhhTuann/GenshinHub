import { PrismaClient } from '@prisma/client';
import { createLoaders, MyLoaders } from './dataloaders';

export interface UserInfo {
  // Can be extended with JWT payload details
  id?: string;
  role?: string;
  isAdmin: boolean;
}

export interface GraphQLContext {
  prisma: PrismaClient;
  dataloaders: MyLoaders;
  user: UserInfo;
}
