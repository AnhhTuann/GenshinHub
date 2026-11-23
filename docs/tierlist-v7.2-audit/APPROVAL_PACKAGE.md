# Character Tier List v7.2 — Approval Package

**Status:** Admin approved Phase B1 schema/data infrastructure; **ranking import and publication remain BLOCKED**. See `PHASE_B1_IMPLEMENTATION.md` for the applied development migration.  
**Scope:** read-only review of the existing audit in this directory. No second source snapshot was created; no Prisma file, migration, PostgreSQL, GraphQL, or Tier List UI was changed.

## READY / BLOCKED at a glance

| Area | Status | Evidence / next decision |
|---|---|---|
| Existing audit read | **READY** | `AUDIT_SUMMARY.md`, `RIGHTS_REVIEW.md`, `SCHEMA_PROPOSAL.md`, both diff reports, `diff-summary.json`, `id-mapping.json`, draft snapshot and source JSON all reviewed. |
| Final schema design | **READY (proposal only)** | Additive model with enums, provenance, derivation, and approval state in `SCHEMA_PROPOSAL.md`. Prisma unchanged. |
| 203 `ADMIN_CONFLICT` classification | **READY** | Root cause is structural, not 203 real Admin overwrites. Counts below. |
| ID mapping question | **READY** | `128/129` distinct IDs vs `UNMATCHED=2` records explained below. |
| Rights decision | **BLOCKED** | No licence for editorial table/notes. Choose written permission or independent methodology. |
| 98 explanations | **BLOCKED for publication** | All are source-note-derived; 2 are unmatched; 61 contain specific constellation claims. |
| 194 missing explanations | **BLOCKED** | Correctly `NEEDS_REVIEW`; do not invent generic text. |
| Dev migration / backfill | **BLOCKED** | Needs explicit approval of schema + rights path + conflict handling. |
| GraphQL / Frontend exposure | **BLOCKED** | No schema resolver or UI data-source switch approved. |

---

## 1. Final schema diff

Full SDL and Prisma diff: `SCHEMA_PROPOSAL.md`. Summary of the final proposal:

```prisma
enum TierListRole        { MAIN_DPS SUB_DPS SUPPORT }
enum TierListTier        { SS S A B C D }
enum TierListConstellation { C0 C1 C2 C3 C4 C5 C6 }
enum TierListApprovalStatus { PENDING_REVIEW NEEDS_REVIEW APPROVED REJECTED }
enum TierListDerivation  { INDEPENDENT SOURCE_DERIVED ADMIN_OVERRIDE }

model CharacterTierRanking {
  id          String @id @default(uuid())
  character   Character @relation(fields: [characterId], references: [id], onDelete: Cascade)
  characterId String

  role          TierListRole
  tier          TierListTier
  constellation TierListConstellation
  gameVersion   String

  explanationVi String?
  explanationEn String?

  sourceUrl              String
  sourceName             String
  sourceId               String?
  sourceLocale           String @default("en")
  sourceGrid             String?
  sourceTierKey          String?
  sourceMinConstellation Int?
  evidence               Json?
  lastReviewedDate       DateTime?

  derivation     TierListDerivation @default(SOURCE_DERIVED)
  approvalStatus TierListApprovalStatus @default(PENDING_REVIEW)
  rejectionReason String?
  reviewedAt      DateTime?
  approvedBy      String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([characterId, role, constellation, gameVersion])
  @@index([characterId])
  @@index([role, tier])
  @@index([gameVersion, approvalStatus])
  @@index([derivation, approvalStatus])
}

// Character receives only:
tierRankings CharacterTierRanking[]
```

Requirement coverage:

- Character ID, role, constellation, tier, game version, explanations, provenance, approval status, and a sane unique key are all present.
- `C1`–`C5` are allowed by the enum for future use but **must not be inserted** for v7.2; the source publishes only `C0` and `C6`.
- Converted rows default to `SOURCE_DERIVED`; they cannot be labelled `INDEPENDENT`.
- Legacy `Character.tier`, `role`, `recommendedC`, `tierNoteEn`, `tierNoteVi`, and `TierRank` remain authoritative and untouched.
- Migration is additive. Backfill is a separate approved CLI step. Rollback drops only the new table/enums; legacy data is unaffected.

**Decision needed:** approve or reject this additive schema. No `prisma db push`, migration, generate, or DB write has been run.

---

## 2. The 203 `ADMIN_CONFLICT` rows — final classification

The audit's `ADMIN_CONFLICT` flag means “proposed tier differs from the single populated `Character.tier`”. It does **not** mean an Admin-editable value is being overwritten. The proposed model writes a new table only.

