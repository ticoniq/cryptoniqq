"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { useNairaBalance } from "@/hooks/useNairaBalance";
import { ChevronRightIcon, Loader2 } from "lucide-react";
import Link from "next/link";

export function WalletDetails() {
  const { data, status, error } = useNairaBalance();

  if (status === "error" && error instanceof Error) {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading your balance: {error.message}
      </p>
    );
  }

  return (
    <>
      <Card className="p-2 space-y-1 bg-brand-surface dark:bg-brand-hover">
        <div className="p-0 flex flex-col md:flex-row md:justify-between md:items-center">
          <Link href="/wallet/accounts"
            className="p-4 rounded-sm hover:bg-brand-secondary flex justify-between items-center dark:hover:bg-brand-bg md:w-1/3">
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
            <ChevronRightIcon />
          </Link>
          <CardContent className="p-4 flex flex-wrap justify-between gap-2">
            <Button asChild>
              <Link href="/buy">
                Buy
              </Link>
            </Button>
            <Button asChild>
              <Link href="/sell">
                Sell
              </Link>
            </Button>
            <Button asChild>
              <Link href="/receive">
                Receive
              </Link>
            </Button>
            <Button asChild>
              <Link href="/send">
                Send
              </Link>
            </Button>
          </CardContent>
        </div>
      </Card>

      <Separator className="my-10" />
      <h3 className="text-clamp-sm font-medium p-0 m-0">Crypto prices</h3>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 my-5">
        <Card className="p-6 space-y-1 bg-brand-surface dark:bg-brand-hover">
          <CardHeader className="p-0">
            <CardTitle className="text-base">Pending</CardTitle>
            <CardDescription>$5 per referral who signed up.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xl">$0</p>
          </CardContent>
        </Card>
        <Card className="p-6 space-y-1 bg-brand-surface dark:bg-brand-hover">
          <CardHeader className="p-0">
            <CardTitle className="text-base">Credited</CardTitle>
            <CardDescription>Total credits earned so far.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xl">$0</p>
          </CardContent>
        </Card>
        <Card className="p-6 space-y-1 bg-brand-surface dark:bg-brand-hover">
          <CardHeader className="p-0">
            <CardTitle className="text-base">Credited</CardTitle>
            <CardDescription>Total credits earned so far.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xl">$0</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}