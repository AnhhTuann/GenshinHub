# Phase C2 — Stabilize Tests & Complete Admin Multi-Build E2E

**Trang thai: PASS cho pham vi C2. Khong co ranking nao duoc insert/approve. Khong ghi development hay production.**

Target doc: `docs/database/PHASE_C1_MIGRATION_RECONCILIATION.md`. Khong lam lai Phase C1.

Cap nhat sau C2: blocker ve locator cua original E2E script da duoc sua va xac minh trong `docs/database/PHASE_D_PREPARATION_AND_E2E_FIX.md`.

---

## 1. Root cause subtest 8 (`approval.test.cjs`)

Assertion (dòng 139–143 cua file tai thoi diem dieu tra):

```js
test('rights are never auto-verified and every candidate needs an admin decision', () => {
  assert.ok(pkg.rows.every(r => r.publishRightsVerified === false));
  assert.ok(pkg.rows.every(r => /flag stays false/i.test(r.rightsAssessment)));
  assert.ok(pkg.rows.every(r => r.adminActionRequired.length > 0));
  assert.ok(pkg.rows.every(r => /Verify rights|verify rights/i.test(r.adminActionRequired))); // <-- that bai
});
```

**Nguyen nhan: race condition trong concurrent work, KHONG phai implementation bug va KHONG phai artifact sai noi dung.**

| Thoi diem (local) | Su kien |
|---|---|
| 15:58:09 | Agent khac cap nhat `approval.test.cjs`, them assertion `/Verify rights|verify rights/i` |
| 16:00:35 | Agent khac chay lai builder, ghi de `docs/weapon-tier-independent/approval-package.json` |
| ~15:58 (luc C1 chay test) | Test doc assertion moi nhung package van cu → 1/8 that bai |

Bang chung:

- Tai thoi diem dieu tra, `14/14` row cua `approval-package.json` deu chua `Verify rights` trong `adminActionRequired`; `0` row vi pham.
- Chay 3 lan lien tiep tren cung input on dinh: `8/8, 8/8, 8/8`, exit `0`.
- Khong co DDL, khong co ranking write, khong co thay doi nao cua toi doi voi file nay.

Ket luan: **race condition giua test va artifact regenerator cua agent khac**. Khong can sua code; da cho den khi artifact on dinh roi rerun.

## 2. Test da duoc sua hay chi rerun

**Chi rerun.** Khong sua bat ky file repository nao de ep test pass.

- Khong giam assertion, khong bo sung `skip`, khong doi nguong, khong hardcode ket qua.
- Khong ghi de uncommitted work cua agent khac.
- Trong E2E, toi dung **ban copy rieng** tai `/tmp/opencode/c2/` (xem muc 5) vi file cua agent khac dang duoc chinh sua; khong sua file goc.

## 3. Ket qua approval test moi

| Lan chay | Ket qua |
|---|---|
| 3 lan liep (artifact on dinh, luc dieu tra) | `8/8 pass`, exit 0 |
| Lan cuoi cung (sau khi agent khac bo sung them test) | `9/9 pass`, exit 0 |

File hien tai: `backend/scripts/weapon-tier-independent/approval.test.cjs` (cap nhat 16:10:38 boi agent khac). Tat ca 9 subtest pass, bao gom cac regression ve Prototype Amber, Aqua Simulacra, tier changes va rights.

## 4. Admin authentication test status — **PASS**

- Mat khau Admin duoc **sinh ngau nhien luc chay** (`secrets.token_urlsafe(32)`) trong env cua runner, **khong hardcode**, **khong in ra log**.
- `ADMIN_JWT_SECRET` va `USER_JWT_SECRET` cung duoc sinh ngau nhien rieng cho lan chay.
- Dang nhap qua UI that: `/en/admin/login` → `#admin-password` → nut `Enter Admin Panel` → `/en/admin`, thay dashboard.
- Cookie `admin_token` ton tai va `httpOnly = true` (xac minh qua Playwright context cookies).
- Proxy `/api/admin/graphql` xac thuc JWT bang `ADMIN_JWT_SECRET`, sau do gui `x-admin-key` toi backend — **khong bypass**.
- Khong tao Admin gia trong development chinh; khong doi production credentials.
- Khong in credentials hay network headers ra log.