| Category | Count | Interpretation |
|---|---:|---|
| **STRUCTURAL_DIFFERENCE** | **203 / 203** | Root cause for every flag: one legacy general tier is compared with one role+constellation-specific ranking. The new model is needed precisely because the old shape cannot hold this data. |
| **REAL_ADMIN_CONFLICT** | **0** | No proposal writes `Character.tier`, `role`, `recommendedC`, or notes. All `tierNoteEn`/`tierNoteVi` arrays for affected characters are empty. No snapshot record sets `adminOverride`/`ADMIN_OVERRIDE`. |
| **SOURCE_VERSION_DIFFERENCE** | **0 proven / 203 possible** | Legacy `Character.tier` has no version field, so a version-7.2-vs-older-version difference cannot be evidenced row-by-row. Treat as a possible explanation only, not an approval reason. |
| **NEEDS_MANUAL_REVIEW** | **175 (union, overlapping flags)** | Rows with role divergence, recommended-constellation divergence, non-boilerplate C1–C6 claims in C0 explanations, or missing explanation. |
| Pure structural, no extra review flag | **28** | Tier value differs only because of the old one-tier shape. Still rights-blocked until section 4 is resolved. |

Breakdown of the 175 manual-review flags (counts overlap):

| Flag | Count | Detail |
|---|---:|---|
| Role divergence vs legacy `Character.role` | 4 | Yelan → MAIN_DPS vs legacy `Sub DPS`; Furina → MAIN_DPS vs `Sub DPS, Support`; Xianyun → MAIN_DPS vs `Support`; Mavuika → SUPPORT vs `Main DPS, Sub DPS`. These are **not overwrites**, but must not be silently mapped back to legacy role. |
| `recommendedC` divergence | 110 | 48 C0 rows and 62 C6 rows. Legacy has one `recommendedC`; the source has two constellation grids, so most are structural, not conflicts. |
| C0 explanation containing non-boilerplate C1–C6 claims | 11 | e.g. Wriothesley C1, Hu Tao C1/C6, Raiden C2/C6. Derived from source notes; needs independent verification or rights. |
| Missing explanation inside the 203 | 137 | Already `NEEDS_REVIEW`; no invented text was added. |

**Decision needed:** confirm that no legacy Admin field will be overwritten and that the 175 flagged rows stay non-approved until individually reviewed.

---

## 3. Records that can be validly approved

No record is publishable right now, but there are different readiness levels:

| Group | Count | Can proceed after approval? |
|---|---:|---|
| Total snapshot records | 292 | No — research draft only. |
| Mapped to a real `Character` ID | **290** | Technically eligible for a **dev-only, research-only** backfill with `approvalStatus != APPROVED` and `derivation = SOURCE_DERIVED`. |
| Unmatched (`traveler_cryo`) | 2 | **No.** Excluded from any DB insert. |
| `UNCHANGED` rows | 71 | Structurally low-risk, but still source-derived and rights-blocked. |
| `NEW` rows | 18 | No legacy tier; still source-derived and rights-blocked. |
| Pure structural conflicts | 28 | Tier placement may be reviewed, but explanation/rights still block publication. |
| Rows with an explanation | 96 mapped (+2 unmatched) | Need rights permission or independent rewrite; 61 contain non-boilerplate constellation claims. |
| Rows without explanation | 194 | Need character-specific evidence or must remain `NEEDS_REVIEW`. |
| Rows currently `APPROVED` | **0** | Correct; no fake approval was created. |

**Decision needed:** approve a dev research backfill of 290 mapped rows only if Admin explicitly accepts that they are non-public, non-approved, source-derived staging data.

---

## 4. Rights and evidence — what is blocked

`RIGHTS_REVIEW.md` was updated: the snapshot is now correctly labelled `SOURCE_DERIVED`, not independent.

| Activity | Current status | Meaning |
|---|---|---|
| Public web page access | Allowed by `robots.txt` | Access permission, not a content licence. |
| Agent/API read | Allowed/documented | Structured endpoint access, not a republication licence. |
| Storing a local copy | Internal research only | Retain under the audit directory, not public, not redistributed. Still not a publication licence. |
| Republishing editorial rankings/notes on GenshinHub | **Blocked** | `/en/terms` user-content licence does not cover the site's own editorial table or notes. Written permission or independent methodology required. |

Additional findings:

- All **98** explanations have `evidence.sourceNoteAvailable = true`; they are source-note paraphrases, not independent analysis.
- All 98 match the source grid for `sourceId + role + constellation + tier`; no ID/role/constellation mismatch was found.
- **2** of the 98 belong to unmatched `traveler_cryo` and cannot be stored.
- **61** of the 98 make specific C1–C6 gameplay claims. These are not automatically false, but they are not independently evidenced here.
- The **194** missing explanations are all `NEEDS_REVIEW`; no generic filler was added.

**Decision needed:** choose one path:

