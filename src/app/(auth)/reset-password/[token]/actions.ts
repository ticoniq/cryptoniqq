"use server";
import { NewPasswordValues, newPasswordSchema } from "@/lib/validation/auth";
import { redirect } from "next/navigation";
import { encodeHex } from "oslo/encoding";
import { sha256 } from "oslo/crypto";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { hash } from "@node-rs/argon2";
import { isWithinExpirationDate } from "oslo";
import { lucia } from "@/auth";

export async function newPassword(
  credentials: NewPasswordValues,
): Promise<{ error?: string; success?: boolean }> {
  try {
    const validatedData = newPasswordSchema.safeParse(credentials);

    if (!validatedData.success) {
      return { error: "Invalid password" };
    }

    const { token, password } = validatedData.data;

    const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));

    const dbToken = await prisma.$transaction(async (prisma) => {
      const item = await prisma.passwordResetToken.findFirst({
        where: { token_hash: tokenHash },
      });

      if (item) {
        await prisma.passwordResetToken.delete({
          where: { id: item.id },
        });
      }

      return item;
    });

    if (!dbToken || !isWithinExpirationDate(dbToken.expiresAt)) {
      return { error: "Invalid or expired password reset link" };
    }

    await lucia.invalidateUserSessions(dbToken.userId);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    await prisma.user.update({
      where: { id: dbToken.userId },
      data: { passwordHash: passwordHash },
    });

    const session = await lucia.createSession(dbToken.userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong. Please try again" };
  }
}
