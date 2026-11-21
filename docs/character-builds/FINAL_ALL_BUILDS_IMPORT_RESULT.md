# Final Character Build development import result

**Status: SUCCESS.** The authorized immutable 91-candidate set was staged and Admin-approved through the existing authenticated GraphQL workflow against the local development database only. No production endpoint was accessed, no other build set was imported, and no unrelated data was changed.

## 1. Actual development database identity

| Property | Value |
| --- | --- |
| Database | `genshinhub` |
| Client host / port | `127.0.0.1:5434` |
| Server-reported internal port | `5432` (container address `172.17.0.2/32`) |
| Read-only inventory mode | `transaction_read_only = on` (preflight only) |
| Characters / builds before import | 131 / 128 |

The container's internal port 5432 is the documented mapping behind host port 5434; the client connection target was verified from the configured development `DATABASE_URL` and the running backend was confirmed to serve the same catalog (Mitya's two builds visible through Admin GraphQL).

## 2. Approved package ID

`character-build-catalog-7.2-r4-final-all`

## 3. Overall SHA-256

`e53479a44866447690d10980ebea83ed714109eaf4839a9ae29e1e5870016365`

## 4. Candidate count

91 eligible candidates: 87 legacy-build revisions with archive preservation and 4 newly created non-default role-specific builds (`dehya:2`, `ganyu:2`, `raiden-shogun:2`, `thoma:2`). The three A01 builds (`bennett:1`, `fischl:1`, `xiangling:1`) were excluded unchanged.

## 5. Full-set checksum verification

- Recomputed `SHA-256(JSON.stringify(orderedCandidateSet))` independently and matched the authorized value above.
- Recomputed all 91 candidate SHA-256 values from payloads with the embedded `checksum` field removed; every value matched the manifest.
- Verified candidate ID, character ID, role/playstyles, operation type, baseline version and fingerprint, patch equality, default preservation, exclusion sets, immutable ordering, and duplicate-free IDs.
- Counts confirmed from the manifest itself: 87 baselines, 4 new builds, 3 already imported, 33 `NEEDS_MORE_EVIDENCE`, 11 `BLOCKED`.

## 6. Baseline preflight results

All 91 candidates passed the full-set read-only preflight before any write:

| Check | Result |
| --- | --- |
| Baseline builds present at expected version 1 | 87/87 |
| Baseline fingerprints matched | 87/87 |
| Baseline build IDs all `legacy-*` | 87/87 |
| New-build prerequisites (existing default present) | 4/4 |
| Current pending stages | 0 |
| Default assignments | unique and matching manifest for all 91 |
| Duplicate baseline targets | 0 |
| Concurrent Admin edits / stale decisions | none |
| Incompatible approved Admin revisions | none |

A fresh, targeted per-candidate preflight was then repeated immediately before each write (checksum, baseline version/fingerprint, latest audit not `STAGED`/`ARCHIVED`, default unchanged, and no pre-existing duplicate for new builds). No candidate was skipped, substituted, rewritten or downgraded.

## 7. Beidou / Yelan / Zhongli advisory outcome

All three `beidou:1`, `yelan:1`, `zhongli:1` advisories were verified as strictly review-only:

- The four-piece over-claim appears only in `candidate.artifactRationale`, which is non-public review metadata.
- It is absent from `proposedOperation.patch.notesEn`, from every public description, and from the applied artifact patch (no `artifactRationale` field is staged).
- Applied artifact options use mechanically valid two-piece combinations; the public `CharacterBuild` GraphQL projection exposes no four-piece claim.
- Candidate checksums remained unchanged.

No payload was rewritten; no new authorization was required.

## 8. Fresh backup

| Property | Value |
| --- | --- |
| Path | `<redacted private backup path>` |
| SHA-256 | `dedc686a2561a6f8fceb5367023a41111e6976f414e81e297d5fa2c7bed1f587` |
| Size | 387,400 bytes |
| Directory / file mode | `700` / `600` |

