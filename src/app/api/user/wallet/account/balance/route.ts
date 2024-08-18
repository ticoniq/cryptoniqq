// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prisma";
// import { validateRequest } from "@/auth";

// export default async function GET(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { user } = await validateRequest();

//   if (!user) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const nairaAccount = await prisma.nairaAccount.findUnique({
//       where: { userId: user.id },
//     });

//     if (!nairaAccount) {
//       return res.status(404).json({ message: "Naira account not found" });
//     }

//     return res.status(200).json({ balance: nairaAccount });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }

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
