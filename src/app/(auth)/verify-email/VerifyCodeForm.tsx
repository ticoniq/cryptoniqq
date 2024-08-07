"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { confirmEmailSchema, ConfirmEmailValues } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/LoadingButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { verifyEmail } from "./actions";

export function VerifyCodeForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ConfirmEmailValues>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: ConfirmEmailValues) {
    setError(undefined);
    startTransition(() => {
      startTransition(async () => {
        const { error } = await verifyEmail(values);
        if (error) {
          setError(error);
        }
      });
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center space-y-7"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-secondary dark:text-brand-secondary2 text-lg">Verification Code*</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={8}
                    className="w-full"
                    {...field}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
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
            className="w-full"
            size={"lg"}
          >
            Verify
          </LoadingButton>
        </form>
      </Form>
      <form>
        <Button className="w-full" variant="secondary">
          Resend Code
        </Button>
      </form>
      <form>
        <Button variant="link" className="p-0 font-normal">
          want to use another email? Log out now.
        </Button>
      </form>
    </div>
  )
}