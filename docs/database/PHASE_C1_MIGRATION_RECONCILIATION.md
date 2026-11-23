# Phase C1 — Prisma Migration History Reconciliation (Development)

**Trang thai: DA THUC HIEN. Phat hien concurrent migration da duoc doi chieu truoc khi ghi history. Khong co ranking nao duoc insert/approve.**

Target: PostgreSQL development `127.0.0.1:5434/genshinhub`, schema `public`, container `genshinhub-postgres`. Khong cham production.

---

## 0. Preflight va dung thong bao concurrency

Preflight phat hien 2 folder migration **moi** trong `backend/prisma/migrations/` so voi preflight B2.5:

- `20261120000000_legacy_baseline/`
- `20261120145000_add_character_builds/`

Da **dung lai de doi chieu**, khong ghi de, khong xoa, khong doi ten:

| So sanh | Ket qua |
|---|---|
| `docs/tierlist-v7.2-audit/migration-bootstrap-proposal/20261101000000_baseline_legacy/migration.sql` vs `backend/prisma/migrations/20261120000000_legacy_baseline/migration.sql` | **byte-identical** (`cmp`, cung SHA-256) |
| `docs/tierlist-v7.2-audit/migration-bootstrap-proposal/20261120152000_add_character_builds/migration.sql` vs `backend/prisma/migrations/20261120145000_add_character_builds/migration.sql` | **byte-identical** |
| `backend/prisma/development-migrations/20261120_character_builds.sql` vs `backend/prisma/migrations/20261120145000_add_character_builds/migration.sql` | **byte-identical** |

Folder names khac voi proposal nhung SQL giong het va thu tu chay on dinh: baseline → builds → character tier → weapon tier. Khong co schema drift moi (`prisma migrate diff` = empty). Vi vay tiep tuc voi **ten folder thuc te**, khong tao ban sao, khong rename.

Xac minh SQL da duoc phan anh day du trong schema dev truoc khi resolve:

| Nhom doi tuong | So luong expected | Thieu tren dev |
|---|---:|---:|
| Tables tu 2 migration | 16 | 0 |
| Indexes (unique + thuong) | 36 | 0 |
| Enum types | 3 | 0 |
| Cot moi (`buildId`, `reviewStatus`) | 3 | 0 |
| Constraint/FK ten | 12 | 0 |

Partial unique index `CharacterBuild_one_default_per_character` ton tai va dung dang `UNIQUE ("characterId") WHERE "isDefault"`.

---

## 1. Baseline migration filename

`backend/prisma/migrations/20261120000000_legacy_baseline/migration.sql` (322 dong).

Tao tu `git show HEAD:backend/prisma/schema.prisma` o B2.5, **khong** tu schema hien tai. HEAD schema co 0 token `TierList|CharacterTierRanking|WeaponTier|CharacterBuild`; baseline SQL cung co 0 token do. Khong chua `CharacterTierRanking`, `CharacterBuild`, `WeaponTierRank`.

## 2. Multi-Build migration filename

`backend/prisma/migrations/20261120145000_add_character_builds/migration.sql` (105 dong).

Giu nguyen `CharacterBuild`, `CharacterBuildAudit`, build-scoped `buildId` tren `CharacterWeapon/CharacterArtifact/CharacterTeam`, `reviewStatus`, partial default uniqueness va tat ca FK. Khong sua noi dung.

## 3. SQL checksums

SHA-256 cua file SQL (`backend/prisma/migrations/`):

| Migration | File SHA-256 | `_prisma_migrations.checksum` | Ket qua |
|---|---|---|---|
| `20261120000000_legacy_baseline` | `ce3dc583c8fe2bd19a8a2889606546dbb5407223b4e95a29fa3a60227692ff49` | cung gia tri | MATCH |
| `20261120145000_add_character_builds` | `e0a4ff5f5008ae0b292fe6cefd7613778b435681f16b13c5e110081c20190fc9` | cung gia tri | MATCH |
| `20261120151000_add_character_tier_rankings` | `01e70c7b6d98984628d433f4312544ca3448cc3e398c017ba3de7c0ed578f498` | cung gia tri | MATCH (khong doi) |
| `20261120153500_add_weapon_tier_rankings` | `b37adcc94579b874088d2fee644c8b78ea4b7dd0c1b9e8477505f6962759febc` | cung gia tri | MATCH (khong doi) |

