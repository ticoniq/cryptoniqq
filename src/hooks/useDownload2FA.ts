import { useState } from "react";

export function useDownload() {
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);

  const downloadCode = async (ids: string[], fileName: string = "ids.txt") => {
    try {
      const idsString = ids.join("\n");
      const blob = new Blob([idsString], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url);
      setIsDownloaded(true);

      setTimeout(() => setIsDownloaded(false), 2000); // Reset after 2 seconds
    } catch (error) {
      setIsDownloaded(false);
    }
  };

  return { isDownloaded, downloadCode };
}
