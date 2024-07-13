import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../../db';
import { blogsTable, createBlogPayload } from '../../../db/schema/blog';

export async function createBlog(payload: z.infer<typeof createBlogPayload>) {
  return db
    .insert(blogsTable)
    .values(payload)
    .returning()
    .then((res) => res[0]);
}

export async function getAllBlogs() {
  return db.query.blogs.findMany();
}

export async function getSingleBlog(blogId: string) {
  try {
    return await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.id, blogId))
      .then((res) => res[0]);
  } catch (error) {
    return undefined;
  }
}

export async function updateBlog(
  blogId: string,
  payload: Partial<z.infer<typeof createBlogPayload>>
) {
  try {
    return await db
      .update(blogsTable)
      .set(payload)
      .where(eq(blogsTable.id, blogId))
      .returning()
      .then((res) => res[0]);
  } catch (error) {
    return undefined;
  }
}

export async function deleteBlog(blogId: string) {
  try {
    return await db
      .delete(blogsTable)
      .where(eq(blogsTable.id, blogId))
      .returning()
      .then((res) => res[0]);
  } catch (error) {
    return undefined;
  }
}
