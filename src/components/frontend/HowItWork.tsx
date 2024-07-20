import Image from "next/image";
import bitcoinCloud from "@/assets/images/bitcoin-cloud.png";
import bitcoinWallet from "@/assets/images/bitcoin-wallet.png";
import bitcoinMinner from "@/assets/images/bitcoin-mining.png";
import bitcoinComparison from "@/assets/images/bitcoin-comparison.png";

export function HowItWork() {
  return (
    <section className="bg-brand-surface dark:bg-brand-bg font-DMSans py-10 lg:py-20 relative">
      <div className="container">
        <div className="w-full flex-col justify-start items-center lg:gap-12 gap-10 inline-flex">
          <div className="w-full flex-col justify-start items-center gap-3 flex">
            <h2 className="text-clamp-slg font-bold max-w-[27rem] leading-none text-center lg:text-left">
              How It Work
            </h2>
            <p className="text-brand-secondary max-w-[30rem] text-center text-xl dark:text-brand-secondary2">
              Stacks is a production-ready library of stackable content blocks built in React Native.
            </p>
          </div>
          <div className="w-full justify-start items-center gap-4 flex md:flex-row flex-col">
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
              <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                <Image src={bitcoinCloud}
                  alt="CTA"
                  width={96}
                  height={96}
                  priority={true}
                  className="w-24 h-24"
                />
                <h4 className="self-stretch text-center text-2xl font-bold">Create an account</h4>
              </div>
              <p className="self-stretch text-center  text-base font-normal leading-relaxed text-brand-secondary dark:text-brand-secondary2">
                Stacks is a production-ready library of stackable content blocks built in React Native.
              </p>
            </div>
            <svg className="md:flex hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004" stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
              <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                <Image src={bitcoinWallet}
                  alt="CTA"
                  width={96}
                  height={96}
                  priority={true}
                  className="w-24 h-24"
                />
                <h4 className="self-stretch text-center text-2xl font-bold">Verify your identity</h4>
              </div>
              <p className="self-stretch text-center  text-base font-normal leading-relaxed text-brand-secondary dark:text-brand-secondary2">
                Stacks is a production-ready library of stackable content blocks built in React Native.
              </p>
            </div>
            <svg className="md:flex hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004" stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
              <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                <Image src={bitcoinMinner}
                  alt="CTA"
                  width={96}
                  height={96}
                  priority={true}
                  className="w-24 h-24"
                />
                <h4 className="self-stretch text-center text-2xl font-bold">Start Trading</h4>
              </div>
              <p className="self-stretch text-center  text-base font-normal leading-relaxed text-brand-secondary dark:text-brand-secondary2">
                Stacks is a production-ready library of stackable content blocks built in React Native.
              </p>
            </div>
            <svg className="md:flex hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004" stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
              <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                <Image src={bitcoinComparison}
                  alt="CTA"
                  width={96}
                  height={96}
                  priority={true}
                  className="w-24 h-24"
                />
                <h4 className="self-stretch text-center text-2xl font-bold">Track every trade</h4>
              </div>
              <p className="self-stretch text-center  text-base font-normal leading-relaxed text-brand-secondary dark:text-brand-secondary2">
                Stacks is a production-ready library of stackable content blocks built in React Native.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}