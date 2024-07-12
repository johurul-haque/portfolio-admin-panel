import { userQueryOptions } from '@/api';
import { Header } from '@/components/header';
import { LoginForm } from '@/components/layout/login';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const user = await queryClient.fetchQuery(userQueryOptions);

      return { user };
    } catch (error) {
      return { user: null };
    }
  },
  component: () => <Component />,
});

function Component() {
  const { user } = Route.useRouteContext();

  if (!user) return <LoginForm />;

  return (
    <>
      <Header />

      <div className="container py-6">
        <Outlet />
      </div>
    </>
  );
}
