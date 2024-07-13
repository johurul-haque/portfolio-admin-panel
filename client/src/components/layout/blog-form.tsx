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
import { EditorContent, EditorRoot, JSONContent } from 'novel';
import { StarterKit, handleCommandNavigation } from 'novel/extensions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import './prosemirror.css';

const formSchema = z.object({
  title: z.string(),
  content: z.unknown().transform((value) => JSON.stringify(value)),
});

type formSchema = z.infer<typeof formSchema>;

export function BlogForm({ defaultValues }: { defaultValues?: formSchema }) {
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      content: defaultValues ? JSON.parse(defaultValues.content) : undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => console.log(values))}
        className="space-y-6 mt-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Title</FormLabel>
              <FormControl>
                <Input placeholder="WebHooks - An introduction" {...field} />
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
                <div className="border rounded-md border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
                  <EditorRoot>
                    <EditorContent
                      extensions={[StarterKit]}
                      initialContent={field.value as unknown as JSONContent}
                      editorProps={{
                        handleDOMEvents: {
                          keydown: (_view, event) =>
                            handleCommandNavigation(event),
                        },
                        attributes: {
                          class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
                        },
                      }}
                      onUpdate={({ editor }) => {
                        field.onChange(editor.getJSON());
                      }}
                    />
                  </EditorRoot>
                </div>
              </FormControl>
              <FormDescription>Use markdown formats</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
