import { SearchField } from "@/components/SearchField";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ArrowRight, Smartphone } from "lucide-react";
import Image from "next/image";
import bitcoinCloud from "@/assets/images/bitcoin-cloud.png";
import Link from "next/link";
import { replaceSpaceWithHyphen } from "@/lib/utils";
import { gettingStartedData } from "./_data/supportData";

export default function page() {
  return (
    <>
      <main className="container py-10 space-y-16 font-DMSans">
        <section className="space-y-5">
          <h1 className="text-5xl w-96 mx-auto text-center">Hi there, How can we help you?</h1>
          <SearchField />
        </section>
        <section className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <article className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-x-6 gap-y-10 grid-cols-2 xl:gap-x-8">
              {gettingStartedData.map((categoryData, index) => (
                <Link key={index} href={`/support/${replaceSpaceWithHyphen(categoryData.category)}`}>
                  <Card className="p-0 hover:bg-brand-surface hover:dark:bg-brand-hover ">
                    <CardHeader className="flex justify-center items-center gap-y-5 p-6">
                      <CardDescription className="p-0">
                        <Image src={bitcoinCloud}
                          alt="CTA"
                          width={96}
                          height={96}
                          priority={true}
                          className="w-24 h-24"
                        />
                      </CardDescription>
                      <CardTitle className="text-clamp-sm p-0">{categoryData.category}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </article>

          <aside>
            <Card className="space-y-8">
              <CardHeader>
                <CardTitle className="p-0">
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-10">
                <p className="text-base leading-8">
                  {"Didn't find what you were looking for in the Knowledge Base articles? Feel free to submit a case or contact our Support Service below for further help."}
                </p>
                <span className="block space-y-5">
                  <h3 className="text-lg font-semibold">Support Service Hours</h3>
                  <p>2/7 customer support</p>
                </span>
                <div className="group relative flex gap-x-6 rounded-lg">
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50">
                    <Smartphone aria-hidden="true" className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-bold">
                      Phone:
                      <span className="absolute inset-0" />
                    </p>
                    <p className="mt-1">Hello</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 py-3 border-t">
                <div className="flex flex-row items-center">
                  <div className="text-xs text-muted-foreground">
                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </aside>
        </section>

        <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 xl:gap-x-8">
          <Card className="flex justify-between items-center gap-y-5 p-6 hover:bg-brand-surface hover:dark:bg-brand-hover">
            <Link href="/contact" className="flex flex-1 justify-between items-center">
              <CardHeader className="p-0">
                <CardTitle className="text-clamp-sm p-0 font-normal">{"Experiencing suspicious activity?"}</CardTitle>
                <CardDescription className="p-0">
                  <span className="flex items-center gap-2">
                    Learn more
                    <ArrowRight />
                  </span>
                </CardDescription>
              </CardHeader>
              <figure>
                <Image
                  src={bitcoinCloud}
                  alt="CTA"
                  width={96}
                  height={96}
                  priority={true}
                  className="w-24 h-24"
                />
              </figure>
            </Link>
          </Card>

          <Card className="flex justify-between items-center gap-y-5 p-6 hover:bg-brand-surface hover:dark:bg-brand-hover">
            <Link href="/contact" className="flex flex-1 justify-between items-center">
              <CardHeader className="p-0">
                <CardTitle className="text-clamp-sm p-0 font-normal">{"Can't find what you're looking for?"}</CardTitle>
                <CardDescription className="p-0">
                  <span className="flex items-center gap-2">
                    Contact us
                    <ArrowRight />
                  </span>
                </CardDescription>
              </CardHeader>
              <figure>
                <Image
                  src={bitcoinCloud}
                  alt="CTA"
                  width={96}
                  height={96}
                  priority={true}
                  className="w-24 h-24"
                />
              </figure>
            </Link>
          </Card>
        </div>

      </main>
    </>
  )
}