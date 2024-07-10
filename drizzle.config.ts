import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { env } from './server/src/config/env';

export default {
  schema: './server/db/schema/*.ts',
  out: './server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DB_URI,
  },
} satisfies Config;
