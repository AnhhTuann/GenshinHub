import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createAdminSessionMiddleware, sessionTokenFromRequest } from './adminHttp';

function response(): any {
  const res: any = { statusCode: 0, body: undefined };
  res.status = (code: number) => { res.statusCode = code; return res; };
  res.json = (body: unknown) => { res.body = body; return res; };
  return res;
}

test('sessionTokenFromRequest accepts the existing admin session headers', () => {
  assert.equal(sessionTokenFromRequest({ headers: { 'x-admin-session': 'token-a' } } as any), 'token-a');
  assert.equal(sessionTokenFromRequest({ headers: { 'x-session-token': 'token-b' } } as any), 'token-b');
  assert.equal(sessionTokenFromRequest({ headers: { authorization: 'Bearer token-c' } } as any), 'token-c');
  assert.equal(sessionTokenFromRequest({ headers: {} } as any), undefined);
});

test('admin middleware rejects a request with no verified admin session', async () => {
  const middleware = createAdminSessionMiddleware(async () => null);
  const req: any = { headers: {} };
  const res = response();
  let nextCalled = false;
  await middleware(req, res, () => { nextCalled = true; });
  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, { error: 'Unauthorized' });
});

test('admin middleware allows a verified active admin session', async () => {
  const session = { isAdmin: true, admin: { id: 'admin-1' } };
  const middleware = createAdminSessionMiddleware(async () => session as any);
  const req: any = { headers: { 'x-admin-session': 'valid-token' } };
  const res = response();
  let nextCalled = false;
  await middleware(req, res, () => { nextCalled = true; });
  assert.equal(nextCalled, true);
  assert.equal(req.adminSession, session);
  assert.equal(res.statusCode, 0);
});

test('admin middleware fails closed when session verification throws', async () => {
  const middleware = createAdminSessionMiddleware(async () => { throw new Error('db down'); });
  const req: any = { headers: { 'x-admin-session': 'token' } };
  const res = response();
  let nextCalled = false;
  const originalError = console.error;
  console.error = () => {};
  try {
    await middleware(req, res, () => { nextCalled = true; });
  } finally {
    console.error = originalError;
  }
  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
});
