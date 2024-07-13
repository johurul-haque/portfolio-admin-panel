import { serve } from '@hono/node-server';
import { app } from './app';
import { env } from './src/config/env';

const port = env.PORT;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
