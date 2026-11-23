# Pre-deployment checklist

1. Review the release PR and record the verified remote main SHA. Use GitHub's required Pull Request and resolved-conversation workflow.
2. Confirm the deployment target and maintenance approval. Create a fresh PostgreSQL backup and restore-test it in isolation. Verify migration history and protected data.
3. Build from a clean checkout and deploy pending Prisma migrations only with the authorized release process. Verify catalog, localized routes, and protected Admin GraphQL against the deployed configuration.
4. Set `FRONTEND_URL` to the public HTTPS origin. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and an authorized `EMAIL_FROM`. Use implicit TLS on port 465 or mandatory STARTTLS on the provider's submission port. Verify receipt on an authorized test account. Captured mail verification does not establish live delivery.
5. Configure `SYNC_READONLY_DATABASE_URL` for scheduled reporting if hosted dry-runs are desired. Keep the production apply workflow separately gated and verify a real hosted dry-run before relying on it.
6. Verify persistent WebP storage, read-only assets, health checks, backups, and rollback. Use the guarded replay runbook only for its explicitly supported database environments. Git commits carry code and migrations. Curated builds and recorded approvals remain database data.

No production service was accessed during release hardening.
