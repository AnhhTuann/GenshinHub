/**
 * Tier display configuration.
 *
 * Admin-defined TierRank rows are authoritative. The canonical list below is a
 * *display fallback* only: it lets real rankings stay visible when the config
 * table is empty, and it prevents data loss when a character/weapon uses a tier
 * that has no TierRank row yet. It never assigns a tier to any item.
 */

export type TierDefinition = {
  id: string;
  name: string;
  order: number;
  colorBase: string;
  source: 'admin' | 'fallback' | 'system';
};

export type AdminTierRank = {
  id: string;
  name: string;
  order: number;
  colorBase: string;
};

export const UNRANKED_TIER_NAME = 'Unranked';

// Order matters only for display. D is a legacy Admin tier already present in
// the development database, so it is preserved rather than silently remapped.
const CANONICAL_TIERS: ReadonlyArray<{ name: string; order: number; colorBase: string }> = [
  { name: 'SS', order: 0, colorBase: 'amber' },
  { name: 'S', order: 1, colorBase: 'violet' },
  { name: 'A', order: 2, colorBase: 'cyan' },
  { name: 'B', order: 3, colorBase: 'blue' },
  { name: 'C', order: 4, colorBase: 'emerald' },
  { name: 'D', order: 5, colorBase: 'slate' },
];

/** Options shown in the Admin tier dropdowns even before TierRank is seeded. */
export const TIER_SELECT_OPTIONS = CANONICAL_TIERS.map((tier) => tier.name);

/**
 * Build the ordered list of tier rows from Admin config + tier values found in
 * actual data. Empty rows are filtered by the caller, not here.
 */
export function resolveTierRows(
  adminTiers: AdminTierRank[] = [],
  tierValues: Array<string | null | undefined> = [],
): TierDefinition[] {
  const rows = new Map<string, TierDefinition>();

  adminTiers.forEach((tier) => {
    if (!tier?.name) return;
    rows.set(tier.name, {
      id: tier.id || `admin-${tier.name}`,
      name: tier.name,
      order: tier.order ?? 0,
      colorBase: tier.colorBase || 'default',
      source: 'admin',
    });
  });

  CANONICAL_TIERS.forEach((tier, index) => {
    if (rows.has(tier.name)) return;
    rows.set(tier.name, {
      id: `fallback-${tier.name}`,
      name: tier.name,
      // Admin rows keep their own order; canonical rows fill in after them.
      order: 100 + index,
      colorBase: tier.colorBase,
      source: 'fallback',
    });
  });

  // Any custom/legacy Admin tier used by real data but missing from config
  // still gets a row, so no ranked item is ever hidden.
  const customValues = Array.from(new Set(tierValues.filter(Boolean) as string[]))
    .filter((name) => !rows.has(name))
    .sort((a, b) => a.localeCompare(b));
  customValues.forEach((name, index) => {
    rows.set(name, {
      id: `data-${name}`,
      name,
      order: 200 + index,
      colorBase: 'default',
      source: 'system',
    });
  });

  // "Unranked" is always the last row, even if an Admin config row exists.
  const unranked = rows.get(UNRANKED_TIER_NAME);
  rows.set(UNRANKED_TIER_NAME, {
    id: unranked?.id ?? 'unranked',
    name: UNRANKED_TIER_NAME,
    order: 999,
    colorBase: 'unranked',
    source: unranked?.source ?? 'system',
  });

  return Array.from(rows.values()).sort(
    (a, b) => a.order - b.order || a.name.localeCompare(b.name),
  );
}

export type Role = 'Main DPS' | 'Sub DPS' | 'Support';

export const VERIFIED_ROLES: readonly Role[] = ['Main DPS', 'Sub DPS', 'Support'];

// Admin data currently uses human-readable strings ("Main DPS"). Accept the
// enum-style spelling too (MAIN_DPS) without inventing any new role mapping.
const ROLE_ALIASES: Record<string, Role> = {
  'main dps': 'Main DPS',
  'sub dps': 'Sub DPS',
  support: 'Support',
};

function normalizeRoleToken(value: string): string {
  return value.trim().toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
}

/**
 * Only explicitly verified roles are returned. Unknown or missing tokens stay
 * unclassified so they can be reported for Admin review instead of being
 * guessed from weapon/element/rarity.
 */
export function getVerifiedRoles(itemRole: string | null | undefined): Role[] {
  if (!itemRole) return [];
  const roles = itemRole
    .split(',')
    .map((token) => ROLE_ALIASES[normalizeRoleToken(token)])
    .filter((role): role is Role => Boolean(role));
  return VERIFIED_ROLES.filter((role) => roles.includes(role));
}

/** Roles are stored as comma-separated strings (e.g. "Support, Sub DPS"). */
export function hasRole(itemRole: string | null | undefined, role: string): boolean {
  if (role === 'All') return true;
  return getVerifiedRoles(itemRole).includes(role as Role);
}
