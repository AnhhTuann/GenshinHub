# Safe migration plan (PROPOSAL ONLY — not executed)

Run only after explicit schema approval. Target is the development database (`127.0.0.1:5434/genshinhub`, `public` schema). Never production.

## Phase 1 — additive schema (no data loss)

1. Take a full logical snapshot of `Character`, `CharacterWeapon`, `CharacterArtifact`, `CharacterTeam`, `TeamMember` into `backend/backups/multi-build/` with a checksum.
2. Apply the additive Prisma changes from `SCHEMA_DIFF.md` via a reviewed migration file. **No legacy column is dropped.** `buildId` is nullable on child tables.
3. Create the partial unique index for one default build per character.
4. Verify `prisma validate`, generated client, and that all existing GraphQL queries still work through the compatibility shim (default build does not exist yet → legacy path still used).

Rollback for phase 1: drop the index, drop `CharacterBuildAudit`/`CharacterBuild`, drop the three nullable `buildId` columns and `reviewStatus`. All original rows and values remain untouched.

## Phase 2 — backfill one legacy build per character (idempotent)

For the 126 characters with populated build data in the current 131-character catalog, create one default profile each. Recompute eligibility from the live data under a write pause or scoped database locks. The five empty characters retain the existing empty state until an Admin adds a build.

- Deterministic ID `legacy-<characterId>` and review status `LEGACY_IMPORT` preserve visibility of existing content. This status does not certify a new review.
- Use a reviewed playstyle or constellation assumption only when backed by an approval record. Keep the fields empty for unclassified legacy builds. `Character.role` and `recommendedC` describe separate character-level decisions.
- Copy the ordered scalar build arrays unchanged. Record the legacy baseline and snapshot reference in the audit trail. Existing scalar columns remain available for rollback.
- Use a single transaction for building the baseline and attaching its rows. Reruns check owner, content and intended role for an existing deterministic ID. Conflicts stop for review.

Then backfill child rows **without changing IDs or order**:

```sql
INSERT INTO "CharacterBuild" (...) VALUES (...) ON CONFLICT (id) DO NOTHING;
UPDATE "CharacterWeapon"     SET "buildId" = 'legacy-' || "characterId" WHERE "buildId" IS NULL;
UPDATE "CharacterArtifact"   SET "buildId" = 'legacy-' || "characterId" WHERE "buildId" IS NULL;
UPDATE "CharacterTeam"       SET "buildId" = 'legacy-' || "characterId" WHERE "buildId" IS NULL;
-- TeamMember.order and each child's order are never touched.
```

Re-running the script affects zero rows on the second run. `ON CONFLICT (id) DO NOTHING` and `WHERE buildId IS NULL` are the idempotency guards. A partial unique index prevents a second default from being created accidentally.

Mitya special case: his live rows are provably the approved Support/Sub DPS build (`apply-20ebb664…` audit + checksum `263fd822…`). Backfill his legacy build with label `C0 Off-Field Support / Sub DPS`, `playstyles = ["SUB_DPS","SUPPORT"]`, and mark the experimental team `reviewStatus = "EXPERIMENTAL"`. This comes from the audit record, not from a character-specific React hardcode.

## Phase 3 — GraphQL/frontend cutover (still no DB deletion)

1. Add `Character.builds` and build-scoped queries/mutations from `SCHEMA_DIFF.md`.
2. Extend DataLoaders with `buildId` keys; keep `teamMembersLoader` by team ID.
3. Change `Character.*` field resolvers to use the default build when builds exist.
4. Character Detail server component fetches `builds` and passes one selected build's arrays into all five sections. Default selection is `isDefault`; no build selected → legacy path, never an empty page.
5. Admin UI gains build CRUD, playstyle multi-select, default toggle, approve/reject, and audit history. Existing permission guard unchanged.
6. Verify TypeScript, ESLint, Playwright 1440px/390px, GraphQL, and DB counts before any destructive step.

## Phase 4 — import Main DPS Mitya (after cutover verified)

- Import the approved file `mitya-main-dps.approved.json` (checksum `567e51a3…f3cd`) as a **second** `CharacterBuild` with `isDefault = false`, `playstyles = ["MAIN_DPS"]`, `reviewStatus = "APPROVED"`.
- Use the existing approval checksum as a unique import identity and derive deterministic child IDs with the existing `apply.cjs` mapping. On retry, compare the exact scoped payload before reporting no changes. A mismatch requires review.
- Do not modify the Support build, the two approved drafts, the review notes, or either approval block.
- Do not add a tier or Best-in-slot claim; keep `Character.tier/role` empty for Mitya as they are now.
- Keep the experimental Wriothesley team `reviewStatus = "EXPERIMENTAL"`; keep the on-field/off-field member roles exactly as approved.

## Phase 5 — optional cleanup (separate approval)

Only after verification, and with a fresh snapshot, may legacy `Character` build columns be dropped and `buildId` made required. This is **not** part of the first migration and is not proposed for approval now.

## Rollback at each phase

| Phase | Rollback |
|---|---|
| 1 | Remove only the new indexes, foreign keys, nullable columns and staged tables once confirmed unused. |
| 2 | Within a transaction, detach original child rows by verified manifest IDs, clear the profile defaults and retain the profiles and their audit history. Disable public multi-build reads during this rollback. The foreign keys use `RESTRICT`. Compare original child values and order to the snapshot. A retry must reconcile the retained profiles with a new manifest before attaching rows again. |
| 3 | Switch back to the compatibility view using the original legacy profile. Keep build-aware filtering deployed while any additional profile shares the child tables. Do not run the old unfiltered loaders or unscoped writes against those tables. |
| 4 | Unpublish Main DPS to reverse its visibility while keeping its history and approval. For a full data rollback, export exact affected rows/history, check versions and remove only verified records from that import within one transaction. Never roll back by ID prefix. |
| 5 | Requires separate approval and backup. |

A full return to the original runtime after cutover requires a separate reconciliation. Archive additive builds and their histories, project the selected legacy baseline back into the old fields and verify any post-cutover Admin edits before enabling the old runtime. Original rollback files stay intact. The original single-build rollback CLI is not safe once multi-build data exists for the target character and must be guarded in Phase B.

## Verification gates before continuing

- 131 characters still present; 610 weapon rows / artifact / team counts unchanged after phase 2.
- Every legacy child row has exactly one `buildId`; `order` values identical to snapshot.
- Exactly one public default per character with a published build.
- The scoped Support payload and ordered child IDs stay identical after both backfill and Main DPS import. Do not use an unscoped single-build dry-run for this check after Phase 4.
- Mitya has exactly two builds after phase 4; GraphQL returns both; switching tabs changes all five sections together.
- No production connection is used at any step.
