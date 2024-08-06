"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SignUpValues, signUpSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { signUp } from "./actions";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CustomLink } from "@/components/CustomLink";

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
      startTransition(async () => {
        const { error } = await signUp(values);
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
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <span className="flex justify-start items-center gap-2">
                  <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Password*</FormLabel>
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
                <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Legal Full Name*</FormLabel>
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
              <FormControl>
                <Select
                  {...field}
                  defaultValue=""
                  onValueChange={field.onChange}
                >
                  <span className="flex justify-start items-center gap-2">
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Country*</FormLabel>
                    <FormMessage />
                  </span>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Country</SelectLabel>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                      <SelectItem value="Ghana">Ghana</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        {error && <p className="text-center text-destructive">{error}</p>}
        <p className="text-muted-foreground break-all">
          {"I certify that I am 18 years of age or older, I agree to the"}{" "}
          <CustomLink
            href="/terms"
            className="text-brand-primary font-base"
            textarea={'Terms of Service'}
            divClassName="border-brand-primary border-b-2"
          />{" "}
          and{" "}
          <CustomLink
            href="/privacy"
            className="text-brand-primary font-base"
            textarea={'Privacy Policy'}
            divClassName="border-brand-primary border-b-2"
          />
          .
        </p>
        <LoadingButton
          loading={isPending}
          className="w-full"
          size={"lg"}
        >
          Create free account
        </LoadingButton>
      </form>
    </Form>
  )
}