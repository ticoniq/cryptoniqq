import { useState } from 'react';
import { useUploadThing } from '@/lib/uploadthing';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { CameraIcon, Loader2 } from 'lucide-react';
import { UserAvatar } from "../_component/UserAvatar";
import { useSession } from "../_component/SessionProvider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Resizer from 'react-image-file-resizer';

const MAX_FILE_SIZE = 512 * 1024; // 512KB in bytes

const resizeImage = (image: File, maxWidth = 1024, maxHeight = 1024): Promise<File> => {
  return new Promise((resolve, reject) => {
    let quality = 100;
    const resize = () => {
      Resizer.imageFileResizer(
        image,
        maxWidth,
        maxHeight,
        "WEBP",
        quality,
        0,
        (uri) => {
          if (uri instanceof File) {
            if (uri.size <= MAX_FILE_SIZE || quality <= 10) {
              resolve(uri);
            } else {
              quality -= 10;
              resize();
            }
          } else {
            reject(new Error('Resized image is not a File object'));
          }
        },
        "file"
      );
    };
    resize();
  });
};

const CustomUploadButton = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const { user } = useSession();
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const resizedImage = await resizeImage(file);
        setImage(resizedImage);
        setPreviewUrl(URL.createObjectURL(resizedImage));
        
        const uploadResult = await startUpload([resizedImage]);
      } catch (error) {
        console.error('Error resizing image:', error);
        toast({
          title: "Error",
          description: "Failed to resize image. Please try again.",
          variant: "destructive",
        });
      }
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
              <Loader2 className="h-4 w-4 animate-spin" />
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