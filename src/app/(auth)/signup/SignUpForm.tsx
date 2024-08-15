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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { XIcon } from "lucide-react";

export function SignUpForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [defaultCountryName, setdefaultCountryName] = useState<CountryCode | undefined>("NG" as CountryCode);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/get-country/name');
        if (!response.ok) throw new Error(`Error fetching country`);
        const data = await response.json();
        
        setdefaultCountryName(data.country.country);
      } catch (error) {
        throw new Error(`Something went wrong`);
      } 
    }

    fetchData();
  }, []);


  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      confirmPassword: "",
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
                  <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">First name*</FormLabel>
                  <FormMessage />
                </span>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="First name*"
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
                  <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Last name*</FormLabel>
                  <FormMessage />
                </span>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Last name*"
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
                <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Phone number*</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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