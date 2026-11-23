import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { afterEach, test } from 'node:test';
import { mailerService } from './mailer.service';

const original = {
  NODE_ENV: process.env.NODE_ENV,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SECURE: process.env.SMTP_SECURE,
  FRONTEND_URL: process.env.FRONTEND_URL,
  EMAIL_FROM: process.env.EMAIL_FROM,
};

afterEach(() => {
  for (const [key, value] of Object.entries(original)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
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


test('missing production SMTP cannot reject the backend startup probe', async () => {
  process.env.NODE_ENV = 'production';
  delete process.env.SMTP_HOST;
  await assert.doesNotReject(mailerService.verifyConnection());
});

test('reset email rejects a malformed SMTP port before connecting', async () => {
  Object.assign(process.env, {
    NODE_ENV: 'production', SMTP_HOST: 'mail.example.test', SMTP_USER: 'fixture',
    SMTP_PASS: 'fixture', SMTP_PORT: '587invalid', EMAIL_FROM: 'mailer@example.test',
    FRONTEND_URL: 'https://app.example.test',
  });
  await assert.rejects(
    mailerService.sendPasswordResetEmail('recipient@example.test', 'fixture-token', 'vi'),
    { message: 'AUTH_SMTP_INVALID_CONFIG' },
  );
});


test('reset email uses validated HTTPS EN/VI links and requires SMTP TLS', async ({ mock }) => {
  Object.assign(process.env, {
    NODE_ENV: 'production', SMTP_HOST: 'mail.example.test', SMTP_USER: 'fixture',
    SMTP_PASS: 'fixture', SMTP_PORT: '587', SMTP_SECURE: 'false',
    EMAIL_FROM: 'Fixture Mail <mailer@example.test>', FRONTEND_URL: 'https://app.example.test/',
  });
  const messages: { from: string; text: string; html: string }[] = [];
  let options: { secure?: boolean; requireTLS?: boolean; tls?: { rejectUnauthorized?: boolean } } | undefined;
  mock.method(nodemailer, 'createTransport', (input: typeof options) => {
    options = input;
    return { sendMail: async (message: typeof messages[number]) => { messages.push(message); } };
  });
  for (const locale of ['en', 'vi'] as const) {
    await mailerService.sendPasswordResetEmail('recipient@example.test', 'fixture+token', locale);
    const mail = messages.at(-1)!;
    assert.equal(mail.from, process.env.EMAIL_FROM);
    const link = `https://app.example.test/${locale}/auth/reset-password?token=fixture%2Btoken`;
    assert.ok(mail.text.includes(link));
    assert.ok(mail.html.includes(link));
  }
  assert.equal(options?.secure, false);
  assert.equal(options?.requireTLS, true);
  assert.equal(options?.tls?.rejectUnauthorized, true);

  process.env.FRONTEND_URL = 'http://app.example.test';
  await assert.rejects(mailerService.sendPasswordResetEmail('recipient@example.test', 'fixture', 'en'),
    { message: 'AUTH_SMTP_INVALID_FRONTEND_URL' });
  process.env.FRONTEND_URL = 'https://app.example.test';
  process.env.EMAIL_FROM = 'fixture@example.test\r\nBcc: other@example.test';
  await assert.rejects(mailerService.sendPasswordResetEmail('recipient@example.test', 'fixture', 'en'),
    { message: 'AUTH_SMTP_INVALID_SENDER' });
  assert.equal(messages.length, 2);
});
