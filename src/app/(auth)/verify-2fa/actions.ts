"use server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { verifyTOTP } from "@/lib/twoFactor";
import { TwoFactorFormValues, twoFactorSchema } from "@/lib/validation/auth";
import { handleDeviceTracking } from "@/lib/DeviceTracking";
import { getFirstName } from "@/lib/utils";
import { sendNewDeviceNotification } from "@/lib/mail";
import { getUserById } from "@/data/user";

export async function verifyLoginTwoFactorCode(
  credentials: TwoFactorFormValues,
): Promise<{ error?: string, success?: string }> {
  try {
    const validatedData = twoFactorSchema.parse(credentials);
    
    const { code, userId } = validatedData;

    const twoFactorAuth = await prisma.twoFactorAuth.findUnique({
      where: { userId: userId },
      select: { secret: true, verified: true },
    });

    if (!twoFactorAuth || !twoFactorAuth.verified) {
      return { error: "Two-factor authentication is not currently enabled!" };
    }

    const isValid = verifyTOTP(code, twoFactorAuth.secret);

    if (!isValid) return { error: "Invalid verification code!" };

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    const deviceResult = await handleDeviceTracking(userId, session.id);
    const device = `${deviceResult.device.name} on ${deviceResult.device.os}`;
    const firstname = getFirstName(userId);
    const existingUser = await getUserById(userId);

    if (!existingUser) return { error: "User not found!" };

    console.log("existingUser", existingUser.email);

    // You can use deviceResult.isNewDevice to notify the user if this is a new device
    if (deviceResult.isNewDevice) {
      await sendNewDeviceNotification(existingUser.email || "", firstname, device);
    }

    return { success: "Login successful!" };
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}