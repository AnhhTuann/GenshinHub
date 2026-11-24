import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { test } from 'vitest';

const script = path.resolve(__dirname, 'verify-build-env.mjs');

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

test('build guard is inert for local and CI builds', () => {
  const result = run({ VERCEL: undefined, PATH: process.env.PATH });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /guard skipped/);
});

test('build guard fails when the protected backend has no server-side bypass secret', () => {
  const result = run({
    VERCEL: '1',
    NEXT_PUBLIC_GRAPHQL_URL: 'https://genshinhub-api-staging-abc123.vercel.app/graphql',
    BACKEND_URL: 'https://genshinhub-api-staging-abc123.vercel.app',
    VERCEL_AUTOMATION_BYPASS_SECRET: undefined,
    PATH: process.env.PATH,
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /VERCEL_AUTOMATION_BYPASS_SECRET is missing/);
});

test('build guard accepts fully configured server-side credentials', () => {
  const result = run({
    VERCEL: '1',
    NEXT_PUBLIC_GRAPHQL_URL: 'https://genshinhub-api-staging-abc123.vercel.app/graphql',
    BACKEND_URL: 'https://genshinhub-api-staging-abc123.vercel.app',
    VERCEL_AUTOMATION_BYPASS_SECRET: 'test-only-bypass-value',
    PATH: process.env.PATH,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /OK: server-side Vercel bypass credentials/);
  assert.doesNotMatch(result.stdout, /test-only-bypass-value/);
  assert.doesNotMatch(result.stderr, /test-only-bypass-value/);
});

test('build guard rejects a bypass secret exposed through a NEXT_PUBLIC_ variable', () => {
  const result = run({
    VERCEL: '1',
    NEXT_PUBLIC_GRAPHQL_URL: 'test-only-bypass-value',
    BACKEND_URL: 'https://genshinhub-api-staging-abc123.vercel.app',
    VERCEL_AUTOMATION_BYPASS_SECRET: 'test-only-bypass-value',
    PATH: process.env.PATH,
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /must not contain the Vercel bypass secret/);
});
