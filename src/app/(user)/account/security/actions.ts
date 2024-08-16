"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  generateTwoFactorSecret,
  createTwoFactorURI,
  generateQRCode,
  verifyTOTP,
  generateTwoFactorSecretKey,
  generateBackupCodes,
} from "@/lib/twoFactor";
import { encodeHex } from "oslo/encoding";
import {
  changePasswordSchema,
  ChangePasswordSchema,
  TwoFactorFormValues,
  twoFactorSchema,
  TwoFactorRecoveryCodeSchema,
  twoFactorRecoveryCodeSchema,
} from "@/lib/validation/account";
import { revalidatePath } from "next/cache";
import { getUserById } from "@/data/user";
import { verify } from "@node-rs/argon2";
import { hash } from "@node-rs/argon2";

export async function setupTwoFactor() {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const twoFactorSecret = generateTwoFactorSecret();
  const encodedSecret = encodeHex(twoFactorSecret);

  // Generate a 16-character setup key using only A-Z
  const setupKey = generateTwoFactorSecretKey();

  // Check if a TwoFactorAuth entry already exists for this user
  const existingTwoFactorAuth = await prisma.twoFactorAuth.findUnique({
    where: { userId: user.id },
  });

  if (existingTwoFactorAuth) {
    await prisma.twoFactorAuth.update({
      where: { userId: user.id },
      data: {
        secret: encodedSecret,
        setupKey: setupKey,
        verified: false,
      },
    });
  } else {
    await prisma.twoFactorAuth.create({
      data: {
        userId: user.id,
        secret: encodedSecret,
        setupKey: setupKey,
        verified: false,
      },
    });
  }

  const uri = createTwoFactorURI("Cryptoniq", user.email, twoFactorSecret);
  const qrCode = await generateQRCode(uri);

  return { qrCode, setupKey };
}

export async function verifyAndEnableTwoFactor(
  credentials: TwoFactorFormValues,
): Promise<{ error?: string; success?: string; backupCodes?: string[] }> {
  try {
    const { code } = twoFactorSchema.parse(credentials);
    const { user } = await validateRequest();
    if (!user) throw new Error("Unauthorized!");

    const twoFactorAuth = await prisma.twoFactorAuth.findUnique({
      where: { userId: user.id },
      select: { secret: true, verified: true },
    });

    if (!twoFactorAuth) {
      return { error: "Two-factor authentication not set up!" };
    }

    if (twoFactorAuth.verified) {
      return { error: "Two-factor authentication is already enabled!" };
    }

    const isValid = await verifyTOTP(code, twoFactorAuth.secret);

    if (!isValid) {
      return { error: "Invalid OTP. Please try again!" };
    }

    const backupCodes = generateBackupCodes();

    await prisma.$transaction([
      prisma.twoFactorAuth.update({
        where: { userId: user.id },
        data: { verified: true, backupCodes },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { twoFactorEnabled: true },
      }),
    ]);

    return { success: "Two-factor authentication enabled!", backupCodes };
  } catch (error) {
    return { error: "Something went wrong. Please try again!" };
  }
}

export async function disable2FA(credentials: TwoFactorFormValues): Promise<{
  error?: string;
  success?: string;
}> {
  try {
    const { code } = twoFactorSchema.parse(credentials);
    const { user } = await validateRequest();
    if (!user) throw new Error("Unauthorized!");

    const twoFactorAuth = await prisma.twoFactorAuth.findUnique({
      where: { userId: user.id },
      select: { secret: true, verified: true },
    });

    if (!twoFactorAuth || !twoFactorAuth.verified) {
      return { error: "Two-factor authentication is not currently enabled!" };
    }

    const isValid = await verifyTOTP(code, twoFactorAuth.secret);

    if (!isValid) return { error: "Invalid code. Please try again!" };

    // Delete the TwoFactorAuth entry instead of updating the User table
    await prisma.$transaction([
      prisma.twoFactorAuth.delete({
        where: { userId: user.id },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { twoFactorEnabled: false },
      }),
    ]);

    revalidatePath("/account/security");

    return { success: "Two-factor authentication disabled!" };
  } catch (error) {
    return { error: "Something went wrong. Please try again!" };
  }
}

