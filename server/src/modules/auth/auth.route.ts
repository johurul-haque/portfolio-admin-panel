import { authMiddleware } from '@/middlewares/auth-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';
import { getUser, login } from './auth.service';
import { loginPayload } from './auth.validation';

export const authRoutes = new Hono()
  .get('/profile', authMiddleware(), async (c) => {
    const result = await getUser();

    return c.json(result);
  })
  .post('/login', zValidator('json', loginPayload), async (c) => {
    const payload = c.req.valid('json');

    const { token, username } = await login(payload);

    setCookie(c, 'token', token, { httpOnly: true, secure: true });

    return c.json({ username, token });
  });
