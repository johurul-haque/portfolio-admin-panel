import { BlogForm } from '@/components/layout/blog-form';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/blogs/$blogsId/edit')({
  loader: ({ params }) => {
    return params.blogsId;
  },
  component: Component,
});

function Component() {
  const blogId = Route.useLoaderData();
  console.log(blogId);

  return (
    <main>
      <Link to="/blogs" className="flex gap-1.5 font-mono mb-6">
        <ChevronLeft />
        back
      </Link>

      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        Edit blog post
      </h1>

      <BlogForm />
    </main>
  );
}
