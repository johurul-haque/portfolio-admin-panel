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
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

export const Route = createFileRoute('/_authenticated/create')({
  component: Component,
});

function Component() {
  const queryClient = useQueryClient();

  const { error, isPending, mutate } = useMutation({
    mutationFn: async (formValues: z.infer<typeof createProjectSchema>) => {
      const res = await api.projects.create.$post({
        json: formValues,
      });

      return await handleResponse(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });

      toast('Success', {
        description: 'New project added successfully',
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
          <CardTitle>Add new project</CardTitle>
          <CardDescription>
            Fill in the details below, click save when you are done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <AlertDestructive message={error.message} />}

          <ProjectsForm mutate={mutate} isPending={isPending} />
        </CardContent>
      </Card>
    </main>
  );
}
