import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { PropsMethodParamsType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: PropsMethodParamsType) {
  const accessToken = req.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
      return NextResponse.json({error: "unauthorized"},{status: 401});
  }
  const post = await db.post.findUnique({
    where: { id: params.id },
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
  if (!post) {
    return NextResponse.json({ message: 'Not found post' }, { status: 404 });
  }
  return NextResponse.json({ post }, { status: 200 });
}
