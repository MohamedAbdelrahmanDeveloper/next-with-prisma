import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { PropsMethodParamsType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: PropsMethodParamsType) {
  const accessToken = req.headers.get("authorization");
  if (!accessToken) {
    return NextResponse.json({message: "please enter token"},{status: 401});
  }
  const decoded = verifyJwt(accessToken)
  if (!decoded) {
    return NextResponse.json({message: "unauthorized"},{status: 401});
  }

  const post = await db.post.findUnique({where: { id: params.id }});
  if (!post) {
    return NextResponse.json({ message: 'Not found post' }, { status: 404 });
  }
  
  
  const isLiked = await db.like.findFirst({
    where: {
      userId: decoded.id,
      postId: params.id
    }
  });
  
  if (isLiked) {
    await db.like.deleteMany({
      where: {
        userId: decoded.id,
        postId: params.id
      }
    })
    return NextResponse.json({ like: 'like is deleted' }, { status: 200 });
  } else {
    await db.like.create({
      data : {
          userId: decoded.id,
          postId: params.id
      }
    })
    return NextResponse.json({ like: 'like is success' }, { status: 200 });
  }

}
