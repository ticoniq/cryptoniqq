import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "@radix-ui/react-icons";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { CustomLink } from "@/components/CustomLink";
import { Metadata } from "next";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { FooterSmall } from "@/components/FooterSmall";

export const metadata: Metadata = {
  title: "Login",
};

export default async function page() {
  const session = await validateRequest();

  if (session.user) return redirect("/dashboard");

  return (
    <>
      <Navbar />
      <main className="font-DMSans">
        <section className="py-10 bg-brand-surface dark:bg-brand-hover">
          <div className="container flex items-center justify-between">
            <h5 className="text-clamp-md font-bold">Reset password</h5>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/login">Login</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Reset password</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-4 py-10 space-y-8 md:py-16">
          <div className="text-center space-y-1">
            <h1 className="font-clash font-bold text-clamp-slg">
              Reset password
            </h1>
            <p className="text-xl font-lato text-muted-foreground">
              {"Enter your email address and we'll send you the link to reset your password"}
            </p>
          </div>

          <ResetPasswordForm />

          <p className="text-muted-foreground text-center">
            Not a member?{" "}
            <CustomLink
              href="/signup"
              className="text-brand-primary font-semibold"
              textarea={'Register'}
              divClassName="border-brand-primary border-b-2"
            />
            {" "}Or back to login{" "}
            <CustomLink
              href="/login"
              className="text-brand-primary font-semibold"
              textarea={'Login'}
              divClassName="border-brand-primary border-b-2"
            />
          </p>
        </section>
      </main>
      <FooterSmall />
    </>
  )
}