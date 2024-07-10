import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';
import { env } from '../config/env';

export const authMiddleware = createMiddleware(async (c, next) => {
  try {
    const token = getCookie(c, 'token');

    if (!token) throw new Error();

    await verify(token, env.JWT_SECRET);

    await next();
  } catch (error) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }
});
