import { handleResponse } from '@/lib/handle-response';
import type { ApiRoutes } from '@server/app';
import { queryOptions } from '@tanstack/react-query';
import { hc } from 'hono/client';

export const { api } = hc<ApiRoutes>('/');

export const userQueryOptions = queryOptions({
  queryKey: ['user'],
  queryFn: async () => {
    const res = await api.auth.profile.$get();

    return handleResponse(res);
  },
  staleTime: Infinity,
});
