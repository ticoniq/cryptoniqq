"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logout } from "@/app/(auth)/action";
import { useSession } from "./SessionProvider";
import {
  ChevronDownIcon,
  MessageSquare,
  PowerIcon,
  SendToBack,
  Settings
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import { ThemeDropdown } from "@/components/ThemeDropdown";
import { Button } from "@/components/ui/button";

interface UserButtonProps {
  className?: string;
}

export function UserButton({ className }: UserButtonProps) {
  const { user } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full flex flex-nowrap items-center", className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={30} />
          <ChevronDownIcon className="ml-2 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2 mr-5 mt-5 space-y-2">
        <DropdownMenuLabel
          className="bg-brand-surface dark:bg-brand-bg rounded-md flex flex-col justify-center items-center gap-y-4"
        >
          {!user.email_verified && (
            <div className="self-start -mb-4">
              <Button
                asChild
                className="text-sm rounded-sm px-2 py-1 h-7 text-brand-critical bg-red-500/20"
              >
                <Link href="/verify-email">Verify Email</Link>
              </Button>
            </div>
          )}
          <div className="flex flex-col space-y-4 p-4 justify-center items-center">
            <UserAvatar avatarUrl={user.avatarUrl} size={50} />
            <p className="text-base text-brand-hover dark:text-brand-surface">
              {user.name}
            </p>
          </div>
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