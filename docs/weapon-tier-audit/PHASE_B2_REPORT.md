# Phase B2 — candidate validation & migration integrity (read-only)

**Date:** 2026-11-20
**Scope:** validate the 14 `INDEPENDENT` candidates in `docs/weapon-tier-independent/`, investigate migration integrity/concurrency, and prepare an approval package. **No ranking was written to any database.**

| Label | State |
|---|---|
| `MIGRATION HISTORY INSPECTED` | YES |
| `FRESH BOOTSTRAP FROM EMPTY DB` | **FAILS** — no baseline migration (needs separate approval to fix) |
| `BOOTSTRAP FROM BACKUP BASELINE` | YES — weapon migration applies cleanly |
| `CHARACTERBUILD DRIFT` | Investigated from audit rows/logs; **not fixed, not touched** |
| `14 CANDIDATES REVIEWED` | YES |
| `APPROVAL PACKAGE READY` | YES — 7 ready / 5 need evidence / 2 tier disputed |
| `RANKING APPROVED` | **NO — 0** |
| `WEAPONTIERRANK ROWS` | **0** |
| `WEAPONTIERAUDIT ROWS` | **0** |
| `PUBLISH_RIGHTS_AUTO_VERIFIED` | **NO — all 14 stay false** |

---

## 1. Fresh migration bootstrap status

### 1.1 Actual migration history (development DB `127.0.0.1:5434/genshinhub`)

| Migration | finished_at (UTC) | steps | checksum matches local file |
|---|---|---:|---|
| `20261120151000_add_character_tier_rankings` | 08:15:10.277831 | **0** | YES (`01e70c7b…f498`) |
| `20261120153500_add_weapon_tier_rankings` | 08:24:54.968331 | 1 | YES (`b37adcc9…febc`) |

- Both rows have `finished_at` set, `rolled_back_at` NULL, no error in `logs`.
- `prisma migrate status` reports "Database schema is up to date!".
- `prisma migrate diff --from-url <dev> --to-schema-datamodel prisma/schema.prisma` returns **"This is an empty migration."** — the live schema and `schema.prisma` agree.
- The Character Tier migration has `applied_steps_count = 0`, which is consistent with the migration being marked applied (e.g. `migrate resolve --applied`) rather than executed statement-by-statement by `migrate deploy`. I cannot determine the exact command from the available logs and did not change this record. However, all 6 indexes and both constraints defined in its `migration.sql` are physically present, so the resulting schema matches the migration.

### 1.2 Fresh bootstrap from empty PostgreSQL

I created a throwaway DB `genshinhub_b2_bootstrap`, ran `prisma migrate deploy`, then dropped it.

```
Applying migration `20261120151000_add_character_tier_rankings`
Error: P3018 ... Database error code: 42P01
ERROR: relation "Character" does not exist
```

**Result: FAILED.** The two managed migrations are purely incremental: there is no baseline migration that creates the core game tables (`Weapon`, `Character`, `ArtifactSet`, …). An empty database cannot be bootstrapped with `prisma migrate deploy` alone. This is a pre-existing repo-level gap, not caused by Phase B1/B2.

`prisma migrate diff --from-migrations … --shadow-database-url …` fails for the same reason (`P1014: The underlying table for model Character does not exist`), so schema drift cannot be computed from the migrations directory either.

### 1.3 Bootstrap from a realistic baseline

I restored the existing pre-B1 backup into throwaway DB `genshinhub_b2_verify`, then ran `prisma migrate deploy`:

- Before: 1 migration applied, 279 weapons, **no** `WeaponTierRank`.
- After: 2 migrations applied, 279 weapons, 126 `CharacterBuild`, `WeaponTierRank = 0`.
- Weapon migration applied cleanly; no DROP/DELETE/UPDATE/TRUNCATE and no `CharacterBuild` reference in its SQL.

Throwaway DB `genshinhub_b2_verify` and `genshinhub_b2_shadow` were dropped after the checks. Development DB was never reset.

### 1.4 Unmanaged migrations / proposed fix (NOT applied)

`backend/prisma/development-migrations/20261120_character_builds.sql` created `CharacterBuild` / `CharacterBuildAudit` with manual SQL; those objects are absent from `_prisma_migrations`. `docs/weapon-tier-audit/PHASE_B1_IMPLEMENTATION.md` already records this.

