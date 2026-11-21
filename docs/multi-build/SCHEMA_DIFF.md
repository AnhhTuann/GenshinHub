# Proposed schema diff — multi-build (PROPOSAL ONLY, NOT APPLIED)

## Prisma diff

```diff
--- backend/prisma/schema.prisma
+++ backend/prisma/schema.prisma
@@ model Character {
   tierNoteEn     String[]
   tierNoteVi     String[]
+  builds         CharacterBuild[]      // build-scoped profiles; legacy fields below stay untouched

   bestWeapons    CharacterWeapon[]
   bestArtifacts  CharacterArtifact[]
   teams          CharacterTeam[]
@@ model CharacterWeapon {
   characterId   String
+  buildId       String?               // nullable throughout the proposed migration
+  build         CharacterBuild?       @relation(fields: [buildId, characterId], references: [id, characterId], onDelete: Restrict)

   @@index([characterId])
+  @@index([buildId, characterId])
 }
@@ model CharacterArtifact {
   characterId   String
+  buildId       String?
+  build         CharacterBuild?       @relation(fields: [buildId, characterId], references: [id, characterId], onDelete: Restrict)

   @@index([characterId])
+  @@index([buildId, characterId])
 }
@@ model CharacterTeam {
   characterId String
+  buildId     String?
+  build       CharacterBuild?       @relation(fields: [buildId, characterId], references: [id, characterId], onDelete: Restrict)
+  reviewStatus CharacterTeamReviewStatus? // null = legacy/unclassified
   members     TeamMember[]

   @@index([characterId])
+  @@index([buildId, characterId])
 }
@@
+enum CharacterBuildPlaystyle {
+  MAIN_DPS
+  SUB_DPS
+  SUPPORT
+}
+
+enum CharacterBuildReviewStatus {
+  DRAFT
+  PENDING_REVIEW
+  APPROVED
+  REJECTED
+  LEGACY_IMPORT
+}
+
+enum CharacterTeamReviewStatus {
+  VERIFIED
+  EXPERIMENTAL
+}
+
+// Build-scoped profile, independent of Character.role and TierRank.
+model CharacterBuild {
+  id                      String              @id @default(uuid())
+  character               Character           @relation(fields: [characterId], references: [id], onDelete: Restrict)
+  characterId             String
+
+  name                    String
+  playstyles              CharacterBuildPlaystyle[]
+  constellationAssumptions String[]           // e.g. ["C0"]
+  isDefault               Boolean             @default(false)
+  reviewStatus            CharacterBuildReviewStatus @default(PENDING_REVIEW)
+  source                  String?
+  approvalChecksum        String?             @unique
+  version                 Int                 @default(1)
+  notesEn                 String?
+  notesVi                 String?
+
+  // Build-specific copy of the former single-build fields.
+  bestWeapons             CharacterWeapon[]
+  bestArtifacts           CharacterArtifact[]
+  teams                   CharacterTeam[]
+  talentPriority          String[]
+  signatureWeapons        String[]
+  sands                   String[]
+  goblet                  String[]
+  circlet                 String[]
+  subStatsPriority        String[]
+
+  createdAt               DateTime            @default(now())
+  updatedAt               DateTime            @updatedAt
+
+  audits                  CharacterBuildAudit[]
+
+  @@unique([characterId, name])
+  @@unique([id, characterId])
+  @@index([characterId])

+}
+
+model CharacterBuildAudit {
+  id          String   @id @default(uuid())
+  characterId String
+  buildId     String
+  build       CharacterBuild @relation(fields: [buildId, characterId], references: [id, characterId], onDelete: Restrict)
+  action      String   // CREATED | UPDATED | APPROVED | REJECTED | DEFAULT_CHANGED
+  actor       String // authenticated server-side identity
+  version     Int
+  changes     Json?
+  createdAt   DateTime @default(now())
+
+  @@index([buildId])
+  @@index([characterId, createdAt])
+}
```

### PostgreSQL constraint required in the same migration

