import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({message: 'Please login'},{status: 500})
    }
    const {description} = await req.json() as {description: string}
    const newPost = await db.post.create({
        data: {description,  userId: parseInt(session.user.id)},
        include: {
            user: true,
        }
    })
    return NextResponse.json({posts: newPost},{status: 201})
}
