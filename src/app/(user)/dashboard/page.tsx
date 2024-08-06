"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import { useSession } from "../_component/SessionProvider";

type Props = {}

export default function Page({ }: Props) {
  const { user } = useSession();

  useEffect(() => {
    if (!user.onboardingCompleted) return redirect("/onboarding");
  }, [user.onboardingCompleted]);

  return (
    <div>page</div>
  )
}