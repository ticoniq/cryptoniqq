"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyIcon, DownloadIcon, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/useCopy";
import { useDownload } from "@/hooks/useDownload2FA";

interface BackupCodesProps {
  ids: string[];
  showBackupCodesDialog: boolean;
  setShowBackupCodesDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BackupCodes({ ids, showBackupCodesDialog, setShowBackupCodesDialog }: BackupCodesProps) {
  const { isCopied, copyToClipboard } = useCopy();
  const { isDownloaded, downloadCode } = useDownload();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleBackupConfirmation = () => {
    if (isConfirming) {
      setShowBackupCodesDialog(false);
    } else {
      setIsConfirming(true);
    }
  };

  return (
    <>
      <AlertDialog open={showBackupCodesDialog} onOpenChange={setShowBackupCodesDialog}>
        <AlertDialogContent className="space-y-2">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Recovery codes</AlertDialogTitle>
            <AlertDialogDescription>
              Use recovery codes as an alternative login method if you lose your phone or are unable to receive a verification code; think about them as passwords and keep them in a safe place.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Alert className="bg-yellow-600/20 border-l-8 border-brand-warning flex items-center gap-2">
            <div className="h-8 w-8 bg-brand-warning rounded-md flex justify-center items-center">
              <TriangleAlert className="h-4 w-4" />
            </div>
            <AlertDescription>
              This is the only time you will see these recovery codes. Please make sure you back them up.
            </AlertDescription>
          </Alert>
          <div className="flex flex-wrap p-5 rounded-md gap-y-4 bg-brand-surface dark:bg-brand-hover">
            {ids?.map((code, index) => (
              <p key={index} className="text-sm w-1/3">
                {code}
              </p>
            ))}
          </div>
          <AlertDialogFooter>
            <div className="flex justify-between w-full">
              <span className="flex gap-x-2">
                <Button
                  variant={"outline"}
                  onClick={() => copyToClipboard(ids?.join("\n") ?? "")}
                >
                  {isCopied ? 'Copied!' : <><CopyIcon className="size-4 mr-2" /> Copy</>}
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => downloadCode(ids, "recovery-codes.txt")}
                >
                  {isDownloaded ? 'Downloaded!' : <><DownloadIcon className="size-4 mr-2" /> Download</>}
                </Button>
              </span>
              <Button
                onClick={handleBackupConfirmation}
              >
                {isConfirming ? <><DownloadIcon className="size-4 mr-2" /> Yes, I really have</> : "I've backed up my codes"}
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}