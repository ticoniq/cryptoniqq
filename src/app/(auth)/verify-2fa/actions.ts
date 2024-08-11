"use server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { verifyTOTP } from "@/lib/twoFactor";
import { TwoFactorFormValues, twoFactorSchema } from "@/lib/validation/auth";

export async function verifyTwoFactorCode(
  credentials: TwoFactorFormValues,
): Promise<{ error?: string, success?: string }> {
  try {
    const validatedData = twoFactorSchema.parse(credentials);

    if (!validatedData) throw new Error("Invalid data");
    
    const { code, userId } = validatedData;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { twoFactorSecret: true },
    });

    if (!user || !user.twoFactorSecret) {
      return { error: "User not found or 2FA not set up!" };
    }

    const isValid = await verifyTOTP(code, user.twoFactorSecret);

    if (!isValid) {
      return { error: "Invalid verification code!" };
    }

    // If the code is valid, create a session
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: "Account verified!" };
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}
