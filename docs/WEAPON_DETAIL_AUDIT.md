# Weapon Detail — Data & UI Audit Report

- **Date**: 2026-11-20
- **Branch**: `feat/balanced-fantasy-motion`
- **Scope**: Weapon Detail for all valid weapons, using `/vi/weapons/11512` (Ánh Lá Phán Quyết) as the primary test case and `/vi/weapons/15514` (Xích Vũ Tinh Tựu) as the user-reported control case.
- **Safety**: dev DB and local servers only. No production writes, no commit/push/merge/deploy, no reset/stash/clean, no direct edit of the main Character Card component.

## 1. Current state before implementation

| Area | Finding |
|---|---|
| Git | Branch `feat/balanced-fantasy-motion`; many pre-existing uncommitted changes were preserved. Weapon page files already had unrelated local edits before this task. |
| Weapon Prisma model | 279 weapon rows. Fields: `id`, localized names, `rarity`, `type`, `baseAtk`, `subStat`, `subStatValue`, passive names/descriptions, `iconUrl`, `tier`, `role`. No level scaling, refinement or ascension-material fields. |
| GraphQL | `weapon`/`weapons` only returned the stored DB fields. No game-data or recommendation query existed. |
| Frontend | Hero showed only Lv.90 DB values with ambiguous labels. No level selector, R1–R5, refinement values, ascension-material section or total materials. `Recommended Users` came from `charactersByWeaponType(weapon.type)`, so it was a weapon-type list, not approved recommendations; displayed `0 characters` in practice. |
| `genshin-db` | `genshin-db@5.2.15`, game data v7.2, MIT, local package. Contains exact `stats(level, ascension)`, `r1`–`r5` and `costs.ascend1..6` for the tested weapons. |
| Assets | Weapon icons and material icons are local WebP under `frontend/public/assets/weapons` and `frontend/public/assets/items`. |
| Recommendations | `CharacterWeapon` has 604 approved rows. Legacy `weaponId` values are Vietnamese slugs, while `Weapon.id` is numeric, so the old page could not join by ID. 125 distinct character IDs join cleanly to `Character`. |

## 2. Data added for real

Game facts are now resolved server-side from the pinned local `genshin-db` package. They are **not** fetched from an external API when a user opens the page.

New GraphQL queries:

```graphql
weaponGameData(id: String!): WeaponGameData
weaponRecommendedUsers(id: String!): [WeaponRecommendedUser!]!
```

`WeaponGameData` exposes exact source values for:

- 14 level/ascension states: Lv.1, Lv.20 before/after, Lv.40 before/after, … Lv.90.
- Base ATK and secondary stat per state, with unit already formatted by the source (`19.2%`, `36`, …).
- R1–R5 refinement descriptions and numeric values.
- 6 ascension stages (`20/40` … `80/90`) with Mora and per-item counts.
- Source weapon type, rarity, main stat type, release version and description.

Recommendations are derived only from approved internal `CharacterWeapon` rows. The resolver matches exact localized names plus normalized weapon IDs, deduplicates characters by best rank, and returns linked `Character` data including element, rarity, tier, role and F2P flag.

No Prisma schema or GraphQL mutation was needed for this task. No Admin-managed field is overwritten.

## 3. Source and permission

| Source | Usage | Permission / note |
|---|---|---|
| `genshin-db@5.2.15` (MIT, game data v7.2) | All game facts: level stats, refinements, ascension costs, source names/IDs. | Local package already used by the project; license confirmed in prior data-sync audit. |
| Internal `CharacterWeapon` rows | Recommended Users. | Approved internal/build data only; no popularity list or type-based auto-assignment. |
| Genshin-Builds `llms.txt`, `/api/llms.txt`, `agents.md`, `auth.md`, canonical weapon page | Read-only layout/field comparison and API documentation check. | Public documentation says read-only endpoints need no auth. No editorial recommendation text was copied or stored. Direct `/api/mcp` and `/api/mcp/docs` returned HTTP 406 for anonymous direct requests, so no private/structured content was used. |

## 4. Weapon Detail UI completed

Implemented in `frontend/app/[locale]/weapons/[id]/WeaponDetailClient.tsx` and `frontend/app/globals.css`:

1. **Weapon Hero** — large local WebP artwork, rarity-tinted frame, clear weapon name, type, rarity stars, selected Base ATK, selected secondary stat with unit, passive name.
2. **Level & Refinement** — 14 exact source states with Before/After markers at ascension breakpoints; changing level updates hero and readout from `genshin-db`; R1–R5 chips update numeric values. R2–R5 shows exact source text with an explicit `genshin-db` label instead of an invented Vietnamese translation.
3. **Passive Description** — approved localized R1 description; source description for higher ranks; lore line from source when available.
4. **Recommended Users** — compact cards with artwork, name, element icon, rarity, tier/role, build rank and link to Character Detail. Empty state is shown when there is no approved recommendation.
5. **Ascension Materials** — six stage cards with exact Mora, local WebP icons, localized material names and counts.
6. **Total Materials** — deduplicated per material ID, Mora summed separately.
7. **Source Information** — data source, game-data version and recommendation provenance.

