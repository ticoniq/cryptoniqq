import { CustomLink } from "@/components/CustomLink";
import { Metadata } from "next";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { Paths } from "@/lib/constants";
import { VerifyCodeForm } from "./VerifyCodeForm";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify Email Page",
};

export default async function page() {
  const { user } = await validateRequest();

  if (!user) redirect(Paths.Login);
  if (user.email_verified) redirect(Paths.Dashboard);

  return (
    <main className="font-DMSans flex justify-center items-center h-screen">
      <section className="max-w-2xl mx-auto px-4 py-10 space-y-8 md:py-16">
        <div className="text-center space-y-1">
          <h1 className="font-clash font-bold text-clamp-slg">
            Please Verify Your Email Address
          </h1>
          <p className="text-xl font-lato text-muted-foreground">
            Verification code was sent to <strong>{user.email}</strong>. Check
            your spam folder if you can&apos;t find the email.
          </p>
        </div>

        <VerifyCodeForm />

        <p className="text-muted-foreground text-center">
          Already have an account?{" "}
          <CustomLink
            href="/login"
            className="text-brand-primary font-semibold"
            textarea={'Login'}
            divClassName="border-brand-primary border-b-2"
          />
        </p>
      </section>
    </main>
  )
}