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
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useFormSignIn } from "~/hooks/use-signin-store";
import { api } from "~/trpc/react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

const formSchema = z.object({
  email: z.string().email(),
});

export const SignInForm = () => {
  const { setForm, setEmail, type, email } = useFormSignIn();
  const user = api.user.isUserByEmail.useMutation();
  const { data } = user;

  useEffect(() => {
    if (data !== undefined) {
      setForm(data ? "login" : "register");
    }
  }, [data]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (data: any) => {
    user.mutate({ email: data.email });
    setEmail(data.email);
  };

  // Render the form based on the type
  if (type === "login") {
    return <LoginForm />;
  }

  if (type === "register") {
    return <RegisterForm />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>Continuer</Button>
      </form>
    </Form>
  );
};
