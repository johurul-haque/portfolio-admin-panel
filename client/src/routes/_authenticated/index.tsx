import { api } from '@/api';
import { DeleteProject } from '@/components/delete-project';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { handleResponse } from '@/lib/handle-response';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { PencilIcon } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/')({
  component: () => <App />,
});

function App() {
  const { data, isPending } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.projects.$get();

      return await handleResponse(res);
    },
  });

  return (
    <main>
      <div className="text-center">
        <Link
          to="/create"
          className={buttonVariants({ className: 'h-9 px-5' })}
        >
          add new
        </Link>
      </div>

      <Table className="my-6">
        <TableHeader>
          <TableRow className="lowercase font-mono">
            <TableHead>name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending &&
            Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={2} className="py-2 px-1">
                  <Skeleton className="w-full h-9" />
                </TableCell>
              </TableRow>
            ))}

          {data?.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="truncate">{project.name}</TableCell>
              <TableCell className="space-x-3 text-right">
                <Link
                  to="/$projectId/edit"
                  params={{ projectId: project.id }}
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'outline',
                  })}
                >
                  <span className="sr-only">Edit project</span>
                  <PencilIcon size={18} strokeWidth={1.7} />
                </Link>

                <DeleteProject projectId={project.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
