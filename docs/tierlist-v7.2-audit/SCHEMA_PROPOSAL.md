# Prisma / GraphQL schema proposal — per-role, per-constellation rankings

**Status: APPROVED and IMPLEMENTED on development PostgreSQL in Phase B1. Production untouched.**  \nImplementation evidence: `PHASE_B1_IMPLEMENTATION.md`. The migration SQL was generated from the HEAD baseline plus this proposal only; concurrent Multi-Build schema edits in the working tree were deliberately excluded.

This is the final technical proposal after reviewing `AUDIT_SUMMARY.md`, `RIGHTS_REVIEW.md`, `id-mapping.json`, the diff reports, and the 292-record draft snapshot. It supersedes the earlier String-only sketch in this file.

## Requirement check

| Requirement | Earlier draft | Final proposal |
|---|---|---|
| Character ID | `characterId String` | Kept, required, FK to `Character` |
| Role `MAIN_DPS / SUB_DPS / SUPPORT` | `String`, unenforced | `TierListRole` enum |
| Constellation `C0` / `C6` | `String`, unenforced | `TierListConstellation` enum; C1–C5 allowed by type but intentionally not populated |
| Tier `SS / S / A / B / C / D` | `String`, unenforced | `TierListTier` enum |
| Game version | `gameVersion String` | Kept |
| Ranking explanation | `explanationVi`, `explanationEn` | Kept, both nullable |
| Source provenance | Only `sourceUrl` | Added `sourceName`, `sourceId`, `sourceLocale`, `sourceGrid`, `sourceTierKey`, `sourceMinConstellation`, `evidence`, `lastReviewedDate` |
| Approval status | Single `status String` | `approvalStatus` enum + `reviewedAt`, `approvedBy`, `rejectionReason` |
| Derivation honesty | Not represented | `derivation` enum; converted source rows must be `SOURCE_DERIVED`, never `INDEPENDENT` |
| Unique constraint | `[characterId, role, constellation, gameVersion]` | Kept unchanged |
| Legacy Admin fields | Untouched | Still untouched; no UPDATE/DELETE on `Character` |

## Final Prisma diff

```prisma
// Additive enum types. No enum value is populated for C1–C5 by this v7.2 import.
enum TierListRole {
  MAIN_DPS
  SUB_DPS
  SUPPORT
}

enum TierListTier {
  SS
  S
  A
  B
  C
  D
}

enum TierListConstellation {
  C0
  C1
  C2
  C3
  C4
  C5
  C6
}

enum TierListApprovalStatus {
  PENDING_REVIEW
  NEEDS_REVIEW
  APPROVED
  REJECTED
}

enum TierListDerivation {
  INDEPENDENT
  SOURCE_DERIVED
  ADMIN_OVERRIDE
}

model CharacterTierRanking {
  id              String                   @id @default(uuid())

  character       Character                @relation(fields: [characterId], references: [id], onDelete: Cascade)
  characterId     String

  role            TierListRole
  tier            TierListTier
  constellation   TierListConstellation
  gameVersion     String

  explanationVi   String?
  explanationEn   String?

  sourceUrl       String
  sourceName      String
  sourceId        String?
  sourceLocale    String                   @default("en")
  sourceGrid      String?
  sourceTierKey   String?
  sourceMinConstellation Int?
  evidence        Json?
  lastReviewedDate DateTime?

  derivation      TierListDerivation       @default(SOURCE_DERIVED)
  approvalStatus  TierListApprovalStatus   @default(PENDING_REVIEW)
  rejectionReason String?
  reviewedAt      DateTime?
  approvedBy      String?

  createdAt       DateTime                 @default(now())
  updatedAt       DateTime                 @updatedAt

  @@unique([characterId, role, constellation, gameVersion])
  @@index([characterId])
  @@index([role, tier])
  @@index([gameVersion, approvalStatus])
  @@index([derivation, approvalStatus])
}
```

Inside `model Character`, add only the back-relation:

```prisma
tierRankings    CharacterTierRanking[]
```

No change to `tier`, `role`, `recommendedC`, `tierNoteEn`, `tierNoteVi`, `TierRank`, or any existing Admin field.

Notes:

