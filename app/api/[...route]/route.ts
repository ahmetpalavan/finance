import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

app.get('/hello', clerkMiddleware(), (res) => {
  const auth = getAuth(res);
  if (!auth?.userId) {
    return res.json({ error: 'Not authenticated' });
  }
  return res.json({
    message: `Hello!`,
    authId: auth.userId,
  });
});

export const GET = handle(app);
export const POST = handle(app);
