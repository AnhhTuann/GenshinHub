import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { test } from 'node:test';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { mailerService } from '../services/mailer.service';
import { authService } from './auth.service';
import { AuthError, hashToken } from './security';

const testDatabaseUrl = process.env.AUTH_TEST_DATABASE_URL;

if (!testDatabaseUrl || !/^\/genshinhub_auth_test(?:_[a-z0-9]+)?$/.test(new URL(testDatabaseUrl).pathname)) {
  test('auth integration suite requires an isolated genshinhub_auth_test database', { skip: true }, () => {});
} else {
  const prisma = new PrismaClient({ datasources: { db: { url: testDatabaseUrl } } });
  const suffix = randomBytes(4).toString('hex');
  const password = `Auth-${suffix}-Aa1!`;
  const meta = { ip: `127.0.0.${randomBytes(1)[0] % 200 + 1}`, userAgent: 'auth-integration-test' };

  test.before(async () => {
    await prisma.$connect();
  });

  test.after(async () => {
    try {
      await prisma.$transaction([
        prisma.user.deleteMany({ where: { email: { endsWith: `.${suffix}@example.com` }, username: { endsWith: `_${suffix}` } } }),
        prisma.admin.deleteMany({ where: { username: { endsWith: `_${suffix}` } } }),
      ]);
    } finally {
      await prisma.$disconnect();
    }
  });

  test('registration forces CUSTOMER role, normalizes email, and stores only a password hash', async () => {
    const email = `traveler.${suffix}@example.com`;
    const result = await authService.registerCustomer(prisma, {
      username: `traveler_${suffix}`,
      email: `  ${email.toUpperCase()}  `,
      password,
      gender: 'male',
      displayName: 'Traveler',
      role: 'ADMIN',
      status: 'DISABLED',
    } as any, meta);

    assert.equal(result.user.email, email);
    assert.equal(result.user.role, 'CUSTOMER');
    assert.equal(result.user.status, 'ACTIVE');
    assert.equal('password' in result.user, false);
    const storedUser = await prisma.user.findUniqueOrThrow({ where: { id: result.user.id } });
    assert.notEqual(storedUser.password, password);
    assert.equal(await bcrypt.compare(password, storedUser.password!), true);

    const session = await prisma.authSession.findUniqueOrThrow({ where: { tokenHash: hashToken(result.token) } });
    assert.equal(session.customerId, result.user.id);
    assert.equal(session.adminId, null);
    assert.equal(session.subjectType, 'CUSTOMER');
  });

  test('registration rejects duplicate normalized email and username', async () => {
    const email = `dup.${suffix}@example.com`;
    await authService.registerCustomer(prisma, {
      username: `dup_${suffix}`, email, password, gender: 'female',
    }, meta);

    await assert.rejects(
      authService.registerCustomer(prisma, {
        username: `other_${suffix}`, email: email.toUpperCase(), password, gender: 'male',
      }, meta),
      (error: any) => error instanceof AuthError && error.code === 'AUTH_EMAIL_TAKEN',
    );
    await assert.rejects(
      authService.registerCustomer(prisma, {
        username: `DUP_${suffix}`, email: `other.${suffix}@example.com`, password, gender: 'male',
      }, meta),
      (error: any) => error instanceof AuthError && error.code === 'AUTH_USERNAME_TAKEN',
    );
  });

  test('login uses generic errors and brute-force attempts become rate limited', async () => {
    const email = `login.${suffix}@example.com`;
    await authService.registerCustomer(prisma, {
      username: `login_${suffix}`, email, password, gender: 'male',
    }, meta);

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await assert.rejects(
        authService.loginCustomer(prisma, { email, password: 'Wrong-Password-1!' }, meta),
        (error: any) => error.code === 'AUTH_INVALID_CREDENTIALS',
      );
    }
    await assert.rejects(
      authService.loginCustomer(prisma, { email, password }, meta),
      (error: any) => error.code === 'AUTH_RATE_LIMITED',
    );
  });

  test('Remember Me creates a finite longer session and logout revokes only that session', async () => {
    const email = `remember.${suffix}@example.com`;
    await authService.registerCustomer(prisma, {
      username: `remember_${suffix}`, email, password, gender: 'male',
    }, meta);
    const normal = await authService.loginCustomer(prisma, { email, password, rememberMe: false }, meta);
    const remembered = await authService.loginCustomer(prisma, { email, password, rememberMe: true }, meta);

    assert.ok(remembered.expiresAt.getTime() > normal.expiresAt.getTime());
    await authService.logout(prisma, normal.token);
    assert.equal(await authService.resolveSession(prisma, normal.token), null);
    assert.ok(await authService.resolveSession(prisma, remembered.token));
    await prisma.authSession.update({
      where: { tokenHash: hashToken(remembered.token) },
      data: { expiresAt: new Date(Date.now() - 1000) },
    });
    assert.equal(await authService.resolveSession(prisma, remembered.token), null);
  });

  test('password reset stores a hash, sends a one-time link, and rejects token reuse', async () => {
    const email = `reset.${suffix}@example.com`;
    const initial = await authService.registerCustomer(prisma, {
      username: `reset_${suffix}`, email, password, gender: 'female',
    }, { ...meta, ip: '10.0.0.2' });

    let deliveredToken: string | undefined;
    let deliveredEmail: string | undefined;
    const original = mailerService.sendPasswordResetEmail;
    mailerService.sendPasswordResetEmail = async (to, token) => {
      deliveredEmail = to;
      deliveredToken = token;
      return true;
    };

    try {
      assert.equal(await authService.requestPasswordReset(prisma, email, { ...meta, ip: '10.0.0.3' }), true);
      assert.equal(deliveredEmail, email);
      assert.ok(deliveredToken);

      const stored = await prisma.passwordResetToken.findFirstOrThrow({ where: { user: { email } } });
      assert.equal(stored.tokenHash, hashToken(deliveredToken!));
      assert.equal(stored.usedAt, null);

      const nextPassword = `Next-${suffix}-Bb2@`;
      const resets = await Promise.allSettled([
        authService.resetPassword(prisma, deliveredToken!, nextPassword),
        authService.resetPassword(prisma, deliveredToken!, nextPassword),
      ]);
      assert.equal(resets.filter((result) => result.status === 'fulfilled').length, 1);
      assert.equal(await authService.resolveSession(prisma, initial.token), null);
      await assert.rejects(
        authService.resetPassword(prisma, deliveredToken!, password),
        (error: any) => error.code === 'AUTH_INVALID_TOKEN',
      );
      assert.equal(await bcrypt.compare(nextPassword, (await prisma.user.findUniqueOrThrow({ where: { email } })).password!), true);
    } finally {
      mailerService.sendPasswordResetEmail = original;
    }
  });

  test('Admin login requires a DB-backed identity and issues an ADMIN session', async () => {
    const username = `admin_${suffix}`;
    const admin = await prisma.admin.create({
      data: {
        username,
        displayName: 'Test Owner',
        passwordHash: await bcrypt.hash(password, 10),
        role: 'OWNER',
        status: 'ACTIVE',
      },
    });

    await assert.rejects(
      authService.loginAdmin(prisma, { username, password: 'Wrong-Password-1!' }, meta),
      (error: any) => error.code === 'AUTH_INVALID_CREDENTIALS',
    );

    const result = await authService.loginAdmin(prisma, { username, password }, meta);
    assert.equal(result.admin.id, admin.id);
    assert.equal(result.admin.role, 'OWNER');
    const session = await authService.resolveSession(prisma, result.token);
    assert.equal(session?.kind, 'ADMIN');
    assert.equal(session?.admin?.id, admin.id);
    assert.equal(session?.isAdmin, true);
  });

  test('disabled Admin identities and revoked sessions cannot authorize', async () => {
    const username = `disabled_${suffix}`;
    const admin = await prisma.admin.create({
      data: {
        username,
        passwordHash: await bcrypt.hash(password, 10),
        status: 'DISABLED',
      },
    });
    await assert.rejects(
      authService.loginAdmin(prisma, { username, password }, meta),
      (error: any) => error.code === 'AUTH_ACCOUNT_DISABLED',
    );

    await prisma.admin.update({ where: { id: admin.id }, data: { status: 'ACTIVE' } });
    const session = await authService.loginAdmin(prisma, { username, password }, meta);
    await prisma.admin.update({ where: { id: admin.id }, data: { status: 'SUSPENDED' } });
    assert.equal(await authService.resolveSession(prisma, session.token), null);
  });

  test('injection-shaped email is rejected as invalid input', async () => {
    await assert.rejects(
      authService.registerCustomer(prisma, {
        username: `inject_${suffix}`,
        email: "x' OR 1=1--@example.com",
        password,
        gender: 'male',
      }, meta),
      (error: any) => error.code === 'AUTH_INVALID_EMAIL',
    );
  });

  test('HTTP layer rejects legacy admin keys, customer escalation, cross-origin logout and enumeration', async () => {
    const { spawn } = await import('node:child_process');
    const adminUsername = `http_admin_${suffix}`;
    await prisma.admin.create({
      data: {
        username: adminUsername,
        passwordHash: await bcrypt.hash(password, 12),
        role: 'OWNER',
        status: 'ACTIVE',
      },
    });

    const port = 40000 + (randomBytes(2).readUInt16BE(0) % 20000);
    const base = `http://127.0.0.1:${port}`;
    const child = spawn(process.execPath, ['-r', 'ts-node/register', 'src/index.ts'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PORT: String(port),
        DATABASE_URL: testDatabaseUrl,
        FRONTEND_URL: base,
        ADMIN_PASSWORD: 'legacy-shared-secret-must-be-ignored',
        NODE_ENV: 'test',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let serverLog = '';
    child.stdout?.on('data', (chunk: Buffer) => { serverLog += chunk.toString(); });
    child.stderr?.on('data', (chunk: Buffer) => { serverLog += chunk.toString(); });

    const post = async (path: string, body: unknown, headers: Record<string, string> = {}) => {
      const response = await fetch(`${base}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(body),
      });
      const text = await response.text();
      let json: any = {};
      try { json = JSON.parse(text); } catch { json = { text }; }
      return { status: response.status, json, headers: response.headers };
    };

    try {
      let ready = false;
      for (let attempt = 0; attempt < 100 && !ready; attempt += 1) {
        try {
          const probe = await post('/auth/session', { token: 'invalid' });
          ready = probe.status === 401;
        } catch {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
      assert.equal(ready, true, `test backend did not start:\n${serverLog}`);

      const email = `http.${suffix}@example.com`;
      const registered = await post('/auth/register', {
        username: `http_${suffix}`, email, password, gender: 'male', role: 'ADMIN', status: 'DISABLED',
      });
      assert.equal(registered.status, 201);
      assert.equal(registered.json.user.role, 'CUSTOMER');
      assert.equal(registered.json.user.status, 'ACTIVE');

      const customerToken = registered.json.token as string;
      const session = await post('/auth/session', { token: customerToken });
      assert.equal(session.json.valid, true);
      assert.equal(session.json.kind, 'CUSTOMER');
      assert.equal(session.json.isAdmin, false);

      const adminMutation = JSON.stringify({
        query: 'mutation { reviewCharacterBuild(id: "missing", characterId: "missing", expectedVersion: 1, decision: APPROVE) { id } }',
      });
      const graphqlRequest = (headers: Record<string, string>) => fetch(`${base}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: adminMutation,
      });
      const customerGraphql = await graphqlRequest({ Authorization: `Bearer ${customerToken}` });
      const customerGraphqlBody = await customerGraphql.json();
      assert.match(JSON.stringify(customerGraphqlBody.errors ?? []), /Admin access required|Unauthorized/);

      const legacyKeyGraphql = await graphqlRequest({ 'x-admin-key': 'legacy-shared-secret-must-be-ignored' });
      const legacyKeyBody = await legacyKeyGraphql.json();
      assert.match(JSON.stringify(legacyKeyBody.errors ?? []), /Unauthorized|Admin access required/);

      const customerAdminLogin = await post('/auth/admin/login', { username: registered.json.user.username, password });
      assert.equal(customerAdminLogin.status, 401);
      const social = await post('/graphql', {
        query: 'mutation Social($email: String!) { socialLogin(provider: "google", providerId: "unverified", email: $email) { token } }',
        variables: { email },
      });
      assert.equal(social.json.errors?.[0]?.extensions?.code, 'AUTH_FORBIDDEN');

      const realAdmin = await post('/auth/admin/login', { username: adminUsername, password });
      assert.equal(realAdmin.status, 200);
      assert.equal(realAdmin.json.admin.role, 'OWNER');
      const adminSession = await post('/auth/session', { token: realAdmin.json.token });
      assert.equal(adminSession.json.kind, 'ADMIN');
      assert.equal(adminSession.json.isAdmin, true);
      assert.equal((await post('/auth/logout', { token: realAdmin.json.token })).status, 200);
      const afterAdminLogout = await graphqlRequest({ 'x-admin-session': realAdmin.json.token });
      assert.match(JSON.stringify((await afterAdminLogout.json()).errors ?? []), /Unauthorized|Admin access required/);

      const crossOriginLogout = await post('/auth/logout', { token: customerToken }, { Origin: 'https://evil.example' });
      assert.equal(crossOriginLogout.status, 403);
      assert.ok((await authService.resolveSession(prisma, customerToken)) !== null);
      const validLogout = await post('/auth/logout', { token: customerToken });
      assert.equal(validLogout.status, 200);
      assert.equal(await authService.resolveSession(prisma, customerToken), null);

      const existingForgot = await post('/auth/forgot-password', { email });
      const unknownForgot = await post('/auth/forgot-password', { email: `none.${suffix}@example.com` });
      assert.deepEqual(existingForgot.json, unknownForgot.json);
      assert.equal(JSON.stringify(existingForgot.json).includes('token'), false);
    } finally {
      if (child.exitCode === null) {
        child.kill('SIGTERM');
        await new Promise<void>(resolve => child.once('exit', () => resolve()));
      }
    }
  });
}
