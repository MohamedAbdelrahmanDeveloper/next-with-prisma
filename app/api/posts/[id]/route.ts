import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { PropsMethodParamsType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: PropsMethodParamsType) {
  const accessToken = req.headers.get("authorization");
  if (!accessToken) {
      return NextResponse.json({message: "please enter token"},{status: 401});
  }
  const decoded = verifyJwt(accessToken)
  if (!decoded) {
      return NextResponse.json({message: "unauthorized"},{status: 401});
  }
  const post = await db.post.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        select : {
          id: true,
          text: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              username: true
            }
          }
        }
      },
      likes: {
        select:{
          user: {
            select: {
              id: true,
              name: true,
              username: true
            }
          }
        }
      }
    },
  });
  if (!post) {
    return NextResponse.json({ message: 'Not found post' }, { status: 404 });
  }
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req:NextRequest, { params }: PropsMethodParamsType) {
  const accessToken = req.headers.get("authorization");
  if (!accessToken) {
      return NextResponse.json({message: "please enter token"},{status: 401});
  }
  const decoded = verifyJwt(accessToken)
  if (!decoded) {
      return NextResponse.json({message: "unauthorized"},{status: 401});
  }
  

  const post = await db.post.findUnique({ where: { id: params.id } });
    if (!post) {
      return NextResponse.json({ message: "Not found post" }, { status: 404 });
    }
    if (post.userId != decoded.id) {
      return NextResponse.json({ message: "This is not your post" }, { status: 404 });
    }

  const {description} = await req.json() as {description: string}
  if (!description) {
    return NextResponse.json(
      { message: "Text description post is required" },
      { status: 404 }
    );
  }

  await db.post.update({
    where : {
      id: params.id
    },
    data: {description,  userId: decoded.id}
  })
  return NextResponse.json({post: 'seccess updated post'},{status: 201})
}

export async function DELETE(req:NextRequest, { params }: PropsMethodParamsType) {
  const accessToken = req.headers.get("authorization");
  if (!accessToken) {
      return NextResponse.json({message: "please enter token"},{status: 401});
  }
  const decoded = verifyJwt(accessToken)
  if (!decoded) {
      return NextResponse.json({message: "unauthorized"},{status: 401});
  }

  const post = await db.post.findUnique({ where: { id: params.id } });
    if (!post) {
      return NextResponse.json({ message: "Not found post" }, { status: 404 });
    }
    if (post.userId != decoded.id) {
      return NextResponse.json({ message: "This is not your post" }, { status: 404 });
    }

  await db.post.delete({
    where : {
      id: params.id
    }
  })
  return NextResponse.json({message: 'seccess deleted post'},{status: 201})
}


