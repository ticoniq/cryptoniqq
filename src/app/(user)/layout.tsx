import { validateRequest } from "@/auth";
import { SessionProvider } from "./_component/SessionProvider";
import { redirect } from "next/navigation";
import { Navbar } from "./_component/Navbar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await validateRequest();
  if (!session.user) return redirect("/login");

  return (
    <SessionProvider value={session}>
      <Navbar />
      {children}
    </SessionProvider>
  );
}