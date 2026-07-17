"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaponMutations = void 0;
const mutations_1 = require("../../../mutations");
exports.weaponMutations = {
    Mutation: {
        upsertWeapon: async (_, args, context) => mutations_1.Mutation.upsertWeapon(_, args, context),
        deleteWeapon: async (_, args, context) => mutations_1.Mutation.deleteWeapon(_, args, context),
        updateWeaponTierList: async (_, args, context) => mutations_1.Mutation.updateWeaponTierList(_, args, context),
    }
};
