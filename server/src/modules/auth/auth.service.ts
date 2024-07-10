import { env } from '@/config/env';
import { db } from '@db';
import { usersTable } from '@db/schema/user';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';
import { z } from 'zod';
import { loginPayload } from './auth.validation';

export async function login(payload: z.infer<typeof loginPayload>) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, payload.username))
    .then((res) => res[0]);

  if (!user) {
    throw new HTTPException(404);
  }

  const isMatching = bcrypt.compare(payload.password, user.password);

  if (!isMatching) {
    throw new HTTPException(403, { message: 'Incorrect password!' });
  }

  const token = await sign({ username: user.username }, env.JWT_SECRET);

  return { username: user.username, token };
}
