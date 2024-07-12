import { BlogForm } from '@/components/layout/blog-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/blogs/create')({
  component: Component,
});

function Component() {
  return (
    <main>
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        Add a new blog
      </h1>

      <BlogForm />
    </main>
  );
}
