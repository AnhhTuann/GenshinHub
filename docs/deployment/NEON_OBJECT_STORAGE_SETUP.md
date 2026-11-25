# Neon Object Storage setup (staging)

This guide covers the **only** storage change in this branch: durable Admin
image uploads and private PostgreSQL dumps on the existing Neon Free project.
No new service, bucket lifecycle rule, CDN, or paid resource is introduced.

## Scope and design

| Concern | Decision |
| --- | --- |
| Project / branch | `jolly-cell-95415947`, staging branch `br-hidden-frost-aouh1xm1` |
| Region | `ap-southeast-1` |
| S3 endpoint | `https://br-hidden-frost-aouh1xm1.storage.c-2.ap-southeast-1.aws.neon.tech` |
| Addressing | Path-style SigV4 (`forcePathStyle: true`); virtual-hosted style is not supported by Neon |
| Asset bucket | `genshinhub-staging-assets` — **private** |
| Backup bucket | `genshinhub-staging-backups` — **private**, separate from assets |
| SDK | `@aws-sdk/client-s3` (backend only) |
| Upload path | `POST /upload` → memory multer (5 MB) → Sharp → WebP → `PutObjectCommand` |
| Object key | `uploads/YYYY/MM/<uuid>.webp` (generated server-side, never from the filename) |
| Public URL | `/assets/uploads/YYYY/MM/<uuid>.webp` |
| Read path | Frontend `/assets/[...path]` → backend `/assets/uploads/*` → `GetObjectCommand`, allowlisted key only |
| Fallback | With no S3 config, local dev still writes to `frontend/public/assets/uploads`; Render/Vercel fail closed with 503 |
| Backup path | GitHub Actions `pg_dump` → `pgdump/<timestamp>.dump` in the backup bucket, verified with `HeadObject` |

No bucket listing, no public bucket, no destructive restore, and no credentials
in source, logs, URLs, or browser-exposed `NEXT_PUBLIC_*` variables.

## One-time Neon setup (owner action, not performed by the agent)

1. Open the Neon console for project `jolly-cell-95415947`, branch
   `br-hidden-frost-aouh1xm1`.
2. Create two **private** buckets: `genshinhub-staging-assets` and
   `genshinhub-staging-backups`. Do not enable public access.
3. Create a branch-scoped storage credential with `storage:read` and
   `storage:write` scopes. Neon maps it to an S3 Access Key ID / Secret Access
   Key pair. Use the same key pair for uploads and backups, or create a second
   key restricted to the backup bucket if preferred.
4. Copy the values into the secret stores below. Never paste them into a file,
   PR, issue, log, or chat message.

## Secret stores

### Render service `genshinhub-api` (`srv-dc2p4m3ncjis73dkf44g`)

Set these environment variables and redeploy:

```
AWS_ACCESS_KEY_ID=<access key id>
AWS_SECRET_ACCESS_KEY=<secret access key>
AWS_ENDPOINT_URL_S3=https://br-hidden-frost-aouh1xm1.storage.c-2.ap-southeast-1.aws.neon.tech
AWS_REGION=ap-southeast-1
ASSET_BUCKET=genshinhub-staging-assets
BACKUP_BUCKET=genshinhub-staging-backups
DATABASE_URL=<existing Neon staging connection string — unchanged>
FRONTEND_URL=https://genshinhub-staging.vercel.app
```

`BACKUP_BUCKET` is not read by the running API; it is documented here so the
same six names are available to the backup job. `STATELESS_HOST=1` may stay set:
object storage is checked **before** the stateless guard, so uploads work on
Render without relying on the ephemeral filesystem.

### GitHub Actions repository secrets

Used only by `.github/workflows/neon-pgdump.yml`:

```
NEON_DATABASE_URL
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_ENDPOINT_URL_S3
AWS_REGION
BACKUP_BUCKET
```

The workflow validates all six names before running `pg_dump` or contacting S3,
and prints only the missing **names** if one is absent. Values are never echoed.

### Vercel project `genshinhub-staging`

No storage credentials are needed on Vercel. The frontend proxies only the
allowlisted upload path to the Render backend, which reads the private bucket.
Keep `BACKEND_URL=https://genshinhub-api.onrender.com`.

## Verification after configuration (read-only / safe)

```bash
# Backend health and the controlled read proxy (unknown key must be 404)
curl -sS -o /dev/null -w '%{http_code}\n' https://genshinhub-api.onrender.com/health
curl -sS -o /dev/null -w '%{http_code}\n' \
  https://genshinhub-api.onrender.com/assets/uploads/2026/11/00000000-0000-4000-8000-000000000000.webp
```

An authenticated Admin can upload a small PNG/WebP via the character splash
editor and confirm the returned URL is
`/assets/uploads/YYYY/MM/<uuid>.webp` and renders through the Vercel domain.
No bucket listing or backup object is reachable from any `/assets/*` route.

## Rollback

Removing the five asset variables from Render restores the previous behaviour:
on Render `/upload` returns the documented 503 guard, and local development
again uses `frontend/public/assets/uploads`. Backups remain in the separate
private bucket and are never deleted by an application deploy.
