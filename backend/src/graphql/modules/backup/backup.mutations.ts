import { GraphQLContext } from '../../context';
import { createJsonBackup, deleteBackup, restoreFromBackup, cleanupOldBackups } from '../../../backupService';
import { Mutation as mutationsImpl } from '../../../mutations'; // For exportDatabaseToSeeds

export const backupMutations = {
  Mutation: {
    exportDatabaseToSeeds: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.exportDatabaseToSeeds(_, args, context),
    createBackup: async (_: any, __: any, context: GraphQLContext) => {
      if (!context.user.isAdmin) throw new Error("Unauthorized");
      return await createJsonBackup();
    },
    deleteBackup: async (_: any, { id }: any, context: GraphQLContext) => {
      if (!context.user.isAdmin) throw new Error("Unauthorized");
      return deleteBackup(id);
    },
    restoreFromBackup: async (_: any, { id }: any, context: GraphQLContext) => {
      if (!context.user.isAdmin) throw new Error("Unauthorized");
      return await restoreFromBackup(id);
    },
    cleanupBackups: async (_: any, { keepCount }: any, context: GraphQLContext) => {
      if (!context.user.isAdmin) throw new Error("Unauthorized");
      return cleanupOldBackups(keepCount || 5);
    },
  }
};
