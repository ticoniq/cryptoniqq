"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SignUpValues, signUpSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
// import { signUp } from "./actions";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";
import { CountrySelect } from "@/components/CountrySelect";

export function SignUpForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      country: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpValues) {
    setError(undefined);
    startTransition(() => {
      console.log(values);
      // startTransition(async () => {
      //   const { error } = await signUp(values);
      //   if (error) {
      //     setError(error);
      //   }
      // });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 font-DMSans"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <span className="flex justify-start items-center gap-2">
                <FormLabel className="text-lg">Email</FormLabel>
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
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <span className="flex justify-start items-center gap-2">
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormMessage />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </span>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Please enter a password."
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Please re-enter your password."
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <span className="flex justify-start items-center gap-2">
                <FormLabel className="text-lg">FullName</FormLabel>
                <FormMessage />
              </span>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Please enter your full name."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <span className="flex justify-start items-center gap-2">
                <FormLabel className="text-lg">Country</FormLabel>
                <FormMessage />
              </span>
              <FormControl>
                <CountrySelect
                  {...field}
                  className="bg-brand-surface dark:bg-brand-hover"
                  whitelist={["GH", "NG"]}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {error && <p className="text-center text-destructive">{error}</p>}
        <LoadingButton
          loading={isPending}
          className="w-full"
        >
          Create account
        </LoadingButton>
      </form>
    </Form>
  )
}