This is a new complete `pg_dump` taken after development had changed since A01; the A01 backup was not reused. A deterministic read-only before-import snapshot was also stored at `<redacted private snapshot path>` covering builds, audits, defaults, weapon/artifact/team/member rows, Mitya and A01 builds, Admin-managed fields, tier rankings and migration history. No credentials are stored in the backup metadata or reports.

## 9. Isolated restore verification

The backup was restored into disposable database `genshinhub_test_final_restore_832aad6928ca`. Archive listing was readable, all 5 applied migrations matched, all 12 model record counts and deterministic digests matched the source, and the disposable database was dropped afterward. Restore usability was proven, not just file existence.

## 10. Admin authentication validation

| Check | Result |
| --- | --- |
| Valid Admin credential | accepted |
| Invalid credential | rejected (`FORBIDDEN`) |
| Anonymous Admin query | rejected (`FORBIDDEN`) |
| Backend-side enforcement | independently enforced by `requireAdmin` / `requireBuildEditor` |
| Forged actor identity | impossible; mutation inputs contain no actor field (introspection confirmed) |
| Audit actor | server-derived `authenticated-admin` |

No direct SQL was used for staging, approval or status changes, and no credentials or tokens appear in any artifact.

## 11–14. Import outcome

| Metric | Count |
| --- | ---: |
| Candidates staged | 91 |
| Candidates approved via `reviewCharacterBuild(APPROVE)` | 91 |
| Candidates fully verified | 91 |
| Candidates blocked | 0 |
| Candidates not attempted | 0 |

Manifest ordering was preserved and processing was sequential. Each candidate's staged payload was read back and compared to the exact approved patch before approval.

## 15. Legacy archives created

87 new `baseline-<character>` archive builds were created on first approval, one per legacy candidate. All are non-default and `REJECTED`. Original weapon, artifact and team rows were verified to survive in the expected archive with matching counts; archived builds are excluded from the public projection and do not appear as newly approved recommendations. One additional pre-existing archive (`baseline-fischl`, from A01) remained untouched: total archives 88.

## 16. New non-default builds created

4 new builds (`dehya:2`, `ganyu:2`, `raiden-shogun:2`, `thoma:2`) were created as non-default and approved. Existing defaults were not replaced, no other approved role was overwritten, and each owner's Multi-Build selector remains valid.

## 17. Default preservation

126 default builds remain unique per character, unchanged in identity and count. No archive is a default. No first-default promotion occurred.

## 18. A01 preservation

`legacy-bennett`, `legacy-fischl` and `legacy-xiangling` remain `APPROVED` at version 3 with their defaults intact. The complete A01-related build collection digest is unchanged before and after import.

## 19. Mitya preservation

Mitya's two approved builds remain unchanged, including the existing default `legacy-mitya`. The Mitya collection digest is unchanged before and after import.

## 20. CharacterBuildAudit integrity

The 133 pre-existing audit rows are preserved. 186 audit rows were appended: 91 `STAGED`, 91 `PUBLISHED`, and 4 `CREATED`. Total after import: 319. Each published audit records the exact approved patch and actor `authenticated-admin`. No pending `STAGED` state remains.

## 21. Tier Ranking preservation

`CharacterTierRanking`, `WeaponTierRank` and `TierRank` are all empty and unchanged. No Character or Weapon Tier Ranking import or approval was performed.

## 22. GraphQL verification

For all 91 candidates: `APPROVED` status in Admin view, exact version, correct content, exact audit patch, correct actor, `APPROVED` visibility in the public `characterBuilds` projection, correct character default, no pending-stage leak, and no duplicate records. Repeat checks on every candidate returned no pending draft and a consistent public projection.

## 23. Browser verification

Sequential Playwright Chromium checks against the running website:

