"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupResolvers = void 0;
const backupService_1 = require("../../../backupService");
exports.backupResolvers = {
    Query: {
        listBackups: async (_, __, context) => {
            if (!context.user.isAdmin)
                throw new Error("Unauthorized");
            return (0, backupService_1.listBackups)();
        },
        getBackup: async (_, args, context) => {
            if (!context.user.isAdmin)
                throw new Error("Unauthorized");
            return (0, backupService_1.getBackupById)(args.id);
        },
    },
};
