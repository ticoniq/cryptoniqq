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

    const twoFactorAuth = await prisma.twoFactorAuth.findUnique({
      where: { userId: userId },
      select: { secret: true, verified: true },
    });

    if (!twoFactorAuth || !twoFactorAuth.verified) {
      return { error: "Two-factor authentication is not currently enabled!" };
    }

    const isValid = await verifyTOTP(code, twoFactorAuth.secret);

    if (!isValid) {
      return { error: "Invalid verification code!" };
    }

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
