import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the window object is available
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
      media.addEventListener('change', listener);

      return () => {
        media.removeEventListener('change', listener);
      };
    }
  }, [query]);

  return matches;
};
