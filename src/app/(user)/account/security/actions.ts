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

export async function setupTwoFactor() {
  const session = await validateRequest();

  if (!session) throw new Error("Unauthorized");

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

export async function verifyAndEnableTwoFactor(otp: string) {
  const session = await validateRequest();

  if (!session || !session.user) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { twoFactorSecret: true },
  });

  if (!dbUser?.twoFactorSecret) {
    throw new Error("Two-factor authentication not set up");
  }

  const isValid = await verifyTOTP(otp, dbUser.twoFactorSecret);
  if (!isValid) {
    throw new Error("Invalid OTP");
  }

  // Two-factor is now verified and enabled
  // You might want to add a `twoFactorEnabled` field to your User model
  await prisma.user.update({
    where: { id: session.user.id },
    data: { twoFactorEnabled: true },
  });

  return { success: true };
}