Another local scratch DB (`genshinhub_b25_bootstrap_1795163945`, not created by me) contains 4 migration names including `20261101000000_baseline_legacy` and `20261120152000_add_character_builds`. This shows a baseline remedy is being explored elsewhere, but those files are **not** in `backend/prisma/migrations/` in this working tree. I did not adopt, copy, mark applied, or run them.

**Proposal requiring separate approval:** add a reviewed baseline migration that captures the legacy core schema, plus a managed `add_character_builds` migration, then reconcile the dev DB with an explicit, approved `migrate resolve` strategy. Do not mark anything applied automatically and do not generate a migration that drops `CharacterBuild`.

---

## 2. CharacterBuild drift investigation

Read-only evidence only; no process is assumed or blamed.

- `CharacterBuild` count observed: **126 at 08:29:58**, **127 at final check** (earlier in the session it was 126 → 127 during Phase B1).
- 126 rows have `createdAt = 2026-11-20 08:21:31.041` and `actor = development-backfill`, `action = LEGACY_BACKFILLED`.
- The 127th row is `approved-567e51a3…`, `characterId = mitya`, `createdAt = 08:29:58.821`, with audit row:
  - `action = APPROVED_IMPORT`
  - `actor = GenshinHub maintainer (explicit user approval)`
  - `version = 1`
- PostgreSQL log corroborates concurrent, separate workstreams:
  - 08:15–08:18 and 08:30–08:31: duplicate-key errors on `CharacterTierRanking` inserts (Character Tier workflow).
  - 08:19:45: `relation "public.CharacterBuild" does not exist` from a build query, before the backfill.
  - 08:29:15 / 08:38 / 08:40: FK and `CharacterBuild_one_default_per_character` errors around the approved build import.
- Other local scratch databases exist (`genshinhub_multibuild_test_b49`, `genshinhub_b25_bootstrap_1795163945`), indicating other test workflows on the same PostgreSQL instance. I did not modify them beyond a read-only metadata query.
- 7 idle application connections from `172.17.0.1` were present; no active write was observed at check time.

**Conclusion:** the drift is explained by audited, explicitly approved Multi-Build activity outside this phase, not by the weapon migration. The only defensible statement from logs is what the audit rows say; I did not identify or contact any concurrent process.

---

## 3. Review of the 14 candidates

Facts verified with the installed `genshin-db` at **R1 and R5** (passive descriptions, effect names, substats). Facts were used only to verify the draft text, never to compute a tier automatically.

### Ready for admin review (7)

| Candidate | Verified fact | Why the tier claim survives review |
|---|---|---|
| `11401` Favonius Sword, Support SS, R1 | ER substat; Windfall R1 60% / 6 Energy / 12s | Particle generation works at R1; crit assumption is explicit. |
| `11418` Xiphos' Moonlight, Support S, R1 | EM substat; 0.036% ER per EM, 30% shared, triggers off-field | EM-investment condition stated; S is conditional, not automatic SS. |
| `11512` Light of Foliar Incision, Main DPS S, R1 | CRIT DMG substat; +4% CRIT Rate, 120% EM scaling on NA/Skill, 28 instances or 12s | Condition and uptime recorded; S not inferred from 5★. |
| `12502` Wolf's Gravestone, Support A, R1 | ATK% substat; +20% self, +40% party ATK below 30% HP for 12s / 30s | Low-HP condition and uptime correctly captured. |
| `13407` Favonius Lance, Support SS, R1 | ER substat; Windfall R1 60% / 6 Energy / 12s | Fits short support field time; R1 baseline explicit. |
| `13501` Staff of Homa, Main DPS SS, R1 | CRIT DMG substat; 0.8% Max HP → ATK, +1% below 50% HP | Stat/passive coherence stated; no team condition invented. |
| `15402` The Stringless, Sub DPS S, R1 | EM substat; +24% Skill/Burst DMG | Reaction dependence treated as an assumption, not a guarantee. |

### Need more evidence before approval (5)

| Candidate | Gap |
|---|---|
| `11403` Sacrificial Sword, Sub DPS S, R5 | Reset requires the skill to damage an opponent; reusing it requires an on-field window. Off-field criterion under-evidenced. |
| `12401` Favonius Greatsword, Sub DPS A, R1 | Windfall needs CRIT hits; the draft does not say those normally occur on-field. Rotation assumption missing. |
| `14302` Thrilling Tales, Support SS, R5 | "Switch order is the only requirement" ignores 10s uptime vs 20s ICD and that only the next character gets the buff. |
| `14402` The Widsith, Sub DPS S, R1 | 1/3 chance of the EM theme (often low value for sub-DPS) and 10s/30s uptime not reflected in the tier argument. |
| `14509` Kagura's Verity, Sub DPS A, R1 | Stacks come from 3 Elemental Skill uses in 24s, not from field time. Trigger misstated. |

