import { env } from '@/config/env';
import { bearerAuth } from 'hono/bearer-auth';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';

export function authMiddleware() {
  return bearerAuth({
    verifyToken: async (_, c) => {
      try {
        const token = getCookie(c, 'token');

        if (!token) return false;

        await verify(token, env.JWT_SECRET);

        return true;
      } catch (error) {
        return false;
      }
    },
  });
}
