import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { aboutInfoRoutes } from './src/modules/about-info/about-info.controller';
import { authRoutes } from './src/modules/auth/auth.controller';
import { blogRoutes } from './src/modules/blog/blog.controller';

export const app = new Hono();

app.use('*', logger());

const apiRoutes = app
  .basePath('/api')
  .route('/auth', authRoutes)
  .route('/blogs', blogRoutes)
  .route('/about-info', aboutInfoRoutes);

app.get('*', serveStatic({ root: './client/dist' }));
app.get('*', serveStatic({ path: './client/dist/index.html' }));

export type ApiRoutes = typeof apiRoutes;
