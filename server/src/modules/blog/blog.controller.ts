import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createBlogPayload } from '../../../db/schema/blog';
import { authMiddleware } from '../../middlewares/auth-middleware';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from './blog.service';

export const blogRoutes = new Hono()
  .get('/', async (c) => {
    const result = await getAllBlogs();

    return c.json(result);
  })
  .get('/:blogId', async (c) => {
    const blogId = c.req.param('blogId');

    const result = await getSingleBlog(blogId);

    if (!result) return c.notFound();

    return c.json(result);
  })
  .use(authMiddleware)
  .post('/create', zValidator('json', createBlogPayload), async (c) => {
    const payload = c.req.valid('json');

    const result = await createBlog(payload);

    return c.json(result, 201);
  })
  .patch(
    '/:blogId/edit',
    zValidator('json', createBlogPayload.partial()),
    async (c) => {
      const blogId = c.req.param('blogId');
      const payload = c.req.valid('json');

      const result = await updateBlog(blogId, payload);

      if (!result) return c.notFound();

      return c.json(result, 201);
    }
  )
  .delete('/:blogId', async (c) => {
    const blogId = c.req.param('blogId');

    const result = await deleteBlog(blogId);

    if (!result) return c.notFound();

    return c.json(result);
  });
