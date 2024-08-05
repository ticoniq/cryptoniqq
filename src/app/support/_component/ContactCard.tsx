import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import supportContact from "@/assets/images/contact/support-contact.png";
import { Button } from "@/components/ui/button";


export default function ContactCard() {
  return (
    <Card className="flex flex-col justify-evenly items-center gap-y-5 p-6 md:flex-row">
      <figure>
        <Image
          src={supportContact}
          alt="CTA"
          width={240}
          height={240}
          priority={true}
          className="w-60 h-60"
        />
      </figure>
      <CardHeader className="p-0 flex justify-center items-center space-y-8">
        <CardTitle className="text-clamp-md text-center p-0 font-normal">{"Can't find what you're looking for?"}</CardTitle>
        <CardDescription className="p-0">
          <Button asChild size={"lg"}>
            <Link href="/contact" className="flex justify-center gap-5 items-center">
              <Mail />
              Contact us
            </Link>
          </Button>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}