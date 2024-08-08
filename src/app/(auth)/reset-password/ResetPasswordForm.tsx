"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ResetPasswordValues, resetPasswordSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { resetPasswordLink } from "./actions";
import { LoadingButton } from "@/components/LoadingButton";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { CircleCheck, XIcon } from "lucide-react";

export function ResetPasswordForm() {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ResetPasswordValues) {
    setError(undefined);
    startTransition(() => {
      startTransition(async () => {
        const { error, success } = await resetPasswordLink(values);
        if (success) {
          setSuccess(success);
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
        {success &&
          <Alert className="bg-green-600/20 border-l-8 border-brand-success flex items-center gap-2">
            <div className="h-8 w-8 bg-brand-success rounded-md flex justify-center items-center">
              <CircleCheck className="h-4 w-4" />
            </div>
            <AlertDescription>
              {success}
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