import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { PropsMethodParamsType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: PropsMethodParamsType) {
  const accessToken = req.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
      return NextResponse.json({error: "unauthorized"},{status: 401});
  }
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { userId: params.id },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
  });
  return NextResponse.json({ posts }, { status: 200 });
}
