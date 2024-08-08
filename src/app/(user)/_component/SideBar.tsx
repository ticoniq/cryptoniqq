"use client";
import { logout } from "@/app/(auth)/action";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { privateLinks } from "@/lib/constants";
import { LayoutPanelLeft, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r-[1.6px] md:block font-DMSans">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <Logo link="/dashboard" />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 mt-2 text-sm font-medium lg:px-4">
            <ul className="flex flex-col gap-y-2">
              {privateLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.title}
                  className={`group/item flex items-center gap-3 rounded-full px-5 py-3 text-primary transition-all hover:bg-brand-primary hover:text-white
                  ${pathname === link.href ? "bg-brand-primary text-white" : ""}`}
                >
                  {link.icon && <link.icon className={`text-brand-primary h-6 w-6 group/edit group-hover/item:text-white
                  ${pathname === link.href ? "text-white" : ""}`} />}
                  {link.title}
                </Link>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-auto p-4">
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
      </div>
    </div>
  )
}