"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from 'next/dynamic';
import { useSession } from "@/app/SessionProvider";

const PaystackButton = dynamic(() => import('react-paystack').then(mod => mod.PaystackButton), { ssr: false });

export default function Payment() {
  const { user } = useSession();
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
  const [amount, setAmount] = useState("");

  const componentProps = {
    email: user.email,
    amount: Number(amount) * 100,
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: user.name
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: user.phone
        }
      ]
    },
    publicKey,
  };

  const handleSuccess = () => {
    alert("Thanks for donating to us! We do not take it for granted!");
  };

  const handleClose = () => {
    alert("Wait! You need to donate, don't go!!!!");
  };

  return (
    <div className="px-4">
      <h1 className="text-center text-[25px] my-4 font-[600]">Make your payment here</h1>
      <div className="space-y-5 my-4">
        <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Button asChild size="sm">
          <PaystackButton
            {...componentProps}
            text="Pay with Paystack"
            onSuccess={handleSuccess}
            onClose={handleClose}
          />
        </Button>
      </div>
    </div>
  );
}