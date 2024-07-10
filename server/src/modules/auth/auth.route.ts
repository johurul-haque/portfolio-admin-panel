import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';
import { login } from './auth.service';
import { loginPayload } from './auth.validation';

export const authRoutes = new Hono()
  .use('/auth')
  .post('/login', zValidator('json', loginPayload), async (c) => {
    const payload = c.req.valid('json');

    const { token, username } = await login(payload);

    setCookie(c, 'token', token);

    return c.json({ username, token });
  });

// new Hono().use(
//   bearerAuth({
//     verifyToken: async (_, c) => {
//       try {
//         const token = getCookie(c, 'token');

//         if (!token) return false;

//         await verify(token, env.JWT_SECRET);

//         return true;
//       } catch (error) {
//         return false;
//       }
//     },
//   })
// );
