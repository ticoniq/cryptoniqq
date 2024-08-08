"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InfoSchema, infoSchema } from "@/lib/validation/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
// import { login } from "./actions";
import { LoadingButton } from "@/components/LoadingButton";
import { CustomLink } from "@/components/CustomLink";
import { useSession } from "../_component/SessionProvider";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { RocketIcon, XIcon } from "lucide-react";
import { getFirstName, getLastName } from "@/lib/utils";
import { PhoneInput } from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Information() {
  const { user } = useSession();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const firstname = getFirstName(user.name);
  const lastname = getLastName(user.name);

  const form = useForm<InfoSchema>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      firstName: firstname,
      lastName: lastname,
      username: user.username || "",
      email: user.email,
      phone: user.phone || "",
    },
  });

  async function onSubmit(values: InfoSchema) {
    setError(undefined);
    startTransition(() => {
      startTransition(async () => {
        console.log(values);
        // const { error } = await login(values);
        // if (error) {
        //   setError(error);
        // }
      });
    });
  }


  return (
    <div>
      <h3 className="text-clamp-sm font-medium">Account Information</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 my-5 font-DMSans"
        >
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <span className="flex justify-start items-center gap-x-2">
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Legal first name</FormLabel>
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
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Legal last name</FormLabel>
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <span className="flex justify-start items-center gap-x-2">
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Email</FormLabel>
                    <FormMessage />
                  </span>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="email@example.com"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <span className="flex justify-start items-center gap-x-2">
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Username</FormLabel>
                    <FormMessage />
                  </span>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Username"
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
                    <div className="flex justify-between items-center gap-x-3">
                      <PhoneInput
                        {...field}
                        international
                        defaultCountry={"US"}
                        className="w-full"
                      />
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        className="rounded-lg h-10"
                        asChild
                      >
                        <Link href="/account">
                          verify
                        </Link>
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <LoadingButton
            loading={isPending}
            size={"sm"}
            className="w-full md:w-fit"
          >
            Update Info
          </LoadingButton>
        </form>
      </Form>
    </div>
  )
}