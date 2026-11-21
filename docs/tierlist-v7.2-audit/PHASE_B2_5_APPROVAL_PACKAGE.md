# Phase B2.5 — Migration Bootstrap Fix & Independent Ranking Review

**Trang thai: DEX THUC HIEN PHAN KIEM TRA / THU NGHIEM TREN DATABASE TAM. DUNG TAI BUOC CAN ADMIN PHE DUYET.**

- Khong thay doi migration history cua development.
- Khong insert ranking; khong goi `approveCharacterTierRanking`; khong tao approval actor.
- Khong cham production, UI/CSS, Multi-Build, Weapon Tier runtime.
- Khong reset/stash/clean, khong commit/push/merge/deploy.

---

## 1. Migration root cause

Da kiem tra toan bo:

| Nguon | Noi dung |
|---|---|
| `backend/prisma/migrations/20261120151000_add_character_tier_rankings/migration.sql` | Tao 5 enum `TierList*`, bang `CharacterTierRanking`, 5 index + unique key. Co `FOREIGN KEY (characterId) REFERENCES "Character"("id")`. |
| `backend/prisma/migrations/20261120153500_add_weapon_tier_rankings/migration.sql` | Tao 6 enum `Weapon*`, bang `WeaponTierRank`, `WeaponTierAudit`, index va FK. Co `FOREIGN KEY (weaponId) REFERENCES "Weapon"("id")`. |
| `backend/prisma/development-migrations/20261120_character_builds.sql` | `ALTER TABLE "CharacterWeapon" / "CharacterArtifact" / "CharacterTeam" ADD COLUMN "buildId"`, tao `CharacterBuild`, `CharacterBuildAudit`, 3 enum va 8 FK. Phu thuoc `Character`, `CharacterWeapon`, `CharacterArtifact`, `CharacterTeam`. |
| `_prisma_migrations` tren dev | Chi co 2 row: `20261120151000_add_character_tier_rankings` (checksum `01e70c...`, `applied_steps_count = 0`) va `20261120153500_add_weapon_tier_rankings` (checksum `b37adc...`, `applied_steps_count = 1`). Ca hai `finished_at != null`, `rolled_back_at = null`. |

**Nguyen nhan chinh xac:** ca ba migration tren deu la additive, di tru vao legacy schema (`Character`, `Weapon`, `CharacterWeapon`, `CharacterArtifact`, `CharacterTeam`). Legacy schema ton tai san trong dev DB tu truoc khi co Prisma migration history (baseline P3005 da duoc ghi nhan o Phase B1), nen cac migration additive duoc `migrate resolve --applied` ma khong bao gio tao bang goc. Tren database trong, migration dau tien chay se dung ngay tai `ALTER TABLE "CharacterTierRanking" ... REFERENCES "Character"("id")` vi bang `Character` chua ton tai → `P3018` / `42P01 relation "Character" does not exist`.

Phat hien them: migration Multi-Build (`20261120_character_builds.sql`) dang nam ngoai `backend/prisma/migrations/`, nen ngay ca khi co baseline thi fresh bootstrap van thieu cac cot `buildId` va bang `CharacterBuild` neu khong dua migration nay vao history.

**Ket luan:** thieu mot baseline migration tao legacy schema, va thieu viec dua migration Multi-Build vao history theo dung thu tu.

## 2. Baseline strategy

Baseline duoc tao tu **schema goc tai HEAD truoc cac additive migration**:

```bash
git show HEAD:backend/prisma/schema.prisma > /tmp/opencode/b25-baseline.prisma
npx prisma migrate diff --from-empty --to-schema-datamodel /tmp/opencode/b25-baseline.prisma --script
```

Da kiem tra: HEAD schema co `0` token `TierList|CharacterTierRanking|WeaponTier|CharacterBuild`; baseline SQL sinh ra co `0` token tuong tu (322 dong, 14 bang legacy, index/FK/goc). **Khong dung schema hien tai lam baseline**, nen khong co nguy co tao trung `CharacterTierRanking`, `WeaponTierRank` hay `CharacterBuild`.

Thu tu history de xuat:

1. `20261101000000_baseline_legacy` — tao legacy schema (migration moi, chi co trong ban de xuat).
2. `20261120151000_add_character_tier_rankings` — gi nguyen, khong sua noi dung.
3. `20261120152000_add_character_builds` — ban copy cua `development-migrations/20261120_character_builds.sql`, khong sua noi dung.
4. `20261120153500_add_weapon_tier_rankings` — gi nguyen, khong sua noi dung.

