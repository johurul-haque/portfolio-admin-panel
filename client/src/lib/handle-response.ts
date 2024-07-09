import { ClientResponse } from 'hono/client';

export async function handleResponse<T>(res: ClientResponse<T>) {
  if (!res.ok) {
    throw new Error((await res.text()) || res.statusText);
  }

  return res.json() as T;
}
