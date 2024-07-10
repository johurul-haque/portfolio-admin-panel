import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../src/config/env';
import { usersTable } from './schema/user';

const client = postgres(env.DB_URI);

export const db = drizzle(client, {
  schema: {
    users: usersTable,
  },
});
