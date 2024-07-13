import { api } from '@/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { handleResponse } from '@/lib/handle-response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Button, buttonVariants } from './ui/button';

export function DeleteBlog({ blogId }: { blogId: string }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await api.blogs[':blogId'].$delete({ param: { blogId } });

      return await handleResponse(res);
    },
    onSuccess: () => {
      toast('Success!', {
        description: 'Blog has been deleted.',
      });

      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      toast('Something went wrong', {
        description: error.message,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'destructive'}
          size={'icon'}
          className="bg-red-100 text-red-800 hover:text-red-100"
        >
          <span className="sr-only">Delete blog</span>
          <Trash2Icon strokeWidth={1.7} size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            store and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => mutate()}
            className={buttonVariants({ variant: 'destructive' })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
