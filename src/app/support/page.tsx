import { SearchField } from "@/components/SearchField";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Smartphone } from "lucide-react";
import React from 'react'

type Props = {}

export default function page({ }: Props) {
  return (
    <>
      <main className="container py-10">
        <SearchField />
        <div className="grid flex-1 items-start gap-4 pt-10 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>

                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="sm:col-span-2">
                <CardHeader>
                  <CardTitle>Wallet</CardTitle>
                  <CardDescription>

                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="sm:col-span-2">
                <CardHeader>
                  <CardTitle>Verification & Security</CardTitle>
                  <CardDescription>

                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="sm:col-span-2">
                <CardHeader>
                  <CardTitle>2FA</CardTitle>
                  <CardDescription>

                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="sm:col-span-2">
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>

                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="sm:col-span-2">
                <CardHeader>
                  <CardTitle>Wallet</CardTitle>
                  <CardDescription>

                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="sm:col-span-2">
                <CardHeader>
                  <CardTitle>Verification & Security</CardTitle>
                  <CardDescription>

                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="sm:col-span-2">
                <CardHeader>
                  <CardTitle>2FA</CardTitle>
                  <CardDescription>

                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <div>
            <Card className="space-y-8">
              <CardHeader>
                <CardTitle className="p-0">
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-10">
                <p>
                  {"Didn't find what you were looking for in the Knowledge Base articles? Feel free to submit a case or contact our Support Service below for further help."}
                </p>
                <span className="block space-y-5">
                  <h3 className="text-lg">Support Service Hours</h3>
                  <p>2/7 customer support</p>
                </span>

                <div className="flex items-center gap-5">
                  <Smartphone />
                  <aside>
                    <h5 className="mb-1 font-bold">Phone:</h5>
                    <p className="space-x-5">
                      <span>0000000000</span>
                      <span>0000000000</span>
                    </p>
                  </aside>
                </div>
              </CardContent>
              <CardFooter className="px-6 py-3 border-t">
                <div className="flex flex-row items-center">
                  <div className="text-xs text-muted-foreground">
                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}