import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CTA } from "@/components/frontend/CTA";
import { CTA2 } from "@/components/frontend/CTA2";
import { Hero } from "@/components/frontend/Hero";
import { Social } from "@/components/frontend/Social";
import { HomeAbout } from "@/components/frontend/HomeAbout";
import { HowItWork } from "@/components/frontend/HowItWork";
import { Testimony } from "@/components/frontend/Testimony";
import { About } from "@/components/frontend/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <About />
      <Social />
      <HowItWork />
      <HomeAbout />
      <CTA2 />
      <Testimony />
      <CTA />
      <Footer />
    </>
  );
}
