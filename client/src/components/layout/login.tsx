import { api } from '@/api';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleResponse } from '@/lib/handle-response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AlertDestructive } from '../ui/alert';

const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Username must be at least 4 characters.',
  }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters.' }),
});

type formSchema = z.infer<typeof formSchema>;

export function LoginForm() {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (values: formSchema) => {
      const res = await api.auth.login.$post({ json: values });

      await handleResponse(res);
    },
    onSuccess: () => {
      navigate({ to: '/' });
    },
  });

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  });

  return (
    <main className="container min-h-[max(650px,100svh)] grid place-items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <AlertDestructive message={error.message} />}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => mutate(values))}
              className="grid gap-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john"
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
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Password</FormLabel>

                    <PasswordInput field={field} isPending={isPending} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

function PasswordInput<T>({
  isPending,
  field,
}: {
  isPending: boolean;
  field: T;
}) {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="relative">
      <FormControl>
        <Input
          placeholder="Password"
          type={isShowing ? 'text' : 'password'}
          disabled={isPending}
          {...field}
        />
      </FormControl>

      <button
        type="button"
        onClick={() => setIsShowing(!isShowing)}
        className="absolute top-1/2 -translate-y-1/2 right-4 [&>svg]:stroke-current"
      >
        <span className="sr-only">
          {isShowing ? 'Show password' : 'Hide password'}
        </span>

        {isShowing ? (
          <EyeIcon strokeWidth={1.5} size={20} />
        ) : (
          <EyeOffIcon strokeWidth={1.5} size={20} />
        )}
      </button>
    </div>
  );
}
