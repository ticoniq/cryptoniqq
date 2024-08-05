import Image from "next/image";
import illustrationDark from "@/assets/images/Illustration-dark.png";
import illustrationLight from "@/assets/images/Illustration-light.png";
import { Eye, Shield, UsersRound } from "lucide-react";

export function Social() {
  return (
    <section className="font-DMSans py-24">
        <div className="container">
          <div className="w-full justify-center items-center gap-8 grid lg:justify-start lg:grid-cols-2 grid-cols-1">
            <figure className="flex justify-center lg:justify-start">
              <Image
                src={illustrationDark}
                width={578}
                height={528}
                alt="Dashboard image"
                className="w-full max-w-[36.125rem] h-auto hidden dark:block"
                priority={true}
              />
              <Image
                src={illustrationLight}
                width={578}
                height={528}
                alt="Dashboard image"
                className="w-full max-w-[36.125rem] h-auto dark:hidden"
                priority={true}
              />
            </figure>
            <article className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                <h2 className="text-clamp-slg font-bold max-w-[40rem] leading-none text-center lg:text-left">
                  We are the most trusted cryptocurrency platform.
                </h2>
                <p className="text-xl text-center lg:text-left max-w-[45rem]">
                  We believe Cryptolly is here to stay — and that a future worth building is one which opens its doors and invites everyone in.
                </p>
                <aside className="space-y-6 mt-5">
                  <div className="grid grid-cols-12 max-lg:max-w-lg gap-y-2 place-items-center text-center lg:justify-start lg:text-left">
                    <div className="col-span-12 lg:col-span-2 bg-pink-200/90 rounded-lg flex justify-center items-center w-20 h-20">
                      <Eye size={27} className="text-brand-critical" />
                    </div>
                    <div className="col-span-12 lg:col-span-10 w-full lg:pl-2">
                      <div className="w-full">
                        <h5 className="font-bold text-2xl">Clarity</h5>
                      </div>
                      <p className="text-brand-secondary dark:text-brand-secondary2">
                        We help you make sense of the coins, the terms, the dense charts and market changes.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 max-lg:max-w-lg gap-y-2 place-items-center text-center lg:justify-start lg:text-left">
                    <div className="col-span-12 lg:col-span-2 bg-green-200/90 rounded-lg flex justify-center items-center w-20 h-20">
                      <Shield size={27} className="text-brand-success" />
                    </div>
                    <div className="col-span-12 lg:col-span-10 w-full lg:pl-2">
                      <div className="w-full">
                        <h5 className="font-bold text-2xl leading-9">Confidence</h5>
                      </div>
                      <p className="text-brand-secondary dark:text-brand-secondary2">
                        Our markets are always up to date, sparking curiosity with real-world relevance.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 max-lg:max-w-lg gap-y-2 place-items-center text-center lg:justify-start lg:text-left">
                    <div className="col-span-12 lg:col-span-2 bg-blue-200/90 rounded-lg flex justify-center items-center w-20 h-20">
                      <UsersRound size={27} className="text-brand-primary" />
                    </div>
                    <div className="col-span-12 lg:col-span-10 w-full lg:pl-2">
                      <div className="w-full">
                        <h5 className="font-bold text-2xl leading-9">Community</h5>
                      </div>
                      <p className="text-brand-secondary dark:text-brand-secondary2">
                        We supports the crypto community, putting data in the hands which need it most.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </article>
          </div>
        </div>
      </section>
  )
}