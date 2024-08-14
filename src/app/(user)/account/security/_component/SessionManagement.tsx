"use client";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { relativeDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical, GlobeIcon, Loader2 } from "lucide-react";
import { Device } from "@prisma/client";
import { useCurrentDevice } from '@/hooks/useCurrentDevice';
import { deleteDevice } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/loading";
import { LoadingButton } from "@/components/LoadingButton";

export function SessionManagement() {
  const currentDevice = useCurrentDevice();
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast();

  const { data, status, error } = useQuery<Device[]>({
    queryKey: ["user-devices"],
    queryFn: async () => {
      const res = await fetch("/api/user/account/user-devices");
      if (!res.ok) {
        throw Error(`Request failed with status code ${res.status}`);
      }
      return res.json();
    },
  });

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  const isCurrentDevice = (device: Device) => {
    if (!currentDevice) return false;
    return device.name === currentDevice.browser && device.os === currentDevice.os;
  };

  const handleDeleteDevice = (deviceId: string) => {
    startTransition(async () => {
      const { success, error } = await deleteDevice(deviceId)
      if (success) {
        toast({
          variant: "destructive",
          description: success,
        });
      }
      if (error) {
        toast({
          variant: "destructive",
          description: error,
        });
      }
    })
  }

  return (
    <section className="font-DMSans py-10">
      <h3 className="text-clamp-sm font-medium mb-2">Sessions</h3>
      <p className="text-brand-secondary dark:text-brand-secondary font-medium">
        View everything that has access to your account
      </p>
      <div className="rounded-md border my-8">
        {status === "pending" ? (
          <div className="my-4">
            <Loader2 className="mx-auto animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>First Used</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    <p className="text-brand-secondary dark:text-brand-secondary">
                      No devices found for this user.
                    </p>
                  </TableCell>
                </TableRow>
              ) : data.map((device) => (
                <TableRow key={device.id} className="hover:bg-transparent">
                  <TableCell className="flex items-center gap-3">
                    <GlobeIcon className="text-brand-secondary dark:text-brand-secondary w-5 h-5" />
                    <aside className="space-y-1">
                      <p className="text-base whitespace-nowrap">{device.name} ({device.os})</p>
                      {isCurrentDevice(device) && (
                        <p className="text-xs font-semibold text-brand-secondary dark:text-brand-secondary">
                          (This Device)
                        </p>
                      )}
                    </aside>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {relativeDate(device.lastUsedAt)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {relativeDate(device.createdAt)}
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 hover:bg-transparent"
                        >
                          <EllipsisVertical className="h-5 w-5" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-brand-critical"
                          onClick={() => handleDeleteDevice(device.id)}
                          disabled={isPending}
                        >
                          {isPending ? 'Deleting...' : 'Delete'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  )
}