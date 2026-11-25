# Neon staging sync — dry run

Generated: 2026-11-25T03:35:51.992Z

- Source: local 127.0.0.1/genshinhub
- Destination: Neon ep-rapid-cell-ao0wi386.c-2.ap-southeast-1.aws.neon.tech (branch br-hidden-frost-aouh1xm1)
- Manifest: `backend/docs/staging-sync/manifest.json`
- Planned writes: **0** (idempotent upserts only)
- Blocked conflicts: **0**
- Excluded unverified/junk/duplicate records: **16**
- Verified legacy alias remaps: **485**
- Auth/admin tables synchronized: **none**

| Model | Source | Create | Update | Unchanged | Blocked | Excluded | Dest before |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| character | 131 | 0 | 0 | 131 | 0 | 0 | 131 |
| weapon | 279 | 0 | 0 | 279 | 0 | 0 | 279 |
| artifactSet | 63 | 0 | 0 | 63 | 0 | 0 | 63 |
| material | 862 | 0 | 0 | 862 | 0 | 0 | 862 |
| tierRank | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| characterBuild | 347 | 0 | 0 | 347 | 0 | 0 | 347 |
| characterWeapon | 1927 | 0 | 0 | 1911 | 0 | 16 | 2451 |
| characterArtifact | 1201 | 0 | 0 | 1201 | 0 | 0 | 1454 |
| characterTeam | 620 | 0 | 0 | 620 | 0 | 0 | 620 |
| teamMember | 2478 | 0 | 0 | 2478 | 0 | 0 | 2478 |
| characterTierRanking | 1 | 0 | 0 | 1 | 0 | 0 | 1 |
| weaponTierRank | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| weaponTierReview | 6 | 0 | 0 | 6 | 0 | 0 | 6 |
| characterBuildAudit | 691 | 0 | 0 | 691 | 0 | 0 | 691 |
| weaponTierAudit | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| weaponTierReviewAudit | 12 | 0 | 0 | 12 | 0 | 0 | 12 |

Approval states are copied from the verified source only for new records. Existing destination approval fields are preserved and listed per entry in the manifest.