- The unique key keeps one canonical ranking per `Character ID + Role + Constellation + Game Version`. Research alternatives stay in the audit docs, not as competing approved DB rows.
- `sourceId` preserves the original source slug for traceability. It does not create or imply a new `Character`.
- `derivation` replaces the earlier `adminOverride: Boolean`. An Admin-authored override is `ADMIN_OVERRIDE`; a converted Genshin-Builds placement is `SOURCE_DERIVED`.
- `C1`–`C5` are allowed by the enum for future use, but the v7.2 backfill must insert only `C0` and `C6`.
- `onDelete: Cascade` is acceptable because these are derived rankings; the audit snapshot remains the historical record.

## Final GraphQL diff

The existing codebase uses `String` IDs and a `JSON` scalar, so the proposal follows those conventions instead of introducing new scalars.

```graphql
enum TierListRole {
  MAIN_DPS
  SUB_DPS
  SUPPORT
}

enum TierListTier {
  SS
  S
  A
  B
  C
  D
}

enum TierListConstellation {
  C0
  C1
  C2
  C3
  C4
  C5
  C6
}

enum TierListApprovalStatus {
  PENDING_REVIEW
  NEEDS_REVIEW
  APPROVED
  REJECTED
}

enum TierListDerivation {
  INDEPENDENT
  SOURCE_DERIVED
  ADMIN_OVERRIDE
}

"""One per-character, per-role, per-constellation ranking for a game version."""
type CharacterTierRanking {
  id: String!
  characterId: String!
  role: TierListRole!
  tier: TierListTier!
  constellation: TierListConstellation!
  gameVersion: String!
  explanationVi: String
  explanationEn: String
  sourceUrl: String!
  sourceName: String!
  sourceId: String
  sourceLocale: String!
  sourceGrid: String
  sourceTierKey: String
  sourceMinConstellation: Int
  evidence: JSON
  lastReviewedDate: String
  derivation: TierListDerivation!
  approvalStatus: TierListApprovalStatus!
  rejectionReason: String
  reviewedAt: String
  approvedBy: String
}

input CharacterTierRankingInput {
  characterId: String!
  role: TierListRole!
  tier: TierListTier!
  constellation: TierListConstellation!
  gameVersion: String!
  explanationVi: String
  explanationEn: String
  sourceUrl: String!
  sourceName: String!
  sourceId: String
  sourceLocale: String = "en"
  sourceGrid: String
  sourceTierKey: String
  sourceMinConstellation: Int
  evidence: JSON
  lastReviewedDate: String
  derivation: TierListDerivation = SOURCE_DERIVED
}

extend type Query {
  characterTierRankings(
    characterId: String
    role: TierListRole
    constellation: TierListConstellation
    gameVersion: String
    approvalStatus: TierListApprovalStatus
    derivation: TierListDerivation
    limit: Int = 500
  ): [CharacterTierRanking!]!
}

extend type Mutation {
  upsertCharacterTierRanking(input: CharacterTierRankingInput!): CharacterTierRanking!
  approveCharacterTierRanking(id: String!, approvedBy: String!): CharacterTierRanking!
  rejectCharacterTierRanking(id: String!, reason: String!): Boolean!
}
```

`approve*` and `reject*` must reuse the existing `requireAdmin` guard. `upsert*` must reject `derivation: INDEPENDENT` unless the input also carries an independently produced evidence set; Admin override must be explicit.

## Migration / backfill / rollback compatibility

1. **Migration** is additive only: create enum types, create `CharacterTierRanking`, add indexes, add the `Character.tierRankings` back-relation. No `UPDATE`, no `DELETE`, no legacy field rewrite.
2. **Backfill** is a separate reviewed CLI step, not part of the migration. It reads the existing draft snapshot, skips `characterId = null`, writes `derivation = SOURCE_DERIVED`, and leaves every row non-approved until Admin action.
3. **Verification** compares a pre-migration checksum of all legacy `Character` tier/role fields with the post-backfill value. They must be identical.
4. **Rollback** drops `CharacterTierRanking` and the new enum types, then removes the resolver/module code. Legacy `Character` and `TierRank` data are unaffected; the audit docs remain the source of historical decisions.
5. **No production migration or write** is proposed. Development only, after explicit approval.
