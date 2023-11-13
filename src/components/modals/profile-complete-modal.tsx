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
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { DatePicker } from "../ui/date-time-picker";

const formSchema = {
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  birthday: z.date(),
};

export const ProfileCompleteModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session = useSession();

  const form = useForm({
    resolver: zodResolver(z.object(formSchema)),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: "",
    },
  });

  const isAuthenticated = session.status === "authenticated";
  const isUserComplete = session.data?.user?.completed;
  const isModalOpen =
    isAuthenticated &&
    !isUserComplete &&
    searchParams.get("modal") === "complete-profile";

  if (isAuthenticated && !isUserComplete && !isModalOpen) {
    redirect("?modal=complete-profile");
  }

  const callbackUrl = searchParams.get("callbackUrl");
  const isLoading = form.formState.isSubmitting;

  const user = api.user.complete.useMutation();

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    birthday: Date;
    image: string;
  }) => {
    await user.mutateAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      birthday: data.birthday,
      image: data.image,
    });
    form.reset();
    router.push(callbackUrl ?? "/");
  };

  const handleClose = () => {
    form.reset();
    signOut({ callbackUrl: callbackUrl ?? "/" });
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
            <DialogTitle>Complete your profile</DialogTitle>
            <DialogDescription>This is important</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        placeholder="Email"
                        value={session.data?.user?.email!}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Prénom"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Nom"
                        {...field}
                      />
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
                        isLoading={isLoading}
                        selected={field.value as unknown as Date}
                        onSelect={field.onChange}
                        minAge={18}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <p>
                En cliquant sur Accepter et continuer, j&apos;accepte les
                Conditions générales, les Conditions de service relatives aux
                paiements, la Politique de non-discrimination et je reconnais
                avoir pris connaissance de la Politique de confidentialité de
                Domily.
              </p>
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
