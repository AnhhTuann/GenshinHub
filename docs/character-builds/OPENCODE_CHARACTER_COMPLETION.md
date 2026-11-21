# OpenCode — DEVELOPMENT Character-Data Completion Report

**Run ID:** `opencode-development-character-completion-2026-11-21`
**Scope:** DEVELOPMENT database only (`postgresql://postgres:***@127.0.0.1:5434/genshinhub`)
**Git HEAD (unchanged):** `dde87f7a34abf3246ac94bd750dd70e333f2f484`
**Production access / commit / push / merge:** none

---

## 1. Objective and outcome

Continue the DEVELOPMENT-only completion of the 131-character catalog without repeating completed
audits, without touching human-approved payloads in place, and without fabricating evidence or
approvals.

Resolved in this run:

1. **Bennett / Xiangling approved-build revision blocker** — the 32 `PROTECTED_ALIAS` matrix issues
   (35 individual corrections: Bennett 12 weapons + 4 teammates, Xiangling 19 weapons) were moved into
   deterministic `MAINTENANCE` revision rows while the original `APPROVED`, version-3 builds, their
   audits, aliases and default-state history were preserved.
2. **Six Traveler stat-table gaps** — `traveler-anemo`, `traveler-hydro`, `traveler-electro`,
   `traveler-geo`, `traveler-dendro`, `traveler-pyro` had placeholder baselines (`3262 / 64 / 205`) and
   an empty ascension table. Complete per-element source pages were discovered (the earlier audit only
   queried the JSON API, which omits stats). Each page yields a 14-row table byte-identical to the
   existing `traveler-boy` / `traveler-girl` reference, so all 18 `GENERIC_TRAVELER_BASELINE_DIFFERS`
   and 6 `NO_ASCENSION_STAT_TABLE` issues were resolved.

---

## 2. Backup and restore provenance

| Artifact | SHA-256 | Restore test |
|---|---|---|
| `/tmp/opencode/genshinhub-backup/opencode_pre_maintenance.dump` | `84d02ce52db561276bb500a36cc7d3bdb0217a1a2b2ec9dc9e3dd85a4ae75e81` | PASS — 21 non-migration tables, counts + MD5 digests matched |
| `/tmp/opencode/genshinhub-backup/opencode_pre_stats_varka.dump` | `24baafd300be56afdec122bb958df2bd7989df7ae2a5827333fc2be06b709db0` | PASS — 21 non-migration tables, counts + MD5 digests matched |

Both restores were performed in isolated `--network none` Postgres 15 containers. The 22nd table is
`_prisma_migrations`, which is intentionally excluded from the content comparison. No backup was
deleted or truncated.

---

## 3. Changes applied

### 3.1 `MAINTENANCE` review status (schema / DB / API)

- `backend/prisma/schema.prisma`: `CharacterBuildReviewStatus` now includes `MAINTENANCE`.
- `backend/prisma/migrations/20261121141000_add_maintenance_build_status/migration.sql`: applied the DB
  enum value.
- `backend/src/graphql/modules/character/character.schema.ts`: GraphQL enum includes `MAINTENANCE`.
- Public read filters (`dataloaders/index.ts`, `character.resolvers.ts`) return
  `APPROVED | LEGACY_IMPORT | MAINTENANCE`. The admin publish allow-list was intentionally left
  unchanged, so `MAINTENANCE` is explicitly distinct from human `APPROVED` / `LEGACY_IMPORT`.

### 3.2 Bennett / Xiangling alias revisions

| Character | Revision ID | Canonical weapon IDs | Teammate fixes | Audit events |
|---|---|---|---|---|
| Bennett | `maint-bennett-7.2-alias-r1` | 12/12 | 4 (`kazuha` → `kaedehara-kazuha`) | 2 |
| Xiangling | `maint-xiangling-7.2-alias-r1` | 19/19 | 0 | 2 |

Originals remain `APPROVED`, version `3`, `approvalChecksum = null`, `isDefault = false`; revisions are
`MAINTENANCE`, version `1`, `isDefault = true`. Only truthful `MAINTENANCE_SUPERSEDED` /
`MAINTENANCE_REVISION_CREATED` audits were added — no approval or checksum was forged. Replay of the
apply script returned `ALREADY_APPLIED` for both characters.

### 3.3 Traveler base stats and ascension tables

| Character | Before (HP/ATK/DEF, rows) | After (HP/ATK/DEF, rows) | Audit |
|---|---|---|---|
| traveler-anemo | 3262 / 64 / 205, 0 | 10875 / 212 / 683, 14 | `MAINTENANCE_BASE_STATS_CORRECTED` |
| traveler-hydro | 3262 / 64 / 205, 0 | 10875 / 212 / 683, 14 | `MAINTENANCE_BASE_STATS_CORRECTED` |
| traveler-electro | 3262 / 64 / 205, 0 | 10875 / 212 / 683, 14 | `MAINTENANCE_BASE_STATS_CORRECTED` |
| traveler-geo | 3262 / 64 / 205, 0 | 10875 / 212 / 683, 14 | `MAINTENANCE_BASE_STATS_CORRECTED` |
| traveler-dendro | 3262 / 64 / 205, 0 | 10875 / 212 / 683, 14 | `MAINTENANCE_BASE_STATS_CORRECTED` |
| traveler-pyro | 3262 / 64 / 205, 0 | 10875 / 212 / 683, 14 | `MAINTENANCE_BASE_STATS_CORRECTED` |

