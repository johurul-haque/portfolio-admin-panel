import { env } from '@/config/env';
import { db } from '@db';
import { hashSync } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { usersTable } from './schema/user';

(async () => {
  const username = 'johurul_haque';

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .then((res) => res[0]);

  if (user) {
    console.log('User already exists!');
    process.exit(0);
  }

  const result = await db
    .insert(usersTable)
    .values({
      username,
      password: hashSync(env.USER_PASSWORD, 10),
    })
    .returning();

  console.log(result);
  process.exit(0);
})();
