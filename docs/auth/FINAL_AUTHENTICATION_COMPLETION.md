# GenshinHub authentication

Customer registration and sign-in use the existing localized routes under `/[locale]/auth`. Registration creates an active `CUSTOMER` with normalized email, a unique username, and a bcrypt password hash at cost 12. The web form requires password confirmation and the web API verifies it. Registration grants access to ordinary account features immediately. There is no sign-up email verification service or verified-email claim.

The frontend stores opaque credentials in HttpOnly cookies. Customer cookies use SameSite=Lax with a 12-hour default session or a 30-day Remember Me session. Admin cookies use SameSite=Strict with an eight-hour session. HTTPS deployments use Secure cookies. Only SHA-256 session token hashes are persisted. The backend checks scope, expiry, revocation, and account status when resolving the session. Logout revokes the current session before clearing the browser cookie.

Customer password reset uses a random token with a 15-minute lifetime, hash-only storage, and atomic consumption. Resetting the password revokes customer sessions. The reset request uses a generic response. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, and the public HTTPS `FRONTEND_URL` for delivery. For local testing use an isolated mail capture service or the integration suite's in-process mail capture. Reset links are excluded from application logs. Google and Facebook sign-in are unavailable.

The Admin entry points are `/en/admin/login` and `/vi/admin/login`. Admin accounts use their own unique username and share the backend session service with customers. The old public shortcut, password popup, and shared-secret authentication have been removed from the working implementation. Backend privileged operations still enforce Admin authorization and retain existing review, revision, checksum, and approval checks. Follow the [Admin setup instructions](ADMIN_ACCOUNT_SETUP.md) for the first owner.

The additive Prisma migration is `20261121100452_add_database_backed_auth`. It adds role and status to users and creates the Admin, session, reset-token, and rate-limit tables. The development database already had the migration applied at the start of this execution. Deployment requires deploying pending migrations and regenerating Prisma Client. Run the frontend on HTTPS and configure the frontend server's backend URL and allowed origins for its deployment topology.

See [verification results](AUTH_SECURITY_TEST_RESULTS.md) for current-run evidence. The starting and initially verified remote commit was `7b2d38949782cc2e5473b0cf8bc52aaa260e07d2`.

## Delivery commits

- `1c3ef96b2309b267f696e50ec2460aeea937a591` implements and verifies customer and Admin authentication.
- `0876ae81d7c8eb01d4c070ad0f8a76c099a415d0` completes localized reset-link handling and the Admin access-denied state.
