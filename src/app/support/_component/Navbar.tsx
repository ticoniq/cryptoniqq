"use client";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import {
  Link as Linki,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-40 font-DMSans bg-background py-7 bg-cover bg-center
      ${showShadow ? 'shadow-sm dark:shadow-brand-onSurface sticky top-0 z-50' : ''}`}
      style={{ backgroundImage: "url('https://pagedone.io/asset/uploads/1702271852.png')" }}>
      <section className="container">
        <div className="w-full flex items-center justify-between gap-4">
          <nav className="flex gap-3 md:items-center">
            <Logo link="/support" />
            <div className="border-r h-10" />
            <Link
              href={"/support"}
              className="text-xl font-semibold"
            >
              Support
            </Link>
          </nav>
          <Button asChild variant={"ghost"} className="hidden hover:bg-transparent items-center gap-4 md:gap-2 lg:flex">
            <Link href="/"><Linki /> Go to Cryptoniq.tech</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden p-0 border-0 hover:bg-transparent"
              >
                <Menu className="h-8 w-8" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetOverlay className="lg:hidden" />
            <SheetContent side="left" className="lg:hidden">
              <SheetHeader className="sr-only">
                <SheetTitle>Cryptoniq</SheetTitle>
                <SheetDescription>
                  {"one stop shop for all your crypto needs"}
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium">
                <aside className="flex items-center gap-2 text-lg font-semibold">
                  <Logo link="/" />
                  <span className="sr-only">Cryptoniq</span>
                </aside>
                <ul className="mt-10 grid gap-6">
                  <li><Link href="/"><Linki /> Go to Cryptoniq.tech</Link></li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </section>
    </header >
  )
}