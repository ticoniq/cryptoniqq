"use client";
import { useSearchParams } from "next/navigation";
import { verifyTwoFactorCode } from "./actions";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TwoFactorFormValues, twoFactorSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/LoadingButton";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { XIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export function TwoFactorVerification() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
      userId: userId ?? undefined,
    },
  });

  async function onSubmit(values: TwoFactorFormValues) {
    setError(undefined);
    startTransition(() => {
      startTransition(async () => {
        setError(undefined);
        try {
          const { error, success } = await verifyTwoFactorCode(values);
          if (success) {
            toast({
              description: success,
            });
          }
          if (error) {
            setError(error);
          }
        } catch (error) {
          setError("An unexpected error occurred. Please try again.");
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <span className="flex justify-start items-center gap-2">
                <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Password*</FormLabel>
                <FormMessage />
              </span>
              <FormControl>
                <Input
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  {...field}
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