import { GraphQLContext } from '../../context';
import { listBackups, getBackupById } from '../../../backupService';

export const backupResolvers = {
  Query: {
    listBackups: async (_: any, __: any, context: GraphQLContext) => {
      if (!context.user.isAdmin) throw new Error("Unauthorized");
      return listBackups();
    },
    getBackup: async (_: any, args: { id: string }, context: GraphQLContext) => {
      if (!context.user.isAdmin) throw new Error("Unauthorized");
      return getBackupById(args.id);
    },
  },
};
