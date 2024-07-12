import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/create')({
  component: Component,
});

function Component() {
  return (
    <main>
      <Link to="/" className="flex gap-1.5 font-mono">
        <ChevronLeft />
        back
      </Link>
    </main>
  );
}
