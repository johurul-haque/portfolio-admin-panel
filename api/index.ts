import { serve } from '@hono/node-server';
import { handle } from 'hono/vercel';
import { app } from './app';

export const config = {
  runtime: 'edge',
};

const port = 3000;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default handle(app);
