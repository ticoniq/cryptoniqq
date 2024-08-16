import { Button } from "@/components/ui/button";
import Image from "next/image";
import what from "@/assets/images/what.svg";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

type Props = {}

export function HomeAbout({ }: Props) {
  return (
    <section className="py-24 font-DMSans">
      <div className="container justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
        <figure className="w-full">
          <Image src={what} className="w-full" alt="about Us image" priority />
        </figure>
        <article className="max-w-[580px] md:mx-auto flex-col justify-center gap-8 inline-flex items-center lg:items-start">
          <h2 className="text-clamp-slg font-bold max-w-[30rem] leading-none text-center lg:text-left">
            What Is Cryptoniq
          </h2>
          <p className="text-brand-secondary text-xl dark:text-brand-secondary2 text-center lg:text-left">
            Experience a variety of trading on Bitcost. You can use various types of coin transactions such as Spot Trade, Futures Trade, P2P, Staking, Mining, and margin.
          </p>
          <span className="space-y-5">
            <div className="space-y-2">
              <span className="flex items-center gap-2">
                <CircleCheck size={19} className="text-brand-primary" />
                <p className="text-clamp-sm font-bold">View real-time cryptocurrency prices</p>
              </span>
              <p className="text-brand-secondary dark:text-brand-secondary2">
                Experience a variety of trading on Bitcost. You can use various types of coin transactions such as Spot Trade, Futures Trade, P2P, Staking, Mining, and margin.
              </p>
            </div>
            <div className="space-y-2">
              <span className="flex items-center gap-2">
                <CircleCheck size={19} className="text-brand-primary" />
                <p className="text-clamp-sm font-bold">Buy and sell BTC, ETH, XRP, OKB, Etc...</p>
              </span>
              <p className="text-brand-secondary dark:text-brand-secondary2">
                Experience a variety of trading on Bitcost. You can use various types of coin transactions such as Spot Trade, Futures Trade, P2P, Staking, Mining, and margin.
              </p>
            </div>
          </span>
          <Button
            className="sm:w-fit w-full px-8 justify-center items-center flex"
          >
            <Link href="/signup">Explore More</Link>
          </Button>
        </article>
      </div>
    </section>
  )
}