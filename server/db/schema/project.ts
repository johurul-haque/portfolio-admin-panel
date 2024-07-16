import * as d from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const projectsTable = d.pgTable('projects', {
  id: d.uuid('id').primaryKey().defaultRandom(),
  name: d.text('name').notNull(),
  cover_img: d.text('cover_img').notNull(),
  intro: d.text('intro').notNull(),
  short_description: d.text('short_description').notNull(),
  technologies: d.text('technologies').notNull(),
  source_code: d.text('source_code').notNull(),
  live_site: d.text('live_site').notNull(),
  desktop_view: d.text('desktop_view').notNull(),
  mobile_view: d.text('mobile_view').notNull(),
});

export const createProjectSchema = createInsertSchema(projectsTable, {
  source_code: z.string().url(),
}).omit({
  id: true,
});

export type createProjectSchema = z.infer<typeof createProjectSchema>;
