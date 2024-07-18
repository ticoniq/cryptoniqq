"use client";
import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import {
  CircleUser,
  Menu,
  Package2,
} from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { defaultLinks } from "@/config/nav";

export function Navbar() {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 font-DMSans">
      <section className="container w-full">
        <div className="w-full h-[3.125rem] flex items-center justify-between gap-4">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:text-sm lg:gap-1">
            <Logo link="/" />
            {defaultLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={`text-foreground transition-colors hover:bg-brand-primary py-[0.94rem] px-3
                  ${pathname === link.href ? "bg-brand-primary text-white" : ""}`}
              >
                {link.title}
              </Link>
            ))}
          </nav>
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
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Dashboard
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4 md:gap-2">
            <div className="border-x-2 px-2 border-brand-surface dark:border-brand-onSurface"><ModeToggle /></div>
            <Button variant="outline" asChild size={"xs"} className="rounded-full">
              <Link href={"/"}>Wallet</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>
    </header>
  )
}