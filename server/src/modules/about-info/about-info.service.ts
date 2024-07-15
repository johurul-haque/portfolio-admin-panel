import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import {
  aboutInfoPayload,
  aboutInfoTable,
} from '../../../db/schema/about-info';

export async function getInfo() {
  return db.query.aboutInfo.findFirst();
}

export async function addInfo(payload: aboutInfoPayload) {
  return db
    .insert(aboutInfoTable)
    .values(payload)
    .returning()
    .then((res) => res[0]);
}

export async function updateInfo(
  id: string,
  payload: Partial<aboutInfoPayload>
) {
  try {
    return await db
      .update(aboutInfoTable)
      .set(payload)
      .where(eq(aboutInfoTable.id, id))
      .returning()
      .then((res) => res[0]);
  } catch (error) {
    return undefined;
  }
}
