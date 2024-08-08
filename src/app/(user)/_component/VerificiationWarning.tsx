import { validateRequest } from "@/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export async function VerificiationWarning() {
  const { user } = await validateRequest();

  return user?.email_verified === false ? (
    <>
      <Alert className="bg-yellow-600/20 border-l-8 border-brand-warning flex items-start gap-2">
        <div className="h-8 w-8 bg-brand-warning rounded-md flex flex-nowrap justify-center items-center">
          <TriangleAlert className="h-5 w-5" />
        </div>
        <div className="w-full flex flex-col gap-y-3 md:flex-row md:justify-between">
          <div className="w-full">
            <AlertTitle>Account verification required</AlertTitle>
            <AlertDescription>
              A verification email has been sent to your email address. Please verify your account to
              access all features.
            </AlertDescription>
          </div>
          <Button asChild>
            <Link href="/verify-email">Verify Email</Link>
          </Button>
        </div>
      </Alert>
    </>
  ) : null;
}