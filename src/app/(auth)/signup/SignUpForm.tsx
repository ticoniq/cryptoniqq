"use client";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SignUpValues, signUpSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { signUp } from "./actions";
import { PasswordInput } from "@/components/PasswordInput";
import { LoadingButton } from "@/components/LoadingButton";
import { CustomLink } from "@/components/CustomLink";
import { PhoneInput } from "@/components/PhoneInput";
import { CountryCode } from "libphonenumber-js";

export function SignUpForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [defaultCountryName, setdefaultCountryName] = useState<CountryCode | undefined>("NG" as CountryCode);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('/api/get-country/name');
        if (!response.ok) throw new Error(`Error fetching country`);
        const data = await response.json();
        if (data.country) setdefaultCountryName(data.country);
      } catch (error) {
        throw new Error(`Something went wrong`);
      }
    };
    fetchCountry();
  }, []);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
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
        <div className="grid grid-cols-1 space-y-7 md:grid-cols-2 md:gap-x-5 md:space-y-0">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <span className="flex justify-start items-center gap-x-2">
                  <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Legal first name*</FormLabel>
                  <FormMessage />
                </span>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Legal first name*"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <span className="flex justify-start items-center gap-x-2">
                  <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Legal last name*</FormLabel>
                  <FormMessage />
                </span>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Legal last name*"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <span className="flex justify-start items-center gap-2">
                <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Phone*</FormLabel>
                <FormMessage />
              </span>
              <FormControl>
                <PhoneInput
                  {...field}
                  international
                  defaultCountry={defaultCountryName}
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