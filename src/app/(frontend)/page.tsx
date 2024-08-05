import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CTA } from "@/components/frontend/CTA";
import { CTA2 } from "@/components/frontend/CTA2";
import { Hero } from "@/components/frontend/Hero";
import { HomeAbout } from "@/components/frontend/HomeAbout";
import { HowItWork } from "@/components/frontend/HowItWork";
import { Testimony } from "@/components/frontend/Testimony";
import { About } from "@/components/frontend/About";
import { MarketTrend } from "@/components/frontend/MarketTrend";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MarketTrend />
        <HowItWork />
        <HomeAbout />
        <CTA2 />
        <Testimony />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
