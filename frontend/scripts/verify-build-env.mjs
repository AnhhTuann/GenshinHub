#!/usr/bin/env node
/**
 * Build-time guard for Vercel staging/production builds.
 *
 * The backend GraphQL deployment is protected by Vercel Deployment Protection.
 * Server Components fetch it during `next build`, so the bypass secret must be
 * available to the build process as well as at runtime. This script never
 * prints secret values; it only reports whether each variable is present.
 */
const isVercelBuild = process.env.VERCEL === '1';
const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || '';
const backendUrl = process.env.BACKEND_URL || '';
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '';

if (!isVercelBuild) {
  console.log('[build-env] local/CI build: Vercel deployment guard skipped');
  process.exit(0);
}

const usesVercelBackend = /\.vercel\.app(?::\d+)?\//.test(endpoint);
const problems = [];

if (usesVercelBackend && !bypassSecret) {
  problems.push(
    'VERCEL_AUTOMATION_BYPASS_SECRET is missing from the frontend build environment. ' +
    'Set it as a server-side (not NEXT_PUBLIC_) environment variable on the frontend Vercel project.'
  );
}
if (usesVercelBackend && !backendUrl) {
  problems.push(
    'BACKEND_URL is missing from the frontend build environment. ' +
    'Set it to the backend origin without a trailing /graphql.'
  );
}
if (!endpoint) {
  problems.push('NEXT_PUBLIC_GRAPHQL_URL must point at the deployed GraphQL endpoint.');
}

// A bypass secret must never become part of the client bundle.
for (const key of Object.keys(process.env)) {
  if (key.startsWith('NEXT_PUBLIC_') && bypassSecret && process.env[key] === bypassSecret) {
    problems.push(`${key} must not contain the Vercel bypass secret`);
  }
}

console.log('[build-env] VERCEL=1');
console.log(`[build-env] NEXT_PUBLIC_GRAPHQL_URL=${endpoint ? 'SET' : 'UNSET'} (vercel.app backend: ${usesVercelBackend ? 'yes' : 'no'})`);
console.log(`[build-env] BACKEND_URL=${backendUrl ? 'SET' : 'UNSET'}`);
console.log(`[build-env] VERCEL_AUTOMATION_BYPASS_SECRET=${bypassSecret ? 'SET (server-side)' : 'UNSET'}`);

if (problems.length) {
  for (const problem of problems) console.error(`[build-env] ERROR: ${problem}`);
  process.exit(1);
}
console.log('[build-env] OK: server-side Vercel bypass credentials are present for build and runtime');