Tuong thich: baseline tao `Character(id)` va `Weapon(id)` nen thoa man FK cua ca Character Tier lan Weapon Tier; baseline tao `CharacterWeapon/CharacterArtifact/CharacterTeam` nen thoa man cac `ALTER TABLE` va FK cua Multi-Build. Khong co DROP/ALTER nao tac dong vao cac doi tuong additive.

## 3. Fresh database migration test

Thuc hien tren DB PostgreSQL tam, hoan toan rieng: `genshinhub_b25_bootstrap_1795163945` (cung server `127.0.0.1:5434`, database khac). Khong dung `db push --force-reset`.

Lenh chay (schema tam tai `/tmp/opencode/b25-test/schema.prisma`, copy cua working-tree schema):

```bash
DATABASE_URL=postgresql://postgres:$DEV_DB_PASSWORD@127.0.0.1:5434/<TMPDB> \
  npx prisma migrate deploy --schema /tmp/opencode/b25-test/schema.prisma
```

Ket qua:

```
4 migrations found
Applying migration `20261101000000_baseline_legacy`
Applying migration `20261120151000_add_character_tier_rankings`
Applying migration `20261120152000_add_character_builds`
Applying migration `20261120153500_add_weapon_tier_rankings`
All migrations have been successfully applied.
```

Xac minh:

| Kiem tra | Ket qua |
|---|---|
| Legacy tables (`Character`, `Weapon`, `CharacterWeapon`, `CharacterArtifact`, `CharacterTeam`, ...) | Co, 19 bang public (khong tinh `_prisma_migrations`) |
| `CharacterTierRanking` | Co; 5 enum `TierList*`, 6 index + unique key, FK toi `Character(id)` |
| `WeaponTierRank`, `WeaponTierAudit` | Co; enum `Weapon*`, tat ca index va FK toi `Weapon(id)` / `WeaponTierRank(id)` |
| Multi-Build `CharacterBuild`, `CharacterBuildAudit`, cot `buildId`, `reviewStatus` | Co |
| So sanh cau truc voi dev DB | `tables`, `columns`, `fks`, `indexes`, `enums` deu `MATCH` (19 bang / 15 FK / 68 index / 62 enum label) |
| Prisma Client | `character.count()`, `characterTierRanking.count()`, `weaponTierRank.count()`, `characterBuild.count()`, `user.count()` deu chay duoc, tra ve 0 |
| `prisma migrate status` tren DB tam | `Database schema is up to date!`, 4 migration, khong pending |
| `prisma migrate diff` tu DB tam toi schema | `-- This is an empty migration.` |
| `_prisma_migrations` tren DB tam | 4 row, tat ca `finished = true`, `rolled_back_at = null` |
| Pending migration ngoai y muon | Khong co |
| Don dep | DB tam da DUOC DROP; khong con database nao ten `genshinhub_b25%` |

Dev DB sau khi thu nghiem van giu nguyen: 2 migration, `CharacterTierRanking = 0`, `approved = 0`, `Character = 131`.

## 4. Migration files can thay doi / them

**Da tao (trong thu muc de xuat, CHUA active):**

- `docs/tierlist-v7.2-audit/migration-bootstrap-proposal/20261101000000_baseline_legacy/migration.sql` — 322 dong, legacy-only.
- `docs/tierlist-v7.2-audit/migration-bootstrap-proposal/20261120152000_add_character_builds/migration.sql` — 105 dong, copy nguyen van ban concurrent.
- `docs/tierlist-v7.2-audit/migration-bootstrap-proposal/migration_lock.toml` — giong file hien co.

**Khong thay doi:**

- `backend/prisma/migrations/20261120151000_add_character_tier_rankings/migration.sql` & `rollback.sql`.
- `backend/prisma/migrations/20261120153500_add_weapon_tier_rankings/migration.sql` & `rollback.sql`.
- `backend/prisma/development-migrations/20261120_character_builds.sql`.
- `backend/prisma/schema.prisma`, CI workflow, code runtime.

## 5. Nhung buoc can Admin phê duyệt riêng

**DUNG TAI DAY.** Ap dung baseline vao dev lam thay doi `_prisma_migrations` (them 2 row) va dua migration Multi-Build vao active history — can Admin phe duyet truoc khi thuc hien. Lenh de xuat (chi chay sau khi duoc phe duyet):

