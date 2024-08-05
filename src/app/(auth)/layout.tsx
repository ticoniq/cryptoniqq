import { Navbar } from "@/components/Navbar";
import { CTA } from "@/components/frontend/CTA";
import { Footer } from "@/components/Footer";

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Navbar />
      {children}
      <CTA />
      <Footer />
    </>
  );
}