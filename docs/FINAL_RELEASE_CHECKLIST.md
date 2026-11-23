# Final Release Checklist — GenshinHub DEVELOPMENT completion

**Run ID:** `opencode-final-genshinhub-completion-2026-11-21`
**Branch:** `feat/balanced-fantasy-motion`
**Base commit:** `dde87f7a34abf3246ac94bd750dd70e333f2f484`
**Scope:** DEVELOPMENT only. Production deploy is **not** authorized in this run.

---

## 1. Queue and data reconciliation

- [x] 17/17 `UNRESOLVED_ARTIFACT_SET` issues applied (11 sentinels, 6 generic rows removed, 3 extra legacy-Traveler placeholders).
- [x] 34/34 `DRAFT_GAMEPLAY_EVIDENCE` markers classified as unpublished evidence-only items; retained verbatim.
- [x] 5/5 `MISSING_BUILD` identities created as `MAINTENANCE` defaults with canonical local references.
- [x] Zero remaining blocked items; zero raw Vietnamese placeholder strings in public artifact output.
- [x] Six legacy-Traveler weapon aliases repaired with audit records; 31 protected legacy aliases resolved through GraphQL without row edits.
- [x] Final counts verified: 131 characters, 226 builds (138 public), 131 defaults, 424 audits, 964 build weapons, 485 build artifacts, 377 teams.
- [x] Original Bennett/Xiangling `APPROVED` v3 builds, checksums and audit history preserved.

## 2. Safety and evidence

- [x] Fresh backup `opencode_pre_final_completion.dump` SHA-256 `4891f54a977c08680ba39e455156debcabb33c946ebd607915e4e9b32f1de28b`.
- [x] Isolated restore test PASS (21 non-migration tables matched; 131 characters / 221 builds / 394 audits).
- [x] All data writes transactional, scoped and idempotent; replay returned `ALREADY_APPLIED`.
- [x] No fabricated approvals, IDs, rotations, measurements or Admin actors.
- [x] Credentials redacted from candidate files before staging; secret scan shows only `***` / `$DEV_DB_PASSWORD` placeholders.
- [x] True generated caches (`__pycache__/`, `*.pyc`) added to `.gitignore`; no untracked user work deleted.

## 3. Validation evidence

- [x] `npx prisma validate` PASS; `npx prisma migrate status` PASS (6 migrations, up to date).
- [x] Backend and frontend production builds PASS.
- [x] GraphQL all-131 validation PASS: 131 characters, 138 public builds, 0 failures.
- [x] DB integrity: 0 invalid FKs, 0 duplicate defaults, 0 duplicate build IDs, 0 orphan weapon refs in default builds.
- [x] Browser DOM validation PASS: 52/52 changed-identity × locale routes, 0 JS errors, 0 raw placeholders.
- [x] All character routes PASS: 131/131 `en`, 131/131 `vi`.
- [x] Unit/integration: 148/152 pass; source Tier tests 26/28 pass; all remaining failures are documented harness/baseline drift (see completion report §5).
- [x] No test was deleted, skipped or weakened to obtain a pass.

## 4. Known limitations carried into release

- [ ] Five new builds are source-attributed API imports; combat timings/rotations remain independently unverified and teams are `EXPERIMENTAL`.
- [ ] `Traveler (Cryo)` unresolved source teams were omitted, not invented.
- [ ] Frozen build-audit tests (`catalog-a01`, `catalog-final-review`) still fail by design on advanced dev data.
- [ ] Two Tier draft tests expect zero ranking rows; development contains one Admin-published ranking row.
- [ ] A clean Docker image build with unrestricted npm registry access remains to be verified by an operator.
- [ ] No production migration, deploy or verification was performed.

## 5. Git and handoff

- [x] Changes organized into reviewed Conventional Commits; staged diffs inspected before each commit.
- [x] No `git reset`, `git stash`, `git clean`, `git push --force`, or blanket `git add -A`.
- [x] Pushed without force to the existing branch `origin/feat/balanced-fantasy-motion`.
- [x] Verified remote SHA: `a994ec5964072b4e1412597dd72fd309a0d7b707`
- [x] Full commit list: `docs/FINAL_GENSHINHUB_PROJECT_COMPLETION.md` §6.

## 6. URLs and artifacts

- Frontend: `http://127.0.0.1:3001/en`, `http://127.0.0.1:3001/vi`
- Backend GraphQL: `http://127.0.0.1:4000/graphql`
- Development DB: `127.0.0.1:5434` (`genshinhub`, Docker `genshinhub-postgres`)
- Evidence: `/tmp/opencode/genshinhub-backup/final-evidence.json`
- Browser validation: `/tmp/opencode/genshinhub-backup/browser-validation-final.json`
- GraphQL validation: `/tmp/opencode/genshinhub-backup/graphql-validation-final3.json`
- Restore digests: `/tmp/opencode/genshinhub-backup/final-restore-digests.tsv`

**Release recommendation:** accept for DEVELOPMENT completion. Do **not** promote to production
until the limitations in §4 are reviewed and an authorized operator applies the `MAINTENANCE`
migration in the target environment.
