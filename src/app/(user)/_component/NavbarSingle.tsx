"use client";
import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import {
  Bell,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetOverlay, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { defaultLinks } from "@/config/nav";
import { useEffect, useState } from "react";
import { UserButton } from "./UserButton";
import { privateLinks } from "@/lib/constants";

export function NavbarSingle() {
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
    <header className={`top-0 z-40 font-DMSans h-12 flex items-center bg-background py-1
      ${showShadow ? 'shadow-sm dark:shadow-brand-onSurface sticky top-0 z-50' : 'border-b'}`}>
      <section className="container">
        <div className="w-full flex items-center justify-between gap-4 py-2 lg:py-0">
          <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row md:items-center md:text-sm lg:gap-1">
            <Logo link="/dashboard" />
            <ul className="flex gap-1">
              {privateLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className={`text-foreground transition-colors hover:bg-brand-primary py-[0.94rem] px-3
                  ${pathname === link.href ? "bg-brand-primary text-white" : ""}`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
            <span className="lg:hidden"><Logo link="/" /></span>
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
                  {defaultLinks.map((link) => (
                    <li key={link.title}>
                      <Link
                        key={link.title}
                        href={link.href}
                        className="hover:text-foreground"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" asChild size={"lg"} className="rounded-full hidden sm:flex">
                  <Link href={"/login"}>Login</Link>
                </Button>
                <Button asChild size={"lg"} className="rounded-full hidden sm:flex">
                  <Link href={"/signup"}>Sign up</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4 md:gap-2">
            <div className="border-x-2 px-2 border-brand-surface dark:border-brand-onSurface"><ModeToggle /></div>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <Button variant="outline" asChild size={"xs"} className="rounded-full hidden sm:flex">
              <Link href={"/wallet"}>Wallet</Link>
            </Button>
            <UserButton />
          </div>
        </div>
      </section>
    </header >
  )
}