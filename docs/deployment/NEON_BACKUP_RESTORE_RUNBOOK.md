# Neon pg_dump backup and restore runbook (staging)

## What runs automatically

The backup step now lives in `.github/workflows/genshin-data-sync-apply.yml`,
which also performs the reviewed production sync and revalidation. A separate
standalone `neon-pgdump.yml` exists on this branch; it can be used for manual
backup-only runs before it is merged to the default branch.

- Apply triggers: manual `workflow_dispatch` only, through the GitHub
  `production` environment with required reviewers configured.
- Required repository secrets (validated before any work):
  `NEON_DATABASE_URL`, `DATABASE_URL`, `AWS_ACCESS_KEY_ID`,
  `AWS_SECRET_ACCESS_KEY`, `AWS_ENDPOINT_URL_S3`, `AWS_REGION`,
  `ASSET_BUCKET`, `BACKUP_BUCKET`, `FRONTEND_REVALIDATE_URL`,
  `REVALIDATE_SECRET`.
- The `NEON_DATABASE_URL` hostname is checked against the **exact** approved
  staging endpoint `ep-rapid-cell-ao0wi386.c-2.ap-southeast-1.aws.neon.tech`
  before `pg_dump`. Any other host, protocol or missing value aborts the job;
  there is no fallback to a different database URL, and the connection string
  is never printed.
- Creates a full logical dump of the staging branch with
  `pg_dump --format=custom --no-owner --no-acl`.
- Verifies the archive with `pg_restore --list` (must be non-empty) and records
  `sha256sum`.
- Uploads three objects to the **private** `genshinhub-staging-backups` bucket:

  | Object | Purpose |
  | --- | --- |
  | `pgdump/genshinhub-neon-<UTC stamp>.dump` | Custom-format dump |
  | `pgdump/genshinhub-neon-<UTC stamp>.dump.sha256` | SHA-256 sidecar |
  | `pgdump/genshinhub-neon-<UTC stamp>.dump.manifest.json` | filename, size, timestamp, checksum |

- Verifies each object with `HeadObject`: both `ContentLength` and the
  round-tripped `content-sha256` metadata must match, otherwise the job fails.
- Logs only filename, byte size, UTC timestamp, checksum and TOC entry count.
  Secrets and connection strings are never printed.

Scheduled workflows run from the default branch. Neither the backup workflow
nor the apply workflow is scheduled; the apply workflow is manual-only and
environment-gated. No backup is restored automatically.

## Manual backup

1. After merge, run **Genshin Data Sync — Apply (production)** with the
   `production` reviewer approval, or the standalone **Neon pg_dump backup**
   workflow if it has been merged to the default branch.
2. Confirm the job log contains `filename=`, `size_bytes=`, `timestamp=`,
   `sha256=` and a non-zero `pg_restore_entries`.
3. Record the object key from the log. No local dump is kept on the runner.

A real pre-merge backup was also produced locally on 2026-11-26 from the
approved staging endpoint and uploaded with the same guard:

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
do not combine it with a deploy, and obtain approval before proceeding.

1. Create a recovery branch of Neon project `jolly-cell-95415947` from the
   staging branch. Never restore directly into `br-hidden-frost-aouh1xm1`.
2. Fetch the dump and sidecars from `genshinhub-staging-backups` using an S3
   client with the same path-style endpoint and credentials:

   ```bash
   # Values come from the GitHub Actions / Neon secret store, never from source.
   aws --endpoint-url="$AWS_ENDPOINT_URL_S3" --region "$AWS_REGION" \
     s3 cp "s3://$BACKUP_BUCKET/pgdump/<object-key>" ./restore.dump
   aws --endpoint-url="$AWS_ENDPOINT_URL_S3" --region "$AWS_REGION" \
     s3 cp "s3://$BACKUP_BUCKET/pgdump/<object-key>.sha256" ./restore.dump.sha256
   sha256sum -c restore.dump.sha256
   ```

3. Inspect the archive before touching any database:

   ```bash
   pg_restore --list ./restore.dump | head -40
   ```

4. Restore into the **recovery branch** connection string:

   ```bash
   pg_restore --dbname="<recovery-branch connection string>" \
     --format=custom --no-owner --no-acl --exit-on-error ./restore.dump
   ```

5. Verify read-only counts on the recovery branch (expected staging values:
   131 characters, 279 weapons, 63 artifact sets, 862 materials, 347 builds,
   620 teams, 2,478 team members) before considering any promotion.
6. Discard the recovery branch only after the review is complete. The original
   dump remains in the private backup bucket.

## Guarantees and non-goals

- `--no-owner` / `--no-acl` avoid carrying Render/Neon role objects into a
  different branch.
- No automatic restore, no application endpoint that lists or downloads
  backups, and no public URL for backup objects.
- The asset read proxy only accepts `uploads/YYYY/MM/<uuid>.webp` and the
  controlled `catalog/<image>` prefix; a backup key can never be requested
  through `/assets/*`.
- Backup retention is not automated: do not add lifecycle deletion without an
  explicit owner decision.
