import type { IncomingMessage, ServerResponse } from 'node:http';
import { createServerApp } from '../src/index';

// Vercel reuses a function instance across requests. Build the Express/Apollo
// application once, then hand each request to it without listening on a port.
let appPromise: ReturnType<typeof createServerApp> | null = null;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (!appPromise) {
      appPromise = createServerApp().catch((error) => {
        appPromise = null;
        throw error;
      });
    }
    const app = await appPromise;
    return app(req as any, res as any);
  } catch (error) {
    console.error('API initialization failed:', error instanceof Error ? error.message : 'unknown');
    if (!res.headersSent) {
      res.statusCode = 503;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'API unavailable; verify backend environment configuration' }));
    }
  }
}
