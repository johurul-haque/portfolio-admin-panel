import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';

export const app = new Hono();

app.use('*', logger());

const apiRoutes = app.basePath('/api').get('/', (c) => {
  throw new HTTPException(401);
  return c.json({ message: 'Unauthorized' }, 401);
  // return c.json({ mess: `Hello Hono! ${env.DB_URI}` });
});

app.get('*', serveStatic({ root: './client/dist' }));
app.get('*', serveStatic({ path: './client/dist/index.html' }));

export type ApiRoutes = typeof apiRoutes;