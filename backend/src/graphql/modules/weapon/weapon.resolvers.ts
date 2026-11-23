import { GraphQLContext } from '../../context';
import { WeaponService } from './weapon.service';
import { WeaponGameDataService } from './weaponGameData.service';

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
    weaponGameData: async (_: any, args: { id: string }, context: GraphQLContext) => {
      const service = new WeaponGameDataService(context.prisma);
      return service.getGameData(args.id);
    },
    weaponRecommendedUsers: async (_: any, args: { id: string }, context: GraphQLContext) => {
      const service = new WeaponGameDataService(context.prisma);
      return service.getRecommendedUsers(args.id);
    },
  },
};
