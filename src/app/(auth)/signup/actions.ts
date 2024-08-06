"use server";
import { getUserByEmail, getUserByUsername } from "@/data/user";
import { signUpSchema, SignUpValues } from "@/lib/validation/auth";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signUp(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    const validatedData = signUpSchema.parse(credentials);

    console.log(validatedData);

    const {
      email,
      password,
      name,
      country,
    } = validatedData;

    // const passwordHashed = await hash(password, {
    //   memoryCost: 19456,
    //   timeCost: 2,
    //   outputLen: 32,
    //   parallelism: 1,
    // });

    // const userId = generateIdFromEntropySize(10);

    // const existingUsername = await getUserByUsername(username);

    // if (existingUsername) {
    //   return { error: "Username is already taken" };
    // }
    
    // const existingEmail = await getUserByEmail(email);

    // if (existingEmail) {
    //   return { error: "Esmail already taken" };
    // }

    // await prisma.user.create({
    //   data: {
    //     id: userId,
    //     email,
    //     username,
    //     displayName: username,
    //     passwordHashed,
    //   },
    // });

    // const session = await lucia.createSession(userId, {});
    // const sessionCookie = lucia.createSessionCookie(session.id);
    // cookies().set(
    //   sessionCookie.name,
    //   sessionCookie.value,
    //   sessionCookie.attributes,
    // );
    
    // return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong. Please try again" };
  }
}
