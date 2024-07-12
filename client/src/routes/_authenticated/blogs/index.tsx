import { buttonVariants } from '@/components/ui/button';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/blogs/')({
  component: Component,
});

function Component() {
  return (
    <main>
      <div className="text-center">
        <Link
          to="/blogs/create"
          className={buttonVariants({ className: 'h-9 px-5' })}
        >
          add new
        </Link>
      </div>
    </main>
  );
}
