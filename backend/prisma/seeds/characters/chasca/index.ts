import { profile } from './profile';
import { stats } from './stats';
import { build } from './build';
import { teams } from './teams';

export const chasca = {
  ...profile,
  stats,
  ...build,
  teams
};
