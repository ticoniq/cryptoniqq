"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { logout } from "@/app/(auth)/action";
import { useSession } from "./SessionProvider";
import { Check, LogOutIcon, MessageSquare, Monitor, Moon, PowerIcon, SendToBack, Settings, Sun, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import { ModeToggle } from "@/components/ModeToggle";
import { ThemeDropdown } from "@/components/ThemeDropdown";

interface UserButtonProps {
  className?: string;
}

export function UserButton({ className }: UserButtonProps) {
  const { user } = useSession();

  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={30} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2 mr-5 mt-5 space-y-2">
        <DropdownMenuLabel
          className="bg-brand-surface dark:bg-brand-bg p-5 rounded-md flex flex-col justify-center items-center gap-y-4"
        >
          <UserAvatar avatarUrl={user.avatarUrl} size={50} />
          <p className="text-base text-brand-hover dark:text-brand-surface">
            {user.name}
          </p>
        </DropdownMenuLabel>
        <div className="py-1">
          <Link href="/account">
            <DropdownMenuItem className="cursor-pointer text-base text-brand-hover dark:text-brand-secondary2 focus:bg-brand-surface hover:dark:bg-brand-bg py-2">
              <Settings className="mr-2 size-4" />
              Account Settings
            </DropdownMenuItem>
          </Link>
          <Link href="/account">
            <DropdownMenuItem className="cursor-pointer text-base text-brand-hover dark:text-brand-secondary2 focus:bg-brand-surface hover:dark:bg-brand-bg py-2">
              <SendToBack className="mr-2 size-4" />
              Order & Trade
            </DropdownMenuItem>
          </Link>
          <Link href="/account">
            <DropdownMenuItem className="cursor-pointer text-base text-brand-hover dark:text-brand-secondary2 focus:bg-brand-surface hover:dark:bg-brand-bg py-2">
              <MessageSquare className="mr-2 size-4" />
              Support
            </DropdownMenuItem>
          </Link>
        </div>
        <DropdownMenuSeparator />
        <div className="flex justify-between">
          <ThemeDropdown />
          <DropdownMenuItem
            onClick={() => {
              logout();
            }}
            className="cursor-pointer px-3 text-base text-brand-critical focus:text-brand-critical w-fit dark:text-red-300 focus:bg-red-500/20 hover:dark:bg-red-600/20"
          >
            Logout
            <PowerIcon className="ml-2 size-4 text-brand-critical" />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}