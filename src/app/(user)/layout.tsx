import { validateRequest } from "@/auth";
import { SessionProvider } from "../SessionProvider";
import { redirect } from "next/navigation";
import { Navbar } from "./_component/Navbar";
import { VerificiationWarning } from "./_component/VerificiationWarning";
import { Button } from "@/components/ui/button"
import SideBar from "./_component/SideBar";
import { NavbarSingle } from "./_component/NavbarSingle";
import { Footer } from "@/components/Footer";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await validateRequest();
  if (!session.user) return redirect("/login");

  return (
    <SessionProvider value={session}>
      {/* <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <SideBar />
        <div className="flex flex-col">
          <Navbar />
          <main className="flex flex-1 flex-col gap-4 p-4 bg-brand-surface dark:bg-background lg:gap-6 lg:p-6">
            <VerificiationWarning />
            {children}
          </main>
        </div>
      </div> */}
      <NavbarSingle />
      <main className="font-DMSans border-b">
        {children}
      </main>
      <Footer />
    </SessionProvider>
  );
}