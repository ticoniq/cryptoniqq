import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SlashIcon } from "@radix-ui/react-icons"
import { SignUpForm } from "./SignUpForm"
import { CustomLink } from "@/components/CustomLink"

export default function page() {
  return (
    <main className="font-DMSans">
      <section className="py-10 bg-brand-surface dark:bg-brand-hover">
        <div className="container flex items-center justify-between">
          <h5 className="text-clamp-md font-bold">Register</h5>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Register</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-10 space-y-8 md:py-16">
        <div className="text-center space-y-1">
          <h1 className="font-clash font-bold text-clamp-slg">
            Register To Cryptoniq
          </h1>
          <p className="text-xl font-lato text-muted-foreground">
            Register in advance and enjoy the event benefits
          </p>
        </div>
        <p>Required fields have an asterisk: *</p>

        <SignUpForm />

        <p className="text-muted-foreground text-center">
          Already have an account?{" "}
          <CustomLink
            href="/login"
            className="text-brand-primary font-semibold"
            textarea={'Login'}
            divClassName="border-brand-primary border-b-2"
          />
        </p>
      </section>
    </main>
  )
}