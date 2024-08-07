"use client";
import Link from "next/link"
import {
  Bell,
  Home,
  Menu,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserButton } from "../_component/UserButton";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/Logo";
import { usePathname } from "next/navigation";
import { useSession } from "./SessionProvider";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [showShadow, setShowShadow] = useState(false);
  const { user } = useSession();

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
    // <header className={`sticky top-0 z-40 font-DMSans h-12 flex items-center bg-background py-1
    //   ${showShadow ? 'shadow-sm dark:shadow-brand-onSurface sticky top-0 z-50' : ''}`}>
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 font-DMSans">
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Logo link="/dashboard" />
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
        </nav>
        <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our
                support team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
    <div className="w-full flex-1">
      <form>
        <div className="relative">
          <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="w-full appearance-none rounded-full bg-background pl-10 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
    </div>
    <div className="border-x-2 px-2 border-brand-surface dark:border-brand-onSurface"><ModeToggle /></div>
    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
      <Bell className="h-4 w-4" />
      <span className="sr-only">Toggle notifications</span>
    </Button>
    <UserButton />
  </header>
  )
}