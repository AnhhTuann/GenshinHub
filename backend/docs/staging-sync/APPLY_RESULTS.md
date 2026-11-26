# Neon staging sync — applied evidence

Date: 2026-11-24. Commit under preparation: `deploy/cloudflare-render-free`.

## Identity and recovery point

- Source: local PostgreSQL `127.0.0.1:5434/genshinhub` (verified local database).
- Destination: Neon project `jolly-cell-95415947`, staging branch
  `br-hidden-frost-aouh1xm1` (`ep-rapid-cell-ao0wi386.c-2.ap-southeast-1.aws.neon.tech`).
- Production branch `br-calm-haze-ao435vu3` was **not modified**.
- Fresh pre-write recovery branch: `br-muddy-recipe-aomvqeho`, parent
  `br-hidden-frost-aouh1xm1`, created 2026-11-24T13:46:12Z.
- An initial branch creation attempt defaulted to the production parent; that
  empty branch was deleted immediately before the correct staging recovery
  branch was created. No production data was written or reset.
- `prisma migrate status` on staging: 7 migrations found, schema up to date.

## Applied in two verified phases

| Phase | Writes | Verification | Notes |
| --- | ---: | --- | --- |
| 1 — canonical records | 8,117 | `VERIFY PASS` — all checksums matched | Catalog, builds, teams, audits, tier data. Destination editorial fields preserved. |
| 2 — verified legacy aliases | 485 | `VERIFY PASS` — all checksums matched | 441 weapon IDs + 44 character IDs normalized through repository-verified maps. |

Phase 2 alias evidence:

- Character aliases used `enkaNameMap` and `toId` from
  `backend/scripts/sync/idMapper.ts` (`kazuha`, `ayaka`, `ayato`, `yunjin`,
  `kokomi`, `shinobu`).
- Weapon aliases matched exactly one source `Weapon.nameVi` or `Weapon.nameEn`
  after diacritic/case/punctuation normalization. Ambiguous matches were
  rejected.

## Final staging counts

| Model | Expected | Actual | Difference |
| --- | ---: | ---: | ---: |
| Character | 131 | 131 | 0 |
| Weapon | 279 | 279 | 0 |
| ArtifactSet | 63 | 63 | 0 |
| Material | 862 | 862 | 0 |
| CharacterBuild | 347 | 347 | 0 |
| CharacterTeam | 620 | 620 | 0 |
| TeamMember | 2,478 | 2,478 | 0 |
| CharacterTierRanking | 1 | 1 | 0 |
| WeaponTierReview | 6 | 6 | 0 |
| CharacterBuildAudit | 691 | 691 | 0 |
| WeaponTierReviewAudit | 12 | 12 | 0 |
| Admin / User / AuthSession / Otp / PasswordResetToken | 0 | 0 | 0 |

`CharacterWeapon` is 2,451 and `CharacterArtifact` is 1,454 because the 540 /
253 pre-existing staging legacy rows were preserved and the verified build-scoped
rows were added without deleting anything.

## Editorial state (not changed to make tests pass)

- Builds: 96 APPROVED, 128 MAINTENANCE, 88 REJECTED, 35 LEGACY_IMPORT.
- Character tier ranking: 1 NEEDS_REVIEW (not approved).
- Weapon tier reviews: 2 PENDING, 4 REQUEST_CHANGES (no approvals created).
- Teams: 349 EXPERIMENTAL, 271 legacy/null status.

## Explicit exclusions

16 build weapon rows reference 13 legacy weapon aliases with no matching
canonical weapon in the verified source catalog. They were recorded in the
manifest as `excluded-unverified` and were **not** fabricated or repaired by
guesswork:

`vũ-khí-cán-dài-hỗ-trợ-mới`, `ống-đồng-yêu-sinh-mệnh`, `đoản-khúc-hải-uyên`,
`mảnh-trăng-kính-sáng`, `ánh-sáng-sương-mù-rực-rỡ`, `thương-lập-kiếm`,
`hòa-phát-diên`, `khúc-ca-vườn-sáng`, `khúc-ca-hòa-điệu`,
`đoạn-thảo-kính-phạt`, `dòng-chảy-trong-trẻo`, `vầng-trăng-biển-hoa`,
`kiếm-narzissenkreuz`.

## Safety statement

No destructive migration, reset, delete, auto-approval, auth import or
production change was performed. Rollback remains available by restoring/resetting
the staging branch to `br-muddy-recipe-aomvqeho` under a separately approved
procedure.
