import { profile } from './profile';
import { stats } from './stats';
import { build } from './build';
import { teams } from './teams';

export const xiao = {
  ...profile,
  stats,
  ...build,
  teams
};
