import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';
import { authMiddleware } from '../../middlewares/auth-middleware';
import { getUser, login } from './auth.service';
import { loginPayload } from './auth.validation';

const app = new Hono();

export const authRoutes = app
  .post('/login', zValidator('json', loginPayload), async (c) => {
    const payload = c.req.valid('json');

    const { token, username } = await login(payload);

    setCookie(c, 'token', token, { httpOnly: true, secure: true });

    return c.json({ username, token });
  })
  .get('/profile', authMiddleware, async (c) => {
    const result = await getUser();

    return c.json(result);
  });
