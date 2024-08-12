"use client";
import { useTransition } from "react";
import { LoadingButton } from "@/components/LoadingButton";
import { disable2FA } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TwoFactorFormValues, twoFactorSchema } from "@/lib/validation/account";


export function Disable2FA() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleDisable2FA = async (values: TwoFactorFormValues) => {
    startTransition(() => {
      startTransition(async () => {
        try {
          const { error, success } = await disable2FA(values);
          if (success) {
            toast({
              description: success,
            });
          }
          if (error) {
            toast({
              variant: "destructive",
              description: error,
            });
          }
        } catch (error) {
          toast({
            variant: "destructive",
            description: "Something went wrong. Please try again!",
          });
        }
      });
    });
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="px-5 border-brand-critical text-brand-critical hover:bg-red-600/20"
            variant={"outline"}
            size={"sm"}
          >
            Disable two-factor authentication
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-96 px-6 py-8">
          <AlertDialogHeader className="flex justify-center items-center font-DMSans">
            <AlertDialogTitle className="text-xl">Verify your identity</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg">
              Enter the six-digit code from your two-factor authenticator app to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleDisable2FA)}
              className="font-DMSans"
            >
              <div className="mt-4 mb-10 flex justify-center items-center">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <AlertDialogFooter>
                <div className="flex flex-col w-full space-y-4">
                  <LoadingButton
                    loading={isPending}
                    className="w-full"
                  >
                    Verify
                  </LoadingButton>
                  <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
                </div>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}