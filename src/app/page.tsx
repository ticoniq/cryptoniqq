import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CTA } from "@/components/frontend/CTA";
import { Hero } from "@/components/frontend/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CTA />
      <Footer />
    </>
  );
}
