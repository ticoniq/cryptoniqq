"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from 'next/dynamic';
import { useSession } from "@/app/SessionProvider";
import { updateAccount } from "./actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@radix-ui/react-dropdown-menu";


const PaystackButton = dynamic(() => import('react-paystack').then(mod => mod.PaystackButton), { ssr: false });

export function Payment() {
  const { user } = useSession();
  const { toast } = useToast();
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;
  const [amount, setAmount] = useState("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const nairaAmount = Number(amount) * 100;

  const componentProps = {
    email: user.email,
    amount: nairaAmount,
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

  const handleSuccess = async (response: any) => {
    setShowDialog(false)
    if (response.status === 'success') {
      setShowDialog(false)
      const amountToAdd = nairaAmount / 100;
      const transactionRef = response.reference;
      const { error, success } = await updateAccount(amountToAdd, transactionRef);
      if (success) {
        toast({
          description: success,
        });
      }
      if (error) {
        toast({
          variant: "destructive",
          description: error,
        });
      }
    } else {
      toast({
        variant: "destructive",
        description: "Payment was not successful. Please try again.",
      });
    }
  };

  const handleClose = () => {
    alert("Payment cancelled. We hope you'll consider donating in the future!");
  };

  return (
    <div>
      {/* <h1 className="text-center text-[25px] my-4 font-[600]">Make your payment here</h1>
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
      </div> */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogTrigger asChild>
          <Button className="grow">
            Deposit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <Label>
              Amount
            </Label>
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <PaystackButton
                {...componentProps}
                text="Pay with Paystack"
                onSuccess={handleSuccess}
                onClose={handleClose}
              />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}