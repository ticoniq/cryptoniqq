import { useState } from 'react';
import { useUploadThing } from '@/lib/uploadthing';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { CameraIcon } from 'lucide-react';
import { UserAvatar } from "../_component/UserAvatar";
import { useSession } from "../_component/SessionProvider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const CustomUploadButton = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { user } = useSession()
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing('avatar', {
    onClientUploadComplete: (res) => {
      toast({
        description: "Upload Completed",
      });
      router.refresh();
    },
    onUploadError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const filePreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(filePreviewUrl);
      startUpload([file]);
    }
  };

  return (
    <div className="relative inline-block">
      <UserAvatar avatarUrl={previewUrl || user.avatarUrl} size={100} />
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
              type="file"
              accept="image/*"
              onChange={handleFileChange}
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