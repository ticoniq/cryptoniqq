"use client";
import { CustomLink } from "@/components/CustomLink";
import { Logo } from "@/components/Logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full font-DMSans">
      <section className="container">
        {/* <!--Grid--> */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 gap-y-8">
          <div className="col-span-full mb-10 space-y-5 lg:col-span-2 lg:mb-0">
            {/* <figure className="w-full mb-5 flex justify-center lg:justify-start"> */}
              <Logo link="/" />
            {/* </figure> */}
            <div className="space-y-2">
              <h4 className="text-2xl font-bold">{"Let's talk! 🤙"}</h4>
              <h4 className="text-base">{"+234 987 654 3210"}</h4>
              <h4 className="text-base">{"info@cryptoniq.tech"}</h4>
              <h4 className="text-base">{"Let's talk!"}</h4>
            </div>
          </div>
          {/* <!--End Col--> */}
          <div className="lg:mx-auto text-left ">
            <h4 className="text-sm font-bold mb-4 uppercase">Products</h4>
            <ul className="space-y-2 text-brand-secondary dark:text-brand-secondary2 transition-all duration-500">
              <li><CustomLink href="/" textarea={"Spot"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Inverse Perpetual"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"USDT Perpetual"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Exchange"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Launchpad"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
            </ul>
          </div>
          {/* <!--End Col--> */}
          <div className="lg:mx-auto text-left ">
            <h4 className="text-sm font-bold mb-4 uppercase">Services</h4>
            <ul className="space-y-2 text-brand-secondary dark:text-brand-secondary2 transition-all duration-500">
              <li><CustomLink href="/" textarea={"Buy Crypto"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Market"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Trading Fee"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Affiliate Program"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Referral Program"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
            </ul>
          </div>
          {/* <!--End Col--> */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-sm font-bold mb-4 uppercase">Support</h4>
            <ul className="space-y-2 text-brand-secondary dark:text-brand-secondary2 transition-all duration-500">
              <li><CustomLink href="/" textarea={"Cryptoniq Learn"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Help Center"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"User Feedback"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Submit a request"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Trading Rules"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
            </ul>
          </div>
          {/* <!--End Col--> */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-sm font-bold mb-4 uppercase">About Us</h4>
            <ul className="space-y-2 text-brand-secondary dark:text-brand-secondary2 transition-all duration-500">
              <li><CustomLink href="/" textarea={"About Cryptoniq"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Authenticity Check"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Careers"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Business Contacts"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
              <li><CustomLink href="/" textarea={"Blog"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} /></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-3 bg-brand-surface text-brand-onSurface dark:bg-brand-hover dark:text-brand-secondary2">
        <div className="container">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-brand-secondary dark:text-brand-secondary2 ">&copy; 2023 {" "}
              <CustomLink href="/" textarea={"Cryptoniq"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} />
              . All rights reserved.</span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
              <Link href="/" target="_blank" className="w-8 h-8 rounded-full bg-gray-700 flex justify-center items-center hover:bg-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g id="Social Media">
                    <path id="Vector" d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z" fill="white" />
                  </g>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}