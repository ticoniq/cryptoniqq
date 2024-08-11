"use client";
import { useTransition } from "react";
import { LoadingButton } from "@/components/LoadingButton";
import { disable2FA } from "./actions";
import { useToast } from "@/components/ui/use-toast";

export function Disable2FA() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDisable2FA = async () => {
    startTransition(() => {
      startTransition(async () => {
        try {
          const {error, success} = await disable2FA();
          console.log("2FA disabled successfully");
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
      <LoadingButton
        className="px-5 border-brand-critical text-brand-critical hover:bg-red-600/20"
        variant={"outline"}
        size={"sm"}
        loading={isPending}
        onClick={handleDisable2FA}
      >
        Disable two-factor authentication
      </LoadingButton>
    </>
  )
}