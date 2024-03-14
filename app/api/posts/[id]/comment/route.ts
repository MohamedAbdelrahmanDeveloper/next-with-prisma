import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { PropsMethodParamsType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: PropsMethodParamsType
) {
  const accessToken = req.headers.get("authorization");
  if (!accessToken) {
    return NextResponse.json(
      { message: "please enter token" },
      { status: 401 }
    );
  }
  const decoded = verifyJwt(accessToken);
  if (!decoded) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const post = await db.post.findUnique({ where: { id: params.id } });
  if (!post) {
    return NextResponse.json({ message: "Not found post" }, { status: 404 });
  }

  const { text } = await req.json();
  if (!text) {
    return NextResponse.json(
      { message: "Text comment is required" },
      { status: 404 }
    );
  }
  await db.comment.create({
    data: {
      text,
      userId: decoded.id,
      postId: params.id,
    },
  });
  return NextResponse.json({ like: "comment is success" }, { status: 200 });
}