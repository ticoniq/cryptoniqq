import prisma from "@/lib/prisma";
import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { generateIdFromEntropySize } from "lucia";

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByphone = async (phone: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        phone: {
          equals: phone,
          mode: "insensitive",
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getVerifyEmailCode = async (code: string) => {
  try {
    const verificationCode = await prisma.emailVerificationCode.findFirst({
      where: {
        code: {
          equals: code,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            email_verified: true,
          },
        },
      },
    });

    return verificationCode;
  } catch (error) {
    return null;
  }
};

export const getLastSentVerificationCode = async (userId: string) => {
  try {
    const verificationCode = await prisma.emailVerificationCode.findFirst({
      where: {
        userId: {
          equals: userId,
        },
      },
      select: {
        expiresAt: true,
        code: true,
        user: {
          select: {
            id: true,
            email: true,
            email_verified: true,
          },
        },
      },
      orderBy: {
        expiresAt: "desc",
      },
    });

    return verificationCode;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (userId: string) => {
  try {
    // Invalidate all existing tokens
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: userId
      }
    });

    const tokenId = generateIdFromEntropySize(25); // 40 character
    const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));

    await prisma.passwordResetToken.create({
      data: {
        token_hash: tokenHash,
        userId: userId,
        expiresAt: createDate(new TimeSpan(2, "h"))
      }
    });

    return tokenId;
  } catch (error) {
    return null;
  }
}


