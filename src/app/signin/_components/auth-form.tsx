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
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useFormSignIn } from "~/hooks/use-signin-store";

interface AuthFormProps {
  formSchema: z.ZodObject<any, any, any>;
  result: any;
}

export const AuthForm = ({ formSchema, result }: AuthFormProps) => {
  const { setProvider } = useFormSignIn();
  const defaultValues = Object.keys(formSchema.shape).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as any);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    result(data);
  };

  const handleChange: React.FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.value === "") {
      setProvider("all");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange}>
        {Object.keys(formSchema.shape).map((key) => {
          const field = formSchema.shape[key];
          const label = key.charAt(0).toUpperCase() + key.slice(1);
          return (
            <FormField
              key={key}
              control={form.control}
              name={key}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={label}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button disabled={isLoading}>Register</Button>
      </form>
    </Form>
  );
};
