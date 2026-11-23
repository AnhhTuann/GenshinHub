# Weapon tier schema proposal (PROPOSAL ONLY — NOT APPLIED)

## Why a new model is required

`Weapon.tier` and `Weapon.role` are single general strings. They cannot hold:

- a different tier per `MAIN_DPS / SUB_DPS / SUPPORT`,
- an explicit refinement assumption (`UNSPECIFIED` here),
- game version + version status (`SOURCE_MISSING` here),
- explanation, source, checksum, review status and audit history.

Flattening the draft into `Weapon.tier` would violate the "no single general tier for all roles" rule and destroy the distinction between ranked and source-missing data. **Do not flatten.**

## Proposed additive Prisma diff

```diff
 model Weapon {
   tier       String?   // legacy Admin field, untouched
   role       String?   // legacy Admin field, untouched
+  tierRanks  WeaponTierRank[]
 }

+model WeaponTierRank {
+  id                    String  @id @default(uuid())
+  weapon                Weapon  @relation(fields: [weaponId], references: [id], onDelete: Cascade)
+  weaponId              String
+  weaponType            String              // SWORD|CLAYMORE|POLEARM|BOW|CATALYST, from DB
+  role                  String              // MAIN_DPS|SUB_DPS|SUPPORT
+  tier                  String              // SS|S|A|B|C|D; D only if a source actually publishes it
+  refinement            Int?                // null when UNSPECIFIED
+  refinementAssumption  String              // EXPLICIT|UNSPECIFIED
+  versionKey            String              // 'UNSPECIFIED' when no version is published
+  gameVersion           String?
+  gameVersionStatus     String              // VERIFIED|SOURCE_MISSING
+  explanationVi         String?
+  sourceUrl             String
+  sourceChecksum        String
+  reviewStatus          String              // PENDING_REVIEW|NEEDS_REVIEW|APPROVED|REJECTED|DISPUTED
+  statusFlags           String[]            // SOURCE_MISSING|EXPLANATION_MISSING|SOURCE_CONFLICT|...
+  recommendedCharacters String[]            // context from approved CharacterWeapon only
+  createdAt             DateTime @default(now())
+  updatedAt             DateTime @updatedAt
+  audits                WeaponTierAudit[]
+
+  @@unique([weaponId, role, refinementAssumption, versionKey])
+  @@index([weaponType])
+  @@index([role])
+  @@index([tier])
+}
+
+model WeaponTierAudit {
+  id        String   @id @default(uuid())
+  ranking   WeaponTierRank @relation(fields: [rankingId], references: [id], onDelete: Cascade)
+  rankingId String
+  action    String   // CREATED|UPDATED|APPROVED|REJECTED
+  actor     String
+  changes   Json?
+  createdAt DateTime @default(now())
+
+  @@index([rankingId, createdAt])
+}
```

`versionKey` is non-null so PostgreSQL enforces uniqueness even when `gameVersion` is `NULL` (all current draft records). `D` is allowed as a valid tier value but is **not populated** by this draft.

## GraphQL impact

```diff
 type Weapon {
+  tierRanks: [WeaponTierRank!]!
   tier: String
   role: String
 }

+type WeaponTierRank {
+  id: ID!
+  weaponId: String!
+  weaponType: String!
+  role: String!
+  tier: String!
+  refinement: Int
+  refinementAssumption: String!
+  gameVersion: String
+  gameVersionStatus: String!
+  explanationVi: String
+  sourceUrl: String!
+  reviewStatus: String!
+  statusFlags: [String!]!
+  recommendedCharacters: [String!]!
+}
+
+extend type Query {
+  weaponTierRanks(weaponId: String, weaponType: String, role: String, tier: String): [WeaponTierRank!]!
+}
+
+extend type Mutation {
+  createWeaponTierRank(input: WeaponTierRankInput!): WeaponTierRank
+  updateWeaponTierRank(id: ID!, input: WeaponTierRankInput!): WeaponTierRank
+  reviewWeaponTierRank(id: ID!, decision: String!, actor: String!): WeaponTierRank
+}
```

All new mutations must use `requireAdmin(context)`. Legacy `updateWeaponTierList` stays unchanged so existing Admin controls keep working.

## Frontend data binding (no redesign)

The existing Weapon tab reads `weapon.tier` once and groups by it. After approval and apply, the **data binding only** may change to read `weapon.tierRanks` for type/role/tier filtering and to display `refinementAssumption`, `gameVersionStatus` and `explanationVi`. No CSS, animation, card component, Navbar, Homepage, Character Detail or Weapon Detail UI changes are proposed.

The current `DATA PENDING` notice must stay until at least one ranking is `APPROVED`; the draft is not a reason to remove it.

## Migration strategy

1. Snapshot current `Weapon` / `TierRank` data (already captured in `current-db.json`).
2. Apply the additive schema only. Do **not** drop `Weapon.tier` / `role` and do **not** backfill them.
3. No automatic import of the 296 draft records. Import only after row-level Admin approval, via a reviewed dev-only script with dry-run and audit log.
4. Exclude the 4 `DISPUTED` cells and all `UNMATCHED` rows from any import.
5. One partial index may be added later to enforce a single approved ranking per weapon+role+version if the product decides that is desirable; not part of this first change.

**Rollback:** drop `WeaponTierAudit`, `WeaponTierRank` and the `tierRanks` relation field. All legacy `Weapon` data is untouched, so rollback is lossless.

## Approval gate

This proposal is **not approved**. No `prisma db push`, migration, GraphQL change, data import, frontend data-binding change or database write may happen until Admin explicitly approves this schema. Current state: `DRAFT READY` / `AWAITING SCHEMA APPROVAL`.
