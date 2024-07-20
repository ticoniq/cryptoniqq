import banner from "@/assets/images/banner.svg";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import google from "@/assets/images/google.svg";
import apple from "@/assets/images/apple.svg";

export function CTA2() {
  return (
    <section className="bg-brand-surface dark:bg-brand-bg font-DMSans">
      <div className="container gap-10 flex justify-between flex-col py-10 lg:py-20 overflow-hidden lg:flex-row">
        <article className="space-y-6 w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
          <h2 className="text-clamp-slg font-bold max-w-[30rem] leading-none">
            Free your money & Trade with confident
          </h2>
          <p className="text-xl font-lato">
            With Cryptor Trade, you can be sure your trading skills are matched
          </p>
          <div>
            <span className="flex items-center gap-2">
              <CircleCheck size={19} className="text-brand-primary" />
              <p className="text-2xl font-bold">Buy, Sell, And Trade On The Go</p>
            </span>
            <p className="text-brand-secondary dark:text-brand-secondary2">Managa your holdings from your mobile decive</p>
          </div>
          <div>
            <span className="flex items-center gap-2">
              <CircleCheck size={19} className="text-brand-primary" />
              <p className="text-2xl font-bold">Take Control Of Your Wealth</p>
            </span>
            <p className="text-brand-secondary dark:text-brand-secondary2">Rest assured you (and only you) have access to your funds</p>
          </div>
          <div className="flex items-center gap-7 justify-start">
            <Link href="/">
              <Image
                src={google}
                width={134}
                height={40}
                alt="googpe app icon"
                className=""
                priority={true}
              />
            </Link>
            <Link href="/">
              <Image
                src={apple}
                width={120}
                height={40}
                alt="apple app icon"
                className=""
                priority={true}
              />
            </Link>
          </div>
        </article>
        <figure className="hidden w-full lg:w-1/2 relative lg:block">
          <Image src={banner}
            alt="CTA"
            width={456}
            height={535}
            priority={true}
            className="lg:absolute w-full lg:bottom- -mb-12 mx-auto lg:mx-0"
          />
        </figure>
      </div>
    </section>
  )
}