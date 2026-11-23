# Character Tier List v7.2 — audit summary (DRAFT ONLY)

**Date:** 2026-11-20
**Branch:** `feat/balanced-fantasy-motion`
**Database used for comparison:** development PostgreSQL container `genshinhub-postgres` only. Production was not touched.

## Status labels (required)

| Label | State | Evidence |
|---|---|---|
| `SOURCE REVIEWED` | YES | `https://genshin-builds.com/en/tier-list` parsed from the embedded structured props (`tierlistCZero` / `tierlistCSix`, 3 role columns × 6 labelled tiers); title confirms v7.2. Vietnamese page read only for name cross-check. |
| `DATA MATCHED` | PARTIAL | 128 of 129 distinct source IDs map to real `Character` IDs; 1 unmatched (`traveler_cryo`). Mapping method and exceptions in `id-mapping.json`. |
| `RIGHTS VERIFIED` | NO | See `RIGHTS_REVIEW.md`. No license found for the site's editorial table/notes; only a user-content license exists. No wholesale copy was made. |
| `DRAFT READY` | YES | `snapshot-character-tier-v7.2.draft.json`, `source-v7.2.json`, `diff-report.csv/.md`, `SCHEMA_PROPOSAL.md` are written and unreviewed. |
| `APPROVED` | NO | No Admin approval has been given. |
| `DATABASE APPLIED` | NO | Zero writes. `TierRank` remains 0 rows; `Character` remains 131 rows / 121 tiered. |
| `FRONTEND VERIFIED` | NO | No code or UI change was made for this task; no claim of verification is made. |

## What the source actually contains

- The rendered grid has exactly six labelled tiers: `SS, S, A, B, C, D` (source keys `0..5`) and three role columns: `Main DPS`, `Sub DPS`, `Support`.
- The structured props contain a seventh key `6` with **no tier label** in the UI. Its 29 cells were excluded and recorded in `source-v7.2.json → unranked`. No tier was invented for them.
- Separate `C0 Tierlist` and `C6 Tierlist` grids are published. They are not identical, so they were kept as separate records instead of flattening into one tier per character.
- `C1`–`C5` are not published by the source. They are deliberately absent from the snapshot; the logical key in the proposal can hold them later, but nothing was inferred.

## Snapshot numbers

- 292 records: `MAIN_DPS` 100, `SUB_DPS` 85, `SUPPORT` 107.
- Constellation coverage: `C0` 140, `C6` 152.
- 98 records have newly authored Vietnamese explanations (`PENDING_REVIEW`).
- 194 records have no sufficient character-specific evidence, so `explanationVi = null` and `status = NEEDS_REVIEW`. They are also flagged `EXPLANATION_MISSING` in the diff.

## Diff highlights

Status counts are non-exclusive (one row can carry several flags):

`TIER_CHANGED=201`, `ADMIN_CONFLICT=203`, `CONSTELLATION_CHANGED=175`, `EXPLANATION_MISSING=194`, `NEEDS_REVIEW=194`, `UNCHANGED=71`, `ROLE_CHANGED=23`, `NEW=18`, `UNMATCHED=2`.

- `Current Tier` in the diff is the single general `Character.tier` value; it is not role- or constellation-specific, so a mismatch does not by itself prove the Admin value is wrong. Every mismatch on a populated Admin-editable field is marked `ADMIN_CONFLICT` and must not be applied without explicit Admin resolution.
- Legacy Admin tier `D` is preserved everywhere; no silent remap to `C` was applied.
- `NEW` covers records for the 10 characters with no current tier/role (`alyosha`, `mitya`, `odette`, `sandrone`, `valeriy`, `vesna`, `vodyanitsa`, `traveler`, `traveler-boy`, `traveler-girl`).

## Special cases checked

- **Sandrone / Mitya / Vesna:** `SS` in Main DPS at both C0 and C6; Mitya also `SS` Support at both. Sandrone and Mitya have source notes; they are draft-only.
- **Raiden Shogun:** `C0 Main DPS = C`, `C6 Main DPS = B`, `C0 Sub DPS = B`, `C6 Sub DPS = A`. The role/constellation split is preserved rather than reduced to one tier.
- **Bennett:** Support `C0 = SS`, `C6 = S` — a case where C6 is lower; this is preserved, not normalised upward.
- **Iansan:** Support `C0 = SS`, `C6 = S`; similarly preserved.
- **Vodyanitsa:** Support `C0 = S`, `C6 = SS`.
- **Sucrose:** Sub DPS `B` at both constellations, Support `S` at both — role difference preserved.
- **Faruzan:** Support `C0 = C`, `C6 = A`.
- **Alyosha / Valeriy:** Support `C0 = B`, `C6 = S`.
- **Odette:** `SS` in both Sub DPS and Support at C0 and C6.
- **Traveler variants:** `traveler_cryo` is `SS` Main DPS at C0/C6 but has **no dedicated DB record** — `UNMATCHED`, do not invent a character. `traveler_pyro` and `traveler_dendro` appear as Sub DPS `C`; `traveler_electro` appears only as Support `D` at C6; `traveler_geo`, `traveler_anemo`, `traveler_hydro` appear only in the unlabelled seventh source group.
- **Bennett / Sucrose / Faruzan / Iansan / Odette / Vesna / Alyosha / Valeriy / Vodyanitsa** have no character-specific source note on this page, so their explanations are `null` / `NEEDS_REVIEW` rather than invented.

## Files in this directory

- `source-v7.2.json` — normalised source grid + unlabelled group.
- `snapshot-character-tier-v7.2.draft.json` — proposed records, unreviewed.
- `id-mapping.json` — source-ID → Character-ID map and unmatched case.
- `diff-report.csv` / `diff-report.md` — required columns and classifications.
- `diff-summary.json` — status counts.
- `RIGHTS_REVIEW.md` — reuse-rights findings.
- `SCHEMA_PROPOSAL.md` — additive Prisma/GraphQL proposal.

## Post-audit corrections (2026-11-20, read-only review)

- The snapshot description and `RIGHTS_REVIEW.md` now describe the data as `SOURCE_DERIVED` research material, not an independent ranking. All 98 explanations have `evidence.sourceNoteAvailable = true`.
- `ADMIN_CONFLICT=203` is reclassified as a structural comparison artefact, not 203 real Admin overwrites. The final classification, manual-review subsets, and eligibility counts are in `APPROVAL_PACKAGE.md`.
- `SCHEMA_PROPOSAL.md` is replaced by the final additive proposal with enums, provenance fields, `derivation`, and `approvalStatus`. Prisma and the database remain unchanged.

## Blocking items before any apply

1. Admin decision on rights (verbatim import vs independent draft).
2. Admin decision on the additive schema in `SCHEMA_PROPOSAL.md`.
3. Resolution of all `ADMIN_CONFLICT`, `UNMATCHED`, `ROLE_CHANGED`, and `NEEDS_REVIEW` rows.
4. Decision on whether C1–C5 should stay absent (source does not publish them).
5. Explicit approval, followed by a dev-DB snapshot, dry-run, and only then a scoped apply.
