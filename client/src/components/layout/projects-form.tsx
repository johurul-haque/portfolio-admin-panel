import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, inputStyle } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProjectSchema } from '@server/db/schema/project';
import { UseMutateFunction } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const imageSchema = z.object({
  src: z.string(),
  caption: z.string(),
});

type imageSchema = z.infer<typeof imageSchema>;

const formSchema = createProjectSchema.extend({
  desktop_view: z.object({ value: imageSchema }).array(),
  mobile_view: z.object({ value: imageSchema }).array(),
});

type formSchema = z.infer<typeof formSchema>;

type Project = z.infer<typeof createProjectSchema>;

type PropsType = {
  defaultValues?: Project;
  isPending: boolean;
  mutate: UseMutateFunction<unknown, Error, Project, unknown>;
};

export function ProjectsForm({ isPending, mutate, defaultValues }: PropsType) {
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      desktop_view: !defaultValues
        ? [{ value: {} }]
        : JSON.parse(defaultValues.desktop_view)?.map((value: imageSchema) => ({
            value,
          })),
      mobile_view: !defaultValues
        ? [{ value: {} }]
        : JSON.parse(defaultValues.mobile_view)?.map((value: imageSchema) => ({
            value,
          })),
    },
  });

  const desktopViewArray = useFieldArray({
    name: 'desktop_view',
    control: form.control,
  });

  const mobileViewArray = useFieldArray({
    control: form.control,
    name: 'mobile_view',
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((formValues) => {
          const desktop_view = formValues.desktop_view.map(
            ({ value }) => value
          );

          const mobile_view = formValues.mobile_view.map(({ value }) => value);

          mutate({
            ...formValues,
            desktop_view: JSON.stringify(desktop_view),
            mobile_view: JSON.stringify(mobile_view),
          });
        })}
        className="grid items-start sm:grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Inventory Management System"
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
          name="technologies"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Technologies used</FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. Hono, Drizzle, React"
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
          name="cover_img"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Cover image</FormLabel>

              <FormControl>
                <Input
                  placeholder="URL of cover image"
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
          name="intro"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Intro</FormLabel>

              <FormControl>
                <Input
                  placeholder="Short introduction about the project."
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
          name="short_description"
          render={({ field }) => (
            <FormItem className="grid gap-2 col-span-full">
              <FormLabel>Short description</FormLabel>
              <FormControl>
                <textarea
                  className={inputStyle({ className: 'resize-y h-24' })}
                  placeholder="Brief description about the project."
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
          name="source_code"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Source code</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="URL of the source code"
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
          name="live_site"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Live site</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Preview site link"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div
          className={cn('border dark:border-neutral-800 rounded-md p-4', {
            'col-span-full': desktopViewArray.fields.length > 1,
          })}
        >
          <div className="text-sm font-medium mb-2">Desktop view images</div>

          <div
            className={cn('grid', {
              'grid-cols-2 justify-start gap-4':
                desktopViewArray.fields.length > 1,
            })}
          >
            {desktopViewArray.fields.map((field, i, fields) => (
              <fieldset key={field.id}>
                <div className="flex items-center justify-between">
                  <legend className="text-sm font-mono">image {i + 1}</legend>

                  {fields.length > 1 && (
                    <Button
                      variant={'outline'}
                      size={'icon'}
                      title="Remove field"
                      className="h-7 w-7"
                      onClick={() => desktopViewArray.remove(i)}
                    >
                      <span className="sr-only">Remove field</span>
                      <Trash2Icon size={13} strokeWidth={1.5} />
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  key={field.id}
                  name={`desktop_view.${i}.value.src`}
                  render={({ field }) => (
                    <FormItem className="grid gap-1">
                      <FormLabel className="sr-only">src</FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          placeholder="src"
                          className="h-9"
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
                  key={field.id}
                  name={`desktop_view.${i}.value.caption`}
                  render={({ field }) => (
                    <FormItem className="grid gap-1">
                      <FormLabel className="sr-only">caption</FormLabel>

                      <FormControl>
                        <textarea
                          className={inputStyle({
                            className: 'resize-y min-h-10',
                          })}
                          placeholder="caption"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3.5 font-mono lowercase"
            onClick={() =>
              desktopViewArray.append({
                value: { src: '', caption: '' },
              })
            }
          >
            Add image
          </Button>
        </div>

        <div
          className={cn('border dark:border-neutral-800 rounded-md p-4', {
            'col-span-full': mobileViewArray.fields.length > 1,
          })}
        >
          <div className="text-sm font-medium mb-2">Mobile view images</div>

          <div
            className={cn('grid', {
              'grid-cols-2 justify-start gap-4':
                mobileViewArray.fields.length > 1,
            })}
          >
            {mobileViewArray.fields.map((field, i, fields) => (
              <fieldset key={field.id}>
                <div className="flex items-center justify-between">
                  <legend className="text-sm font-mono">image {i + 1}</legend>

                  {fields.length > 1 && (
                    <Button
                      variant={'outline'}
                      size={'icon'}
                      title="Remove field"
                      className="h-7 w-7"
                      onClick={() => mobileViewArray.remove(i)}
                    >
                      <span className="sr-only">Remove field</span>
                      <Trash2Icon size={13} strokeWidth={1.5} />
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  key={field.id}
                  name={`mobile_view.${i}.value.src`}
                  render={({ field }) => (
                    <FormItem className="grid gap-1">
                      <FormLabel className="sr-only">src</FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          placeholder="src"
                          className="h-9"
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
                  key={field.id}
                  name={`mobile_view.${i}.value.caption`}
                  render={({ field }) => (
                    <FormItem className="grid gap-1">
                      <FormLabel className="sr-only">caption</FormLabel>

                      <FormControl>
                        <textarea
                          className={inputStyle({
                            className: 'resize-y min-h-10',
                          })}
                          placeholder="caption"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3.5 font-mono lowercase"
            onClick={() =>
              mobileViewArray.append({
                value: { src: '', caption: '' },
              })
            }
          >
            Add image
          </Button>
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="ml-auto col-span-full"
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
