"use client";
import { Suspense, lazy, useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import { Loader2, Smartphone } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { setupTwoFactor, verifyAndEnableTwoFactor } from './actions';
import { TwoFaCode } from "./TwoFaCode";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "../../_component/SessionProvider";
import { Disable2FA } from "./Disable2FA";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/LoadingButton";
import { TwoFactorFormValues, twoFactorSchema } from "@/lib/validation/account";

export default function TwoFactorAuth() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [setupKey, setSetupkay] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, startLoadingTransition] = useTransition();
  const { toast } = useToast();
  const { user } = useSession();

  const handleSetup = async () => {
    startTransition(async () => {
      try {
        const result = await setupTwoFactor();
        setQrCode(result.qrCode);
        setSetupkay(result.setupKey);
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Error setting up 2FA! Please try again.",
        });
      }
    });
  };

  const form = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleVerify = async (values: TwoFactorFormValues) => {
    startLoadingTransition(() => {
      startLoadingTransition(async () => {
        const {error, success} = await verifyAndEnableTwoFactor(values);
        if (error) {
          toast({
            variant: "destructive",
            description: error,
          });
          return;
        }
        if (success) {
          toast({
            description: success,
          });
        }
      });
    });
  };

  return (
    <section className="font-DMSans">
      <h3 className="text-clamp-sm font-medium mb-2">Two-factor authentication</h3>
      <p className="text-brand-secondary dark:text-brand-secondary font-medium">Use an authentication app to get a verification code to log into your Cryptoniq account safely.</p>

      <Separator className="mt-7 mb-10" />
      <div className="flex flex-col gap-y-4 justify-between items-center sm:flex-row">
        <aside className="flex items-center gap-2">
          <Smartphone className="text-brand-secondary dark:text-brand-secondary" />
          <p>Authenticator App</p>
        </aside>
        {user.twoFactorEnabled ? (
          <Disable2FA />
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                onClick={handleSetup}
                className="px-5 border-brand-primary text-brand-primary hover:bg-blue-600/20"
                variant={"outline"}
                size={"sm"}
                disabled={isPending}
              >
                Setup two-factor authentication
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-2xl font-DMSans">
              <AlertDialogHeader>
                <AlertDialogTitle>2FA setup</AlertDialogTitle>
              </AlertDialogHeader>
              <Suspense fallback={
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="animate-spin" size={32} />
                </div>
              }>
                {isPending ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="animate-spin" size={32} />
                  </div>
                ) : (
                  <TwoFaCode qrCode={qrCode} setupKey={setupKey} />
                )}
              </Suspense>
              <AlertDialogDescription>
                <span className="block text-brand-hover dark:text-brand-surface mb-1">
                  Enter the six-digit code from the application
                </span>
                <span className="block">After scanning the barcode above, the app will display a six-digit code that you can enter below. Upon successful activation, you will also be logged out of all other active sessions.</span>
              </AlertDialogDescription>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleVerify)}
                  className="font-DMSans space-y-4"
                >
                  <div>
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="123456"
                              maxLength={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <AlertDialogFooter className="flex flex-row justify-end items-center gap-4">
                    <AlertDialogCancel
                      className="w-fit"
                    >
                      Cancel
                    </AlertDialogCancel>
                    <LoadingButton
                      loading={isLoading}
                      className="w-fit"
                      size={"lg"}
                    >
                      Enable
                    </LoadingButton>
                  </AlertDialogFooter>
                </form>
              </Form>

            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </section>
  )
}