import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  AuthError,
  SESSION_DURATION_SECONDS,
  generateToken,
  hashToken,
  isSameOrigin,
  normalizeEmail,
  validateEmail,
  validatePassword,
  validateUsername,
} from './security';

test('normalizeEmail trims and lowercases consistently', () => {
  assert.equal(normalizeEmail('  Traveler@Teyvat.COM '), 'traveler@teyvat.com');
});

test('validateEmail rejects malformed and oversized addresses', () => {
  assert.doesNotThrow(() => validateEmail('a.b+tag@example.co.uk'));
  assert.throws(() => validateEmail('not-an-email'), AuthError);
  assert.throws(() => validateEmail('a'.repeat(250) + '@example.com'), AuthError);
});

test('validateUsername enforces canonical local usernames', () => {
  assert.doesNotThrow(() => validateUsername('Traveler_01'));
  assert.throws(() => validateUsername('ab'), AuthError);
  assert.throws(() => validateUsername('has space'), AuthError);
  assert.throws(() => validateUsername('a'.repeat(21)), AuthError);
});

test('validatePassword requires strong but bounded passwords', () => {
  assert.doesNotThrow(() => validatePassword('Traveler-2026!'));
  assert.throws(() => validatePassword('short1!'), AuthError);
  assert.throws(() => validatePassword('alllowercaseletters'), AuthError);
  assert.throws(() => validatePassword('x'.repeat(129)), AuthError);
  assert.throws(() => validatePassword('Aa1!' + 'é'.repeat(35)), AuthError);
});

test('token helpers generate random credentials and store only stable hashes', () => {
  const first = generateToken();
  const second = generateToken();
  assert.notEqual(first, second);
  assert.equal(first.length, 43);
  assert.match(hashToken(first), /^[a-f0-9]{64}$/);
  assert.equal(hashToken(first), hashToken(first));
  assert.notEqual(hashToken(first), hashToken(second));
  assert.equal(hashToken(first).includes(first), false);
});

test('isSameOrigin accepts only the expected browser origin', () => {
  assert.equal(isSameOrigin('http://127.0.0.1:3001', '127.0.0.1:3001'), true);
  assert.equal(isSameOrigin('https://genshinhub.example', 'genshinhub.example'), true);
  assert.equal(isSameOrigin('https://evil.example', 'genshinhub.example'), false);
  assert.equal(isSameOrigin(undefined, 'genshinhub.example'), false);
});

test('session durations are finite and remember-me is longer than standard', () => {
  assert.ok(SESSION_DURATION_SECONDS.CUSTOMER > 0);
  assert.ok(SESSION_DURATION_SECONDS.ADMIN > 0);
  assert.ok(SESSION_DURATION_SECONDS.CUSTOMER_REMEMBER > SESSION_DURATION_SECONDS.CUSTOMER);
  assert.ok(SESSION_DURATION_SECONDS.CUSTOMER_REMEMBER < 60 * 60 * 24 * 365);
});

test('AuthError carries a stable machine-readable code', () => {
  const error = new AuthError('AUTH_INVALID_CREDENTIALS', 'Invalid credentials');
  assert.equal(error.extensions.code, 'AUTH_INVALID_CREDENTIALS');
});
