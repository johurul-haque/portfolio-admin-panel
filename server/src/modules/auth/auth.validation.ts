import { z } from 'zod';

export const loginPayload = z.object({
  username: z.string().min(4),
  password: z.string().min(5),
});