Khong sua checksum bang SQL tay.

## 4. Migration history truoc / sau

**Truoc** (2 row, `finished_at != null`, `rolled_back_at = null`):

1. `20261120151000_add_character_tier_rankings`
2. `20261120153500_add_weapon_tier_rankings`

**Sau** (4 row, tat ca `finished = true`, `rolled_back_at = null`, khong failed, khong mismatch):

1. `20261120151000_add_character_tier_rankings` (giu nguyen, `applied_steps_count = 0`)
2. `20261120153500_add_weapon_tier_rankings` (giu nguyen, `applied_steps_count = 1`)
3. `20261120000000_legacy_baseline` (`migrate resolve --applied`, `applied_steps_count = 0`)
4. `20261120145000_add_character_builds` (`migrate resolve --applied`, `applied_steps_count = 0`)

Lenh da chay (chi 2 lenh, dung ten folder thuc te):

```bash
npx prisma migrate resolve --applied 20261120000000_legacy_baseline
npx prisma migrate resolve --applied 20261120145000_add_character_builds
```

Khong chay DDL tao lai bang legacy / Multi-Build tren dev; khong `migrate deploy/reset`, khong `db push --force-reset`, khong `--accept-data-loss`, khong DROP/TRUNCATE. Thu tu row theo `finished_at` khong giong ten folder vi 2 row duoc resolve sau, nhung **thu tu deploy tren DB moi la dung** (xem muc 6).

## 5. Database backup reference

Tao ngay truoc khi resolve:

| File | SHA-256 |
|---|---|
| `backend/backups/phase-c1/pre-c1-full-2026-11-20T08-51-57Z.dump` | `e46a8b0f899148fca0559047a8d7ff886d601c3b8126110d06eaff1e286ad770` |
| `backend/backups/phase-c1/pre-c1-prisma-migrations-2026-11-20T08-51-57Z.dump` | `055798f77aae3708169ac21cf5b54a6b11d50921e3f34b0f10a5b9ca66526a8c` |
| `backend/backups/phase-c1/SHA256SUMS` | ghi ca 2 file, `sha256sum -c` = OK |

Backup dang `pg_dump -Fc`, full DB + dump rieng data-only `_prisma_migrations`. Da verify `pg_restore -l` doc duoc (143 TOC entries / 5 TOC entries) va **restore thanh cong sang DB tam** `genshinhub_c1_restore_1795164739`: `Character=131, CharacterBuild=127, _prisma_migrations=2, CharacterTierRanking=0`, khong warning. DB tam restore da DROP.

Migration IDs truoc thay doi: `20261120151000_add_character_tier_rankings`, `20261120153500_add_weapon_tier_rankings`.

Recovery procedure (chuan bi, KHONG thuc hien):

```bash
# 1. Tao DB phuc hoi rieng, khong doi dev truc tiep
docker exec -e PGPASSWORD=$DEV_DB_PASSWORD genshinhub-postgres \
  psql -h 127.0.0.1 -U postgres -d postgres -c 'CREATE DATABASE genshinhub_c1_recover;'
# 2. Restore backup cu
docker exec -i -e PGPASSWORD=$DEV_DB_PASSWORD genshinhub-postgres \
  pg_restore -h 127.0.0.1 -U postgres -d genshinhub_c1_recover --no-owner --no-privileges \
  < backend/backups/phase-c1/pre-c1-full-2026-11-20T08-51-57Z.dump
# 3. So sanh counts / checksums truoc khi yeu cau doi ten DB (can Admin phe duyet rieng)
```

## 6. Fresh bootstrap result

DB tam moi `genshinhub_c1_bootstrap_1795164758` (da DROP sau test), chay `prisma migrate deploy` bang schema working tree:

