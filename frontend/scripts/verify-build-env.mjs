#!/usr/bin/env node
/**
 * Build-time guard for the final Vercel + Render architecture.
 *
 * The frontend must talk to the existing Render Free backend, not the retired
 * Vercel backend. Vercel Deployment Protection bypass credentials are obsolete
 * and must never be present in the frontend build environment.
 *
 * This script never prints secret values; it only reports presence/absence.
 */
const isVercelBuild = process.env.VERCEL === '1';
const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || '';
const backendUrl = process.env.BACKEND_URL || '';
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '';

const EXPECTED_ENDPOINT = 'https://genshinhub-api.onrender.com/graphql';
const EXPECTED_BACKEND = 'https://genshinhub-api.onrender.com';

/**
 * Render Free sleeps after inactivity. Waiting once before `next build` avoids
 * the concurrent prerender requests racing a cold start. This is build-time
 * readiness, not artificial ongoing keep-alive traffic.
 */
async function waitForRenderBackend() {
  if (backendUrl !== EXPECTED_BACKEND || process.env.BUILD_ENV_SKIP_WARMUP === '1') return true;
  for (let attempt = 1; attempt <= 12; attempt++) {
    try {
      const response = await fetch(`${EXPECTED_BACKEND}/health`, {
        signal: AbortSignal.timeout(10_000),
      });
      if (response.ok) {
        console.log('[build-env] Render backend is ready');
        return true;
      }
    } catch {
      // Cold start or transient network failure: retry below.
    }
    if (attempt < 12) await new Promise(resolve => setTimeout(resolve, 5_000));
  }
  return false;
}

const renderBackendReady = await waitForRenderBackend();

if (!renderBackendReady) {
  console.error('[build-env] ERROR: Render backend did not become ready within 60s before the build.');
  process.exit(1);
}

if (!isVercelBuild) {
  console.log('[build-env] local/CI build: Vercel deployment guard skipped');
  process.exit(0);
}

const problems = [];

if (!endpoint) {
  problems.push('NEXT_PUBLIC_GRAPHQL_URL must point at the deployed GraphQL endpoint.');
} else if (endpoint !== EXPECTED_ENDPOINT) {
  problems.push(`NEXT_PUBLIC_GRAPHQL_URL must be ${EXPECTED_ENDPOINT} on Vercel.`);
}

if (!backendUrl) {
  problems.push('BACKEND_URL must be set to the Render backend origin.');
} else if (backendUrl !== EXPECTED_BACKEND) {
  problems.push(`BACKEND_URL must be ${EXPECTED_BACKEND} on Vercel.`);
}

if (bypassSecret) {
  problems.push(
    'VERCEL_AUTOMATION_BYPASS_SECRET is obsolete for the Render backend and must be removed ' +
    'from the frontend Vercel project.'
  );
}

// A bypass secret must never become part of the client bundle.
for (const key of Object.keys(process.env)) {
  if (key.startsWith('NEXT_PUBLIC_') && bypassSecret && process.env[key] === bypassSecret) {
    problems.push(`${key} must not contain a Vercel bypass secret`);
  }
}

console.log('[build-env] VERCEL=1');
console.log('[build-env] NEXT_PUBLIC_GRAPHQL_URL=SET (Render backend)');
console.log('[build-env] BACKEND_URL=SET (Render backend)');
console.log(`[build-env] VERCEL_AUTOMATION_BYPASS_SECRET=${bypassSecret ? 'SET (must be removed)' : 'UNSET'}`);

if (problems.length) {
  for (const problem of problems) console.error(`[build-env] ERROR: ${problem}`);
  process.exit(1);
}
console.log('[build-env] OK: Vercel frontend is configured for the Render backend');
