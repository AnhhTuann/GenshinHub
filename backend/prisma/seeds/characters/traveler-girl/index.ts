import { profile } from './profile';
import { stats } from './stats';
import { build } from './build';
import { teams } from './teams';

export const travelerGirl = {
  ...profile,
  stats,
  ...build,
  teams
};