```sql
-- Only one default build per character. Partial unique index survives re-runs.
CREATE UNIQUE INDEX "CharacterBuild_one_default_per_character"
  ON "CharacterBuild"("characterId") WHERE "isDefault";
```

### Deliberately unchanged

`Character.tier`, `role`, `recommendedC`, `tierNoteEn`, `tierNoteVi`, `stats`, `ascensionMats`, `talentMats`, all base stats, `TierRank` and `Weapon`. Existing Admin mutation names stay available where their ownership can be resolved safely. Legacy build fields on `Character` are **not** dropped in this migration so rollback stays trivial.

## GraphQL diff

```diff
@@ type Character {
+  builds: [CharacterBuild!]!
   tier: String
   role: String
   ...
 }
+
+type CharacterBuild {
+  id: ID!
+  characterId: String!
+  name: String!
+  playstyles: [CharacterBuildPlaystyle!]!
+  constellationAssumptions: [String!]!
+  isDefault: Boolean!
+  reviewStatus: CharacterBuildReviewStatus!
+  source: String
+  notesEn: String
+  notesVi: String
+  bestWeapons: [CharacterWeapon!]!
+  bestArtifacts: [CharacterArtifact!]!
+  teams: [TeamBuild!]!
+  talentPriority: [String!]!
+  signatureWeapons: [String!]!
+  sands: [String!]!
+  goblet: [String!]!
+  circlet: [String!]!
+  subStatsPriority: [String!]!
+  createdAt: String!
+  updatedAt: String!
+  version: Int!
+}
+
+type CharacterBuildAudit {
+  id: ID!
+  action: String!
+  actor: String!
+  changes: JSON
+  createdAt: String!
+}
+
+extend type Query {
+  adminCharacterBuilds(characterId: String!): [CharacterBuild!]!
+  characterBuild(id: ID!): CharacterBuild
+  characterBuildAudits(buildId: ID!): [CharacterBuildAudit!]!
+}
+
+extend type Mutation {
+  createCharacterBuild(input: CharacterBuildInput!): CharacterBuild
+  updateCharacterBuild(id: ID!, expectedVersion: Int!, input: CharacterBuildInput!): CharacterBuild
+  setDefaultCharacterBuild(id: ID!, expectedVersion: Int!): CharacterBuild
+  reviewCharacterBuild(id: ID!, expectedVersion: Int!, decision: CharacterBuildReviewDecision!): CharacterBuild
+}
```

The SDL excerpt reuses the Prisma enum values. `CharacterBuildReviewDecision` accepts approve/reject. Typed create/update inputs will cover the profile and its scoped payload. Public queries expose only `APPROVED` and grandfathered `LEGACY_IMPORT` profiles. Read history, private provenance and pending content through Admin-only fields. Resolve actor from the existing authenticated context, never a request argument. A content edit increments `version` and requires review before it can replace a published profile. Phase B will keep the current published content visible by holding the proposed edit in a pending revision captured in the audit history. Publish it atomically after version and review checks.

All build mutations reuse `requireAdmin(context)` and verify row ownership. Existing build mutations can omit `buildId` only while the legacy route is unambiguous. On a multi-build character they must reject unscoped edits. This includes embedded build fields inside `upsertCharacter`. Tier-list mutations remain character-scoped.

The partial unique index enforces **at most** one default. The service uses a per-character transaction and lock to enforce one eligible default whenever a published build exists. An unpublished, rejected or pending profile cannot be selected as default.

## Compatibility shim (required, not optional)

Existing GraphQL fields `Character.bestWeapons`, `bestArtifacts`, `teams`, `talentPriority`, `sands`, `goblet`, `circlet`, `subStatsPriority` must resolve from the **default build** when builds exist, and from legacy character fields only when a character has no builds. Without this shim, a character with two builds would show the union of both or an empty page. Dataloaders must be extended with `buildWeaponsLoader`, `buildArtifactsLoader`, `buildTeamsLoader` keyed by `buildId`, while `teamMembersLoader` stays keyed by team ID.
