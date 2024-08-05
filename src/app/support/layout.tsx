import { Logo } from "@/components/Logo";
import { Navbar } from "./_component/Navbar";
import { ThemeSwitcher } from "./_component/ThemeSwitcher";
import { BackToTop } from "@/components/BackToTop";
import Footer from "./_component/Footer";

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Navbar />
      <>
        {children}
      </>
      <Footer />
      <BackToTop />
    </>
  );
}