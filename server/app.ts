import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { authRoutes } from './src/modules/auth/auth.controller';
import { blogRoutes } from './src/modules/blog/blog.controller';

export const app = new Hono();

app.use('*', logger());

const apiRoutes = app
  .basePath('/api')
  .route('/auth', authRoutes)
  .route('/blogs', blogRoutes);

app.get('*', serveStatic({ root: './client/dist' }));
app.get('*', serveStatic({ path: './client/dist/index.html' }));

export type ApiRoutes = typeof apiRoutes;
