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
| Image limits | Decoded input capped at 20 MP and 8192 px per side; Sharp also receives `limitInputPixels` to stop decompression bombs before allocation |
| Object key | `uploads/YYYY/MM/<uuid>.webp` (generated server-side, never from the filename) |
| Public URL | `/assets/uploads/YYYY/MM/<uuid>.webp` |
| Read path | Frontend `/assets/[...path]` → backend `/assets/uploads/*` or `/assets/catalog/*` → `GetObjectCommand`, allowlisted key only |
| Sync-generated assets | `sync:run --publish-assets` validates each WebP and stores it under `catalog/<public path>`; identical objects are skipped, conflicting objects are never overwritten |
| Fallback | With no S3 config, local dev still writes to `frontend/public/assets/uploads`; Render/Vercel fail closed with 503 |
| Backup path | GitHub Actions `pg_dump` → `pgdump/<timestamp>.dump` in the backup bucket, verified with `HeadObject` |

No bucket listing, no public bucket, no destructive restore, and no credentials
in source, logs, URLs, or browser-exposed `NEXT_PUBLIC_*` variables.

## One-time Neon setup (status)

1. The two required **private** buckets on branch `br-hidden-frost-aouh1xm1`
   already exist: `genshinhub-staging-assets` and
   `genshinhub-staging-backups`. Do not enable public access.
2. The approved branch-scoped credential is Neon's inherited
   “Default object storage credential” (`nak_live_4d9d0fb698dd…`), with
   `storage:read` and `storage:write` scopes. Its values were configured in
   GitHub repository secrets without printing them.
3. Render environment variables still require the owner/deployer to apply the
   same values in the Render service settings before the backend is redeployed.
   Never paste them into a file, PR, issue, log, or chat message.

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
FRONTEND_URL=https://genshinhub.duckdns.org
```

`https://genshinhub.duckdns.org` is now in the backend CORS allowlist alongside
the Vercel preview hostname, so browser uploads work on the custom domain.
`BACKUP_BUCKET` is not read by the running API; it is documented here so the
same names are available to the backup job. `STATELESS_HOST=1` may stay set:
object storage is checked **before** the stateless guard, so uploads work on
Render without relying on the ephemeral filesystem.

### GitHub Actions repository secrets

Used by the backup step in `.github/workflows/genshin-data-sync-apply.yml` and
by the dry-run check in `.github/workflows/genshin-data-sync.yml`:

```
NEON_DATABASE_URL
DATABASE_URL
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_ENDPOINT_URL_S3
AWS_REGION
ASSET_BUCKET
BACKUP_BUCKET
FRONTEND_REVALIDATE_URL
REVALIDATE_SECRET
```

These names are configured in the repository secret store (values are never
echoed). `NEON_DATABASE_URL` is the single approved staging connection string
for both backup and catalog sync. After its exact-host guard passes, the
workflows expose that same value to the sync engine as `DATABASE_URL`; do not
create a separate `DATABASE_URL` GitHub secret. The apply workflow validates
all required secret names before running `pg_dump` or contacting S3.

### Vercel project `genshinhub-staging`

No storage credentials are needed on Vercel. The frontend proxies only the
allowlisted upload and catalog paths to the Render backend, which reads the
private bucket. Keep `BACKEND_URL=https://genshinhub-api.onrender.com`.

## Verification after configuration (read-only / safe)

```bash
# Backend health and the controlled read proxy (unknown key must be 404)
curl -sS -o /dev/null -w '%{http_code}\n' https://genshinhub-api.onrender.com/health
curl -sS -o /dev/null -w '%{http_code}\n' \
  https://genshinhub-api.onrender.com/assets/uploads/2026/11/00000000-0000-4000-8000-000000000000.webp
curl -sS -D - -o /dev/null -H 'Origin: https://genshinhub.duckdns.org' \
  https://genshinhub-api.onrender.com/health | grep -i access-control-allow-origin
```

An authenticated Admin can upload a small PNG/WebP via the character splash
editor and confirm the returned URL is
`/assets/uploads/YYYY/MM/<uuid>.webp` and renders through both the Vercel
preview domain and the custom domain. Sync-generated catalog images are served
from the private bucket under `/assets/catalog/<rel>` only after passing the
same key allowlist. No bucket listing or backup object is reachable from any
`/assets/*` route.

## Rollback

Removing the five asset variables from Render restores the previous behaviour:
on Render `/upload` returns the documented 503 guard, and local development
again uses `frontend/public/assets/uploads`. Backups remain in the separate
private bucket and are never deleted by an application deploy.
