# Neon pg_dump backup and restore runbook (staging)

## What runs

- `.github/workflows/neon-pgdump.yml`: manual and weekly backup-only workflow.
  The weekly schedule is Sunday 03:00 UTC and runs only after this workflow is
  present on the repository default branch.
- `.github/workflows/genshin-data-sync.yml`: daily read-only staging dry-run.
  It checks the exact staging endpoint, writes no database rows, and opens a PR
  when validated catalog changes need review.
- `.github/workflows/genshin-data-sync-apply.yml`: manual staging apply only.
  It is not scheduled and never targets the production database.

## Required GitHub Actions secrets

- `NEON_DATABASE_URL`: the approved staging connection string. This is the
  **only** database connection secret used by these workflows.
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_ENDPOINT_URL_S3`,
  `AWS_REGION`, `BACKUP_BUCKET`, and `ASSET_BUCKET`.
- `FRONTEND_REVALIDATE_URL` and `REVALIDATE_SECRET` for the staging frontend.

The workflow validates `NEON_DATABASE_URL` against the exact approved staging
host `ep-rapid-cell-ao0wi386.c-2.ap-southeast-1.aws.neon.tech` before any
database operation. After that guard, the same value is passed to the sync
engine as `DATABASE_URL`. There is no separate `DATABASE_URL` secret and no
fallback to another database. The connection string is never printed.

The apply workflow uses the GitHub Environment `staging`. Configure required
reviewers for that environment before enabling manual apply. Do not use the
`production` environment or production secrets for this workflow.

## Backup integrity

The backup workflow creates a custom-format dump using
`pg_dump --format=custom --no-owner --no-acl`, verifies it with
`pg_restore --list`, calculates SHA-256, and uploads three objects to the
**private** `genshinhub-staging-backups` bucket:

| Object | Purpose |
| --- | --- |
| `pgdump/genshinhub-neon-<UTC stamp>.dump` | Custom-format dump |
| `pgdump/genshinhub-neon-<UTC stamp>.dump.sha256` | SHA-256 sidecar |
| `pgdump/genshinhub-neon-<UTC stamp>.dump.manifest.json` | filename, size, timestamp, checksum |

Each upload is verified with `HeadObject`: both `ContentLength` and the
round-tripped `content-sha256` metadata must match. Logs contain only filename,
byte size, UTC timestamp, checksum and archive TOC entry count.

## Manual backup / staging apply

1. After merge to the default branch, run **Neon pg_dump backup** manually, or
   allow its weekly schedule to run.
2. Confirm the job log contains filename, byte size, timestamp, SHA-256 and a
   non-zero `pg_restore_entries` count.
3. Record the object key. No local dump is retained on the runner.
4. To apply a reviewed catalog sync, dispatch **Genshin Data Sync — Apply
   (staging)** only after the `staging` environment approval. The same
   staging URL is backed up and then used for the sync.

A real pre-merge backup was produced on 2026-11-26 from the approved staging
endpoint and uploaded with the same guard:

```
pgdump/genshinhub-neon-20261126T033908Z.dump
size=926954 bytes
pg_restore_entries=196
sha256=f13d060636979da29ee1cab60a4d5d0c3bd0df8274576199f87226ae9bd022ae
```

The `.dump`, `.sha256` and `.manifest.json` objects were listed and the
downloaded dump checksum was re-verified. Nothing was restored or deleted.

## Restore (explicit, reviewed, destructive)

Restoring overwrites database state. Do **not** run this against production,
do not combine it with a deploy, and obtain separate owner approval.

1. Create a recovery branch of Neon project `jolly-cell-95415947` from the
   staging branch. Never restore directly into `br-hidden-frost-aouh1xm1`.
2. Fetch the dump and sidecars from `genshinhub-staging-backups` using an S3
   client with the same path-style endpoint and credentials; verify SHA-256.
3. Inspect the archive with `pg_restore --list ./restore.dump`.
4. Restore only into a disposable recovery branch using
   `pg_restore --format=custom --no-owner --no-acl --exit-on-error`.
5. Verify read-only counts before considering any further action. Never promote
   a recovery branch automatically.

## Guarantees and non-goals

- No automatic restore, no application endpoint that lists or downloads
  backups, and no public URL for backup objects.
- The asset read proxy only accepts the allowlisted upload and catalog paths;
  a backup key can never be requested through `/assets/*`.
- Backup retention is not automated: do not add lifecycle deletion without an
  explicit owner decision.
