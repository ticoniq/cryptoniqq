"use client";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import frame1 from "@/assets/images/frame1.svg";
import frame2 from "@/assets/images/frame2.svg";
import frame3 from "@/assets/images/frame3.svg";
import frame4 from "@/assets/images/frame4.svg";
import hero from "@/assets/images/hero-banner.svg";
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Link from "next/link";

export function Hero() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <section className="">
      <div className="relative bg-brand-surface dark:bg-brand-bg font-DMSans py-10 lg:py-20 flex flex-col items-center pt-12 sm:pt-24 pb-36 sm:pb-56 md:pb-48 lg:pb-32 xl:pb-64">
        <div className="container grid grid-cols-1 gap-14 items-center justify-between lg:grid-cols-12">
          <div className="w-full space-y-8 lg:col-span-6">
            <h1 className="text-center font-bold text-clamp-lg lg:leading-[4.3rem] lg:text-left">
              Buy & Sell Digital <br /> Assets In The Cryptoniq
            </h1>
            <p className="text-brand-secondary dark:text-brand-secondary2 text-xl text-center lg:text-left max-w-[36rem] mx-auto lg:mx-0">
              Cryptoniq is the easiest, safest, and fastest way to buy & sell crypto asset exchange.
            </p>
            <span className="flex items-center justify-center gap-x-4 lg:justify-start">
              <Button className="rounded-full bg-brand-primary" asChild>
                <Link href="/signup">Get started now</Link>
              </Button>
            </span>
            <div className="flex flex-col justify-center gap-y-4 items-center lg:justify-start lg:items-start">
              <h2 className="text-2xl font-bold">Our Partners</h2>
              <article className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 lg:flex-nowrap">
                <Image
                  src={frame1}
                  width={132}
                  height={28}
                  alt="Frame 1"
                  className="w-[8.25rem] h-7"
                  priority={true}
                />
                <Image
                  src={frame2}
                  width={132}
                  height={28}
                  alt="Frame 2"
                  className="w-[8.25rem] h-7"
                  priority={true}
                />
                <Image
                  src={frame3}
                  width={132}
                  height={28}
                  alt="Frame 3"
                  className="w-[8.25rem] h-7"
                  priority={true}
                />
                <Image
                  src={frame4}
                  width={132}
                  height={28}
                  alt="Frame 4"
                  className="w-[8.25rem] h-7"
                  priority={true}
                />
              </article>
            </div>
          </div>
          <figure className="w-full hidden lg:block lg:col-span-6">
            <Image
              src={hero}
              width={570}
              height={448}
              alt="image"
              className="w-[35.7rem] h-[28rem]"
              priority={true}
            />
          </figure>
        </div>
      </div>
      <div className="mx-auto max-w-fit p-4 flex justify-center md:-mt-32 -mt-32 sm:-mt-32 lg:-mt-24">
        <div className="relative w-full p-3 rounded-xl bg-brand-surface dark:bg-brand-bg dark:border">
          <Carousel
            className="w-full max-w-md sm:max-w-xl md:max-w-5xl"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-1">
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="pl-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-2xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>

  )
}