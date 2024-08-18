"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNairaBalance } from "@/hooks/useNairaBalance";
import { ChevronRightIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { Payment } from "./Payment";

export function UserAccount() {
  const { data, status, error } = useNairaBalance();

  if (status === "error" && error instanceof Error) {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading your balance: {error.message}
      </p>
    );
  }

  return (
    <Card className="p-4 space-y-1 bg-brand-surface dark:bg-brand-hover">
      <div className="p-0 flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
        <CardHeader className="p-0">
          <CardDescription className="text-lg">Your total balance</CardDescription>
          <CardTitle className="text-clamp-md">
            {status === "pending" ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                {data?.currency[1]}
                {data?.balance.toFixed(2)}
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-wrap gap-4 md:justify-end md:w-1/2">
          <Payment />
          <Button asChild>
            <Link href="/sell">
              Withdraw
            </Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}