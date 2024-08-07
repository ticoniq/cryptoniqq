"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoginValues, loginSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { login } from "./actions";
import { PasswordInput } from "@/components/PasswordInput";
import { LoadingButton } from "@/components/LoadingButton";
import { CustomLink } from "@/components/CustomLink";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { RocketIcon, XIcon } from "lucide-react";

export function LoginForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setError(undefined);
    startTransition(() => {
      startTransition(async () => {
        const { error } = await login(values);
        if (error) {
          setError(error);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-7 font-DMSans"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <span className="flex justify-start items-center gap-2">
                <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Email*</FormLabel>
                <FormMessage />
              </span>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Please enter your email."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <span className="flex justify-start items-center gap-2">
                  <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Password*</FormLabel>
                  <FormMessage />
                </span>
                <CustomLink
                  href="/reset-password"
                  className="text-brand-primary font-semibold"
                  textarea={'Forgot your password?'}
                  size={"sm"}
                  divClassName="border-brand-primary border-b-2"
                />
              </div>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="Please enter a password."
                />
              </FormControl>
            </FormItem>
          )}
        />
        {error &&
          <Alert className="bg-red-600/20 border-l-8 border-brand-critical flex items-center gap-2">
            <div className="h-8 w-8 bg-brand-critical rounded-md flex justify-center items-center">
              <XIcon className="h-4 w-4" />
            </div>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        }
        <LoadingButton
          loading={isPending}
          disabled={!form.formState.isValid}
          className="w-full"
          size={"lg"}
        >
          Login
        </LoadingButton>
      </form>
    </Form>
  )
}