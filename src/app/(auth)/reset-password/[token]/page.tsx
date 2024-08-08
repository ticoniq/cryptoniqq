import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "@radix-ui/react-icons";
import { CustomLink } from "@/components/CustomLink";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FooterSmall } from "@/components/FooterSmall";
import { NewPasswordForm } from "./NewPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset Password Page",
};

export default async function page({ params }: { params: { token: string } }) {
  return (
    <>
      <Navbar />
      <main className="font-DMSans">
        <section className="py-10 bg-brand-surface dark:bg-brand-hover">
          <div className="container flex flex-wrap space-y-4 items-center justify-between sm:space-y-0">
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
              Enter your new password below
            </p>
          </div>

          <NewPasswordForm token={params.token} />

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