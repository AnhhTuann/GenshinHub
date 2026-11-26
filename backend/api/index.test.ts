import 'dotenv/config';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { test } from 'node:test';
import handler from './index';

/**
 * Regression check for the Vercel backend deployment: the API entrypoint must
 * serve GraphQL without starting its own long-lived TCP listener on import.
 */
test('Vercel API entrypoint answers a real GraphQL POST with catalog data', async () => {
  const server = createServer((req, res) => {
    void handler(req, res);
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  assert.ok(address && typeof address === 'object');

  try {
    const res = await fetch(`http://127.0.0.1:${address.port}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ __typename characters { id } }' }),
    });
    assert.equal(res.status, 200);
    const json: any = await res.json();
    assert.equal(json.errors, undefined);
    assert.equal(json.data.__typename, 'Query');
    assert.ok(Array.isArray(json.data.characters));
    assert.ok(json.data.characters.length > 0);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((err) => err ? reject(err) : resolve()));
  }
});
