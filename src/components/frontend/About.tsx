import { Lock, PieChart, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <section className="py-24 font-DMSans">
        <div className="container">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <div
              className="w-full justify-center place-items-center gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div className="lg:justify-center sm:justify-end justify-start items-start gap-2.5 space-y-6 flex-col">
                <div className="p-7 relative flex flex-col justify-center items-center text-center w-full rounded-xl bg-brand-surface dark:bg-brand-hover">
                  <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                    <PieChart size={25} className="text-indigo-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Portfolio Manager</h4>
                  <p className="text-sm leading-5 text-brand-secondary dark:text-brand-secondary2">
                    Buy and sell popular digital currencies, keep track of them in the one place.
                  </p>
                </div>
                <div className="p-7 relative flex flex-col justify-center items-center text-center w-full rounded-xl bg-brand-surface dark:bg-brand-hover">
                  <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                    <Smartphone size={25} className="text-indigo-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Mobile Apps</h4>
                  <p className="text-sm leading-5 text-brand-secondary dark:text-brand-secondary2">
                    Stay on top of the markets with the Cryptolly app for Android or iOS.
                  </p>
                </div>
              </div>
              <div className="p-7 relative flex flex-col justify-center items-center text-center w-full rounded-xl bg-brand-surface dark:bg-brand-hover">
                <div className="bg-white rounded-full flex justify-center items-center mb-6 w-14 h-14 ">
                  <Lock size={25} className="text-brand-success" />
                </div>
                <h4 className="text-xl font-bold mb-2">
                  Vault protection
                </h4>
                <p className="text-sm leading-5 text-brand-secondary dark:text-brand-secondary2">
                  For added security, store your funds in a vault with time delayed withdrawals.
                </p>
              </div>
            </div>
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <h2 className="text-clamp-slg font-bold max-w-[30rem] leading-none">
                The most trusted cryptocurrency platform.
              </h2>
              <p className="text-brand-secondary text-xl dark:text-brand-secondary2">
                Cryptolly has a variety of features that make it the best place to start trading
              </p>
              <Button
                className="sm:w-fit w-full px-8 justify-center items-center flex"
              >
                Let’s Trade Now
              </Button>
            </div>
          </div>
        </div>
      </section>
  )
}