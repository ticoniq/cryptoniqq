import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { deleteAccountSchema } from "@/lib/validation/account";
import { validateRequest } from "@/auth";
import { getFirstName } from "@/lib/utils";
import { AccountDeletionEmail } from "@/lib/mail";

export async function DELETE(request: Request) {
  try {
    const session = await validateRequest();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = deleteAccountSchema.parse(body);

    if (!validatedData) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    if (validatedData.email !== session.user.email) {
      return NextResponse.json({ error: 'Email does not match the logged-in user' }, { status: 400 });
    }

    // Delete the user account
    await prisma.user.delete({
      where: { email: validatedData.email },
    });

    const firstname = getFirstName(session.user.name);
    
    await AccountDeletionEmail(session.user.email, firstname);

    // TODO: do some weird stuff later

    return NextResponse.json({ message: 'Account deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}