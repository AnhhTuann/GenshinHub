import { jwtVerify, SignJWT } from 'jose';

const issuer = 'genshinhub';
const audience = 'genshinhub-admin';

function signingKey() {
  const secret = process.env.ADMIN_JWT_SECRET;
  return secret?.trim() ? new TextEncoder().encode(secret) : null;
}

export async function issueAdminSession(): Promise<string | null> {
  const key = signingKey();
  if (!key) return null;

  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function verifyAdminSession(token: string | null | undefined): Promise<boolean> {
  const key = signingKey();
  if (!key || !token) return false;

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
      issuer,
      audience,
      requiredClaims: ['exp', 'iat', 'role'],
    });
    return payload.role === 'admin';
  } catch {
    return false;
  }
}