### Tier disputed (2) — factual errors

| Candidate | Error | Required action |
|---|---|---|
| `14406` Prototype Amber, Support A, R5 | Draft claims **party-wide energy** restoration and healing based on **wielder** HP. Actual R5: wielder alone gains 6 Energy every 2s for 6s; party members regenerate 6% of **their own** Max HP. | Correct text, normalize evidence pointer (local dataset calls the effect `Gilding`), then **re-derive tier**; do not keep A by default. |
| `15508` Aqua Simulacra, Main DPS S, R1 | Draft **inverts** the passive: says DMG increases when *not* surrounded and assumes "usually not surrounded". Actual: +20% DMG **when opponents are nearby**, works on/off-field. | Correct condition and assumption, then re-derive tier S. |

No candidate was silently changed. `review.input.json` and `approval-package.json` record the exact proposed diffs.

---

## 4. Refinement assumptions

- 11 candidates use **R1**, 3 use **R5**; no R2–R4 and no `UNSPECIFIED`/`SOURCE_MISSING` was introduced.
- R5 cases and their stated reasons: `11403` (skill-reset reliability is the assessed property), `14302` (maximum 3★ ATK transfer), `14406` (craftable weapon can be fully refined).
- R1 cases use a 5★ baseline or an already-functional 4★ baseline. No R1 was silently promoted to R5 and no R5 was demoted.
- R1/R5 passive scaling was checked in `genshin-db`; where scaling materially changes the claim (Sacrificial, TTDS, Prototype Amber, Aqua), the package records it.
- Rule retained: a ranking whose value is refinement-dependent needs a separate R1/R5 record in a future batch; this batch does not fabricate one.

---

## 5. Publish-rights assessment

All 14 records remain `publishRightsVerified = false`.

- All 14 are `INDEPENDENT` with original Vietnamese explanations and internal-rubric provenance; none contains text copied from the 296 `SOURCE_DERIVED` audit records, and none references Genshin-Builds as a ranking source.
- Evidence uses `genshin-db` weapon facts (game data) plus the internal rubric. No third-party editorial ranking text was copied, so no external attribution obligation was found for the text itself.
- Secondary `game://…/passive/<Name>` pointers are internal labels, not automatically verifiable as in-game display names; three should be normalized to the resolvable `genshin-db://weapons/<id>` pointer (14406, 14509; 15402 optional). This is an evidence-hygiene note, not a rights transfer.
- For the 7 READY candidates I prepared an **eligibility proposal** for an explicit admin rights-verification decision. I did not flip the flag: rights verification is an admin action and bypassing the guard to approve is forbidden.
- The 5 evidence-gap and 2 tier-disputed candidates are not proposed for rights verification until corrected.

---

## 6. Approval table

