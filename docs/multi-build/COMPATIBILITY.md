# Compatibility and risk matrix (proposal)

| Concern | Current behaviour | Proposed handling | Risk if ignored |
|---|---|---|---|
| Existing single-build characters | GraphQL `Character.*` resolves by `characterId` | Field resolvers use default build when builds exist, legacy fields otherwise | 130 characters lose their build or show mixed data |
| Mitya two builds | Child rows keyed only by `characterId` | Add `buildId`; child rows keep original IDs and `order`; both builds coexist | Main DPS import would be refused as `PROTECTED_CONFLICT` or would overwrite Support |
| Reorder/remove mutations | Take row IDs only | Add optional `buildId`; reject unscoped edits for multi-build characters and validate every row ID against its build owner | Dragging a weapon in one build reorders the other build |
| Admin single JSON editor (`AdminEditableBuild.tsx`) | `upsertCharacter` writes one build | Replace with per-build editor in phase 3; old editor must not be used on multi-build characters | Editing one build silently resets the other |
| `Character.role` / `tier` | General Admin classification | Untouched; `CharacterBuild.playstyles` is separate and never written back to `role` or `TierRank` | Playstyle tab would corrupt tier data |
| Experimental team | Only encoded in name/description | `CharacterTeam.reviewStatus = "EXPERIMENTAL"`; UI badge | Experimental lineup presented as verified meta |
| On-field vs off-field teams | Only in descriptions | Build label + `playstyles` + member roles preserved from approved drafts | User selects Main DPS but sees off-field teams |
| Default build on reload | N/A | `isDefault` server-rendered; partial unique index enforces one default | Random build after refresh |
| Duplicate imports | `apply.cjs` ID = hash of approval checksum | Use approval checksum for deduplication and compare exact existing payload before reporting no change | Duplicate builds on re-run |
| Rollback | apply.cjs snapshots single character | Preserve the original baseline and use scoped reads during rollback while additive builds remain | No way back after backfill |
| Rights / content | Drafts are independently authored and approved | Do not edit draft or approved content; store provenance checksum | Loss of review evidence |

## Frontend switcher contract (phase 3, not implemented yet)

- No Mitya-specific branch: tabs come from `character.builds`, labels from `build.name`, roles from `build.playstyles`.
- One selected build object feeds all sections together. Key the build subtree by build ID to reset local editor state and reject stale responses. A reload without an explicit build selection loads the public default.
- Each scoped mutation passes `buildId` and the expected version. Reorder and delete verify ownership server-side. Changes to a published build go through review while its previous approved version remains public.
- Character hero/artwork stays on `character.splashArtUrl` / `avatarUrl`, independent of build.
- Mobile 390px: tabs wrap or scroll; no layout change outside the build switcher.
- Desktop 1440px: same sections, same visual style.

## Test sequence (phase 3/4, sequential to avoid Arch Linux lag)

1. `prisma validate` / generated client typecheck.
2. `tsc --noEmit` then ESLint (separate commands).
3. GraphQL query for Mitya returns two builds with distinct IDs and correct `order`.
4. Playwright desktop 1440px: switch tabs, assert weapon IDs, artifact names, sands/goblet/circlet, substats, talents, team names and member order change together; reload → default build.
5. Playwright mobile 390px: same assertions.
6. Single-build character regression (e.g. `albedo`): switcher absent or single tab, data unchanged.
7. Admin: edit one build, assert the other build checksum unchanged.
