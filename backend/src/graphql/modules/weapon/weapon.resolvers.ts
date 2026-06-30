import { GraphQLContext } from '../../context';
import { WeaponService } from './weapon.service';

export const weaponResolvers = {
  Query: {
    weapons: async (_: any, __: any, context: GraphQLContext) => {
      const service = new WeaponService(context.prisma);
      return service.getAllWeapons();
    },
    weapon: async (_: any, args: { id: string }, context: GraphQLContext) => {
      const service = new WeaponService(context.prisma);
      return service.getWeaponById(args.id);
    },
  },
};
