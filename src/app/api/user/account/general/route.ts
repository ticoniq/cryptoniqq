import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { infoSchema } from "@/lib/validation/account";
import { validateRequest } from "@/auth";
import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest) {
  try {
    const session = await validateRequest();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
    }

    const body = await req.json();

    if (body.dob && typeof body.dob === "string") {
      body.dob = new Date(body.dob);
    }

    const validatedData = infoSchema.parse(body);

    if (!validatedData) {
      return NextResponse.json({ error: "Invalid data!" }, { status: 400 });
    }

    const name = `${validatedData.firstName} ${validatedData.lastName}`;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name,
        username: validatedData.username,
        phone: validatedData.phone,
        country: validatedData.country,
        gender: validatedData.gender,
        dob: validatedData.dob,
      },
    });

    revalidatePath("/account");

    return NextResponse.json(
      { message: "Profile updated!", user: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ error: "Internal server error!" }, { status: 500 });
  }
}
