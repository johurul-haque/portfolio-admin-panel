import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { createProjectSchema, projectsTable } from '../../../db/schema/project';

export async function getAllProjects() {
  return await db.query.projects.findMany({
    columns: {
      id: true,
      name: true,
      intro: true,
      cover_img: true,
      live_site: true,
    },
  });
}

export async function getSingleProject(projectId: string) {
  try {
    return await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, projectId))
      .then((res) => res[0]);
  } catch (error) {
    return;
  }
}

export async function createProject(payload: createProjectSchema) {
  return await db
    .insert(projectsTable)
    .values(payload)
    .returning()
    .then((res) => res[0]);
}

export async function updateProject(
  projectId: string,
  payload: Partial<createProjectSchema>
) {
  try {
    return await db
      .update(projectsTable)
      .set(payload)
      .where(eq(projectsTable.id, projectId))
      .returning()
      .then((res) => res[0]);
  } catch (error) {
    return;
  }
}

export async function deleteProject(projectId: string) {
  try {
    return await db
      .delete(projectsTable)
      .where(eq(projectsTable.id, projectId))
      .returning()
      .then((res) => res[0]);
  } catch (error) {
    return;
  }
}
