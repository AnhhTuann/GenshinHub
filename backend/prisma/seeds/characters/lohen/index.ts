import { profile } from './profile';
import { stats } from './stats';
import { build } from './build';
import { teams } from './teams';

export const lohen = {
  ...profile,
  stats,
  ...build,
  teams
};