1. **Licence path** — request written Genshin-Builds permission covering tier placements, notes/paraphrases, Vietnamese translations, attribution, term, and version updates. Keep everything research-only until granted.
2. **Independent path** — use section 6 to build GenshinHub's own ranking; keep the current snapshot only as a reference input and never label converted rows `INDEPENDENT`.

---

## 5. Unmapped character: `traveler_cryo`

- The source has **129 distinct IDs** across the ranked grid and the unlabelled seventh group: 123 IDs occur in the 292 ranked records; 6 more occur only in the 29 unranked cells.
- **128/129** distinct IDs map to existing `Character` records. The one exception is `traveler_cryo`.
- `UNMATCHED=2` in the diff is a **record count**, not a distinct-ID count: `traveler_cryo` appears twice in the snapshot, once for `C0 MAIN_DPS = SS` and once for `C6 MAIN_DPS = SS`.
- Development DB has `traveler`, `traveler-boy`, `traveler-girl`, and element variants `traveler-anemo`, `traveler-dendro`, `traveler-electro`, `traveler-geo`, `traveler-hydro`, `traveler-pyro`. There is **no dedicated Cryo Traveler record**.
- Do not alias `traveler_cryo` to generic `traveler` or to another element variant. Keep both records `UNMATCHED` and excluded from insert.

**Decision needed:** accept the two exclusions, or separately approve a catalog change creating a dedicated Cryo Traveler character. No such character was created here.

---

## 6. Independent ranking methodology (alternative to licensing)

If Admin chooses the independent path, use this procedure instead of converting the source table:

1. **Freeze inputs.** Keep `source-v7.2.json` only as a reference observation. Do not copy tier values into the new table as `INDEPENDENT`.
2. **Define a public rubric** with Admin-approved weights, for example:
   - Kit/mechanic strength and self-sufficiency — 30%
   - Team flexibility and role overlap — 25%
   - Verified performance/clear evidence for version 7.2 — 20%
   - Constellation dependency — 15%
   - Accessibility/F2P and rotation complexity — 10%
3. **Collect primary evidence**: `genshin-db` mechanics, GenshinHub weapon/artifact/build data, patch notes, and dated performance observations. Record URL, retrieval date, and version.
4. **Editorial scoring** by at least two reviewers per `role + constellation`; log disagreements and final decisions.
5. **Write original explanations** in Vietnamese/English from the rubric and evidence. If a conclusion coincides with Genshin-Builds, verify it independently and cite the primary source, not the editorial note.
6. **Set provenance honestly**: `derivation = INDEPENDENT` only for rows produced by this process; otherwise `SOURCE_DERIVED`.
7. **Version and re-review** every game version. C1–C5 remain absent until evidence exists.

---

## 7. Development migration and rollback plan

Only after explicit Admin approval:

1. Snapshot development DB and record checksums of all legacy `Character` tier/role fields. Current audit state: `TierRank = 0` rows, `Character = 131` rows / 121 tiered.
2. Create an additive Prisma migration from `SCHEMA_PROPOSAL.md`: enums + `CharacterTierRanking` + indexes + back-relation only. No data UPDATE/DELETE.
3. Run `prisma generate` and backend TypeScript/GraphQL tests on development.
4. Run a dry-run backfill from the **existing** snapshot:
   - insert candidates: 290 mapped rows;
   - skip: 2 `traveler_cryo` rows;
   - force `derivation = SOURCE_DERIVED`, `approvalStatus = PENDING_REVIEW` or `NEEDS_REVIEW`, never `APPROVED`;
   - verify uniqueness and no C1–C5 rows.
5. Apply backfill to development only, then re-check the legacy-field checksum. It must be identical.
6. Rollback: remove the new resolver/module, drop `CharacterTierRanking` and the new enum types via a down migration, and restore the pre-migration snapshot if needed. Legacy `Character`/`TierRank` data is untouched.

Explicitly excluded: production DB writes, `prisma db push`, reset/stash/clean, reset of shared dev DB, auto-approval, commit/push/merge/deploy, Weapon Tier changes, and Admin Tier List edits.

---

## 8. PostgreSQL → GraphQL → Frontend after approval

| Layer | Verification gate |
|---|---|
| PostgreSQL | 290 research rows, 2 skipped, 0 approved, unique key enforced, only C0/C6, admin fields unchanged, `TierRank` unchanged. |
| GraphQL | New SDL compiles; filters work; admin guard on approve/reject; returned rows expose `sourceUrl`, `sourceName`, `derivation`, `approvalStatus`; no `INDEPENDENT` row from converted data. |
| Frontend | Only after a separate data-source switch approval: query approved rows with legacy fallback; no Tier List redesign; no hardcoding; desktop/mobile checks; source-derived rows are never publicly labelled independent. Until then the current UI keeps using legacy fields. |

**Stop point:** this package ends before any database write. Awaiting Admin decisions on schema, rights path, conflict handling, unmatched Traveler, and backfill scope.
