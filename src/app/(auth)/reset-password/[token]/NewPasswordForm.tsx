"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { NewPasswordValues, newPasswordSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPassword } from "./actions";
import { LoadingButton } from "@/components/LoadingButton";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { XIcon } from "lucide-react";
import { PasswordInput } from "@/components/PasswordInput";
import { Paths } from "@/lib/constants";
import { redirect } from "next/navigation";

interface NewPasswordFormProps {
  token: string;
}

export function NewPasswordForm({ token }: NewPasswordFormProps) {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange",
    defaultValues: {
      token: token,
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: NewPasswordValues) {
    setError(undefined);
    startTransition(() => {
      startTransition(async () => {
        const { error, success } = await newPassword(values);
        if (success) {
          redirect(Paths.Dashboard);
        }
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
              <span className="flex justify-start items-center gap-2">
                <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Confirm Password*</FormLabel>
                <FormMessage />
              </span>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="Please re-enter your password."
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
          Reset Password
        </LoadingButton>
      </form>
    </Form>
  )
}