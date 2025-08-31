"use server";
import { validateRequest } from "@/auth";
import { getUserByUsername } from "@/data/user";
import { AccountDeletionEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { getFirstName } from "@/lib/utils";
import {
  InfoSchema,
  infoSchema,
  DeleteAccountSchema,
  deleteAccountSchema,
} from "@/lib/validation/account";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

export const updateProfile = async (
  credentials: InfoSchema,
): Promise<{ error?: string; success?: string }> => {
  try {
    // Validate the incoming data against the schema
    const validatedData = infoSchema.parse(credentials);

    // Validate user authentication
    const { user } = await validateRequest();
    if (!user) throw new Error("Unauthorized!");

    // Convert DOB to Date object if it's a string
    if (validatedData.dob && typeof validatedData.dob === "string") {
      validatedData.dob = new Date(validatedData.dob);
    }

    // Destructure validated data
    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      country,
      gender,
      dob,
    } = validatedData;

    // Construct the full name
    const name = `${firstName} ${lastName}`;

    const existingUser = await getUserByUsername(username);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Username is already taken. Please choose another one!" };
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name,
        username: username,
        phone: phone,
        country: country,
        gender: gender,
        dob: dob,
      },
    });

    // Revalidate the relevant cache paths
    revalidatePath("/account");

    return { success: "Profile updated!" };
  } catch (error) {
    return {
      error: (error as Error).message || "An unexpected error occurred.",
    };
  }
};

// export const deleteUserProfile = async (
//   credentials: DeleteAccountSchema,
// ): Promise<{ error?: string; success?: string }> => {
//   try {
//     const validatedData = deleteAccountSchema.parse(credentials);
//     const { email } = validatedData;

//     const { user } = await validateRequest();
//     if (!user) throw new Error("Unauthorized!");

//     if (email !== user.email) {
//       return { error: "Email does not match the logged-in user!" };
//     }

//     await prisma.$transaction(async (prisma) => {
//       await prisma.user.delete({
//         where: { email: user.email },
//       });

//       const firstname = getFirstName(user.name);
//       await AccountDeletionEmail(user.email, firstname);
//     });

//     return { success: "Your account has been successfully deleted. We're sorry to see you go. If you change your mind, you can always create a new account. Thank you for being a part of our community." };
//   } catch (error) {
//     return {
//       error: (error as Error).message || "An unexpected error occurred.",
//     };
//   }
// };

export const deleteUserProfile = async (
  credentials: DeleteAccountSchema,
): Promise<{ error?: string; success?: string }> => {
  try {
    const validatedData = deleteAccountSchema.parse(credentials);
    const { email } = validatedData;

    const { user } = await validateRequest();
    if (!user) throw new Error("Unauthorized!");

    if (email !== user.email) {
      return { error: "Email does not match the logged-in user!" };
    }

    await prisma.$transaction(async (prisma) => {
      // Fetch the user to get the avatarUrl before deletion
      const userToDelete = await prisma.user.findUnique({
        where: { email: user.email },
        select: { avatarUrl: true },
      });

      // Delete the user
      await prisma.user.delete({
        where: { email: user.email },
      });

      // Delete the avatar image from UploadThing if it exists
      if (userToDelete?.avatarUrl) {
        const utapi = new UTApi();
        const fileKey = userToDelete.avatarUrl.split("/").pop();
        if (fileKey) {
          await utapi.deleteFiles(fileKey);
        }
      }

      const firstname = getFirstName(user.name);
      await AccountDeletionEmail(user.email, firstname);
    });

    return {
      success:
        "Your account has been successfully deleted. We're sorry to see you go. If you change your mind, you can always create a new account. Thank you for being a part of our community.",
    };
  } catch (error) {
    return {
      error: (error as Error).message || "An unexpected error occurred.",
    };
  }
};
