import { api } from '@/api';
import { ProjectsForm } from '@/components/layout/projects-form';
import { AlertDestructive } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { handleResponse } from '@/lib/handle-response';
import { createProjectSchema } from '@server/db/schema/project';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

export const Route = createFileRoute('/_authenticated/$projectId/edit')({
  loader: async ({ params: { projectId }, context: { queryClient } }) => {
    const data = await queryClient.fetchQuery({
      queryKey: [projectId],
      queryFn: async () => {
        const res = await api.projects[':projectId'].$get({
          param: { projectId },
        });

        return await handleResponse(res);
      },
    });

    return data;
  },
  component: Component,
});

function Component() {
  const project = Route.useLoaderData();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { error, isPending, mutate } = useMutation({
    mutationFn: async (formValues: z.infer<typeof createProjectSchema>) => {
      const res = await api.projects[':projectId'].edit.$patch({
        json: formValues,
        param: { projectId: project.id },
      });

      return await handleResponse(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', project.id] });

      toast('Success', {
        description: 'Project updated successfully',
      });

      navigate({ to: '/' });
    },
    onError: (error) => {
      toast('Something went wrong', {
        description: error.message,
      });
    },
  });

  return (
    <main>
      <Link to="/" className="flex gap-1.5 font-mono">
        <ChevronLeft />
        back
      </Link>

      <Card className="mx-auto max-w-4xl my-6">
        <CardHeader>
          <CardTitle>Edit project</CardTitle>
          <CardDescription>
            Fill in the details below, click save when you are done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <AlertDestructive message={error.message} />}

          <ProjectsForm
            defaultValues={project}
            mutate={mutate}
            isPending={isPending}
          />
        </CardContent>
      </Card>
    </main>
  );
}
