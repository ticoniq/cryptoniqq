"use server";
import { getUserByEmail } from "@/data/user";
import { loginSchema, LoginValues } from "@/lib/validation/auth";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verify } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { verifyTOTP } from "@/lib/twoFactor";

export async function login(
  credentials: LoginValues,
): Promise<{ error?: string; requiresTwoFactor?: boolean; currentUserId?: any }> {
  try {
    const validatedData = loginSchema.parse(credentials);

    const { email, password } = validatedData;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.passwordHash) {
      return { error: "Invalid email or password" };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return { error: "Invalid email or password" };
    }

    if (existingUser.twoFactorEnabled) {
      return redirect(`/verify-2fa?userId=${existingUser.id}`);
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/dashboard");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong. Please try again" };
  }
}


export async function verifyTwoFactorCode(userId: string, code: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { twoFactorSecret: true }
    });

    if (!user || !user.twoFactorSecret) {
      return { error: "User not found or 2FA not set up" };
    }

    const isValid = await verifyTOTP(code, user.twoFactorSecret);

    if (!isValid) {
      return { error: "Invalid verification code" };
    }

    // If the code is valid, create a session
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true };
  } catch (error) {
    console.error("2FA verification error:", error);
    return { error: "An unexpected error occurred" };
  }
}