```
4 migrations found in prisma/migrations
Applying migration `20261120000000_legacy_baseline`
Applying migration `20261120145000_add_character_builds`
Applying migration `20261120151000_add_character_tier_rankings`
Applying migration `20261120153500_add_weapon_tier_rankings`
All migrations have been successfully applied.
```

Sau do:

| Kiem tra | Ket qua |
|---|---|
| `prisma validate` | pass |
| `prisma generate` | pass |
| `prisma migrate status` | up to date, 4 migration, khong pending/failed |
| `prisma migrate diff` | `-- This is an empty migration.` |
| Prisma Client probe | `character=0, characterTierRanking=0, weaponTierRank=0, characterBuild=0, user=0` |
| Khoi tao DB moi khong can `db push` | **co** |

Luu y: migrate chi tao schema. DB moi **chua seed/backfill** du lieu nhan vat (can chay rieng neu can); day khong nam trong pham vi C1.

## 7. Schema comparison

So sanh cau truc DB tam bootstrap vs dev (catalog Postgres):

| Thanh phan | Ket qua |
|---|---|
| Tables | MATCH (19, khong tinh `_prisma_migrations`) |
| Columns | MATCH |
| Foreign keys | MATCH (15) |
| Indexes | MATCH (68) |
| Enums | MATCH (62 label) |

`prisma migrate diff` tu dev toi `prisma/schema.prisma` = empty. Khong co pending migration ngoai y muon.

## 8. Legacy data verification

Hash md5 cua toan bo row (sort theo id) **truoc va sau** resolve:

| Bang | MD5 truoc = sau |
|---|---|
| Character | `e74a910f1cb98e6b6d24479d551b31bd` |
| Weapon | `db501ef988e195945bbaf91d24843ee4` |
| CharacterWeapon | `602cddce885e7b79b149aa393370b561` |
| CharacterArtifact | `6bf1b946b2a70b5b254c9b19631af92d` |
| CharacterTeam | `7b977c85b5497a4bc10af0388fb21323` |
| TierRank | `d41d8cd98f00b204e9800998ecf8427e` |

Counts khong doi: `Character=131`, `Weapon=279`, `ArtifactSet=63`, `Material=862`, `CharacterWeapon=613`, `CharacterArtifact=282`, `CharacterTeam=256`, `TeamMember=1024`, `User=0`.

## 9. Mitya Multi-Build verification

| Build | ID | Default | Review status |
|---|---|---|---|
| C0 Off-Field Support / Sub DPS | `legacy-mitya` | **true** | APPROVED |
| C0 On-Field Main DPS | `approved-567e51a391b24a1ce7f0c29f81112ed4be98c0525c7fe821c0cd9537c70bf3cd` | false | APPROVED |

`CharacterBuild=127`, `CharacterBuildAudit=127` (khong doi). GraphQL smoke doc duoc `character(id:"mitya"){ builds { ... } defaultBuild { ... } }`: 2 build, dung 1 default, default van `legacy-mitya` — **khong tu chuyen default**.

## 10. Character Tier row counts

`CharacterTierRanking = 0`, trong do `APPROVED = 0`. Khong co ranking nao duoc insert; public query `characterTierRankings(gameVersion:"7.2")` tra ve `[]`.

15 draft van giu nguyen trong `docs/tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json`: `PENDING_REVIEW`, `INDEPENDENT`, gom 9 `READY_FOR_ADMIN_REVIEW`, 2 `NEEDS_MORE_EVIDENCE`, 3 `RUBRIC_RECALIBRATION`, 1 `GAMEPLAY_ASSUMPTION_UNVERIFIED`.

## 11. Weapon Tier row counts

`WeaponTierRank = 0`, `WeaponTierAudit = 0`. Public query `weaponTierRanks` tra ve `[]`. Khong import `SOURCE_DERIVED`.

## 12. TypeScript / tests

