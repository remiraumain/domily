"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Image from "next/image";
import { api } from "~/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";

const formSchema = {
  email: z.string().email(),
};

export const SigninModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session = useSession();

  const form = useForm({
    resolver: zodResolver(z.object(formSchema)),
    defaultValues: {
      email: "",
    },
  });

  const isAuthenticated = session.status === "authenticated";
  const isModalOpen =
    !isAuthenticated && searchParams.get("modal") === "signin";
  const callbackUrl = searchParams.get("callbackUrl");
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: { email: string }) => {
    signIn("email", { email: data.email, callbackUrl: callbackUrl || "/" });
  };

  const handleClose = () => {
    form.reset();
    router.push(callbackUrl || "/");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="flex max-w-4xl overflow-hidden rounded-3xl p-0 md:rounded-3xl">
        <Image
          alt="test"
          src={"/images/test.gif"}
          width={200}
          height={200}
          className="hidden flex-1 sm:block "
          priority
        />
        <div className="flex-1">
          <DialogHeader>
            <DialogTitle>Connexion ou inscription</DialogTitle>
            <DialogDescription>Bienvenue sur Domily</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre adresse e-mail</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Entrer votre adresse e-mail"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button disabled={isLoading}>Continuer</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
