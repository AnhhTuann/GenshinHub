import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { test } from 'vitest';

const script = path.resolve(__dirname, 'verify-build-env.mjs');
const RENDER_ENDPOINT = 'https://genshinhub-api.onrender.com/graphql';
const RENDER_BACKEND = 'https://genshinhub-api.onrender.com';

function run(env: Record<string, string | undefined>) {
  const cleanEnv: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    if (value !== undefined) cleanEnv[key] = value;
  }
  return spawnSync(process.execPath, [script], {
    env: cleanEnv as NodeJS.ProcessEnv,
    encoding: 'utf8',
  });
}

function renderEnv(extra: Record<string, string | undefined> = {}) {
  return {
    VERCEL: '1',
    NEXT_PUBLIC_GRAPHQL_URL: RENDER_ENDPOINT,
    BACKEND_URL: RENDER_BACKEND,
    BUILD_ENV_SKIP_WARMUP: '1',
    PATH: process.env.PATH,
    ...extra,
  };
}

test('build guard is inert for local and CI builds', () => {
  const result = run({ VERCEL: undefined, PATH: process.env.PATH });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /guard skipped/);
});

test('build guard accepts the final Render backend configuration', () => {
  const result = run(renderEnv());
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /OK: Vercel frontend is configured for the Render backend/);
});

test('build guard rejects the retired Vercel backend', () => {
  const result = run(renderEnv({
    NEXT_PUBLIC_GRAPHQL_URL: 'https://genshinhub-api-staging-abc123.vercel.app/graphql',
    BACKEND_URL: 'https://genshinhub-api-staging-abc123.vercel.app',
  }));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /NEXT_PUBLIC_GRAPHQL_URL must be https:\/\/genshinhub-api\.onrender\.com\/graphql/);
  assert.match(result.stderr, /BACKEND_URL must be https:\/\/genshinhub-api\.onrender\.com/);
});

test('build guard rejects an obsolete Vercel bypass secret', () => {
  const result = run(renderEnv({ VERCEL_AUTOMATION_BYPASS_SECRET: 'test-only-bypass-value' }));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /VERCEL_AUTOMATION_BYPASS_SECRET is obsolete/);
  assert.doesNotMatch(result.stdout, /test-only-bypass-value/);
  assert.doesNotMatch(result.stderr, /test-only-bypass-value/);
});

test('build guard rejects a missing GraphQL endpoint', () => {
  const result = run(renderEnv({ NEXT_PUBLIC_GRAPHQL_URL: undefined }));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /NEXT_PUBLIC_GRAPHQL_URL must point at the deployed GraphQL endpoint/);
});
