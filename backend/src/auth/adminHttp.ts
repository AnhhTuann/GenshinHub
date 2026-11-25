/**
 * HTTP-level Admin session guard shared by /upload and backup routes.
 * Authorization always comes from the verified DB session, never from request JSON.
 */
export function sessionTokenFromRequest(req: any): string | undefined {
  const headerToken = req.headers?.['x-admin-session'] ?? req.headers?.['x-session-token'];
  if (typeof headerToken === 'string' && headerToken) return headerToken;
  const authorization = req.headers?.authorization;
  return authorization?.startsWith('Bearer ') ? authorization.substring(7) : undefined;
}

export type ResolveSession = (token: string | undefined) => Promise<any | null>;

export function createAdminSessionMiddleware(resolveSession: ResolveSession) {
  return async (req: any, res: any, next: () => void) => {
    try {
      const session = await resolveSession(sessionTokenFromRequest(req));
      if (!session?.isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.adminSession = session;
      next();
    } catch (error) {
      console.error('[Admin auth] session verification failed:', error);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
}
