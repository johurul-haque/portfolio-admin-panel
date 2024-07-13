import { BlogForm } from '@/components/layout/blog-form';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/blogs/create')({
  component: Component,
});

function Component() {
  return (
    <main>
      <Link to="/blogs" className="flex gap-1.5 font-mono mb-6">
        <ChevronLeft />
        back
      </Link>

      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        Add a new blog
      </h1>

      <BlogForm />
    </main>
  );
}
