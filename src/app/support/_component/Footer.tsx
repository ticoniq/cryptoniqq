import { Logo } from "@/components/Logo";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <span className="flex justify-center ">
              <Logo link="/" />
            </span>
            <ul className="flex items-center justify-center transition-all duration-500 my-10 border-b" />
            <div className="flex space-x-10 justify-center items-center mb-14">
              <Link href="#" className="block transition-all duration-500 hover:text-brand-primary">
                <FaXTwitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="block transition-all duration-500 hover:text-brand-primary">
                <FaInstagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="block transition-all duration-500 hover:text-brand-primary">
                <FaFacebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="block transition-all duration-500 hover:text-brand-warning">
                <FaYoutube className="w-8 h-8" />
              </Link>
            </div>
            <span className="text-lg text-gray-500 text-center block">©<a href="https://pagedone.io/">pagedone</a> 2024, All rights reserved.</span>
          </div>
        </div>
      </footer>
  )
}