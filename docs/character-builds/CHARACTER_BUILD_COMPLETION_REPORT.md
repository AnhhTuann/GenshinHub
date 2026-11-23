# Character build catalog completion

Revision `character-build-catalog-7.2-r1` · 2026-11-20

**131 catalog characters inspected. 133 proposed builds for 127 characters. Zero eligible development writes.** The recommendations are reviewable C0 drafts. The five characters without builds have first-build proposals. Six characters have an additional role-specific proposal. Mitya’s two approved builds and their existing default were preserved.

## Current coverage and proposed changes

| Measure | Result |
|---|---:|
| Catalog characters inspected | 131 |
| Existing CharacterBuild rows | 127 |
| Existing defaults | 126 |
| Existing audit entries | 127 |
| Existing status | 125 LEGACY_IMPORT, 2 APPROVED |
| Characters with complete, mechanically checked and approval-backed builds | 1, Mitya, with two builds |
| Characters whose existing builds were incomplete, had invalid/unresolved references, or lacked kit evidence | 125, including the three identity or kit holds |
| Characters with no build | 5 |
| Proposed revisions to an existing build | 122 |
| Proposed first builds | 5 |
| Proposed alternate builds | 6 |
| Drafts with weapons, artifacts, main stats, substats, talent order and a team | 106 for 100 characters |
| Drafts without a team | 27, including six equipment-only holds |
| Drafts eligible for development import | 0 |

The existing inventory contains 613 weapon recommendations, 282 artifact rows and 256 team rows. The same stat and talent template appears on 84 profiles. There are 85 profiles without a team, 22 profiles with a weapon ID or type problem after localized-name resolution, 109 profiles with unresolved artifact labels or piece-count issues, and 45 invalid lineups across 18 profiles. A further 119 profiles use at least one resolvable legacy weapon alias rather than its canonical ID. These findings measure structural problems. A legacy build without a reliable evaluation date cannot be classified as current or outdated from database metadata alone.

Mitya’s two complete profiles were checked against the catalog, the recorded approval lineage, and the on-field versus off-field scopes in the existing review dossiers. The experimental support lineup retains that status. No build, audit, recommendation or default was changed.

### Recommendation changes

- **Weapons:** 122 proposed existing-profile replacements and 11 new-build weapon lists use canonical compatible IDs. Options include energy cases and no-payment acquisition where supported. Wish, crafting, fishing, chest and retired-event access have different constraints. Favonius entries call out the on-field critical-hit proc, and stated refinements are part of the recommendation.
- **Artifacts:** 122 existing profiles have proposed replacements and 11 new builds have artifact options. The drafts distinguish four-piece versus 2+2, include the conditions for set value, and separate Stellar Glimmer gearing from Lunar gearing. Placeholder labels are retained only as before-state evidence.
- **Teams:** 95 existing-profile diffs add or replace a lineup, and all 11 new-build proposals have a lineup. Each lineup has four distinct existing catalog members and a stated reaction or role rationale. These are experimental archetypes with no damage ranking. For the 27 unassigned drafts, the proposal leaves the team field absent so it cannot clear existing teams.
- **Stats and talents:** 127 drafts propose the three main stat slots, substats, and talent order. Six equipment-only drafts omit these fields. The package supplies the talent identities, constellation records, version and Burst cost where encoded. Numerical ER targets require a chosen rotation, trigger ownership, particles, teammate weapons and skill counts. The drafts use contextual priorities while leaving unmeasured targets open.
- **Multi-Build:** Proposed separate rotations for Dehya mitigation/Burgeon versus Burst carry, Ganyu Freeze versus reverse Melt, Mavuika on-field Melt versus off-field support, Raiden Burst versus Hyperbloom, Kokomi Freeze sustain versus on-field Bloom, and Thoma Burgeon versus HP shield. Each alternate preserves the existing default. Mitya receives no new proposal.

The five first-build candidates are **Alyosha, Odette, Valeriy, Vesna and Vodyanitsa**. The generic Traveler entry has no specified combat form. Manekin and Manekina have catalog identities but no independent conventional talent build in the local package. Those three entries are on hold. No out-of-catalog Cryo Traveler or other character was added.

## Evidence and disagreements

