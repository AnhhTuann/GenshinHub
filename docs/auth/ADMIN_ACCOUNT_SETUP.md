# Admin Account Setup

This is the only supported Admin account procedure. It replaces every older
instruction that used `ADMIN_PASSWORD`, `ADMIN_KEY`, `x-admin-key`, or a password
typed into a browser prompt.

## Security contract

- There is no default password and no password in source control, CI, or
  runtime environment files.
- The first Admin must be an explicit `OWNER` created by a one-time,
  operator-run CLI.
- The CLI refuses to run if any Admin already exists.
- The chosen password is hashed with bcrypt cost 12. It is never printed or
  returned.
- ADMIN login is rate-limited and audited in the database.

## Prerequisites

1. The auth migration has been applied and Prisma Client has been generated:
   ```bash
   cd backend
   npx prisma migrate status
   npx prisma generate
   ```
2. The backend and frontend use ordinary runtime configuration. No
   `ADMIN_PASSWORD` or `ADMIN_BOOTSTRAP_PASSWORD` should be present in a
   persistent runtime `.env` file after bootstrap.
3. The operator has access to a password manager to generate and store a unique
   password meeting these rules:
   - 8 or more characters, up to 72 UTF-8 bytes
   - at least one lowercase letter, one uppercase letter, one number, and one
     symbol

## One-time owner bootstrap

Generate a strong password in a password manager, then run from `backend/`:

```bash
npm run auth:bootstrap-admin -- --username <owner-username> --email <owner-email>
```

`--email` and `--display-name` are optional. The CLI prompts for a password with terminal echo disabled and prints the created
username and a reminder to store the password in the secret manager. It does
not echo the password.

For non-interactive authorized automation, inject `ADMIN_BOOTSTRAP_PASSWORD`
only for the lifetime of the command and remove it immediately afterward. Never
commit it or write it to a shell history file.

## First login

1. Start the backend and frontend.
2. Open `/en/admin/login` or `/vi/admin/login`.
3. Enter the owner username and the bootstrap password.
4. Confirm the `/en/admin` or `/vi/admin` dashboard loads and that an
   `admin_token` HttpOnly cookie exists with an 8-hour lifetime.

If an Admin row already exists, the bootstrap command fails with
`AUTH_ADMIN_EXISTS`. Use the existing owner account or perform an authorized,
audited database operation; do not create a second bootstrap path.

## Session and account management

- Session revocation on logout is automatic: the matching `AuthSession` row is
  marked revoked.
- To revoke one Admin immediately, set that Admin's status to `SUSPENDED` or
  `DISABLED`. Session resolution checks status on every request.
- To revoke all sessions for an Admin, mark all matching `AuthSession` rows as
  revoked or delete only those explicitly identified rows.
- To rotate a password, generate a new bcrypt hash out of band and update the
  single intended `Admin` row through an authorized, audited database change.
  Do not introduce a runtime environment variable for the new password.

Example revocation statements (replace the placeholder with the exact username;
no credential is included):

```sql
UPDATE "Admin" SET status = 'DISABLED' WHERE username = '<owner-username>';

UPDATE "AuthSession"
SET "revokedAt" = NOW()
WHERE "adminId" IN (SELECT id FROM "Admin" WHERE username = '<owner-username>')
  AND "revokedAt" IS NULL;
```

## Operational notes

- `ADMIN_JWT_SECRET` is not required for authentication. If retained for older
  evidence tooling, it is only an HMAC key for review proofs.
- `/auth/admin/login` returns the opaque session token to the server-side
  frontend route only; the browser receives an HttpOnly cookie.
- Admin GraphQL and upload routes verify the session with the backend before
  forwarding the request. Requests without a valid active Admin session fail
  closed.
- Development fixtures for automated tests create their own isolated Admin
  rows with random passwords; those rows never touch the DEVELOPMENT or
  production database.
