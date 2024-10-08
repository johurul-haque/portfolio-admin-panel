import * as d from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const blogsTable = d.pgTable('blogs', {
  id: d.uuid('id').primaryKey().defaultRandom(),
  title: d.text('title').notNull(),
  content: d.varchar('content').notNull(),
  content_in_md: d.text('content_in_md').notNull(),
  publish_date: d.date('publish_date').notNull().defaultNow(),
});

export const createBlogPayload = createInsertSchema(blogsTable);
