import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const nairaAccount = await prisma.nairaAccount.findUnique({
      where: { userId: user.id },
    });

    if (!nairaAccount) {
      return Response.json({ message: "Naira account not found" });
    }

    return Response.json(nairaAccount, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
