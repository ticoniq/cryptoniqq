"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma"; // Assuming you're using Prisma as your ORM
import { revalidatePath } from "next/cache";

export async function updateAccount(
  amountToAdd: number,
  transactionRef: string,
): Promise<{
  error?: string;
  success?: string;
}> {
  try {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");

    // Fetch the current user to get the latest balance
    const currentUser = await prisma.nairaAccount.findUnique({
      where: { userId: user.id },
      select: { balance: true },
    });

    if (currentUser) {
      const newBalance = currentUser?.balance + amountToAdd;

      await prisma.$transaction([
        prisma.nairaAccount.update({
          where: { userId: user.id },
          data: { balance: newBalance },
        }),

        // Create Transaction record
        prisma.transaction.create({
          data: {
            userId: user.id,
            amount: amountToAdd,
            type: "CREDIT",
            reference: transactionRef,
          },
        }),
      ]);
    }

    revalidatePath("/wallet");

    return { success: "Balance updated successfully" };
  } catch (error) {
    return { error: "Internal server error" };
  }
}
