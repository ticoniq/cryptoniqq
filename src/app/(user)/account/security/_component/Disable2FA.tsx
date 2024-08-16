"use client";
import { useTransition } from "react";
import { LoadingButton } from "@/components/LoadingButton";
import { disable2FA, disable2FARecovery } from "../actions";
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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TwoFactorFormValues,
  twoFactorSchema,
  TwoFactorRecoveryCodeSchema,
  twoFactorRecoveryCodeSchema
} from "@/lib/validation/account";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";

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
      });
    });
  };

  const formRecovery = useForm<TwoFactorRecoveryCodeSchema>({
    resolver: zodResolver(twoFactorRecoveryCodeSchema),
    defaultValues: {
      recoveryCode: "",
    },
  });

  const handleDisable2FARecovery = async (values: TwoFactorRecoveryCodeSchema) => {
    startTransition(() => {
      startTransition(async () => {
        console.log(values);
        const { error, success } = await disable2FARecovery(values);
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
          <Tabs defaultValue="2fa-token" className="w-full">
            <TabsContent value="2fa-token">
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
              <TabsList className="w-full mt-4">
                <TabsTrigger value="recovery-codes">Lost your 2FA token? Use a recovery code</TabsTrigger>
              </TabsList>
            </TabsContent>
            <TabsContent value="recovery-codes">
              <AlertDialogHeader className="flex justify-center items-center font-DMSans">
                <AlertDialogTitle className="text-xl">2FA Recovery Code</AlertDialogTitle>
                <AlertDialogDescription className="text-center text-lg">
                  Enter a recovery code to verify your identity. Recovery codes are single-use.

                  Working on this feature...
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Form {...formRecovery}>
                <form
                  onSubmit={formRecovery.handleSubmit(handleDisable2FARecovery)}
                  className="font-DMSans"
                >
                  <div className="mt-6 mb-10">
                    <FormField
                      control={formRecovery.control}
                      name="recoveryCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Recovery code"
                              {...field}
                            />
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
              <TabsList className="w-full mt-4">
                <TabsTrigger
                  value="2fa-token"
                  className="bg-transparent"
                >
                  Enter an authentication token
                </TabsTrigger>
              </TabsList>
            </TabsContent>
          </Tabs>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}