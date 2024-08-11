import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid place-items-center animate-pulse text-neutral-300 p-4">
      <div role="status" className="h-screen flex justify-center items-center">
        <Loader2 className="mx-auto animate-spin w-20 h-20" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