Evidence: `/tmp/opencode/evidence/html/traveler_{anemo,hydro,electro,geo,dendro,pyro}.html` plus per-page
SHA-256 digests in `/tmp/opencode/evidence/traveler-stats.json`. The apply script re-derives each 14-row
table from the serialized Astro `CharacterStats` props and asserts an exact match against `traveler-boy`
before writing. It is idempotent (replay returned `ALREADY_APPLIED` for all six).

All writes used scoped Prisma transactions with `SELECT … FOR UPDATE` row locks and pre/post state
assertions. Journals:
`/tmp/opencode/genshinhub-backup/maintenance-revisions-applied.json` and
`/tmp/opencode/genshinhub-backup/traveler-stats-applied.json`.

---

## 4. Database before / after

| Table / field | Baseline | Final | Delta |
|---|---|---|---|
| Characters | 131 | 131 | 0 |
| Builds | 219 | 221 | +2 maintenance revisions |
| CharacterWeapon rows | 897 | 928 | +31 (12 Bennett + 19 Xiangling revision rows) |
| CharacterArtifact rows | 467 | 476 | +9 (copied into revisions) |
| CharacterTeam rows | 348 | 364 | +16 (8 + 8 copied teams) |
| Audits | 384 | 394 | +10 (4 alias + 6 stats) |
| APPROVED builds | 96 | 96 | 0 |
| REJECTED builds | 88 | 88 | 0 |
| LEGACY_IMPORT builds | 35 | 35 | 0 |
| MAINTENANCE builds | 0 | 2 | +2 |
| Default builds | 126 | 126 | 0 |

Only `public.Character` and `public.CharacterBuildAudit` changed relative to the pre-stats snapshot
(the alias revision tables were already present in that snapshot). Default-per-character and
version/checksum invariants hold for every build.

---

## 5. Validation

| Check | Result |
|---|---|
| `prisma validate` | PASS |
| `npm run build` (prisma generate + tsc) | PASS |
| Build-audit unit tests | 15 pass / 1 skip / 2 pre-existing baseline-drift failures (`catalog-a01`, `catalog-final-review`; documented in `docs/tierlist/FINAL_TIERLIST_TEST_RESULTS.md`) |
| Dataloader unit test | PASS |
| GraphQL enum introspection | PASS — `DRAFT PENDING_REVIEW APPROVED REJECTED LEGACY_IMPORT MAINTENANCE` |
| GraphQL all-131 character validation | PASS — 131 characters, 133 public builds (96 `APPROVED` + 35 `LEGACY_IMPORT` + 2 `MAINTENANCE`; 88 `REJECTED` correctly excluded), no non-public status, no default violations |
| GraphQL Bennett/Xiangling revision readback | PASS — originals approved/default-false/v3, revisions maintenance/default-true |
| GraphQL Traveler readback | PASS — all six return 10875 / 212 / 683 with 14 stat rows |
| Headless Chrome browser validation | PASS — 4/4 routes (`bennett`, `xiangling`, `traveler-anemo`, `traveler-pyro`), canonical aliases rendered, no raw `kazuha`, no JS errors |

Artifacts: `/tmp/opencode/genshinhub-backup/graphql-validation.json`,
`/tmp/opencode/genshinhub-backup/browser-validation.json`.

---

## 6. Matrix reconciliation and remaining gaps

Source: `docs/character-builds/FINAL_REMAINING_CORRECTIONS_MATRIX.json` — 134 issues across 44 identities.

| Status (exact field) | Count | Breakdown |
|---|---|---|
| `APPLIED` before this run | 21 | 11 `INVALID_ARTIFACT_LABEL`, 10 `INCOMPATIBLE_WEAPON_TYPE` |
| `RETAINED` before this run | 1 | 1 `EXPERIMENTAL_TEAM_ROTATION_UNVERIFIED` (Fischl) |
| `APPLIED` this run | 56 | 32 `PROTECTED_ALIAS`, 18 `GENERIC_TRAVELER_BASELINE_DIFFERS`, 6 `NO_ASCENSION_STAT_TABLE` |
| `BLOCKED` remaining | 56 | 17 `UNRESOLVED_ARTIFACT_SET`, 34 `DRAFT_GAMEPLAY_EVIDENCE`, 5 `MISSING_BUILD` across 39 identities |

The 5 missing builds (`alyosha`, `odette`, `valeriy`, `vesna`, `vodyanitsa`) and the artifact/draft rows
remain `BLOCKED`: fresh API evidence exists, but rotations, timing, ownership and team assumptions are
not independently verified, and the current API payloads differ from the earlier 7.2 candidate drafts.
No blind copying, invented combat measurements, or fabricated approvals were applied. Full per-issue
detail is in `docs/character-builds/OPENCODE_REMAINING_GAPS.json`.

---

## 7. Deliverables

- `docs/character-builds/OPENCODE_CHARACTER_COMPLETION.md` — this report
- `docs/character-builds/OPENCODE_CHARACTER_BEFORE_AFTER.json` — before/after snapshots, digests, journals, validation
- `docs/character-builds/OPENCODE_REMAINING_GAPS.json` — exact remaining `BLOCKED` issues with status fields and reasons
