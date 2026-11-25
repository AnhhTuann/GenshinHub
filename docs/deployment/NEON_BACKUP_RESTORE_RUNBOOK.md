# Neon pg_dump backup and restore runbook (staging)

## What runs automatically

`.github/workflows/neon-pgdump.yml`:

- Triggers: manual `workflow_dispatch` and a weekly schedule
  (`0 3 * * 0`, Sunday 03:00 UTC).
- Required repository secrets (all six are validated before any work):
  `NEON_DATABASE_URL`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
  `AWS_ENDPOINT_URL_S3`, `AWS_REGION`, `BACKUP_BUCKET`.
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

- Verifies each object with `HeadObject` and fails if the remote size differs.
- Logs only filename, byte size, UTC timestamp, checksum and TOC entry count.
  Secrets and connection strings are never printed.

Scheduled workflows run from the default branch. Until the workflow is merged
to the branch that GitHub treats as default, use manual dispatch on a branch
that contains it. No backup is restored automatically.

## Manual backup

1. In GitHub, run the **Neon pg_dump backup** workflow (`workflow_dispatch`).
2. Confirm the job log contains `filename=`, `size_bytes=`, `timestamp=`,
   `sha256=` and a non-zero `pg_restore_entries`.
3. Record the object key from the log. No local dump is kept on the runner.

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
- The asset read proxy only accepts `uploads/YYYY/MM/<uuid>.webp`; a backup key
  can never be requested through `/assets/*`.
- Backup retention is not automated: do not add lifecycle deletion without an
  explicit owner decision.