Rarity accents are light: 5★ gold/amber, 4★ violet, 3★ aqua, 1–2★ neutral. Design uses existing `var(--bg-*)`, `var(--border-*)` and `var(--text-*)` tokens, light/dark mode, visible focus states, 44px+ touch targets and reduced-motion handling.

## 5. Primary test case — Ánh Lá Phán Quyết (`11512`)

| Check | Result |
|---|---|
| Name / type / rarity | Light of Foliar Incision / Ánh Lá Phán Quyết · Sword · 5★ |
| Lv.1 Base ATK | **44** (source raw `44.3358`) |
| Lv.1 CRIT DMG | **19.2%** |
| Lv.90 Base ATK | **542** (source raw `541.829758`) |
| Lv.90 CRIT DMG | **88.2%** |
| Level states | 14 (including Before/After at 20, 40, 50, 60, 70, 80) |
| Refinements | R1–R5 present; R5 values `8%`, `240%` |
| Ascension stages | 6, labels `20/40` … `80/90` |
| First stage | Mora 10,000 · Copper Talisman of the Forest Dew ×5 · Desiccated Shell ×5 · Faded Red Satin ×3 |
| Total | Mora **225,000** + 10 distinct materials |
| Approved recommended users | **3** — Kamisato Ayato (#4), Durin (#8), Furina (#10) |

## 6. Additional test cases

| Weapon | ID | Users from approved DB | Level states | Stages | Result |
|---|---:|---:|---:|---:|---|
| Xích Vũ Tinh Tựu / Astral Vulture's Crimson Plumage (Bow 5★) | `15514` | 1 (Lyney) | 14 | 6 | Lv.1 46 ATK / 14.4% CRIT DMG → Lv.90 608 / 66.2%; no data from Foliar reused. |
| Ánh Trăng Xiphos / Xiphos' Moonlight (Sword 4★) | `11418` | 2 (Nilou, Kazuha) | 14 | 6 | Lv.1 42 ATK / 36 EM → Lv.90 510 / 165 EM. |
| Lãnh Nhẫn / Cool Steel (Sword 3★) | `11301` | 0 | 14 | 6 | Truthful empty state; no fake recommendation. |

Across the dev DB, **163 of 279 weapons** resolve at least one approved user and **592 weapon↔character pairs** are returned. Twelve legacy `CharacterWeapon` rows point to weapon names absent from the current `Weapon` table (e.g. placeholder `New Support Polearm`); these remain hidden rather than guessed.

## 7. Verification evidence

Commands run after the final code changes:

- `backend`: `npx tsc --noEmit --pretty false` → pass.
- `frontend`: `npx tsc --noEmit --pretty false` → pass.
- `frontend`: `npm run lint` → exit 0; only pre-existing unrelated warnings (React Hook Form / `<img>` in other files). The earlier `ascensionStages` useMemo warning in this file was fixed.
- Playwright script `/tmp/opencode/weapon_ui_check.py` → all 4 weapons, light/dark, 390/768/1440px, level selection, R5 selection, image loading, overflow and navigation checks passed.
- Console/page errors: 0 (the only network 401 is the pre-existing unauthenticated `/api/auth/me` check).
- Broken images: 0. Horizontal overflow: 0px at all tested viewports. Text below 12px inside the weapon detail: 0.
- Character navigation: `/vi/weapons/11512` → first recommended card → `/vi/characters/kamisato-ayato`.

Screenshots (before/after preserved in `/tmp/opencode/genshinhub-shots/`):

- `weapon-before-11512.png`, `weapon-before-15514.png`
- `weapon-after-11512-1440-dark.png`, `weapon-after-15514-1440-dark.png`
- `weapon-after-11418-1440-dark.png`, `weapon-after-11301-1440-dark.png`
- `weapon-after-11512-light-1440.png`, `weapon-after-11512-mobile-390.png`, `weapon-after-11512-tablet-768.png`

## 8. Files changed in this task

- `backend/src/graphql/modules/weapon/weaponGameData.service.ts` (new)
- `backend/src/graphql/modules/weapon/weapon.schema.ts`
- `backend/src/graphql/modules/weapon/weapon.resolvers.ts`
- `frontend/lib/graphql/queries/weapon.ts`
- `frontend/app/[locale]/weapons/[id]/page.tsx`
- `frontend/app/[locale]/weapons/[id]/WeaponDetailClient.tsx`
- `frontend/app/globals.css`
- `docs/WEAPON_DETAIL_AUDIT.md` (new)

Pre-existing uncommitted work in `WeaponsClient.tsx`, weapons `page.tsx`, `WeaponCard.tsx`, character-material scripts/docs and other files was left untouched.

## 9. Blocked / Pending

- Genshin-Builds editorial recommendation lists are **not imported**: reuse permission for editorial content was not confirmed, and no Admin approval flow exists yet. If added later, they must go through import → normalize → weapon-ID match → validate → preview → Admin approval → save.
- `/api/mcp` and `/api/mcp/docs` returned 406 anonymously; documented public endpoints were checked instead. No private API reverse-engineering was attempted.
- Twelve legacy recommendation rows with unknown/placeholder weapon names remain unmatched pending a separate reviewed data cleanup.
- No production database write or deploy was performed.
