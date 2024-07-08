import type { ApiRoutes } from '@server/app';
import { hc } from 'hono/client';

export const { api } = hc<ApiRoutes>('/');
