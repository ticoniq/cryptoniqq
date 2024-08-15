"use server";
import { validateRequest } from "@/auth";
import { getUserByUsername } from "@/data/user";
import prisma from "@/lib/prisma";
import { InfoSchema, infoSchema } from "@/lib/validation/account";
import { revalidatePath } from "next/cache";

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
    const { firstName, lastName, username, email, phone, country, gender, dob } = validatedData;

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

    return { success: "Profile updated successfully!" };
  } catch (error) {
    return { error: (error as Error).message || "An unexpected error occurred." };
  }
};
