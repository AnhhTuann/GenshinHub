# Frontend → backend GraphQL 401 on Vercel (2026-11-24)

## Diagnosis (real HTTP evidence)

Read-only probe against the staging backend GraphQL endpoint returned:

```
POST https://genshinhub-api-staging-...vercel.app/graphql
status = 401
body   = {"access":"vercel curl <deployment-url>","protection":{...}, ...}
```

This is Vercel **Deployment Protection**, not a GraphQL or Admin-session failure.
The backend project is protected, so unauthenticated server-to-server calls from the frontend
are rejected before Express/Apollo is reached.

## Fix

Use Vercel's *Protection Bypass for Automation* secret, held **only in server-side Next.js code**:

- `frontend/lib/graphql/client.ts` — server-side `fetchGraphQL` adds
  `x-vercel-protection-bypass` when `VERCEL_AUTOMATION_BYPASS_SECRET` is set.
- `frontend/lib/auth-api.ts` — server-side auth requests add the same header.
- `frontend/app/api/graphql/route.ts` — same-origin public proxy adds the header server-side;
  browser code calls `/api/graphql` instead of the protected backend directly.
- `frontend/app/api/admin/graphql/route.ts` — Admin proxy still verifies the HttpOnly
  `admin_token` via the DB-backed session service, then adds the bypass header.
- `frontend/app/api/admin/upload/route.ts` — same treatment for uploads.
- `frontend/.env.example` — documents `BACKEND_URL` and the bypass secret.

Security invariants preserved:
- no hardcoded token or secret in source;
- the secret is never sent to the browser (only server components / route handlers attach it);
- no CSRF protection disabled — proxies keep the same-origin check;
- Admin authorization is unchanged: verified DB session only, no shared key, no auto-approval;
- client-side Admin calls still fail closed when attempted server-side.

Tests added: `frontend/lib/graphql/vercel-protection.test.ts` (6 passing) verifies that the
bypass header is attached only to server-side calls, is absent from browser calls, that browser
calls use the same-origin proxies, and that Admin GraphQL fails closed on the server.

## Required Vercel configuration (owner action)

1. In the **backend** Vercel project (`prj_7qNuAPpSkSogQF974QtG5Rvx088K`), open
   Settings → Deployment Protection → Protection Bypass for Automation and create/copy the secret.
2. Set that value as `VERCEL_AUTOMATION_BYPASS_SECRET` in the **frontend** Vercel project
   (`prj_GCP61fQ0doAO9sUMXQImtiqapNm3`) for the staging environment. It must be available at
   build time as well as runtime because server components fetch GraphQL during prerendering.
3. Set `BACKEND_URL` in the frontend project to the backend origin (no trailing `/graphql`),
   and keep `NEXT_PUBLIC_GRAPHQL_URL` pointing at the backend GraphQL URL.
4. Redeploy the frontend so the new proxies and server-side header logic are live.

Then verify (with the secret substituted by the shell, never pasted into source or logs):

```
curl -i -H "x-vercel-protection-bypass: $VERCEL_AUTOMATION_BYPASS_SECRET" \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ __typename }"}' \
  https://genshinhub-api-staging-...vercel.app/graphql
```

Expected: HTTP 200 with `{"data":{"__typename":"Query"}}` instead of the 401 protection payload.

## Verification status / blocker

No `VERCEL_TOKEN` (or equivalent Vercel CLI session) exists in the local environment. A
presence-only search found no Vercel credential files, and no Vercel CLI is installed (only the
Neon CLI was available). Therefore this session could **not**:
- read or update Vercel project environment variables,
- trigger a deployment,
- prove the live bypassed request returns 200.

The source fix, env documentation, unit tests, TypeScript check and production build are complete
and passing; the live 401 → 200 confirmation remains **BLOCKED on `VERCEL_TOKEN`**.
