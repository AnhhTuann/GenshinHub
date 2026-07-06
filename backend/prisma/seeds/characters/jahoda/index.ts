import { profile } from './profile';
import { stats } from './stats';
import { build } from './build';
import { teams } from './teams';

export const jahoda = {
  ...profile,
  stats,
  ...build,
  teams
};