## 5. Admin Build Manager E2E — **PASS**

Luong chay tren **database test rieng** `genshinhub_c2_e2e_f3ba2d48` (dump tu development roi restore sang DB khac), backend port `4124`, frontend port `3124`. DB test da duoc DROP sau khi chay; khong con DB `genshinhub_c2_%` nao. Khong dung `db push --force-reset`, khong reset development.

Cac buoc da chay (tat ca PASS):

1. Dang nhap Admin that, vao Dashboard → Admin → Characters → tim Mitya → Builds.
2. Mo `Manage character builds`, thay dung **2 option** (Support/Sub DPS va Main DPS).
3. Doc lan luot 2 build: weapons, artifacts (ke ca mix sets), stats/talents, teams — moi section deu khop gia tri approved.
4. Tao build test `Phase C browser test` (`DRAFT`, playstyle SUPPORT).
5. Sua build test qua JSON section, `Save for review` → co pending revision.
6. Xac minh **khong** lam thay doi public data khi moi stage (`public query == before`).
7. `Approve revision` → `Set default` → **reload trang** → default van la build test (`aria-pressed=true`).
8. Concurrency: 2 mutation `updateCharacterBuild` cung `expectedVersion` chay song song → ket qua `['CONFLICT','OK']`.
9. `Reject revision`, doi default ve `legacy-mitya` (Support/Sub DPS), `Archive build`.
10. Mo `Change history`, thay cac su kien `CREATED / STAGED / PUBLISHED / REJECTED / DEFAULT_SET / ARCHIVED` voi version.
11. Sau archive: public query van `== before`.
12. Public regression: 4 to hop `(1440x1000, 390x844) x (dark, light)` — chuyen build, default, thu tu team, asset WebP, hydration, khong overflow; them 2 case single-build (albedo) va empty-build (alyosha).

**Lu y ve test script:** file `frontend/scripts/test-admin-multi-build.py` cua agent khac (cap nhat 16:14:39) van dung `get_by_label('Build', exact=True)` tai dong 161. Locator nay that bai vi `<label>` bao quanh `<select>` chua ca text cua cac `<option>`, nen accessible name khong phai chinh xac `"Build"`. App **khong** loi: DOM co 2 `<option>` hop le. Toi dung ban copy rieng `/tmp/opencode/c2/test-admin-multi-build.c2.py`, chi khac 2 dong:

- `ROOT` tro toi repo (vi file nam trong `/tmp`).
- Thay locator bang `select` chua `option[value="legacy-mitya"]`.

**Khong assertion nao bi bo hay noi loang.** Khong sua file goc.

## 6. Authorization verification — **PASS**

| Truong hop | Ket qua |
|---|---|
| Anonymous `createCharacterBuild` | tu choi `Admin access required` |
| Anonymous `updateCharacterBuild` | tu choi `Admin access required` |
| Anonymous `reviewCharacterBuild` | tu choi `Admin access required` |
| User thuong (register that, Bearer token hop le) `reviewCharacterBuild` | tu choi `Admin access required` |
| `updateCharacterBuild` sai owner (`albedo`) | tu choi `does not belong` |
| `reviewCharacterBuild` build chua co pending | tu choi `No pending revision` |
| Ghi vao build da archive | tu choi `Archived builds are read-only` |

Backend log xac nhan `extensions.code = FORBIDDEN` cho cac truong hop tren.

## 7. Concurrency verification — **PASS**

Hai request `updateCharacterBuild` voi cung `id` va `expectedVersion` duoc gui dong thoi tu browser (`Promise.all`):

```
sorted(outcomes) == ['CONFLICT', 'OK']
```

Optimistic concurrency hoat dung; khong co ghi den version cu.

## 8. Mitya build integrity — **PASS**

Development (read-only):

| Build | ID | Default | Status | Version |
|---|---|---|---|---:|
| C0 Off-Field Support / Sub DPS | `legacy-mitya` | **true** | APPROVED | 1 |
| C0 On-Field Main DPS | `approved-…70bf3cd` | false | APPROVED | 1 |

- So default = **1**.
- Noi dung 2 build approved **khong bi sua**: hash legacy khong doi, public GraphQL snapshot truoc/sau E2E bang nhau.
- Build test chi ton tai trong DB tam va da bi archive truoc khi DROP DB.

