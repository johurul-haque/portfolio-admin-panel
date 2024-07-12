import { buttonVariants } from '@/components/ui/button';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: () => <App />,
});

function App() {
  return (
    <main>
      <div className="text-center">
        <Link
          to="/create"
          className={buttonVariants({ className: 'h-9 px-5' })}
        >
          add new
        </Link>
      </div>
    </main>
  );
}
