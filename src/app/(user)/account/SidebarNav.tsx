"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SettingsSidebarLinks } from "@/lib/constants";
import { UserAvatar } from "../_component/UserAvatar";
import { useSession } from "../_component/SessionProvider";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> { }

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const { user } = useSession()
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <div className="mb-6 rounded-md flex flex-col justify-center items-center gap-y-4">
        <UserAvatar avatarUrl={user.avatarUrl} size={100} />
        <span className="text-center">
          <p className="text-xl font-semibold text-brand-hover dark:text-brand-surface">
            {user.name}
          </p>
          <p className="text-xs text-brand-secondary dark:text-brand-secondary2">
            {user.email}
          </p>
        </span>
      </div>
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