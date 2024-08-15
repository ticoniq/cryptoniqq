import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { VerificiationWarning } from "../_component/VerificiationWarning";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserAvatar } from "../_component/UserAvatar";
import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SettingsIcon, Wallet2Icon } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function Page() {
  const session = await validateRequest();

  if (!session) {
    return null;
  }

  return (
    <>
      <section className="container py-10 md:py-20 space-y-3">
        <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:justify-between sm:items-center">
          <aside className="flex items-center gap-4">
            <UserAvatar avatarUrl={session.user?.avatarUrl} size={40} />
            <div className="grid gap-1">
              <p className="text-lg font-medium leading-none">
                {session.user?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {!session.user?.email_verified && (
                  <div className="self-start">
                    <Link href="/verify-email">Verify Email</Link>
                  </div>
                )}
              </p>
            </div>
          </aside>
          <div className="font-medium">
            <Button
              asChild
              variant={"outline"}
              className="text-sm rounded-sm px-2 py-1 h-9 mr-4"
            >
              <Link href="/account">
                <SettingsIcon className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant={"outline"}
              className="text-sm rounded-sm px-2 py-1 h-9"
            >
              <Link href="/wallet">
                <Wallet2Icon className="size-4 mr-2" />
                Wallet
              </Link>
            </Button>
          </div>
        </div>
        <VerificiationWarning />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <article className="flex-1">
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 mt-7">
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
          </article>
        </div>
      </section>
    </>
  )
}