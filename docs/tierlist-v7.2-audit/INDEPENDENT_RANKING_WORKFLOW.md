# GenshinHub independent Character Tier Ranking workflow (Phase B1)

**Status: method + candidate batch prepared. No ranking rows created, approved, or published.**

This document implements the Admin decision to use an independent GenshinHub ranking instead of importing the 292 `SOURCE_DERIVED` Genshin-Builds records.

## 1. What counts as `INDEPENDENT`

A row may be submitted with `derivation = INDEPENDENT` only when all of the following are recorded in `CharacterTierRanking.evidence`:

- `rubric`: named, versioned GenshinHub rubric.
- `primaryEvidence`: non-empty array of primary references (game mechanics, patch notes, GenshinHub build/team data, dated observations).
- `reviewer`: Admin/editor responsible for the assessment.
- `verifiedAt`: date of evidence verification.

The row must also carry an original `explanationVi` or `explanationEn`. The backend service rejects an `INDEPENDENT` draft without these fields (`INDEPENDENT_EVIDENCE_REQUIRED`). Merely translating, reformatting, renaming, or paraphrasing a Genshin-Builds note does **not** satisfy this rule.

## 2. Rubric

| Criterion | Weight |
|---|---:|
| Kit/mechanic strength and self-sufficiency | 30% |
| Team flexibility and role overlap | 25% |
| Verified version-7.2 performance evidence | 20% |
| Constellation dependency | 15% |
| Accessibility / F2P friendliness / rotation complexity | 10% |

Rarity and popularity are explicitly excluded as tier signals.

## 3. Constellation policy

- Evaluate only `C0` and `C6` in this phase.
- C1–C5 remain valid future enum values, but the service rejects them for the current workflow (`UNSUPPORTED_CONSTELLATION`).
- One row per `characterId + role + constellation + gameVersion`. Multiple roles per character are allowed and stored as separate rows.
- Do not infer a C6 rating from a C0 rating without separate constellation evidence.

## 4. Candidate batch (prepared, not scored)

These characters have local evidence available in the development database and matching `genshin-db` entries. No tier value is assigned here; Admin must score and approve each row.

| Character ID | Roles to evaluate | Constellations | Local evidence checked | genshin-db |
|---|---|---|---|---|
| `mitya` | MAIN_DPS, SUB_DPS, SUPPORT | C0, C6 | 6 weapons, 3 artifact sets, 3 teams, talent priority; existing approved Support/Sub DPS build audit | present |
| `hu-tao` | MAIN_DPS | C0, C6 | 13 weapons, 5 artifact sets, 8 teams, talent priority | present |
| `neuvillette` | MAIN_DPS | C0, C6 | 11 weapons, 6 artifact sets, 5 teams, talent priority | present |
| `furina` | SUB_DPS, SUPPORT | C0, C6 | 14 weapons, 3 artifact sets, 9 teams, talent priority | present |
| `yelan` | SUB_DPS | C0, C6 | 4 weapons, 3 artifact sets, 8 teams, talent priority | present |

This is an evidence-readiness list, not an approval list and not a published tier list.

## 5. Submission and approval flow

1. Admin creates a draft with `upsertCharacterTierRanking`. New rows always start `PENDING_REVIEW`.
2. `SOURCE_DERIVED` rows stay in the admin review queue only; they cannot be approved by `approveCharacterTierRanking`.
3. Admin reviews evidence in `adminCharacterTierRankings`.
4. `approveCharacterTierRanking` is allowed only for `INDEPENDENT` rows and records the acting Admin from the server context.
5. Public `characterTierRankings` hard-filters to `approvalStatus = APPROVED` **and** `derivation = INDEPENDENT`.
6. Editing an approved row is rejected (`APPROVED_RANKING_IMMUTABLE`); a content change requires an explicit reject/re-review cycle.
7. `rejectCharacterTierRanking` stores the reason and acting Admin.

No rows are currently present in `CharacterTierRanking`, so current approved and pending counts are both 0.
