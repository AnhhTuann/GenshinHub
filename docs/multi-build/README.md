# Multi-build architecture review — Giai đoạn A

**Development rollout applied.** The files below record the Phase A design. The Phase B record and rollback procedure are in [the development runbook](DEVELOPMENT_RUNBOOK.md).

Read in this order:

1. `AUDIT.md` — current schema, Mitya live state, approved drafts, why overwrite is refused.
2. `SCHEMA_DIFF.md` — exact proposed Prisma/GraphQL diff.
3. `MIGRATION_PLAN.md` — additive migration, idempotent backfill, rollback at every phase.
4. `COMPATIBILITY.md` — risk matrix, switcher contract, sequential test plan.
5. `MITYA_DATA.md` — approved build facts and preservation rules.

Implemented without needing approval (read-only / reusable):

- `backend/scripts/build-audit/playstyle.cjs` + `playstyle.test.cjs`
- `backend/scripts/build-audit/multi-build-preflight.cjs`

The development approval covers the additive migration, backfill, build-scoped GraphQL and Admin changes, and the approved Mitya pilot. Legacy-column removal remains a separate phase.