```bash
cp -r docs/tierlist-v7.2-audit/migration-bootstrap-proposal/20261101000000_baseline_legacy backend/prisma/migrations/
cp -r docs/tierlist-v7.2-audit/migration-bootstrap-proposal/20261120152000_add_character_builds backend/prisma/migrations/
cd backend
npx prisma migrate resolve --applied 20261101000000_baseline_legacy
npx prisma migrate resolve --applied 20261120152000_add_character_builds
npx prisma migrate status
```

Tac dong du kien:

- Chi them 2 row vao `_prisma_migrations` (danh dau da apply), **khong chay DDL tren dev** vi cac doi tuong da ton tai.
- Khong thay doi du lieu, khong drop/tao bang tren dev.
- Sau khi copy, fresh DB se bootstrap duoc 4 migration nhu da thu nghiem o muc 3.
- **Khong chay `prisma migrate deploy` tren dev** sau khi copy — se loi trung bang/cot vi dev da co san legacy schema.

Admin can xac nhan them: co chap nhan ten/thu tu `20261101000000_baseline_legacy` va `20261120152000_add_character_builds` khong, va co cho phep dua migration Multi-Build vao active history khong (day la tai san cua dong concurrent).

## 6. 15 ranking review results

Phan loai: `READY_FOR_ADMIN_REVIEW` (9), `NEEDS_MORE_EVIDENCE` (2), `RUBRIC_RECALIBRATION` (3), `GAMEPLAY_ASSUMPTION_UNVERIFIED` (1).

| Character | Role | Const. | Proposed Tier | Score | Evidence Quality | Risks | Recommendation |
|---|---|---|---|---:|---|---|---|
| Bennett (`bennett`) | SUPPORT | C0 | S | 84.3 | HIGH / 4 gdb + 12/4/8 | Evidence quality 20% tinh vao performance; bo evidence → 86.4 = SS; buff tran boi Base ATK va field-bound | RUBRIC_RECALIBRATION |
| Bennett (`bennett`) | SUPPORT | C6 | SS | 86.1 | HIGH / 3 gdb + 12/4/8 | SS hon nguong 0.1; +15% Pyro DMG va infusion chi cho sword/claymore/polearm; overlap constellation/access | RUBRIC_RECALIBRATION |
| Fischl (`fischl`) | SUB_DPS | C0 | A | 74.3 | MEDIUM / 4 gdb + 2/1/0 | Bo evidence → 76.4 = S; 0 team row; gia dinh Oz duoc duyet tri | RUBRIC_RECALIBRATION |
| Xingqiu (`xingqiu`) | SUB_DPS | C0 | S | 83.7 | MEDIUM / 4 gdb + 2/1/0 | Co 3 trich dan mechanics nhung 0 team row; gia dinh DPS dung Normal Attack chua corroborate | NEEDS_MORE_EVIDENCE |
| Xiangling (`xiangling`) | SUB_DPS | C0 | S | 83.8 | HIGH / 4 gdb + 19/5/8 | ER 80 va battery la gia dinh rotation; khong co risk evidence/rubric | READY_FOR_ADMIN_REVIEW |
| Xiangling (`xiangling`) | SUB_DPS | C6 | S | 81.5 | HIGH / 3 gdb + 19/5/8 | Buff 15% Pyro DMG chi cho Pyro damage; C1 khong duoc cong (da ghi ro) | READY_FOR_ADMIN_REVIEW |
| Kaedehara Kazuha (`kaedehara-kazuha`) | SUPPORT | C0 | SS | 89.7 | MEDIUM / 5 gdb + 9/2/0 | VV 40% RES shred la gia dinh artifact (da bo sung trich dan); 0 team row | NEEDS_MORE_EVIDENCE |
| Furina (`furina`) | SUB_DPS | C0 | SS | 87.9 | HIGH / 4 gdb + 14/3/9 | Can healer + dao dong HP de tich Fanfare; energy da sua thanh 60 | READY_FOR_ADMIN_REVIEW |
| Furina (`furina`) | SUPPORT | C0 | SS | 88.8 | HIGH / 4 gdb + 14/3/9 | Trung lap mot phan voi record SUB_DPS; can Admin xac nhan 2 role rieng | READY_FOR_ADMIN_REVIEW |
| Neuvillette (`neuvillette`) | MAIN_DPS | C0 | SS | 86.3 | HIGH / 5 gdb + 11/6/5 | Da sua: can 3 loai reaction khac nhau do party trigger; interruption resistance van la gia dinh thao tac | READY_FOR_ADMIN_REVIEW |
| Raiden Shogun (`raiden-shogun`) | MAIN_DPS | C0 | S | 81.5 | HIGH / 4 gdb + 14/4/7 | Gia dinh nhieu unit hay dung Burst de tich Resolve; C2/C6 khong duoc cong | READY_FOR_ADMIN_REVIEW |
| Nahida (`nahida`) | SUPPORT | C0 | SS | 91 | HIGH / 4 gdb + 18/6/9 | Energy da sua 80 → 50; van phu thuoc reaction partner va mark | READY_FOR_ADMIN_REVIEW |
| Zhongli (`zhongli`) | SUPPORT | C0 | S | 84.1 | HIGH / 4 gdb + 13/6/7 | Energy da sua 80 → 40; it damage buff truc tiep la diem yeu da ghi | READY_FOR_ADMIN_REVIEW |
| Yelan (`yelan`) | SUB_DPS | C0 | S | 83.9 | HIGH / 4 gdb + 4/3/8 | Energy da sua 80 → 70; buff ramp mat neu recast Burst | READY_FOR_ADMIN_REVIEW |
| Mitya (`mitya`) | SUPPORT | C0 | A | 74 | MEDIUM / 6 gdb + 6/3/3 | Da bo sung Steady State / Overloaded / cap 14%; chi huu ich comp Electro+Cryo; 3 team row | GAMEPLAY_ASSUMPTION_UNVERIFIED |

