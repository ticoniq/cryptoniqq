"use server";
import { getUserByEmail, getUserByphone, getVerifyEmailCode } from "@/data/user";
import { confirmEmailSchema, ConfirmEmailValues } from "@/lib/validation/auth";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { lucia, validateRequest } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { generateEmailVerificationCode } from "@/lib/tokens";
import { sendVerificationCode } from "@/lib/mail";
import { Paths } from "@/lib/constants";
import { isWithinExpirationDate } from "oslo";

export async function verifyEmail(
  credentials: ConfirmEmailValues,
): Promise<{ error: string }> {
  try {
    const validatedData = confirmEmailSchema.parse(credentials);

    const { code } = validatedData;

    if (typeof code !== "string" || code.length !== 8) {
      return { error: "Invalid code" };
    }

    const { user } = await validateRequest();
    if (!user) {
      return redirect(Paths.Login);
    }

    const verificationCode = await getVerifyEmailCode(code);

    if (!verificationCode || verificationCode.code !== code) return { error: "Invalid verification code" };

    if (!isWithinExpirationDate(verificationCode.expiresAt)) return { error: "Verification code expired" };

    if (verificationCode.email !== user.email) return { error: "Email does not match" };

    const session = await lucia.createSession(user.id, {});
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email_verified: true,
      },
    })

    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect(Paths.Dashboard);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong. Please try again" };
  }
}
