"use server";
import { lucia, validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  const { session } = await validateRequest();
  
  if (session) {
    try {
      await lucia.invalidateSession(session.id);
    } catch (error) {
      console.error("Failed to invalidate session:", error);
    }
  }

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  
  return redirect("/login");
}