**Phat hien va da sua trong draft (khong doi tier/score):**

- Energy costs sai, da sua theo `genshin-db/talents.attributes.parameters`: Nahida 80 → **50**, Zhongli 80 → **40**, Yelan 80 → **70**; bo sung so chinh xac cho Furina **60**, Fischl **60**, Xingqiu **80**, Xiangling **80**, Mitya **60**.
- Kazuha: truoc day bud VV shred vao `teamAssumptions` nhung khong co trich dan; da them `genshin-db/artifacts Viridescent Venerer 4-piece` va ghi ro day la gia dinh artifact, khong phai talent.
- Neuvillette: truoc day chi ghi "mot dong doi trigger reaction khac loai"; da sua thanh **3 loai reaction khac nhau do party member trigger**, moi loai stack rieng, toi da 3 (theo passive1).
- Mitya: da bo sung dieu kien **Steady State** (30 EM / Beacon), **Overloaded** (1 Beacon / 1.5s trong 6s sau Stellar-Conduct) va **cap 14%** cho base Stellar-Conduct DMG.

Khong co record nao duoc tu approve; moi record van `PENDING_REVIEW`, `INDEPENDENT`.

## 7. Rubric limitations

1. **Evidence quality bi tron vao performance.** Trong `v1.0`, 20% evidence lam tang/giam tier. Neu evidence chi la quality gate va bi loai khoi cong thuc (chuan hoa 80% con lai), **Bennett C0 S → SS (86.4)** va **Fischl A → S (76.4)**. Day la ly do 3 record xep `RUBRIC_RECALIBRATION`.
2. **Bennett C6 SS rat mong:** 86.1, chi hon nguong 0.1. Thay doi nho cua mot thanh phan cung doi tier.
3. **Constellation va access trung lap o record C6:** `constellation` (muc do phu thuoc constellation) va `access` (chi phi dat duoc) cung phat C6, co nguy co phat doi.
4. **Diem thanh phan la danh gia bien tap, khong phai so do huu hieu:** khong co chuan hoa cheo giua cac nhan vat, khong co trong so rieng cho MAIN_DPS / SUB_DPS / SUPPORT.
5. **Nguong co dinh, khong hieu chinh theo role/version:** batch nay toan A/S/SS, khong co B/C/D — co the la ceiling bias do chi chon candidate manh.
6. **So row local (`CharacterWeapon/Artifact/Team`) la proxy muc do su dung, khong phai chat luong build hay tier.** Record co 0 team row (Fischl, Xingqiu, Kazuha) chi duoc corroborate bang co che.
7. **Gia dinh rotation van la gia dinh:** ER, battery, healer, positioning, VV, reaction partner khong the chung minh bang talent text; can Admin doc va chap nhan.
8. **Furina co 2 record cung kit o 2 role** — can xac nhan cho phep ton tai song song.

