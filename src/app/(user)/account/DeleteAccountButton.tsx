"use client";
import axios from "axios";
import { useState, useTransition } from "react";
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
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "../_component/SessionProvider";
import { logout } from "@/app/(auth)/action";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LoadingButton } from "@/components/LoadingButton";

export function DeleteAccountButton() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { user } = useSession();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (email !== user.email) {
      toast({
        title: "Error",
        description: "Email doesn't match. Please try again.",
        variant: "destructive",
      });
      setIsOpen(false);
      return;
    }

    startTransition(async () => {
      try {
        const response = await axios.delete('/api/user/account/delete', {
          data: { email },
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        });

        setIsOpen(false);

        const message = "Your account has been successfully deleted. We're sorry to see you go. If you change your mind, you can always create a new account. Thank you for being a part of our community."
        toast({
          title: "Success",
          description: message,
        });

        await logout(); // using Lucia
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast({
            variant: "destructive",
            description: err.response.data.message || 'An unexpected error occurred. Please try again later',
          });
        } else {
          toast({
            variant: "destructive",
            description: "An unexpected error occurred. Please try again later",
          });
        }
      }
    });
  };

  const resetState = () => {
    setEmail('');
    setIsOpen(false);
  };

  const content = (
    <>
      <div className="mb-4">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex justify-start sm:justify-end space-x-2">
        <Button variant="outline" onClick={resetState}>
          Cancel
        </Button>
        <LoadingButton
          variant="destructive"
          loading={isPending}
          disabled={email !== user.email}
          onClick={handleDelete}
        >
          Yes, Delete Account Forever
        </LoadingButton>
      </div>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button
              className="mt-10 px-5 border-brand-critical space-x-2 text-brand-critical hover:bg-red-600/20 sm:hidden"
              variant={"outline"}
              size={"sm"}
            >
              <CircleXIcon className="w-5 h-5" />
              <span>Delete Account</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-2 sm:hidden">
            <DrawerHeader className="text-start font-DMSans rounded-md space-y-5">
              <DrawerTitle className="text-lg">Delete Account</DrawerTitle>
              <DrawerDescription className="space-y-3">
                <span className="text-base inline-block">
                  Are you sure you want to delete your account? Deleting your account is permanent and will delete all your wallets forever.
                </span>
                <span className="text-base font-normal inline-block">Type <span className="font-bold">{user.email}</span> to confirm</span>
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              {content}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button
              className="mt-10 px-5 border-brand-critical space-x-2 text-brand-critical hover:bg-red-600/20 hidden sm:flex"
              variant={"outline"}
              size={"sm"}
            >
              <CircleXIcon className="w-5 h-5" />
              <span>Delete Account</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="font-DMSans rounded-md space-y-5 w-[30rem] hidden sm:block">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg">Delete Account</AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <span className="text-base inline-block">
                  Are you sure you want to delete your account? Deleting your account is permanent and will delete all your wallets forever.
                </span>
                <span className="text-base font-normal inline-block">Type <span className="font-bold">{user.email}</span> to confirm</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            {content}
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}