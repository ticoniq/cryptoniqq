import { validateRequest } from "@/auth";
import { SessionProvider } from "./_component/SessionProvider";
import { redirect } from "next/navigation";
import { Navbar } from "./_component/Navbar";
import { VerificiationWarning } from "./_component/VerificiationWarning";
import { Button } from "@/components/ui/button"
import SideBar from "./_component/SideBar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await validateRequest();
  if (!session.user) return redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <SideBar />
        <div className="flex flex-col">
          <Navbar />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <VerificiationWarning />
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no products
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can start selling as soon as you add a product.
                </p>
                <Button className="mt-4">Add Product</Button>
              </div>
            </div>
            {/* {children} */}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}