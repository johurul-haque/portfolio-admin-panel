import { Hono } from 'hono';

export const app = new Hono();

const apiRoutes = app.basePath('/api').get('/', (c) => {
  return c.json({ message: 'Hello Hono!' });
});
