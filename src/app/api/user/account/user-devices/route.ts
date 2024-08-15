import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const devices = await prisma.device.findMany({
      where: { userId: user.id },
      orderBy: { lastUsedAt: "desc" },
    });

    return Response.json(devices, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
