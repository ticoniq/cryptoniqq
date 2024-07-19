import Link from "next/link"
import React from 'react'
import { Button } from "../ui/button"

export function CTA() {
  return (
    <section className="font-DMSans py-5 bg-gradient-to-r from-brand-primary to-brand-decorative 
    dark:bg-gradient-r dark:from-brand-onSurface dark:to-brand-onSurface">
      <div className="container">
        <div className="flex items-center justify-between flex-col space-y-5 lg:flex-row lg:space-y-0">
          <div className="block text-center text-white lg:text-left">
            <h2
              className="text-clamp-md font-semibold"
            >
              Earn up to $25 worth of crypto
            </h2>
            <p className="text-base">
              Discover how specific cryptocurrencies work — and get a bit of each crypto to try out for yourself.
            </p>
          </div>
          <Button asChild className="bg-white font-bold text-brand-onSurface rounded-full">
            <Link href={"/"}>
              Create Account
            </Link>
          </Button>
        </div>
      </div>
    </section>

  )
}