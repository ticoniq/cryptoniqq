"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  generateTwoFactorSecret,
  createTwoFactorURI,
  generateQRCode,
  verifyTOTP,
} from "@/lib/twoFactor";
import { encodeHex } from "oslo/encoding";
import { TwoFactorFormValues, twoFactorSchema } from "@/lib/validation/account";
import { revalidatePath } from "next/cache";

export async function setupTwoFactor() {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const twoFactorSecret = generateTwoFactorSecret();
  await prisma.user.update({
    where: { id: user.id },
    data: { twoFactorSecret: encodeHex(twoFactorSecret) },
  });

  const uri = createTwoFactorURI("Cryptoniq", user.email, twoFactorSecret);
  const qrCode = await generateQRCode(uri);
  const qrCodeBase64 = encodeHex(twoFactorSecret);

  return { qrCode, qrCodeBase64 };
}

export async function verifyAndEnableTwoFactor(
  credentials: TwoFactorFormValues,
) {
  const validatedData = twoFactorSchema.parse(credentials);

  if (!validatedData) throw new Error("Invalid data");

  const { code } = validatedData;

  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  if (!user.twoFactorSecret) {
    throw new Error("Two-factor authentication not set up");
  }

  const isValid = await verifyTOTP(code, user.twoFactorSecret);
  if (!isValid) {
    throw new Error("Invalid OTP");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { twoFactorEnabled: true },
  });

  revalidatePath("/account/security");

  return { success: true };
}

export async function disable2FA(credentials: TwoFactorFormValues): Promise<{
  error?: string;
  success?: string;
}> {
  try {
    const validatedData = twoFactorSchema.parse(credentials);
    const { code } = validatedData;

    const { user } = await validateRequest();
    if (!user) return { error: "Unauthorized!" };

    if (!user.twoFactorEnabled || !user.twoFactorSecret) {
      return { error: "Two-factor authentication is not currently enabled!" };
    }

    const isValid = await verifyTOTP(code, user.twoFactorSecret);

    if (!isValid) {
      return { error: "Invalid code. Please try again!" };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { twoFactorEnabled: false, twoFactorSecret: null },
    });

    revalidatePath("/account/security");

    return { success: "Two-factor authentication disabled!" };
  } catch (error) {
    console.error("Error disabling 2FA:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred. Please try again later!" };
  }
}
