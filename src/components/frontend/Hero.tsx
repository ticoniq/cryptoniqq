
import Image from "next/image";
import { Button } from "@/components/ui/button";
import frame1 from "@/assets/images/frame1.svg";
import frame2 from "@/assets/images/frame2.svg";
import frame3 from "@/assets/images/frame3.svg";
import frame4 from "@/assets/images/frame4.svg";
import hero from "@/assets/images/hero-background.png";

export function Hero() {
  return (
    <section className="bg-brand-surface dark:bg-brand-bg font-DMSans py-10 lg:py-20">
      <div className="container grid grid-cols-1 gap-14 items-center justify-between lg:grid-cols-12 lg:gap32">
        <div className="w-full lg:col-span-6">
          <h1 className="py-6 text-center font-bold text-clamp-lg lg:leading-[4.3rem] lg:text-left">
            Buy & Sell Digital <br /> Assets In The Rocket
          </h1>
          <p className="text-gray-500 text-lg text-center lg:text-left max-w-[36rem] mx-auto lg:mx-0">
            Coin rocket is the easiest, safest, and fastest way to buy & sell crypto asset exchange.
          </p>
          <span className="flex items-center justify-center gap-x-4 lg:justify-start">
            <Button className="my-8 rounded-full bg-brand-primary">Get started now</Button>
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
              />
              <Image
                src={frame2}
                width={132}
                height={28}
                alt="Frame 2"
                className="w-[8.25rem] h-7"
              />
              <Image
                src={frame3}
                width={132}
                height={28}
                alt="Frame 3"
                className="w-[8.25rem] h-7"
              />
              <Image
                src={frame4}
                width={132}
                height={28}
                alt="Frame 4"
                className="w-[8.25rem] h-7"
              />
            </article>
          </div>
        </div>
        <figure className="w-full hidden lg:block lg:col-span-6">
          <Image
            src={hero}
            width={570}
            height={448}
            alt="Dashboard image"
            className="w-[35.7rem] h-[28rem]"
          />
        </figure>
      </div>
      <div className="container">
        
      </div>
    </section>
  )
}