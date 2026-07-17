"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaponResolvers = void 0;
const weapon_service_1 = require("./weapon.service");
exports.weaponResolvers = {
    Query: {
        weapons: async (_, __, context) => {
            const service = new weapon_service_1.WeaponService(context.prisma);
            return service.getAllWeapons();
        },
        weapon: async (_, args, context) => {
            const service = new weapon_service_1.WeaponService(context.prisma);
            return service.getWeaponById(args.id);
        },
    },
};
