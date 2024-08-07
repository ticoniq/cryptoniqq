"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { confirmEmailSchema, ConfirmEmailValues } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/LoadingButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { verifyEmail, resendVerificationEmail } from "./actions";
import { CustomLink } from "@/components/CustomLink";
import { logout } from "../action";

export function VerifyCodeForm() {
  const { toast } = useToast();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [isPendingSubmit, startTransitionSubmit] = useTransition();

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

  const resendForm = useForm();
  async function onSubmitEmailVerify() {
    setError(undefined);
    startTransitionSubmit(() => {
      startTransitionSubmit(async () => {
        const { error, success } = await resendVerificationEmail();
        if (success) {
          toast({
            title: "Verification code sent",
            description: "Please check your email for the new verification code.",
          })
        }
        if (error) {
          toast({
            title: "Error",
            description: error || "Failed to resend verification code",
            variant: "destructive",
          })
        }
      });
    });
  }

  return (
    <div className="flex flex-col gap-2 space-y-10">
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
      <Form {...resendForm}>
        <form
          onSubmit={resendForm.handleSubmit(onSubmitEmailVerify)}
        >
          <LoadingButton
            loading={isPendingSubmit}
            className="w-full"
            variant="secondary"
            size={"lg"}
          >
            Resend Code
          </LoadingButton>
        </form>
      </Form>

      <p className="text-muted-foreground text-center">
        want to use another email?{" "}
        <CustomLink
          href="/login"
          onClick={() => {
            logout();
          }}
          className="text-brand-primary font-semibold"
          textarea={'Log out now'}
          divClassName="border-brand-primary border-b-2"
        />
      </p>
    </div>
  )
}