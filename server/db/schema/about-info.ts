import * as d from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const aboutInfoTable = d.pgTable('about_info', {
  id: d.uuid('id').primaryKey().defaultRandom(),
  designation: d.text('designation').notNull(),
  about: d.text('about').notNull(),
  about_content: d.text('about_content'),
  photo: d.text('photo').notNull(),
  skills: d.text('skills').notNull(),
  contacts: d.text('contacts').array().notNull(),
});

export const aboutInfoPayload = createInsertSchema(aboutInfoTable, {
  contacts: z.string().array(),
}).omit({
  id: true,
});

export type aboutInfoPayload = z.infer<typeof aboutInfoPayload>;
