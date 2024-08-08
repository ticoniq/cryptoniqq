"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { SettingsSidebarLinks } from "@/lib/constants";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {SettingsSidebarLinks.map((item) => {
        return (
          <Link
            href={item.href}
            key={item.title}
            className={`group/item flex items-center gap-3 rounded-full px-5 py-3 text-primary transition-all hover:text-bg hover:dark:text-white
              ${pathname === item.href ? "bg-brand-primary text-white" : ""}`}
          >
            {item.icon && <item.icon className={`text-brand-primary h-6 w-6 group/edit group-hover/item:animate-sway group-hover/item:text-white
                  ${pathname === item.href ? "text-white" : ""}`} />}
            {item.title}
          </Link>
        );
      })}
    </nav>
  )
}