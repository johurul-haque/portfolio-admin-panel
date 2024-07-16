import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createProjectSchema } from '../../../db/schema/project';
import { authMiddleware } from '../../middlewares/auth-middleware';
import {
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
} from './project.service';

export const projectsRoutes = new Hono()
  .get('/', async (c) => {
    const result = await getAllProjects();

    return c.json(result);
  })
  .get('/:projectId', async (c) => {
    const projectId = c.req.param('projectId');
    const result = await getSingleProject(projectId);

    if (!result) c.notFound();

    return c.json(result);
  })
  .use(authMiddleware)
  .post('/create', zValidator('json', createProjectSchema), async (c) => {
    const payload = c.req.valid('json');
    const result = await createProject(payload);

    return c.json(result);
  })
  .patch(
    '/:projectId/edit',
    zValidator('json', createProjectSchema.partial()),
    async (c) => {
      const projectId = c.req.param('projectId');
      const payload = c.req.valid('json');

      const result = await updateProject(projectId, payload);

      if (!result) c.notFound();

      return c.json(result);
    }
  )
  .delete('/:projectId/delete', async (c) => {
    const projectId = c.req.param('projectId');

    const result = await deleteProject(projectId);

    if (!result) c.notFound();

    return c.json(result);
  });
