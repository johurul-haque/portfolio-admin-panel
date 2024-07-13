import { api } from '@/api';
import { DeleteBlog } from '@/components/delete-blog';
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

export const Route = createFileRoute('/_authenticated/blogs/')({
  component: Component,
});

function Component() {
  const { data, error, isPending } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await api.blogs.$get();

      return await handleResponse(res);
    },
  });

  if (error)
    return 'An error occurred. Try refreshing the page.' + error.message;

  return (
    <main>
      <div className="text-center">
        <Link
          to="/blogs/create"
          className={buttonVariants({ className: 'h-9 px-5' })}
        >
          add new
        </Link>
      </div>
      <Table className="my-6">
        <TableHeader>
          <TableRow className="lowercase font-mono">
            <TableHead>Published Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending &&
            Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={3} className="py-2 px-1">
                  <Skeleton className="w-full h-9" />
                </TableCell>
              </TableRow>
            ))}

          {data?.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>{blog.publish_date}</TableCell>
              <TableCell className="truncate">{blog.title}</TableCell>
              <TableCell className="space-x-3">
                <Link
                  to="/blogs/$blogId/edit"
                  params={{ blogId: blog.id }}
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'outline',
                  })}
                >
                  <span className="sr-only">Edit blog</span>
                  <PencilIcon size={18} strokeWidth={1.7} />
                </Link>

                <DeleteBlog blogId={blog.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
