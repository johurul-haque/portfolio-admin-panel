import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from '../src/config/env';

(async () => {
  const migrationClient = postgres(env.DB_URI, { max: 1 });
  await migrate(drizzle(migrationClient), {
    migrationsFolder: 'server/db/migrations',
  });

  console.log('Migration completed.');
  process.exit(0);
})();
