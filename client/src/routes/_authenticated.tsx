import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      return { user: undefined };
    } catch (error) {
      return { user: null };
    }
  },
  component: () => <div>Hello /_authenticated!</div>,
});
