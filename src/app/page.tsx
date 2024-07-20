import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CTA } from "@/components/frontend/CTA";
import { CTA2 } from "@/components/frontend/CTA2";
import { Hero } from "@/components/frontend/Hero";
import { HomeAbout } from "@/components/frontend/HomeAbout";
import { Testimony } from "@/components/frontend/Testimony";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      
      <HomeAbout />
      <CTA2 />
      <Testimony />
      <CTA />
      <Footer />
    </>
  );
}
