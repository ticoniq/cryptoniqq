import { useCallback, useState } from 'react';
import { useDropzone } from '@uploadthing/react/hooks';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { useUploadThing } from '@/lib/uploadthing';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { CameraIcon, UploadIcon } from 'lucide-react';
import { UserAvatar } from "../_component/UserAvatar";
import { useSession } from "../_component/SessionProvider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CustomUploadButton = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { user } = useSession()

  const { startUpload, isUploading } = useUploadThing('avatar', {
    onClientUploadComplete: (res) => {
      toast({
        description: "Upload Completed",
      });
    },
    onUploadError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles[0]) {
        // Create a preview URL for the dropped file
        const filePreviewUrl = URL.createObjectURL(acceptedFiles[0]);
        setPreviewUrl(filePreviewUrl);
        
        // Start the upload process
        startUpload(acceptedFiles);
      }
    },
    [startUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image']),
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="relative inline-block">
      <UserAvatar avatarUrl={previewUrl || user.avatarUrl} size={100} />
      {/* <input {...getInputProps()} /> */}
      <div className="absolute bottom-0 right-0">
        <Button
          disabled={isUploading}
          variant="default"
          size="icon"
          className="h-[29px] w-[29px] rounded-full bg-brand-primary shadow-brand-primary shadow-md"
        >
          <Label htmlFor="upload" className="flex flex-col justify-center h-full items-center gap-2 cursor-pointer">
            {isUploading ? (
              <span className="text-xs">...</span>
            ) : (
              <CameraIcon className="h-4 w-4" />
            )}
            <Input
              {...getInputProps()}
              className="hidden"
              id="upload"
            />
          </Label>
        </Button>
      </div>
    </div>
  );
};

export default CustomUploadButton;