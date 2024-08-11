"use client";
import { Button } from "@/components/ui/button";

export function Disable2FA() {
  return (
    <>
      <Button
        className="px-5 border-brand-critical text-brand-critical hover:bg-red-600/20"
        variant={"outline"}
        size={"sm"}

        // TODO: Implement disable 2FA
        onClick={() => { console.log("Disable 2FA") }}
      >
        Disable two-factor authentication
      </Button>
    </>
  )
}