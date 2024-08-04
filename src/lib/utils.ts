import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function replaceSpaceWithHyphen(str: string): string {
  return str.replace(/\s+/g, '-');
}

export function replaceHyphenWithSpace(str: string): string {
  return str.replace(/-/g, ' ');
}