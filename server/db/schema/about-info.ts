import * as d from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const aboutInfoTable = d.pgTable('about_info', {
  id: d.uuid('id').primaryKey().defaultRandom(),
  designation: d.text('designation').notNull(),
  about: d.text('about').notNull(),
  photo: d.text('photo').notNull(),
  skills: d.text('skills').array().notNull(),
  contact: d.text('contact').array().notNull(),
});

export const aboutInfoPayload = createInsertSchema(aboutInfoTable, {
  skills: z.string().array(),
  contact: z.string().array(),
}).omit({
  id: true,
});

export type aboutInfoPayload = z.infer<typeof aboutInfoPayload>;