| Check | Result |
| --- | --- |
| Pages checked / HTTP 200 | 16 / 16 |
| Character List shows 131 characters | yes |
| Character Detail sample | 14 pages |
| Required sections (Weapons, Artifacts, Main Stats, Substats, Talent Priority, Teams) | present on all sampled detail pages |
| Expected approved build names rendered | all present |
| Multi-Build selector | verified on Dehya, Ganyu, Raiden Shogun, Thoma |
| Experimental team labels | visible on sampled builds |
| Localized content (`/vi/characters/albedo`) | rendered in Vietnamese |
| A01 and Mitya pages | rendered correctly |

The only console error observed was the expected anonymous `401 /api/auth/me` admin-session probe. Raw evidence: `FINAL_ALL_BUILDS_BROWSER_VERIFICATION.json`. Full-set evidence remained GraphQL/database-based, not limited to the sampled pages.

## 24. Migration integrity

All 5 applied Prisma migrations are unchanged and match the pre-import snapshot:

`20261120000000_legacy_baseline`, `20261120145000_add_character_builds`, `20261120151000_add_character_tier_rankings`, `20261120153500_add_weapon_tier_rankings`, `20261120160000_add_weapon_tier_review_workflow`.

## 25. Remaining evidence blockers

Unchanged and still excluded: 33 `NEEDS_MORE_EVIDENCE` drafts and 11 `BLOCKED` entries (6 equipment-only candidate drafts and 5 non-buildable identities: `traveler`, `traveler-boy`, `traveler-girl`, `manekin`, `manekina`). No fabricated builds were created for those identities. Details: `FINAL_ALL_BUILDS_BLOCKERS.md`.

## 26. Partial failure and exact recovery state

One earlier runner invocation aborted at the first candidate (`albedo:1`) during its preflight because the helper hashed the candidate object with its embedded `checksum` field included. The failure occurred before any staging or approval: development remained at 128 builds, 133 audits, 5 approved builds, with 0 new archives from that attempt. No database restore was performed. The checkpoint file containing that single `FAILED` record was removed, the checksum helper was corrected, a fresh backup and before-snapshot were created and restore-verified, and the full import was rerun from the start. The final checkpoint set records 91 `VERIFIED` candidates and 0 failures.

## Evidence artifacts

- `FINAL_ALL_BUILDS_IMPORT_CHECKPOINTS.json` — per-candidate durable checkpoints
- `FINAL_ALL_BUILDS_POST_IMPORT_VALIDATION.json` — full post-import read-only validation
- `FINAL_ALL_BUILDS_BROWSER_VERIFICATION.json` — browser sample evidence
- Private, permission-restricted backup and snapshots under `<redacted private backup directory>`

No commit, push, deploy, production write, UI redesign, schema migration or Tier List work was performed.

## Final terminal summary

```text
GENSHINHUB CHARACTER BUILD IMPORT

Package:
character-build-catalog-7.2-r4-final-all

Authorized SHA-256:
e53479a44866447690d10980ebea83ed714109eaf4839a9ae29e1e5870016365

MANIFEST_VERIFIED: YES
ALL_BASELINES_VALID: YES
ADMIN_AUTHENTICATED: YES
BACKUP_VERIFIED: YES

AUTHORIZED_CANDIDATES: 91
STAGED: 91
APPROVED: 91
FULLY_VERIFIED: 91
FAILED: 0
NOT_ATTEMPTED: 0

LEGACY_ARCHIVES_VERIFIED: 87
NEW_NON_DEFAULT_BUILDS_VERIFIED: 4

A01_PRESERVED: YES
MITYA_PRESERVED: YES
DEFAULTS_PRESERVED: YES
AUDIT_HISTORY_VALID: YES
TIER_RANKINGS_UNCHANGED: YES
UNRELATED_DATA_PRESERVED: YES

GRAPHQL_VALIDATION: PASS
BROWSER_VALIDATION: PASS

DEVELOPMENT_IMPORT_STATUS:
SUCCESS

PRODUCTION_NOT_ACCESSED: YES

REPORT:
docs/character-builds/FINAL_ALL_BUILDS_IMPORT_RESULT.md
```
