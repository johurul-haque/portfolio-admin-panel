import * as d from 'drizzle-orm/pg-core';

export const usersTable = d.pgTable(
  'users',
  {
    id: d.uuid('id').primaryKey().defaultRandom(),
    username: d.varchar('username', { length: 20 }).notNull().unique(),
    password: d.varchar('password').notNull(),
  },
  ({ username }) => {
    return {
      usernameIndex: d.uniqueIndex('username_idx').on(username),
    };
  }
);
