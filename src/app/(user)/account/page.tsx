import { SidebarNav } from "./SidebarNav";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "@radix-ui/react-icons";
import Information from "./Information";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { DeleteAccountButton } from "./DeleteAccountButton";

export const metadata: Metadata = {
  title: "General Settings",
  description: "Update your general settings.",
}

export default function page() {
  return (
    <>
      <section className="py-10 bg-brand-surface dark:bg-brand-hover">
        <div className="container flex flex-wrap space-y-4 items-center justify-between sm:space-y-0">
          <h5 className="text-clamp-md font-bold">General Settings</h5>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>General Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <section className="container py-10 md:py-20 space-y-6">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav />
          </aside>
          <article className="flex-1">
            <div>
              <h3 className="text-lg md:text-3xl">General Settings</h3>
              <Separator className="my-10" />
            </div>
            <div>
              <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
                <Information />
              </Suspense>
            </div>

            <DeleteAccountButton />
          </article>
        </div>
      </section>
    </>
  )
}