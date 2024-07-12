import { BlogForm } from '@/components/layout/blog-form';
import { createFileRoute } from '@tanstack/react-router';

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
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        Edit blog post
      </h1>

      <BlogForm />
    </main>
  );
}
