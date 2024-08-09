"use client";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleXIcon } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "../_component/SessionProvider";
import { logout } from "@/app/(auth)/action";

export function DeleteAccountButton() {
  const [email, setEmail] = useState("");
  const { user } = useSession();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (email !== user.email) {
      toast({
        title: "Error",
        description: "Email doesn't match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.delete('/api/user/account/delete', {
        data: { email },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Your account has been deleted successfully.",
        });

        await logout(); // Using Lucia for logout
      } else {
        toast({
          title: "Error",
          description: response.data?.error || "Failed to delete the account. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast({
            title: "Error",
            description: error.response.data?.error || "Server error occurred. Please try again later.",
            variant: "destructive",
          });
        } else if (error.request) {
          toast({
            title: "Error",
            description: "No response from the server. Please check your internet connection.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Request setup error. Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="mt-10 px-5 border-brand-critical space-x-2 text-brand-critical hover:bg-red-600/20"
            variant={"outline"}
            size={"sm"}
          >
            <CircleXIcon className="w-5 h-5" />
            <span>Delete Account</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="font-DMSans space-y-5 w-[30rem]">
          <AlertDialogHeader className="space-y-5">
            <AlertDialogTitle className="text-lg">Delete Account</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <span className="text-base inline-block">
                Are you sure you want to delete your account? Deleting your account is permanent and will delete all your wallets forever.
              </span>
              <span className="text-base font-normal inline-block">Type <span className="font-bold">{user.email}</span> to confirm</span>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-brand-critical" onClick={handleDelete}>
              Yes Delete Account Forever
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}