import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   try {
//     const { user } = await validateRequest();

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
//     }

//     const devices = await prisma.device.findMany({
//       where: { userId: user.id },
//       orderBy: { lastUsedAt: "desc" },
//       select: {
//         id: true,
//         name: true,
//         os: true,
//         type: true,
//         lastUsedAt: true,
//         createdAt: true,
//       },
//     });

//     if (devices.length === 0) {
//       return NextResponse.json(
//         { message: "No devices found for this user.", devices: [] },
//         { status: 200 },
//       );
//     }

//     // const formattedDevices = devices.map((device) => ({
//     //   ...device,
//     //   lastUsedAt: device.lastUsedAt.toISOString(),
//     //   createdAt: device.createdAt.toISOString(),
//     // }));

//     return NextResponse.json(
//       { message: "Devices retrieved successfully", devices: devices },
//       { status: 200 },
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "An error occurred while fetching devices." },
//       { status: 500 },
//     );
//   }
// }

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

    return Response.json(devices);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
