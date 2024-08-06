import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "@radix-ui/react-icons";
import { LoginForm } from "./LoginForm";
import { CustomLink } from "@/components/CustomLink";
import { LockOpen } from "lucide-react";
import { Metadata } from "next";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function page() {
  const session = await validateRequest();

  if (session.user) return redirect("/dashboard");
  
  return (
    <main className="font-DMSans">
      <section className="py-10 bg-brand-surface dark:bg-brand-hover">
        <div className="container flex items-center justify-between">
          <h5 className="text-clamp-md font-bold">Login</h5>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Login</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-10 space-y-8 md:py-16">
        <div className="text-center space-y-4">
          <h1 className="font-clash font-bold text-clamp-slg">
            Login To Cryptoniq
          </h1>
          <p className="text-xl font-lato text-muted-foreground">
            Welcome back! Log In now to start trading
          </p>
          <div className="flex items-center gap-5 rounded-full bg-green-900/30 sm:w-3/5 mx-auto">
            <span className="p-2 bg-brand-success w-10 h-10 flex justify-center items-center rounded-full">
              <LockOpen className="w-5 h-5" />
            </span>
            <p className="text-brand-success">https://
              <span className="text-white break-all">accounts.cryptoniq.com/login</span>
            </p>
          </div>
        </div>

        <LoginForm />

        <p className="text-muted-foreground text-center">
          Not a member?{" "}
          <CustomLink
            href="/signup"
            className="text-brand-primary font-semibold"
            textarea={'Register'}
            divClassName="border-brand-primary border-b-2"
          />
        </p>
      </section>
    </main>
  )
}