export async function changePassword(
  credentials: ChangePasswordSchema,
): Promise<{ error?: string; success?: string }> {
  try {
    const validatedData = changePasswordSchema.parse(credentials);
    const { password, newPassword, code } = validatedData;

    const { user } = await validateRequest();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const existingUser = await getUserById(user.id);
    if (!existingUser || !existingUser.passwordHash) {
      return { error: "User not found or password not set!" };
    }

    // Verify current password
    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return { error: "Current password is incorrect!" };
    }

    // Check if 2FA is enabled and verify the code
    if (existingUser.twoFactorEnabled) {
      if (!code) {
        return { error: "Two-factor authentication code is required!" };
      }

      const twoFactorAuth = await prisma.twoFactorAuth.findUnique({
        where: { userId: user.id },
        select: { secret: true, verified: true },
      });

      if (!twoFactorAuth || !twoFactorAuth.verified) {
        return { error: "Two-factor authentication is not properly set up!" };
      }

      const isValid = await verifyTOTP(code, twoFactorAuth.secret);

      if (!isValid) {
        return { error: "Invalid two-factor authentication code!" };
      }
    }

    // Hash the new password
    const newPasswordHash = await hash(newPassword, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Update the password
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });

    revalidatePath("/account/security");

    return { success: "Password has been updated successfully!" };
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again later." };
  }
}

export async function deleteDevice(
  deviceId: string,
): Promise<{ error?: string; success?: string }> {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Delete all sessions associated with this device
      await tx.session.deleteMany({
        where: { deviceId: deviceId },
      });

      // Delete the device
      const deletedDevice = await tx.device.delete({
        where: { id: deviceId },
      });

      return deletedDevice;
    });

    revalidatePath("/devices");

    return { success: "Device deleted!" };
  } catch (error) {
    return { error: "Something went wrong. Please try again!" };
  }
}

export async function disable2FARecovery(
  credentials: TwoFactorRecoveryCodeSchema,
): Promise<{ error?: string; success?: string }> {
  try {
    const validatedData = twoFactorRecoveryCodeSchema.parse(credentials);
    const { recoveryCode } = validatedData;

    const { user } = await validateRequest();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const userId = user.id;
    const twoFactorAuth = await prisma.twoFactorAuth.findUnique({
      where: { userId },
      select: { backupCodes: true },
    });

    if (!twoFactorAuth) {
      return { error: "Two-factor authentication is not enabled" };
    }

    // Convert backup codes to plain strings
    const backupCodesPlain = twoFactorAuth.backupCodes.map(code => code.toString().trim().toLowerCase());

    // Trim whitespace and compare codes
    const trimmedRecoveryCode = recoveryCode.toString().trim().toLowerCase();
    const isValidRecoveryCode = backupCodesPlain.includes(trimmedRecoveryCode);

    if (!isValidRecoveryCode) {
      return { error: "Invalid recovery code" };
    }

    // Remove the used recovery code
    const updatedBackupCodes = backupCodesPlain.filter(
      (code) => code !== trimmedRecoveryCode,
    );

    // Perform database transactions
    await prisma.$transaction(async (tx) => {
      // If no backup codes are left, delete the twoFactorAuth entry
      if (updatedBackupCodes.length === 0) {
        await tx.twoFactorAuth.delete({
          where: { userId },
        });
      } else {
        // Otherwise, update the backup codes
        await tx.twoFactorAuth.update({
          where: { userId },
          data: { backupCodes: updatedBackupCodes },
        });
      }

      // Disable 2FA for the user
      await tx.user.update({
        where: { id: userId },
        data: { twoFactorEnabled: false },
      });
    });

    revalidatePath("/account/security");

    return {
      success: "Two-factor authentication has been disabled using a recovery code",
    };
  } catch (error) {
    console.error("Error disabling 2FA recovery:", error);
    return {
      error: "An unexpected error occurred while disabling two-factor authentication",
    };
  }
}
