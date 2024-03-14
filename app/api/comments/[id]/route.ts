import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { PropsMethodParamsType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
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
  
    const comment = await db.comment.findUnique({ where: { id: params.id } });
    if (!comment) {
      return NextResponse.json({ message: "Not found comment" }, { status: 404 });
    }
    if (comment.userId != decoded.id) {
      return NextResponse.json({ message: "This is your comment" }, { status: 404 });
    }

    const { text } = await req.json();
    if (!text) {
        return NextResponse.json(
            { message: "Text comment is required" },
            { status: 404 }
        );
    }
  
    await db.comment.update({
      where: {
        id: params.id,
      },
      data : {
        text
      }
    });
    return NextResponse.json({ like: "comment is updated" }, { status: 200 });
  }

export async function DELETE(
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
  
    const comment = await db.comment.findUnique({ where: { id: params.id } });
    if (!comment) {
      return NextResponse.json({ message: "Not found comment" }, { status: 404 });
    }
    if (comment.userId != decoded.id) {
      return NextResponse.json({ message: "This is not your comment" }, { status: 404 });
    }
  
    await db.comment.deleteMany({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ like: "comment is deleted" }, { status: 200 });
  }
  