"use client";
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
import { EllipsisVertical, GlobeIcon } from "lucide-react";

type SessionManagementProps = {}

export function SessionManagement({ }: SessionManagementProps) {
  return (
    <section className="font-DMSans py-10">
      <h3 className="text-clamp-sm font-medium mb-2">Sessions</h3>
      <p className="text-brand-secondary dark:text-brand-secondary font-medium">
        View everything that has access to your account
      </p>
      <div className="rounded-md border my-8">
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
            <TableRow className="hover:bg-transparent">
              <TableCell className="flex items-center gap-3">
                <GlobeIcon className="text-brand-secondary dark:text-brand-secondary w-5 h-5"/>
                <aside className="space-y-1">
                  <p className="text-base whitespace-nowrap">Edge (Windows)</p>
                  <p className="text-xs font-semibold text-brand-secondary dark:text-brand-secondary">
                    (This Device)
                  </p>
                </aside>
              </TableCell>
              <TableCell className="whitespace-nowrap">in a second</TableCell>
              <TableCell className="whitespace-nowrap">27 hours ago</TableCell>
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
                    <DropdownMenuItem className="text-brand-critical">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}