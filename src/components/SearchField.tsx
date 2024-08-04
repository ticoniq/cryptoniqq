"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchField() {
  const router = useRouter();
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`); 
  }
  
  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input name="q" placeholder="Search..." className="p-5 rounded-full" />
        <Search className="absolute top-1/2 right-3 size-5 -transform -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
}