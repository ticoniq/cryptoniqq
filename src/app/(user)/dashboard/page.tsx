import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { validateRequest } from "@/auth";
import { VerificiationWarning } from "../_component/VerificiationWarning";

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function Page() {
  const session = await validateRequest();

  // useEffect(() => {
  //   if (!session.user?.onboardingCompleted) return redirect("/onboarding");
  // }, [user.onboardingCompleted]);

  return (
    <>
      <section className="container py-10 md:py-20 space-y-6">
        <VerificiationWarning />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <article className="flex-1">
            <div>
              <h3 className="text-lg md:text-3xl">Dashboard </h3>
              <Separator className="my-10" />
            </div>
            things on things
          </article>
        </div>
      </section>
    </>
  )
}