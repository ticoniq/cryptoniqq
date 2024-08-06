import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import prisma from "@/lib/prisma";
import { addHyphenAfterThreeDigits } from "@/lib/utils";

export const generateEmailVerificationCode = async (userId: string, email: string): Promise<string> => {
  // Delete any existing verification codes for this user
  await prisma.emailVerificationCode.deleteMany({
    where: {
      userId: {
        equals: userId,
        mode: "insensitive",
      },
    },
  });

  // Generate a new code
  const code = addHyphenAfterThreeDigits(generateRandomString(6, alphabet("0-9")));

  // Calculate expiration date
  const expiresAt = createDate(new TimeSpan(15, "m")); // 15 minutes from now

  // Insert new verification code
  await prisma.emailVerificationCode.create({
    data: {
      userId: userId,
      email: email,
      code: code,
      expiresAt: expiresAt,
    }
  });

  return code;
}