| Kiem tra | Ket qua |
|---|---|
| `npx prisma validate` | pass |
| `npx prisma migrate status` (dev) | up to date, 4 migration, khong pending/failed |
| `npx prisma migrate diff` (dev → schema) | empty |
| `npx prisma generate` (fresh DB) | pass |
| `npx tsc --noEmit` | pass |
| Character Tier tests (7 files) | 37/37 pass |
| `dataloaders/index.test.ts` | 1/1 pass |
| Weapon Tier tests (5 files) | 32/32 pass |
| Multi-Build / build-audit tests (3 files) | 13/13 pass |
| Weapon Tier audit pipeline tests (2 files) | 9/9 pass |
| `weapon-tier-independent/independent.test.cjs` | 6/6 pass |
| `weapon-tier-independent/migration-integrity.test.cjs` | 4/4 pass sau khi cap nhat expected list thanh 4 migration (chi thay hard-coded names; checksum van duoc so sanh that) |
| `phaseC1Smoke.test.ts` (GraphQL that + PrismaClient that) | 3/3 pass |
| Tong (21 file test) | 20 pass / 1 fail (chi `approval.test.cjs`, ngoai pham vi C1) |

**1 test KHONG pass, ngoai pham vi C1:** `backend/scripts/weapon-tier-independent/approval.test.cjs` — 7/8 pass; subtest 8 `rights are never auto-verified and every candidate needs an admin decision` that bai tai `assert.ok(pkg.rows.every(r => /Verify rights|verify rights/i.test(r.adminActionRequired)))`. Cac file/script/artifact cua phase Weapon Tier dang duoc agent khac chinh sua lien tuc (stat: `build-approval.cjs` 15:57:49, `approval.test.cjs` 15:58:09, `game-facts.test.cjs` 15:59:27); o lan chay truoc do con thay doi mot subtest khac (`approval package does not mutate the candidate artifact`). Khong sua, khong ghi de. Day la BLOCKED cua phase Weapon Tier, khong lien quan migration history C1 va khong anh huong du lieu dev.

Khong chay browser test (khong doi UI/CSS). Khong chay ESLint (tooling gap da ghi tu B1).

## 13. Files changed

| File | Thay doi |
|---|---|
| `_prisma_migrations` (dev) | them 2 row: `20261120000000_legacy_baseline`, `20261120145000_add_character_builds` |
| `backend/scripts/weapon-tier-independent/migration-integrity.test.cjs` | cap nhat expected migration name list tu 2 thanh 4 (does khong doi logic checksum) |
| `backend/src/graphql/modules/characterTierRanking/phaseC1Smoke.test.ts` | them GraphQL/Prisma smoke test cho Mitya dual-build + empty public rankings |
| `docs/database/PHASE_C1_MIGRATION_RECONCILIATION.md` | bao cao nay |
| `backend/backups/phase-c1/*` | 2 dump moi + SHA256SUMS |

**Khong thay doi:** SQL cua 4 migration, `backend/prisma/schema.prisma`, du lieu `CharacterBuild`/`CharacterTierRanking`/`WeaponTierRank`, UI/CSS, production, CI workflow. Hai folder migration moi da co san tu concurrent work — **khong bi ghi de hay rename**.

## 14. Con BLOCKED

1. `weapon-tier-independent/approval.test.cjs` 7/8 — subtest 8 that bai do cac artifact/script cua phase Weapon Tier dang duoc agent khac chinh sua lien tuc — can owner cua phase do cap nhat, khong thuoc C1. Trang thai nay khong anh huong migration history hay du lieu dev.
2. DB moi sau `migrate deploy` chi co schema; can chay seed/backfill rieng neu muon co 131 characters.
3. 15 ranking draft van cho Admin duyet; khong ai duoc tu approve. Khong import 292 `SOURCE_DERIVED`.
4. Khong co migration moi nao khac duoc tao trong C1; neu agent khac them migration sau nay can chay lai preflight.

**Ket luan:** Migration history cua development da dong bo (4/4 applied, checksum khop, drift empty). Fresh PostgreSQL co the dung `prisma migrate deploy` de tao day du schema ma khong can `db push`. Du lieu va Mitya dual-build khong doi. Khong co thao tac ranking apply nao duoc thuc hien.
