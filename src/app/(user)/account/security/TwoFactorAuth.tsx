"use client";
import { Suspense, lazy, useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import { Loader2, Smartphone } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
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

export default function TwoFactorAuth() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [twofactorCode, setTwofactorCode] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [otp, setOtp] = useState('');
  const { toast } = useToast();
  const { user } = useSession();

  const handleSetup = async () => {
    startTransition(async () => {
      try {
        const result = await setupTwoFactor();
        setQrCode(result.qrCode);
        setTwofactorCode(result.qrCodeBase64);
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Error setting up 2FA! Please try again.",
        });
      }
    });
  };

  const handleVerify = async () => {
    try {
      await verifyAndEnableTwoFactor(otp);
      toast({
        description: "Two-factor authentication enabled!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again!",
      });
    }
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
                  <TwoFaCode qrCode={qrCode} twofactorCode={twofactorCode} />
                )}
              </Suspense>
              <AlertDialogDescription>
                <span className="block text-brand-hover dark:text-brand-surface mb-1">
                  Enter the six-digit code from the application
                </span>
                <span className="block">After scanning the barcode above, the app will display a six-digit code that you can enter below. Upon successful activation, you will also be logged out of all other active sessions.</span>
              </AlertDialogDescription>
              <div>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                />
              </div>
              <AlertDialogFooter className="flex flex-row justify-end items-center gap-4">
                <AlertDialogCancel
                  className="w-fit"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleVerify}
                  className="w-fit"
                >
                  Enable
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </section>
  )
}