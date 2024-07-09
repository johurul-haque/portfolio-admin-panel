import 'dotenv/config';
import { z } from 'zod';

export const env = z
  .object({
    PORT: z.number().default(8080),
    DB_URI: z.string(),
  })
  .parse(process.env);
