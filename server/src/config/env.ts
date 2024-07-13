import 'dotenv/config';
import { z } from 'zod';

export const env = z
  .object({
    PORT: z.coerce.number().default(8080),
    DB_URI: z.string(),
    JWT_SECRET: z.string(),
    USER_PASSWORD: z.string(),
  })
  .parse(process.env);
