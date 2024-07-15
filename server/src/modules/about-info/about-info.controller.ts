import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { aboutInfoPayload } from '../../../db/schema/about-info';
import { authMiddleware } from '../../middlewares/auth-middleware';
import { addInfo, getInfo, updateInfo } from './about-info.service';

export const aboutInfoRoutes = new Hono()
  .get('/', async (c) => {
    const result = await getInfo();

    if (!result) c.notFound();

    return c.json(result);
  })
  .use(authMiddleware)
  .post('/', zValidator('json', aboutInfoPayload), async (c) => {
    const payload = c.req.valid('json');

    const result = await addInfo(payload);

    return c.json(result);
  })
  .patch('/:id', zValidator('json', aboutInfoPayload.partial()), async (c) => {
    const payload = c.req.valid('json');
    const id = c.req.param('id');

    const result = await updateInfo(id, payload);

    if (!result) c.notFound();

    return c.json(result);
  });
