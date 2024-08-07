"use client";
import Link from "next/link";
import {
  Bell,
  Home,
  LayoutPanelLeft,
  LogOutIcon,
  Menu,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetOverlay, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "../_component/UserButton";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/Logo";
import { usePathname } from "next/navigation";
import { useSession } from "./SessionProvider";
import { useEffect, useState } from "react";
import { logout } from "@/app/(auth)/action";
import { privateLinks } from "@/lib/constants";

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
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <span className="lg:hidden"><Logo link="/" /></span>
        <SheetOverlay className="lg:hidden" />
        <SheetContent side="left" className="flex flex-col lg:hidden">
          <SheetHeader>
            <SheetTitle>
              <Logo link="/" />
              <span className="sr-only">Cryptoniq</span>
            </SheetTitle>
            <SheetDescription className="sr-only">
              {"one stop shop for all your crypto needs"}
            </SheetDescription>
          </SheetHeader>
          <nav className="grid gap-2 text-lg font-medium">
            <ul className="flex flex-col gap-y-2 mt-5">
              {privateLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.title}
                  className={`group/item flex items-center gap-3 rounded-full px-5 py-2 text-primary transition-all hover:bg-brand-primary hover:text-white
                  ${pathname === link.href ? "bg-brand-primary text-white" : ""}`}
                >
                  {link.icon && <link.icon className={`text-brand-primary h-6 w-6 group/edit group-hover/item:text-white
                  ${pathname === link.href ? "text-white" : ""}`} />}
                  {link.title}
                </Link>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <Button
              variant={"ghost"}
              className="w-full text-brand-critical p-0"
              onClick={() => {
                logout();
              }}
            >
              <LogOutIcon className="mr-2 size-4" />
              Log out
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      {/* <div className="w-full flex-1">
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
      </div> */}
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <div className="border-x-2 px-2 border-brand-surface dark:border-brand-onSurface"><ModeToggle /></div>
      <UserButton />
    </header>
  )
}