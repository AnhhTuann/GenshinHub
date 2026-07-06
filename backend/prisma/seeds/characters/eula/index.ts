import { profile } from './profile';
import { stats } from './stats';
import { build } from './build';
import { teams } from './teams';

export const eula = {
  ...profile,
  stats,
  ...build,
  teams
};
