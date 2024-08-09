"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SettingsSidebarLinks } from "@/lib/constants";
import { UserAvatar } from "../_component/UserAvatar";
import { useSession } from "../_component/SessionProvider";
import { CameraIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> { }

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { user } = useSession()
  const pathname = usePathname()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    const file = e.target.files?.[0];
    // Handle the file upload here

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <nav
      className={cn(
        "flex space-x-2 flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <div className="mb-6 rounded-md flex flex-col justify-center items-center gap-y-4">
        <div className="relative inline-block">
          {/* <UserAvatar avatarUrl={user.avatarUrl} size={100} /> */}
          <UserAvatar avatarUrl={previewUrl || user.avatarUrl} size={100} />
          <div className="absolute bottom-0 right-0">
            <Button
              variant="default"
              size="icon"
              className="h-[29px] w-[29px] rounded-full bg-brand-primary shadow-brand-primary shadow-md"
            >
              <Label htmlFor="upload" className="flex flex-col justify-center h-full items-center gap-2 cursor-pointer">
                <CameraIcon className="h-4 w-4" />
                <Input
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept="image/*"
                  id="upload"
                />
              </Label>
          </Button>
        </div>
      </div>
      <span className="text-center">
        <p className="text-xl font-semibold text-brand-hover dark:text-brand-surface">
          {user.name}
        </p>
        <p className="text-xs text-brand-secondary dark:text-brand-secondary2">
          {user.email}
        </p>
      </span>
    </div>
      {
    SettingsSidebarLinks.map((item) => {
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
    })
  }
    </nav >
  )
}