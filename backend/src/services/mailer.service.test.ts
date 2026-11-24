import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { mailerService } from './mailer.service';

const original = {
  NODE_ENV: process.env.NODE_ENV,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
};

afterEach(() => {
  for (const [key, value] of Object.entries(original)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test('startup SMTP verification is non-fatal while mail sending stays fail-closed', async () => {
  process.env.NODE_ENV = 'production';
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;

  await mailerService.verifyConnection();
});

test('password reset mail fails closed in production without SMTP', async () => {
  process.env.NODE_ENV = 'production';
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;

  await assert.rejects(
    mailerService.sendPasswordResetEmail('traveler@example.com', 'opaque-test-token', 'en'),
    (error: Error) => error.message === 'AUTH_SMTP_NOT_CONFIGURED',
  );
});
