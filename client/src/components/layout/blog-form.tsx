import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseMutateFunction } from '@tanstack/react-query';
import { JSONContent } from 'novel';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Editor } from '../editor';

const blogFormSchema = z.object({
  title: z.string(),
  content: z.unknown().transform((value) => JSON.stringify(value)),
});

export type blogFormSchema = z.infer<typeof blogFormSchema>;

type PropsType = {
  defaultValues?: blogFormSchema;
  isPending: boolean;
  mutate: UseMutateFunction<
    unknown,
    Error,
    {
      title: string;
      content: string;
    } & {
      content_in_md: string;
    },
    unknown
  >;
};

export function BlogForm({ defaultValues, mutate, isPending }: PropsType) {
  const [contentInMd, setContentInMd] = useState('');

  const form = useForm<blogFormSchema>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      ...defaultValues,
      content: defaultValues ? JSON.parse(defaultValues.content) : undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          mutate({ ...values, content_in_md: contentInMd })
        )}
        className="space-y-6 mt-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="WebHooks - An introduction"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor
                  onChange={field.onChange}
                  setContentInMd={setContentInMd}
                  value={field.value as unknown as JSONContent}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>Use markdown formats</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
