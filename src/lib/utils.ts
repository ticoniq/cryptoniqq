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

export function addHyphenAfterThreeDigits(input: string): string {
  if (typeof input !== 'string' || input.length < 3) {
    return input;
  }
  return input.slice(0, 3) + '-' + input.slice(3);
}