import { useState } from 'react';

export function useCopy() {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      setIsCopied(false);
    }
  };

  return { isCopied, copyToClipboard };
}
