"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useFormSignIn } from "~/hooks/use-signin-store";
import type { ProviderType } from "~/hooks/use-signin-store";
import { api } from "~/trpc/react";

const formSchema = z.object({
  email: z.string().email(),
});

export const SigninForm = () => {
  const { setForm, reset, setProvider, type } = useFormSignIn();
  const user = api.user.shouldRegister.useMutation();
  const { data } = user;

  useEffect(() => {
    if (user.isSuccess) {
      if (user.data.provider !== undefined) {
        setProvider(user.data.provider);
      }
    }
  }, [user]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    user.mutate({ email: data.email });
  };

  const handleChange: React.FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.value === "") {
      setProvider("all");
    }
    console.log(e.target.value);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={(e) => handleChange(e)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>Register</Button>
      </form>
    </Form>
  );
};
