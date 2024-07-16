import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../src/config/env';
import { aboutInfoTable } from './schema/about-info';
import { blogsTable } from './schema/blog';
import { projectsTable } from './schema/project';
import { usersTable } from './schema/user';

const client = postgres(env.DB_URI);

export const db = drizzle(client, {
  schema: {
    users: usersTable,
    blogs: blogsTable,
    aboutInfo: aboutInfoTable,
    projects: projectsTable,
  },
});
