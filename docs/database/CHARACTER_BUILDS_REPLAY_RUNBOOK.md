# Character-build maintenance replay runbook

This runbook replays an operator-controlled set of v7.2 MAINTENANCE character-build corrections into DEVELOPMENT or an explicitly approved staging database. It is a data replay, not a Prisma schema migration. The replay manifest is deliberately not stored in this repository because it contains catalog-ID selections derived from a third-party guide.

## Safety invariants

1. `--env=development|staging` is mandatory. Production replay is blocked unconditionally.
2. Default mode is dry-run. `--apply` is required for writes.
3. `--apply` requires a fresh `--backup=/path/to/file.dump`; an existing file is refused.
4. A changed target build is a conflict: the tool refuses to overwrite and prints the build IDs.
5. The tool never writes approval fields, approval checksums, or Admin audit actors.
6. Exactly one default build per character is verified after apply.
7. Credentials are read from the environment; target output contains host, port, database, and user only. Passwords are never printed.
8. Canonical local IDs are validated against the live catalog before any write.

## Prerequisites

- Run from `backend/`.
- Set `DATABASE_URL` (or `DEVELOPMENT_DATABASE_URL`) to the DEVELOPMENT URL in ignored `backend/.env`.
- DEVELOPMENT target must be `127.0.0.1:5434/genshinhub`.
- Staging requires `STAGING_DATABASE_URL`, a database name beginning with `genshinhub_staging_`, `genshinhub_replay_`, or `genshinhub_test_`, and `--allow-staging`.
- Docker container `genshinhub-postgres` must be available for `pg_dump`/`pg_restore`. Override with `REFERENCE_REPLAY_CONTAINER` only when reviewing a different local container.
- The operator must supply a manifest outside the repository, e.g. `/secure/reference-corrections-manifest.json`.

## Manifest contract

The manifest must have:

```json
{
  "schemaVersion": 1,
  "retrievedAt": "2026-11-21",
  "recordCount": 1,
  "records": [
    {
      "characterId": "canonical-local-id",
      "buildId": "canonical.build.id",
      "name": "short build label",
      "reviewStatus": "MAINTENANCE",
      "sourceUrl": "https://genshin-builds.com/en/character/...",
      "version": 2,
      "playstyles": ["SUPPORT"],
      "constellationAssumptions": ["C0"],
      "sands": ["Energy Recharge"],
      "goblet": ["HP%"],
      "circlet": ["CRIT Rate"],
      "subStatsPriority": ["Energy Recharge"],
      "talentPriority": ["Burst"],
      "weapons": [{ "weaponId": "canonical-id", "refinement": 1, "order": 0 }],
      "artifacts": [{ "setId": "canonical-id", "pieces": 4, "order": 0 }],
      "teams": [{
        "id": "canonical.team.id",
        "name": "short team label",
        "rank": "S",
        "reviewStatus": "EXPERIMENTAL",
        "order": 0,
        "members": [{ "characterId": "canonical-id", "role": "short role", "order": 0 }]
      }]
    }
  ]
}
```

Rules:

- Resolve all weapon, artifact-set, character, and teammate names to canonical local catalog IDs before writing. Do not ship source-name aliases in the manifest.
- Accepted team `reviewStatus` values are `EXPERIMENTAL`, `VERIFIED`, and `null`. `null` is only for preserving historical legacy rows; never upgrade it to verified during replay.
- Forbidden keys anywhere in the manifest include `description`, `rotation`, `coreIdea`, `buildNotes`, `weaponNotes`, `artifactNotes`, `faq`, `editorial`, `sourceText`, `prose`, `approvalChecksum`, `approve`, and `approvedBy`. This prevents bulk source prose and fabricated approvals from entering the repository or database.
- No top-level `sourceUrl`; provenance is per record.
- One target build per character. Duplicate build or character IDs are rejected.
- Generated notes and team descriptions are short provenance statements only. They record the source URL, retrieval date, canonical-ID resolution, experiment caveat, and manifest SHA-256.

## Procedure

### 1. Unit-test the tool

```bash
cd /home/tuan/Documents/GenshinHub/backend
node --test scripts/character-builds/replay-corrections.test.cjs
```

### 2. Dry-run (default, no writes)

```bash
node scripts/character-builds/replay-corrections.cjs \
  --env=development \
  --manifest=/secure/reference-corrections-manifest.json \
  --report=/tmp/replay-dry-run.json
```

Expected first run may report `CREATE` and `SET_DEFAULT`. A replay of already applied corrections must report `SKIP` for every record. Any `CONFLICT` stops the run before writes.

### 3. Apply with backup

```bash
STAMP=$(date -u +%Y%m%d%H%M%S)
node scripts/character-builds/replay-corrections.cjs \
  --env=development \
  --manifest=/secure/reference-corrections-manifest.json \
  --apply \
  --backup=/tmp/genshinhub-replay-$STAMP.dump \
  --report=/tmp/replay-apply-$STAMP.json
```

Record the reported backup SHA-256. Verify with a second dry-run that all records are now `SKIP`.

### 4. Rollback if needed

```bash
node scripts/character-builds/replay-corrections.cjs \
  --env=development \
  --rollback=/tmp/genshinhub-replay-$STAMP.dump \
  --apply \
  --i-understand-destructive-restore
```

Rollback is intentionally destructive and requires both `--apply` and `--i-understand-destructive-restore`. Keep the dump outside the repository.

### 5. Staging, only after reviewing the target URL

```bash
node scripts/character-builds/replay-corrections.cjs \
  --env=staging \
  --allow-staging \
  --manifest=/secure/reference-corrections-manifest.json \
  --report=/tmp/replay-staging-dry-run.json
```

`--env=production` is rejected even with `--allow-staging`.

## DEVELOPMENT evidence

- Manifest SHA-256: `309dce1629675cd4d04d8782977a3521f72c98fe9babf31a6c2d5bc57adec783`
- Records: 128
- Two dry-runs: `CREATE=0`, `SET_DEFAULT=0`, `SKIP=128`
- Apply: no-op, `postApplyVerified: true`, `approvalsWritten: 0`
- Backup SHA-256: `ddfc478cf608f48793a47981eea3f0831ea32238a76992942a13c464aea5eddf`
- Rollback restored the same state; subsequent dry-run remained 128 skips.
- Tampered manifest conflict, production guard, staging guard, and invalid development host were all refused.

## Production dependency

No production migration or data replay was executed. This tool intentionally cannot target production. If the corrections are approved for release, the exact dependency is a separately reviewed production release process that supplies:

1. an operator-approved manifest outside the repository,
2. a fresh production backup and tested rollback path,
3. explicit release approval, and
4. the separately reviewed release command, because this repository's replay tool refuses `--env=production` by design.

Do not work around the production guard.
