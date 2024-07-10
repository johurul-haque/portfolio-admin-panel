import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { authRoutes } from './src/modules/auth/auth.route';

export const app = new Hono();

app.use('*', logger());

const apiRoutes = app.basePath('/api').route('/auth', authRoutes);

app.get('*', serveStatic({ root: './client/dist' }));
app.get('*', serveStatic({ path: './client/dist/index.html' }));

export type ApiRoutes = typeof apiRoutes;