The comparison input used Genshin-Builds for equipment, stats, talent priorities and teams, with character URL and observation time saved in the coverage matrix. Its API returned build references for 128 of the 131 local entries. The generic Traveler was not indexed under its generic entry and Manekin and Manekina returned no build. Source game-version metadata was left unknown where absent. Only comparison outcomes, overlap counts, confidence and links are shipped. Source weapon lists, full editorial recommendations, team copy and descriptions are absent from the generated artifacts. [Genshin-Builds character index](https://genshin-builds.com/en/characters)

Independent proposals were checked against installed `genshin-db@5.2.15` and the actual Prisma catalog. The validator checks all proposed weapon identities and compatibility, artifact identities and set shape, owner and team identity, and source integrity. Mechanical notes are original summaries. An overlap denotes agreement in the compared source fields, while a difference can reflect different team assumptions or a genuinely disputed choice. There are 79 draft profiles with a first-choice difference in one or more compared stat or talent slots.

Examples worth Admin review:

- Mitya’s comparison aligns with the existing Main DPS lead equipment and Normal-first priority. It does not replace the separate Skill-first off-field support profile, which has its own prior review and default. [Genshin-Builds Mitya](https://genshin-builds.com/en/character/mitya)
- Xiangling’s draft prioritizes Energy Recharge and Burst value from The Catch over the comparison source’s premium lead. Pyronado’s 80-Energy cost and the proposal’s Bennett funnel are part of the scope. [Genshin-Builds Xiangling](https://genshin-builds.com/en/character/xiangling) · [KQM Xiangling](https://keqingmains.com/xiangling/)
- Raiden’s Burst carry and Hyperbloom trigger use different talent, weapon and stat priorities. Electro damage and Crit gearing belong to the Burst role. [Genshin-Builds Raiden Shogun](https://genshin-builds.com/en/character/raiden_shogun) · [KQM Raiden Shogun](https://keqingmains.com/q/raiden-quickguide/)
- Alyosha’s draft conditions Energy and ATK gearing on Tugarin uptime and the Polestar setup. Vesna’s Scarlet Proof option requires that she own the Stellar Swirl trigger. Odette and Valeriy have a one-holder constraint for Heart of the Furnace. These are mechanically screened choices with rotation work still outstanding. [Alyosha](https://genshin-builds.com/en/character/alyosha) · [Vesna](https://genshin-builds.com/en/character/vesna) · [Odette](https://genshin-builds.com/en/character/odette) · [Valeriy](https://genshin-builds.com/en/character/valeriy)
- Linnea, Lohen, Nicole, Prune, Sandrone and Varka have equipment-only holds. Their kit scaling, full stats and team rotations need additional verification. Stage validation on these entries establishes compatibility only.

## Artifacts and dry run

| File | Contents |
|---|---|
| `coverage.csv` and `coverage.json` | All 131 entries, build-scoped inventory, defaults, audit actions, mechanics references, external-provenance status and evidence gaps |
| `proposed-builds.json` | 133 checksummed candidates, proposed GraphQL patch, relative alternatives and conditions, source comparison, protection metadata and evidence gaps |
| `character-diffs.json` | All 131 characters with before/after fields or their reason for having no candidate |
| `import-dry-run.json` | Actual read-only preflight for the 133 selected candidates, all requiring review or evidence |
| `recommendation-evidence.tsv` | Human-editable, versioned independent source decisions |

Tooling lives under `backend/scripts/build-audit/`. Run from `backend/`:

```bash
node scripts/build-audit/catalog-inventory.cjs /tmp/build-inventory.json
node scripts/build-audit/catalog-source-comparison.cjs /tmp/build-inventory.json /tmp/build-comparisons.json
node scripts/build-audit/catalog-completion.cjs /tmp/build-inventory.json /tmp/build-comparisons.json
node scripts/build-audit/catalog-dry-run.cjs --character ganyu --build ganyu:2
```

Inventory and private comparison inputs belong outside the repository. The source comparison stops on rate limiting. Reusing the same inputs reproduces the same candidate checksums.

## Import and rollback plan

1. Select the candidate by character or build ID and refresh the read-only preflight. The planner checks the checksum, expected baseline version and content fingerprint, name conflicts, existing staged patches, and approved-build protection. An identical current staged patch is a no-op. A different pending patch or changed baseline requires a new review.
2. Obtain explicit authorization for development staging before using the existing `createCharacterBuild` and `updateCharacterBuild` mutations. Stage against the checked version. Keep approved baselines intact. Stage an alternative separately when roles differ, and leave held or absent fields untouched.
3. Require an authenticated Admin decision through existing review. Confirm the first-default policy separately for the five missing-build characters. The existing service makes the first published build default when none exists, so those five require an explicit default decision before approval. Additional profiles must retain the current default.
4. Before any real write, retain the build-scoped backup and linked audit references. To roll back an unpublished separate draft, archive it through the existing mutation. To cancel a staged revision on a published build, reject the stage so published content remains live. A post-publication rollback requires a separately approved restoration from the snapshot and another version check. Preserve the later audit entries and stop if a reviewer changed the build in the meantime.

## Validation and remaining work

| Check | Result |
|---|---|
| Prisma validation, backend TypeScript and frontend TypeScript | Passed sequentially. |
| Build validation, equipment, teams, provenance, checksums, approved baseline protection and idempotent staging checks | 16/16 in the catalog and existing build-audit suites. |
| Fresh isolated PostgreSQL and GraphQL staging | All five existing migrations applied in isolation. The staging runner validated 133 checked candidates through the existing Admin mutations. None was approved or published. Stale replay was rejected, an unapproved staged draft was archived, and Mitya’s copied profiles and default remained identical. |
| Multi-Build, ordered team members and Character Detail GraphQL contract | 4/4 existing regressions passed. The isolated Character Detail GraphQL query also returned Mitya’s two profiles, default weapon list and four-member teams. No frontend code changed, so browser verification was unnecessary. |
| Full and selected live dry run | 133 analyzed, zero writes. Selecting Ganyu and `ganyu:2` returned exactly one candidate. |
| Development integrity | The repeatable read-only snapshots before and after isolated staging matched byte-for-byte, including the existing build recommendations and audit action/version records. |

The first isolated harness attempt used the wrong shape for the Admin resolver context. The runner was corrected to use the existing context shape and re-run on a fresh database. The final run succeeded.

All development writes and all real approvals are outside this deliverable. Current drafts need Admin review and rotation validation, especially where the comparison disagrees or no team is assigned. The proposed import batch contains **133 candidates, 127 requiring explicit Admin review and 6 evidence holds. The actionable write count is zero.**
