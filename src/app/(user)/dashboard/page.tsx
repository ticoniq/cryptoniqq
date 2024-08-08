"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "../_component/SessionProvider";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { user } = useSession();

  // useEffect(() => {
  //   if (!user.onboardingCompleted) return redirect("/onboarding");
  // }, [user.onboardingCompleted]);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </>
  )
}