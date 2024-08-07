"use client";
import { logout } from "@/app/(auth)/action";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Home, LogOutIcon } from "lucide-react";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block font-DMSans">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <Logo link="/dashboard" />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-full bg-brand-primary px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <Home className="h-6 w-6" />
              Dashboard
            </Link>
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