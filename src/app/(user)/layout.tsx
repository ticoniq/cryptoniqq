import { validateRequest } from "@/auth";
import { SessionProvider } from "./_component/SessionProvider";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await validateRequest();
  if (!session.user) return redirect("/login");

  return (
    <>
      <Navbar />
        <SessionProvider value={session}>
          {children}
        </SessionProvider>
      <Footer />
    </>
  );
}