Kiem tra do nhay them (doi trong so, giu cac score thanh phan):

| Cong thuc | Ket qua |
|---|---|
| v1.0 (30/25/20/15/10) | 15/15 khop tier hien co |
| evidence = 0, chuan hoa 80% | 2 flip: Bennett C0 → SS, Fischl → S |
| kit 40 / flex 25 / evidence 10 / const 15 / access 10 | 0 flip |
| kit 35 / flex 25 / evidence 10 / const 20 / access 10 | 0 flip |

**Khong tu dong coi ket qua cong thuc la tier chinh thuc**; bat ky thay doi tier deu can Admin quyet dinh.

## 8. Final batch diff

So sanh file draft B2 ban dau (tai sinh tu generator) voi file sau audit:

| Thay doi | So luong |
|---|---:|
| Tier hoac score doi | **0** |
| `evidence.energyRequirements` duoc sua/bo sung so chinh xac | 10 |
| `evidence.primaryEvidence` duoc bo sung trich dan | 15 (moi record +1 energy cost; +3 them cho Kazuha/Neuvillette/Mitya) |
| `teamAssumptions` duoc bo sung dieu kien | 3 |
| Them `b25Review` (category / risks / recommendation / sensitivity) | 15 |
| Them `method.b25Audit` | 1 |

Canonical file: `docs/tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json`. Van `batchId = phase-b2-independent-001`, 15 records, `PENDING_REVIEW`, `INDEPENDENT`, version 7.2.

## 9. Tests passed

Chay tu `backend/` voi `TS_NODE_COMPILER_OPTIONS='{"rootDir":"./src"}'`:

| Command | Ket qua |
|---|---|
| `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/phaseB25Review.test.ts` | 6/6 pass |
| `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/phaseB2Draft.test.ts` | 9/9 pass |
| `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/characterTierRanking.test.ts` | 13/13 pass |
| `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/characterTierRanking.graphql.test.ts` | 3/3 pass |
| `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/migration.test.ts` | 2/2 pass |
| `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/characterTierRanking.integration.test.ts` | 1/1 pass |
| `npx ts-node --transpile-only src/graphql/dataloaders/index.test.ts` | 1/1 pass |
| `npx prisma validate` | pass |
| `npx prisma migrate status` (dev) | up to date, 2 migration |
| `npx tsc --noEmit` | pass |

Test B2.5 kiem tra: audit record day du, sensitivity dung so hoc, energy cost khop genshin-db, cac gia dinh da sua hien ro, khong co ky tu CJK stray, va DB count van bang 0.

Khong chay ESLint (backend chua co config — tooling gap da ghi tu B1). Khong chay browser test (khong doi UI/CSS). Khong dung `db push --force-reset` lam bang chung.

## 10. Next steps for Phase B3

1. **Admin phe duyet rieng** viec them 2 migration vao history dev (muc 5). Chi sau do moi copy + `migrate resolve --applied` + `migrate status`.
2. **Admin doc va quyet dinh 3 record `RUBRIC_RECALIBRATION`** (Bennett C0, Bennett C6, Fischl) va xac nhan dinh nghia evidence trong rubric v1.1. Co the yeu cau sua score/tier ro batch khac; khong tu sua o day.
3. **Admin bo sung/xac nhan evidence** cho Xingqiu va Kazuha (NEEDS_MORE_EVIDENCE), xac nhan gia dinh cua Mitya (GAMEPLAY_ASSUMPTION_UNVERIFIED), va xac nhan Furina 2 role.
4. Sau khi co approval bang van ban, moi insert cac record duoc duyet qua `upsertCharacterTierRanking` (van `PENDING_REVIEW`) bang context Admin that, roi approve rieng le. Khong insert batch 292 `SOURCE_DERIVED`.
5. Chay lai toan bo test tren DB that + `prisma migrate status` sau khi co thay doi history.
6. Phases khac (UI publish, multi-build, weapon tier) van di theo approval cua rieng phia editorial/Admin.

**Trang thai hien tai: 0 ranking row duoc insert, 0 duoc approve, 0 approval actor, 0 thay doi migration history dev, 0 ghi production.** Pha nay chi chuan bi va thu nghiem tren DB tam.
