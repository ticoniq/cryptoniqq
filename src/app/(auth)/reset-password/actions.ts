"use server";
import { generatePasswordResetToken, getUserByEmail } from "@/data/user";
import { ResetPasswordValues, resetPasswordSchema } from "@/lib/validation/auth";
import { passwordVerificationLink } from "@/lib/mail";
import { getFirstName } from "@/lib/utils";

export async function resetPasswordLink(
  credentials: ResetPasswordValues,
): Promise<{ error?: string; success?: string }> {
  try {
    const validatedData = resetPasswordSchema.parse(credentials);

    if (!validatedData) return { error: "Invalid email" };

    const { email } = validatedData;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email_verified) return { error: "Provided email is invalid." };

    const verificationToken = await generatePasswordResetToken(existingUser.id);

    if (!verificationToken) return { error: "Failed to generate password reset token" };

    const resetPasswordLink = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/reset-password/${verificationToken}`;

    const firstname = getFirstName(existingUser.name);
    
    await passwordVerificationLink(
      existingUser.email || "",
      firstname,
      resetPasswordLink,
    );

    return { success: "Verification link sent please check your email" };
  } catch (error) {
    return { error: "Something went wrong. Please try again" };
  }
}
