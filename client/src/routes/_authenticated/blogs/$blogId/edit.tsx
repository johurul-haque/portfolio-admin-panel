import { api } from '@/api';
import { BlogForm, blogFormSchema } from '@/components/layout/blog-form';
import { handleResponse } from '@/lib/handle-response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/blogs/$blogId/edit')({
  loader: async ({ params: { blogId }, context: { queryClient } }) => {
    const data = await queryClient.fetchQuery({
      queryKey: [blogId],
      queryFn: async () => {
        const res = await api.blogs[':blogId'].$get({ param: { blogId } });

        return await handleResponse(res);
      },
      staleTime: 0,
    });

    return data;
  },
  component: Component,
});

function Component() {
  const blog = Route.useLoaderData();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      values: blogFormSchema & {
        content_in_md: string;
      }
    ) => {
      const res = await api.blogs[':blogId'].edit.$patch({
        json: values,
        param: { blogId: blog.id },
      });

      return await handleResponse(res);
    },
    onSuccess: () => {
      toast('Success!', {
        description: 'Blog updated successfully',
      });

      queryClient.invalidateQueries({ queryKey: ['blogs', blog.id] });
      navigate({ to: '/blogs' });
    },
    onError: (error) => {
      toast('Something went wrong', {
        description: error.message,
      });
    },
  });

  return (
    <main>
      <Link to="/blogs" className="flex gap-1.5 font-mono mb-6">
        <ChevronLeft />
        back
      </Link>

      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        Edit blog post
      </h1>

      <BlogForm mutate={mutate} defaultValues={blog} isPending={isPending} />
    </main>
  );
}
