import { api } from '@/api';
import { BlogForm, blogFormSchema } from '@/components/layout/blog-form';
import { handleResponse } from '@/lib/handle-response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/blogs/create')({
  component: Component,
});

function Component() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (values: blogFormSchema) => {
      const res = await api.blogs.create.$post({ json: values });

      return await handleResponse(res);
    },
    onSuccess: () => {
      toast('Success!', {
        description: 'New blog created',
      });

      queryClient.invalidateQueries({ queryKey: ['blogs'] });
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
        Add a new blog
      </h1>

      <BlogForm mutate={mutate} />
    </main>
  );
}
