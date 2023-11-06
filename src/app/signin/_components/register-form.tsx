"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { DatePicker } from "~/components/ui/date-time-picker";
import { api } from "~/trpc/react";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  firstname: z.string().min(2).max(100),
  lastname: z.string().min(2).max(100),
  birthday: z.date(),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const RegisterForm = () => {
  const { email } = useFormSignIn();
  const user = api.user.create.useMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      birthday: "",
      email: email,
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const login = () => {
    signIn("credentials", {
      email: form.getValues("email"),
      password: form.getValues("password"),
      callbackUrl: "/",
    });
  };

  const onSubmit = (data: {
    firstname: string;
    lastname: string;
    birthday: string;
    email: string;
    password: string;
  }) => {
    user.mutate({
      firstName: data.firstname,
      lastName: data.lastname,
      birthday: new Date(data.birthday),
      email: data.email,
      password: data.password,
    });
    if (user.isSuccess) {
      login();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="firstname"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Prénom" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="lastname"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Nom" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="birthday"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de naissance</FormLabel>
              <FormControl>
                <DatePicker
                  selected={field.value as unknown as Date}
                  onSelect={field.onChange}
                  minAge={18}
                />
              </FormControl>
            </FormItem>
          )}
        />
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
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <p>
          En cliquant sur Accepter et continuer, j&apos;accepte les Conditions
          générales, les Conditions de service relatives aux paiements, la
          Politique de non-discrimination et je reconnais avoir pris
          connaissance de la Politique de confidentialité de Domily.
        </p>
        <Button disabled={isLoading}>Accepter et continuer</Button>
      </form>
    </Form>
  );
};
