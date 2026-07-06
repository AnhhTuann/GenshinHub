"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupMutations = void 0;
const backupService_1 = require("../../../backupService");
const exportData_1 = require("../../../../scripts/exportData");
exports.backupMutations = {
    Mutation: {
        exportDatabaseToSeeds: async (_, args, context) => {
            if (!context.user.isAdmin)
                throw new Error("Unauthorized");
            return await (0, exportData_1.exportDatabaseToSeeds)();
        },
        createBackup: async (_, __, context) => {
            if (!context.user.isAdmin)
                throw new Error("Unauthorized");
            return await (0, backupService_1.createJsonBackup)();
        },
        deleteBackup: async (_, { id }, context) => {
            if (!context.user.isAdmin)
                throw new Error("Unauthorized");
            return (0, backupService_1.deleteBackup)(id);
        },
        restoreFromBackup: async (_, { id }, context) => {
            if (!context.user.isAdmin)
                throw new Error("Unauthorized");
            return await (0, backupService_1.restoreFromBackup)(id);
        },
        cleanupBackups: async (_, { keepCount }, context) => {
            if (!context.user.isAdmin)
                throw new Error("Unauthorized");
            return (0, backupService_1.cleanupOldBackups)(keepCount || 5);
        },
    }
};
