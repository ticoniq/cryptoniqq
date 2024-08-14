"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCopy } from "@/hooks/useCopy";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useSession } from "../../_component/SessionProvider";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export function ReferralsDetails() {
  const { isCopied, copyToClipboard } = useCopy();
  const { user } = useSession();

  return (
    <section className="font-DMSans">
      <h3 className="text-clamp-sm font-medium mb-2">
        Share your link to Unlock Hobby Plan
      </h3>
      <p className="text-brand-secondary dark:text-brand-secondary font-medium">
        Get $1 in Crypto for every person who signs up using your code once they pay their first bill or purchase credits.
      </p>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 mt-7">
        <div className="space-y-2">
          <Label>Referral code</Label>
          <div className="relative">
            <Input
              className="pe-10"
              value={user.username || "nousername"}
              readOnly
            />
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 transform text-muted-foreground"
              onClick={() => copyToClipboard(user.username || "nousername")}
            >
              {isCopied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Referral link</Label>
          <div className="relative">
            <Input
              className="pe-10"
              value={`https://cryptoniq.tech?referralCode=${user.username || "nousername"}`}
              readOnly
            />
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 transform text-muted-foreground"
              onClick={() => copyToClipboard(user.username || "nousername")}
            >
              {isCopied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      <Separator className="my-14" />
      <h3 className="text-clamp-sm font-medium mb-2">
        Referral stats
      </h3>
      <p className="text-brand-secondary dark:text-brand-secondary font-medium">
        A brief overview displaying the credits you have earned through referrals
      </p>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 mt-7">
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
      </div>
    </section>
  )
}