| Weapon | Type | Role | Tier | Refinement | Evidence | Confidence | Publish Rights | Recommendation |
|---|---|---|---|---|---|---|---|---|
| Favonius Sword (11401) | Sword | SUPPORT | SS | R1 | `genshin-db://weapons/11401`, Windfall | HIGH | false (unverified) | **READY_FOR_ADMIN_REVIEW** |
| Sacrificial Sword (11403) | Sword | SUB_DPS | S | R5 | `genshin-db://weapons/11403`, Composed | MEDIUM | false | **NEEDS_MORE_EVIDENCE** |
| Xiphos' Moonlight (11418) | Sword | SUPPORT | S | R1 | `genshin-db://weapons/11418`, Jinni's Whisper | MEDIUM | false | **READY_FOR_ADMIN_REVIEW** |
| Light of Foliar Incision (11512) | Sword | MAIN_DPS | S | R1 | `genshin-db://weapons/11512`, Whitemoon Bristle | MEDIUM | false | **READY_FOR_ADMIN_REVIEW** |
| Wolf's Gravestone (12502) | Claymore | SUPPORT | A | R1 | `genshin-db://weapons/12502`, Wolfish Tracker | MEDIUM | false | **READY_FOR_ADMIN_REVIEW** |
| Favonius Greatsword (12401) | Claymore | SUB_DPS | A | R1 | `genshin-db://weapons/12401`, Windfall | MEDIUM | false | **NEEDS_MORE_EVIDENCE** |
| Favonius Lance (13407) | Polearm | SUPPORT | SS | R1 | `genshin-db://weapons/13407`, Windfall | HIGH | false | **READY_FOR_ADMIN_REVIEW** |
| Staff of Homa (13501) | Polearm | MAIN_DPS | SS | R1 | `genshin-db://weapons/13501`, Reckless Cinnabar | HIGH | false | **READY_FOR_ADMIN_REVIEW** |
| Thrilling Tales of Dragon Slayers (14302) | Catalyst | SUPPORT | SS | R5 | `genshin-db://weapons/14302`, Heritage | HIGH | false | **NEEDS_MORE_EVIDENCE** |
| The Widsith (14402) | Catalyst | SUB_DPS | S | R1 | `genshin-db://weapons/14402`, Debut | MEDIUM | false | **NEEDS_MORE_EVIDENCE** |
| Prototype Amber (14406) | Catalyst | SUPPORT | A *(provisional)* | R5 | `genshin-db://weapons/14406` (effect `Gilding`) | MEDIUM | false | **TIER_DISPUTED** |
| Kagura's Verity (14509) | Catalyst | SUB_DPS | A | R1 | `genshin-db://weapons/14509` | MEDIUM | false | **NEEDS_MORE_EVIDENCE** |
| The Stringless (15402) | Bow | SUB_DPS | S | R1 | `genshin-db://weapons/15402` | MEDIUM | false | **READY_FOR_ADMIN_REVIEW** |
| Aqua Simulacra (15508) | Bow | MAIN_DPS | S *(provisional)* | R1 | `genshin-db://weapons/15508`, The Cleansing Form | MEDIUM | false | **TIER_DISPUTED** |

Totals: **7 READY_FOR_ADMIN_REVIEW**, **5 NEEDS_MORE_EVIDENCE**, **2 TIER_DISPUTED**, 0 REFINEMENT_UNCLEAR, 0 RIGHTS_REVIEW_REQUIRED.

---

## 7. Tests

Sequential runs only; no parallel migration or test execution.

| Check | Result |
|---|---|
| `prisma validate` | pass |
| `prisma migrate status` | pass, 2 managed migrations |
| `migrate deploy` on restored backup DB | pass (temp DB dropped) |
| `migrate deploy` on empty DB | **expected failure** P3018 / missing `Character` baseline |
| `tsc --noEmit` | pass |
| `node --check` on all new `.cjs` | pass |
| B1 service tests | 17/17 |
| B1 GraphQL tests | 5/5 |
| B1 migration tests | 5/5 |
| B1 live DB tests | 3/3 |
| B1 DataLoader tests | 2/2 |
| B1 tier-map + pipeline tests | 4/4 + 5/5 |
| B1 independent candidate tests | 5/5 |
| **B2 approval package tests** | **7/7** |
| **B2 migration integrity tests** | **4/4** |
| **Total** | **57 passed, 0 failed** |

No test inserted, updated, approved, or deleted a ranking. All B2 DB checks are read-only (`count`, catalog queries); the only writes were to throwaway databases that were dropped.

---

## 8. Files changed (Phase B2 only)

New:

- `backend/scripts/weapon-tier-independent/review.input.json`
- `backend/scripts/weapon-tier-independent/build-approval.cjs`
- `backend/scripts/weapon-tier-independent/approval.test.cjs`
- `backend/scripts/weapon-tier-independent/migration-integrity.test.cjs`
- `docs/weapon-tier-independent/approval-package.json`
- `docs/weapon-tier-audit/PHASE_B2_REPORT.md`

Modified: none. The 14 candidate records, Phase B1 schema/service/resolvers, Character Tier, Multi-Build, and Weapon Detail UI were not changed.

No commit, push, merge, deploy, reset, stash, clean, production write, admin mutation, or ranking import was performed.

---

## 9. Remaining blockers

1. Admin must decide each of the 14 records; 7 need explicit rights verification, 7 need fact/evidence correction first.
2. `14406` and `15508` must be re-tiered after the fact corrections; their current tiers are provisional only.
3. Empty-DB bootstrap still requires an approved baseline + `CharacterBuild` migration strategy. Not fixed here.
4. CharacterBuild drift remains unmanaged in `_prisma_migrations`; reconciliation needs separate approval.
5. 296 `SOURCE_DERIVED` records remain unapproved, rights-unverified and excluded from the database.
6. `WeaponTierRank` must remain 0 until the Admin explicitly approves and a separate import decision is made.
