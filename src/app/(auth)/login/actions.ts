"use server";
import { getUserByEmail } from "@/data/user";
import { loginSchema, LoginValues } from "@/lib/validation/auth";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { verify } from "@node-rs/argon2";
import { lucia } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { handleDeviceTracking } from "@/lib/DeviceTracking";
import { formattedDateTime, getFirstName } from "@/lib/utils";
import { sendNewDeviceNotification } from "@/lib/mail";

export async function login(credentials: LoginValues): Promise<{
  error?: string;
  requiresTwoFactor?: boolean;
  currentUserId?: any;
}> {
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

    const deviceResult = await handleDeviceTracking(existingUser.id, session.id);
    const device = `${deviceResult.device.name} on ${deviceResult.device.os}`;
    const firstname = getFirstName(existingUser.name);

    // You can use deviceResult.isNewDevice to notify the user if this is a new device
    if (deviceResult.isNewDevice) {
      await sendNewDeviceNotification(existingUser.email || "", firstname, device);
    }

    return redirect("/dashboard");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong. Please try again" };
  }
}
