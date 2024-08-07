import prisma from '@/lib/prisma';

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
}

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
}

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
}

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
}