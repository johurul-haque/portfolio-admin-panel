import { DeleteBlog } from '@/components/delete-blog';
import { buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createFileRoute, Link } from '@tanstack/react-router';
import { PencilIcon } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/blogs/')({
  component: Component,
});

function Component() {
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
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>2022 Jan 17</TableCell>
              <TableCell className="truncate">
                An Introduction of Javascript
              </TableCell>
              <TableCell className="space-x-3">
                <Link
                  to="/blogs/$blogsId/edit"
                  params={{ blogsId: i + '' }}
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'outline',
                  })}
                >
                  <span className="sr-only">Edit blog</span>
                  <PencilIcon size={18} strokeWidth={1.7} />
                </Link>

                <DeleteBlog blogId={i + ''} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
