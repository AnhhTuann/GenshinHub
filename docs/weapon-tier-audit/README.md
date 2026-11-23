# Weapon Tier List data pipeline — Giai đoạn A

**Status: Phase B1 additive schema applied on development. Zero rankings imported or approved. UI unchanged.**
(The historical audit/draft content below still describes the 296 `SOURCE_DERIVED` research records, which remain unapproved.)

Read in this order:

1. `AUDIT_SUMMARY.md` — status labels, DB baseline, source facts, counts, conflicts.
2. `RIGHTS_REVIEW.md` — why `RIGHTS VERIFIED: NO`.
3. `source.json` / `source-raw.json` — normalized source grid and raw checksum.
4. `id-mapping.json` — verified weapon IDs and internal-recommendation resolution.
5. `snapshot-weapon-tier.draft.json` — 296 unreviewed records.
6. `validation-report.json`, `diff-report.csv/.md`, `diff-summary.json`.
7. `SCHEMA_PROPOSAL.md` — required additive schema and approval gate.
8. `PHASE_B1_IMPLEMENTATION.md` — approved schema/data-layer implementation report (schema applied, zero rankings applied).

## Reproduce read-only artifacts

From `backend/`, run sequentially:

```bash
node scripts/weapon-tier-audit/parse-source.cjs
node scripts/weapon-tier-audit/map-ids.cjs
node scripts/weapon-tier-audit/snapshot-db.cjs
node scripts/weapon-tier-audit/build-draft.cjs
node scripts/weapon-tier-audit/validate.cjs
node scripts/weapon-tier-audit/diff.cjs
node --test scripts/weapon-tier-audit/tier-map.test.cjs scripts/weapon-tier-audit/pipeline.test.cjs
```

All scripts only read the local source snapshot and the development database via `findMany`. `openReadOnly()` refuses any host/database that is not local `genshinhub`. No script writes to PostgreSQL.

## Invariants enforced

- 5 weapon types from DB, never inferred from artwork.
- Roles `MAIN_DPS / SUB_DPS / SUPPORT` only; no DPS split invented by the source.
- Tiers `SS / S / A / B / C`; `D` exists as a valid value but is never populated by this draft.
- Unlabelled source tier key `5` → 30 excluded cells, not downgraded.
- Refinement `null` + `UNSPECIFIED`; game version `null` + `SOURCE_MISSING`.
- No copied editorial text; all 38 explanations are original, role-specific Vietnamese.
- 4 source-conflict cells are `DISPUTED` and must not be imported.
- No Admin weapon tier exists today, so no Admin value was changed.
