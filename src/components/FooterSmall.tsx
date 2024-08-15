"use client";
import { CustomLink } from "@/components/CustomLink";
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export function FooterSmall() {
  return (
    <footer className="w-full font-DMSans">
      <section className="py-3 bg-brand-surface text-brand-onSurface dark:bg-brand-hover dark:text-brand-secondary2">
        <div className="container">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-brand-secondary dark:text-brand-secondary2 ">
              &copy; 2023 {" "}
              <CustomLink href="/" textarea={" Cryptoniq"} divClassName={"h-[1px] bg-brand-secondary dark:bg-brand-secondary2"} />
              . All rights reserved.
            </span>
            <div className="flex mt-4 space-x-4 items-center sm:justify-center lg:mt-0">
              <Link href="x.com/cryptoniq" target="_blank" className="block transition-all duration-500 hover:text-brand-primary">
                <FaXTwitter className="w-6 h-6" />
              </Link>
              <Link href="instagram.com/cryptoniq" target="_blank" className="block transition-all duration-500 hover:text-brand-primary">
                <FaInstagram className="w-6 h-6" />
              </Link>
              <Link href="facebook.com/cryptoniq" target="_blank" className="block transition-all duration-500 hover:text-brand-primary">
                <FaFacebook className="w-6 h-6" />
              </Link>
              <Link href="youtube.com/cryptoniq" target="_blank" className="block transition-all duration-500 hover:text-brand-warning">
                <FaYoutube className="w-8 h-8" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
