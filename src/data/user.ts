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

export const phone = async (phone: string) => {
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