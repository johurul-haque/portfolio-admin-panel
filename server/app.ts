import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

export const app = new Hono();

app.use('*', logger());

const apiRoutes = app.basePath('/api').get('/', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

app.get('*', serveStatic({ root: './client/dist' }));
app.get('*', serveStatic({ path: './client/dist/index.html' }));

export type ApiRoutes = typeof apiRoutes;