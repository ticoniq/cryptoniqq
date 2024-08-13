import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDate, formatDistanceToNowStrict } from "date-fns";

/**
 * Merges class names using clsx and tailwind-merge.
 * This function is useful for conditionally applying Tailwind CSS classes.
 *
 * @param inputs - Any number of class values or conditional class objects
 * @returns A string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Replaces all spaces in a string with hyphens.
 * Useful for creating URL-friendly slugs or identifiers.
 *
 * @param str - The input string
 * @returns The string with spaces replaced by hyphens
 */
export function replaceSpaceWithHyphen(str: string): string {
  return str.replace(/\s+/g, "-");
}

/**
 * Replaces all hyphens in a string with spaces.
 * Useful for converting URL-friendly slugs back to readable text.
 *
 * @param str - The input string
 * @returns The string with hyphens replaced by spaces
 */
export function replaceHyphenWithSpace(str: string): string {
  return str.replace(/-/g, " ");
}

/**
 * Adds a hyphen after the first three digits in a string,
 * but only if the string is at least 8 characters long.
 * Useful for formatting certain types of codes or identifiers.
 *
 * @param input - The input string
 * @returns The formatted string with a hyphen added, or the original string if it's too short
 */
export function addHyphenAfterThreeDigits(input: string): string {
  if (typeof input !== "string" || input.length < 8) {
    return input;
  }
  return input.slice(0, 4) + "-" + input.slice(4);
}

/**
 * Extracts the first name from a full name string.
 *
 * @param fullName - The full name string (e.g., "Robert Duke")
 * @returns The first name, or the entire string if no space is found
 */
export function getFirstName(fullName: string): string {
  const trimmedName = fullName.trim();
  const firstName = trimmedName.split(" ")[0];
  return firstName;
}

/**
 * Extracts the last name from a full name string.
 *
 * @param fullName - The full name string (e.g., "Robert Duke")
 * @returns The last name, or the entire string if no space is found
 */
export function getLastName(fullName: string): string {
  const trimmedName = fullName.trim();
  const lastName = trimmedName.split(" ")[1];
  return lastName;
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export function formatYDate(date: Date): string {
  return format(date, "MMMM d, yyyy");
}

export function formatRelativeDate(from: Date) {
  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "MMM d");
    } else {
      return formatDate(from, "MMM d, yyyy");
    }
  }
}
