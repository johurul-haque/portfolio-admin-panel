import { api } from '@/api';
import { Editor } from '@/components/editor';
import { AlertDestructive } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { handleResponse } from '@/lib/handle-response';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { aboutInfoPayload } from '@server/db/schema/about-info';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Trash2Icon } from 'lucide-react';
import { JSONContent } from 'novel';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const Route = createFileRoute('/_authenticated/personal/')({
  loader: async ({ context: { queryClient } }) => {
    const data = await queryClient.fetchQuery({
      queryKey: ['about-info'],
      queryFn: async () => {
        const res = await api['about-info'].$get();

        return await handleResponse(res);
      },
    });

    return data;
  },
  component: Component,
});

const formSchema = z.object({
  designation: z.string(),
  about: z.unknown().transform((value) => JSON.stringify(value)),
  photo: z.string(),
  skills: z.string(),
  contacts: z.object({ value: z.string() }).array(),
});

aboutInfoPayload;

type formSchema = z.infer<typeof formSchema>;

function Component() {
  const data = Route.useLoaderData();
  const { queryClient } = Route.useRouteContext();

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...data,
      about: JSON.parse(data.about),
      contacts: data.contacts.map((contact) => ({ value: contact })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'contacts',
    control: form.control,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: async (formValues: formSchema) => {
      const contacts = formValues.contacts.map(({ value }) => value);

      const res = await api['about-info'][':id'].$patch({
        json: {
          ...formValues,
          contacts,
        },
        param: { id: data.id },
      });

      return await handleResponse(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-info'] });

      toast('Success', {
        description: 'Updated about information.',
      });
    },
  });

  return (
    <main>
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>About page info</CardTitle>
          <CardDescription>
            Enter the details below, click save when you are done
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <AlertDestructive message={error.message} />}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => mutate(values))}
              className="grid items-start grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Your designation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Software Engineer"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Your photo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Photo URL"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                {fields.map((field, i) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`contacts.${i}.value`}
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <div className="space-y-1">
                          <FormLabel className={cn(i !== 0 && 'sr-only')}>
                            Contacts
                          </FormLabel>

                          <FormDescription className={cn(i !== 0 && 'sr-only')}>
                            Add email, links to linkedin or social media
                            profiles.
                          </FormDescription>
                        </div>

                        <div className="relative group">
                          <FormControl>
                            <Input
                              type={i ? 'url' : 'email'}
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>

                          {i > 0 && (
                            <Button
                              variant={'outline'}
                              size={'icon'}
                              title="Remove field"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                              onClick={() => remove(i)}
                            >
                              <span className="sr-only">Remove field</span>
                              <Trash2Icon size={13} strokeWidth={1.5} />
                            </Button>
                          )}
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => append({ value: '' })}
                >
                  Add URL
                </Button>
              </div>

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <div className="space-y-1">
                      <FormLabel>Your skills</FormLabel>
                      <FormDescription>
                        Write your skills separated by comma
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="e.g. Golang, Typescript"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="grid gap-2 col-span-full">
                    <div className="space-y-1">
                      <FormLabel>About me</FormLabel>
                      <FormDescription>
                        Write everything about me. About{' '}
                        <span className="underline">Johurul</span> only
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Editor
                        onChange={field.onChange}
                        value={field.value as unknown as JSONContent}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isPending}
                type="submit"
                className="ml-auto col-span-full"
              >
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
