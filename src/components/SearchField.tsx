"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchField() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/support/search?q=${encodeURIComponent(q)}`); 
  }
  
  return (
    <form onSubmit={handleSubmit} method="GET" action="/support/search">
      <div className="relative">
        <Input 
          name="q" 
          placeholder="Search..." 
          className="p-5 rounded-full" 
          defaultValue={currentQuery}
        />
        <Search className="absolute top-1/2 right-3 size-5 -transform -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
}