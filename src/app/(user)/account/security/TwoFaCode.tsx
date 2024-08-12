import { AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/useCopy";
import { CopyIcon } from "lucide-react";
import Image from "next/image";

interface TwoFaCodeProps {
  qrCode: string | null;
  setupKey: string | null;
}

export function TwoFaCode({ qrCode, setupKey }: TwoFaCodeProps) {
  const { isCopied, copyToClipboard } = useCopy();

  return (
    <>
      <article className="text-center flex flex-col justify-center items-center space-y-3">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-brand-hover dark:text-brand-surface mb-1">Scan QR Code</span>
          <AlertDialogDescription>Scan the image below with the 2FA authenticator app on your phone.</AlertDialogDescription>
        </div>
        {qrCode && (
          <Image
            src={qrCode}
            alt="QR Code"
            width={200}
            height={200}
          />
        )}
        <div>
          <span className="text-lg font-semibold text-brand-hover dark:text-brand-surface">OR</span>
          <AlertDialogDescription>Manually enter the code below in the 2FA authenticator app on your phone.</AlertDialogDescription>
        </div>
        <div className="flex justify-center items-center gap-2 my-1">
          {setupKey && (
            <p className="text-lg font-semibold text-brand-hover dark:text-brand-surface">{setupKey}</p>
          )}
          <Button
            variant={"ghost"}
            onClick={() => copyToClipboard(setupKey ?? '')}
            className="copy-button rounded-md py-4 px-3 h-0"
          >
            {isCopied ? 'Copied!' : <CopyIcon className="size-4" />}
          </Button>
        </div>
      </article>
    </>
  )
}