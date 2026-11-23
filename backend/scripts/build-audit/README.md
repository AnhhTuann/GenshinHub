# Character build review and apply

The existing source audit remains read-only. The write path accepts a separate, explicitly reviewed local file and never uses a live API response as input. The reviewer is the local operator responsible for recording evidence of reuse rights or original authorship. This is a CLI workflow for an operator with development database access. The checksum detects changes to a reviewed file. Treat the approved file and journal as trusted local inputs.

A draft contains `status: "PENDING_REVIEW"`, the local `characterId`, exactly one named `playstyle`, and `source: { "kind": "INDEPENDENT" | "LICENSED", "reference": "…" }`. The other keys are:

- `weapons` with objects containing the catalog `id`, explicit `isF2P` and optional `refinement`. Array order is the reviewed recommendation order.
- `artifacts` with arrays of one catalog ID for a 4-piece set or two distinct IDs for a 2+2 combination.
- `sands`, `goblet`, `circlet`, `subStatsPriority` and `talentPriority` with ordered arrays of strings.
- `teams` with objects containing a `name`, an optional reviewer-approved `description` and four `members`. Each member has a catalog `characterId` and an optional verified `role`. The build character must occupy one slot. Tier is left empty.
- Use an empty array for an explicitly omitted field. See `apply.test.cjs` for an isolated fixture demonstrating the format.

From `backend/`, use the development URL in `.env` or explicitly set `DATABASE_URL` to a dedicated local test database. In the commands below, `genshinhub` refers to the workspace Docker database bound to loopback port 5434. Other write targets must be local databases named for dev or test.

```sh
node scripts/build-audit/cli.cjs --dry-run draft.json --database genshinhub
node scripts/build-audit/cli.cjs --approve draft.json --reviewer "<reviewer>" \
  --rights-ref "<permission record or authorship declaration>" --output approved.json
node scripts/build-audit/cli.cjs --dry-run approved.json --database genshinhub
node scripts/build-audit/cli.cjs --apply approved.json --database genshinhub
node scripts/build-audit/cli.cjs --rollback <apply-snapshot.json> --database genshinhub
```

Apply and rollback take locks within a PostgreSQL transaction. Apply refuses a conflicting populated field so that a reviewed playstyle cannot be mixed with an existing Admin build. Applying the same approved file again produces no changes. Snapshots and audit results are stored under `backend/backups/build-audit/`. Rollback checks the original target and the complete current contents of every affected field before restoring it. If an Admin changed an affected field after apply, rollback stops for review. If a process ends without an audit result, check the database before interpreting the snapshot as a committed apply.

Keep a single approved playstyle per character with the current schema. Multiple independent playstyles would need a separate build-profile model and review state. That change requires separate approval.
