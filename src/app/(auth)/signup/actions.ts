"use server";
import { getUserByEmail, getUserByphone, getUserByUsername } from "@/data/user";
import { signUpSchema, SignUpValues } from "@/lib/validation/auth";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { generateEmailVerificationCode } from "@/lib/tokens";
import { sendVerificationCode } from "@/lib/mail";
import { Paths } from "@/lib/constants";

export async function signUp(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    const validatedData = signUpSchema.parse(credentials);

    const { email, password, firstName, lastName, phone } = validatedData;

    const name = `${firstName} ${lastName}`;

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingEmail = await getUserByEmail(email);

    if (existingEmail) {
      return { error: "Email is already taken" };
    }

    const existingPhone = await getUserByphone(phone);

    if (existingPhone) {
      return { error: "Phone already taken" };
    }

    await prisma.user.create({
      data: {
        id: userId,
        email,
        name,
        phone,
        passwordHash,
      },
    });

    const verificationCode = await generateEmailVerificationCode(userId, email);
    
    await sendVerificationCode(email, verificationCode);

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect(Paths.VerifyEmail);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong. Please try again" };
  }
}