## 9. Development DB integrity — **PASS** (read-only)

| Kiem tra | Ket qua |
|---|---:|
| Migration rows | 4, tat ca `finished=true`, `rolled_back_at=null`, checksum khop file |
| `Character` | 131 |
| `Weapon` | 279 |
| `CharacterBuild` | 127 |
| `CharacterBuildAudit` | 127 |
| Mitya builds / default | 2 / 1 |
| `CharacterTierRanking` | 0 |
| `WeaponTierRank` | 0 |
| `WeaponTierAudit` | 0 |
| `User` | 0 |

Hash MD5 toan bo row so voi C1: `Character e74a910f…`, `Weapon db501ef9…`, `CharacterWeapon 602cddce…`, `CharacterArtifact 6bf1b946…`, `CharacterTeam 7b977c85…` — **deu khong doi**. Khong import ranking, khong approve ranking.

## 10. Regression results

Chay **tuan tu**, khong chay browser/build song song:

| Kiem tra | Ket qua |
|---|---|
| `prisma migrate status` | PASS — 4 migration, up to date |
| `prisma validate` | PASS |
| Backend `tsc --noEmit` | PASS |
| Frontend `tsc --noEmit` | PASS |
| Character Multi-Build (build-audit: apply/audit/playstyle) | 13/13 PASS |
| Character Tier (8 file, gom phaseC1Smoke) | 38/38 PASS |
| Weapon Tier (5 file GraphQL/service/integration) | 32/32 PASS |
| Admin GraphQL authorization (GraphQL test + E2E) | PASS |
| Weapon audit pipeline + independent (8 file) | 46/46 PASS |
| Tong: 24 file test | **24 PASS / 0 FAIL** |
| Admin Playwright E2E | PASS (`E2E_EXIT=0`) |
| Mitya public frontend regression | PASS (4 viewport/theme + 2 case) |

**NOT RUN:** ESLint (backend chua co config — tooling gap tu B1), browser test khac ngoai E2E nay, build production, seed/backfill tren DB moi, kiem tra production.

## 11. Files changed

**Repository: khong co file nao duoc toi chinh sua trong C2** (ngoai bao cao nay).

Tai `/tmp/opencode/c2/` (ngoai repo, se khong duoc commit):

- `run-admin-e2e.py` — runner tao DB tam, sinh credential ngau nhien, bat backend/frontend rieng, chay E2E, don dep.
- `test-admin-multi-build.c2.py` — copy rieng cua E2E script, khac 2 dong (xem muc 5).
- `diag-admin.py`, `diag-public.py` — diagnostic doc lap.
- Logs: `run-admin-e2e.py` output, `e2e-stdout.log`.

Concurrent agents van dang cap nhat `backend/scripts/weapon-tier-independent/*` va `frontend/scripts/test-admin-multi-build.py` trong luc C2; toi **khong ghi de** bat ky file nao.

## 12. Remaining blockers

1. **Test locator trong repo — DA FIX:** `frontend/scripts/test-admin-multi-build.py` da doi sang `get_by_role('combobox', name='Build', exact=True)`. Original repository script chay PASS voi real Admin login tren DB co lap (`E2E_EXIT=0`, `CONCURRENT_EDIT=0`). Chi tiet: `docs/database/PHASE_D_PREPARATION_AND_E2E_FIX.md`. Khong anh huong app that.
2. Agent khac van dang sua weapon-tier-independent; can chay lai toan bo suite sau khi ho on dinh de co ket qua cuoi cung.
3. 15 Character Tier draft va 14 Weapon Tier draft van `PENDING_REVIEW`; khong ai duoc tu approve; khong import `SOURCE_DERIVED`.
4. DB moi sau `migrate deploy` chi co schema, chua seed — can chay rieng neu can.
5. Khong co thao tac nao tren production; can phe duyet rieng.

**Ket luan:** Migration history giu nguyen 4/4. Regression `approval.test.cjs` da duoc giai thich day du va pass on dinh (chi rerun, khong sua assertion). Admin Multi-Build E2E chay thanh cong bang xac thuc that tren DB tester biet lap. Development DB va 2 build Mitya khong thay doi. Khong ranking nao duoc apply.
