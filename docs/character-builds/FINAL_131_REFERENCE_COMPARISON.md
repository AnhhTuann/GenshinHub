# FINAL 131 REFERENCE COMPARISON — GenshinHub vs Genshin-Builds v7.2

Generated: 2026-11-21T08:42:33.798Z

## Scope and source policy

- DEVELOPMENT database `genshinhub@127.0.0.1:5434`, frontend `127.0.0.1:3001`, GraphQL `127.0.0.1:4000`.
- Source index: `https://genshin-builds.com/en/characters`; all 131 reachable character pages fetched on 2026-11-21 with zero failures, all reporting version **v7.2**.
- The curated Astro `builds` island (recommended tab) was used as primary evidence. The separate community / "most used" island was deliberately excluded. This is why Aino's primary build is Favonius Greatsword + Silken Moon's Serenade, not Flame-Forged Insight + Resolution of Sojourner.
- Verified aliases: `lanyan→lan_yan`, `momoka→kirara`, `traveler-boy→manekin`, `traveler-girl→manekina`, `yumemizu→yumemizuki_mizuki`.

## Result matrix

| Metric | Count |
|---|---:|
| Local characters | 131 |
| Reference roster entries / reachable pages | 133 / 131 |
| Local identities matched to a reference page | 130 |
| Local-only identities (no reference page) | 1 (`traveler`) |
| Reference-only identities | 3 (`danica`, `anastasya`, `traveler_cryo`) |
| Characters compared field by field against a curated guide | 128 |
| Primary builds already matching before correction | 0 |
| Primary builds corrected and re-verified | 128 |
| Valid historical build records preserved unchanged | 131 (96 APPROVED + 35 LEGACY_IMPORT) |
| New reference-aligned default builds added | 121 (7 existing MAINTENANCE builds revised in place) |
| Weapon identities added / obsolete aliases removed | 722 / 178 |
| Artifact set identities added / generic IDs removed | 392 / 19 |
| Artifact placeholders replaced in retained legacy builds | 11 |
| Main-stat field corrections | 100 |
| Sub-stat corrections | 93 |
| Talent-priority corrections | 43 |
| Source-attributed teams added | 243 |
| Missing supported fields remaining | 6 (3 local no-guide defaults + 3 reference-only identities) |
| Unverified source-field categories | 4 |

Final status distribution for local identities: **UPDATED_AND_VERIFIED = 128**, **NO_REFERENCE_AVAILABLE = 3**.

## Aino — mandatory regression case

| Field | Before (local) | Reference v7.2 | After (DB/GraphQL/UI) |
|---|---|---|---|
| Default build | `legacy-aino` (LEGACY_IMPORT v2) | `aino_reaction_support` REACTION SUPPORT | `ref-v72-aino` (MAINTENANCE v3) |
| Weapons | Prototype Archaic, Wolf's Gravestone | Favonius Greatsword, Makhaira Aquamarine, Flame-Forged Insight, Master Key | canonical IDs 12401, 12415, 12432, 12433 |
| Artifacts | `NOT_VERIFIED` | Silken Moon's Serenade | 15042, plus source-listed alternatives |
| Sands | ATK% | Energy Recharge / Elemental Mastery | Energy Recharge / Elemental Mastery |
| Goblet | Elemental DMG Bonus | Elemental Mastery | Elemental Mastery |
| Circlet | CRIT Rate | Elemental Mastery / CRIT Rate | Elemental Mastery / CRIT Rate |
| Sub-stats | CRIT Rate, CRIT DMG, ATK% | ER, EM, CRIT Rate | ER, EM, CRIT Rate |
| Talents | Normal Attack first | Burst first | Burst, Skill |
| Playstyle | empty | Reaction support | SUPPORT |
| Teams | none | 3 compositions | 3 EXPERIMENTAL, 12 canonical member refs |

Aino was applied first, read back from PostgreSQL and GraphQL, and validated in both English and Vietnamese before any other character was touched.

## Verification evidence

- Fresh backup `pre_reference_comparison.dump`, SHA-256 `5b329a70674411a5a82d431c794a8bb261652d7642432ee28f9b21b68de30869`; isolated restore test PASS with all table counts matching.
- `npx prisma validate`: PASS. `npx prisma migrate status`: 6 migrations, schema up to date. Backend and frontend production builds: PASS.
- Backend tests: sync-version 2/2, assets 41/41, materials PASS. Frontend lint: PASS (pre-existing warnings only).
- PostgreSQL: 131 characters, 347 builds, 131 defaults; zero orphan weapons / artifact sets / team members and zero wrong weapon types in corrected builds.
- GraphQL: 131 characters, 131 defaults, 259 public builds, zero projection failures.
- Rendered DOM: 262/262 routes (131 × en/vi) pass build-ID, item-name/icon, stat/talent, team-link, source-attribution and placeholder assertions scoped to the visible default build.
- Real browser interaction (CDP): 262/262 routes pass; 246/246 multi-build routes successfully switched to an alternate build and back with correct `aria-pressed` state and no JS exceptions.
- Admin history: 96 APPROVED and 35 LEGACY_IMPORT build records preserved unchanged; 267 audits appended. All protected Tier digests identical to the pre-change snapshot.

## Truthfulness notes

- Source team memberships and tier labels are attributed to the guide; rotations and combat timings were **not** independently measured and are marked EXPERIMENTAL.
- Source skill/passive/constellation prose was inspected for all 131 pages but not copied into the database: the local schema has no fields for it and the text is third-party editorial content.
- Generic stat-combination IDs on source pages (e.g. `80elementalmastery_set`, `18atk_set`) were skipped; only real canonical artifact sets were written.
- Remaining legacy `NOT_VERIFIED` artifact rows exist only in three no-guide Traveler defaults and are explicitly reported in the missing-data document.

For the complete machine-readable matrix see `FINAL_131_REFERENCE_COMPARISON.json` and for the before/after ledger see `FINAL_131_REFERENCE_BEFORE_AFTER.json`.
