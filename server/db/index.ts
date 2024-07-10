import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../src/config/env';

const client = postgres(env.DB_URI);
export const db = drizzle(client);
