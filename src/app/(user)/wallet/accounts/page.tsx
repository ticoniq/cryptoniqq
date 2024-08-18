import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "@radix-ui/react-icons";
import { Payment } from "./Payment";
import { UserAccount } from "./UserAccount";

export const metadata: Metadata = {
  title: "Wallet",
  description: "Wallet page",
}

export default function page() {
  return (
    <>
      <section className="py-10 bg-brand-surface dark:bg-brand-hover">
        <div className="container flex flex-wrap space-y-4 items-center justify-between sm:space-y-0">
          <h5 className="text-clamp-md font-bold">Wallet</h5>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/wallet">Wallet</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Account</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <section className="container py-10 md:py-20 space-y-6">
        <div>
          <UserAccount />
        </div>
      </section>
    </>
  )
}