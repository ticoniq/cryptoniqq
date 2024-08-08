"use server";
import { getLastSentVerificationCode, getVerifyEmailCode } from "@/data/user";
import { confirmEmailSchema, ConfirmEmailValues } from "@/lib/validation/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { lucia, validateRequest } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { generateEmailVerificationCode } from "@/lib/tokens";
import { sendVerificationCode } from "@/lib/mail";
import { Paths } from "@/lib/constants";
import { isWithinExpirationDate } from "oslo";
import { addHyphenAfterThreeDigits } from "@/lib/utils";

const timeFromNow = (time: Date) => {
  const now = new Date();
  const diff = time.getTime() - now.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor(diff / 1000) % 60;
  return `${minutes}m ${seconds}s`;
};

export async function verifyEmail(
  credentials: ConfirmEmailValues,
): Promise<{ error: string }> {
  try {
    const validatedData = confirmEmailSchema.parse(credentials);
    const { code } = validatedData;

    if (typeof code !== "string" || code.length !== 8)
      return { error: "Invalid code" };

    const { user } = await validateRequest();
    if (!user) return redirect(Paths.Login);

    const verificationCode = await getVerifyEmailCode(code);
    if (!verificationCode || verificationCode.code !== code)
      return { error: "Invalid verification code" };

    if (!isWithinExpirationDate(verificationCode.expiresAt))
      return { error: "Verification code expired" };

    if (verificationCode.email !== user.email)
      return { error: "Email does not match" };

    const session = await lucia.createSession(user.id, {});
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email_verified: true,
      },
    });

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

export async function resendVerificationEmail() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect(Paths.Login);
  }

  const lastSent = await getLastSentVerificationCode(user.id);

  if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
    return {
      error: `Please wait ${timeFromNow(lastSent.expiresAt)} before resending`,
    };
  }

  const code = await generateEmailVerificationCode(user.id, user.email);
  const verificationCode = addHyphenAfterThreeDigits(code);

  await sendVerificationCode(user.email, verificationCode);

  return { success: true };
}
