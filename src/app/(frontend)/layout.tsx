import { validateRequest } from "@/auth";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SessionProvider } from "../SessionProvider";
import { NavbarSingle } from "../(user)/_component/NavbarSingle";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await validateRequest();

  if (!session.user) {
    return (
      <>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </>
    );
  };


  return (
    <>
      <SessionProvider value={session}>
        <NavbarSingle />
        <main>
          {children}
        </main>
        <Footer />
      </SessionProvider>
    </>
  );
}