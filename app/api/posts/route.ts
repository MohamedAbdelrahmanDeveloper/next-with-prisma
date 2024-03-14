import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const accessToken = req.headers.get("authorization");
    if (!accessToken) {
        return NextResponse.json({message: "please enter token"},{status: 401});
    }
    const decoded = verifyJwt(accessToken)
    if (!decoded) {
        return NextResponse.json({message: "unauthorized"},{status: 401});
    }    
    const posts = await db.post.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                },
            },
            comments: {
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
    })
    return NextResponse.json({posts},{status: 200})
}

export async function POST(req:NextRequest) {
    const accessToken = req.headers.get("authorization");
    if (!accessToken) {
        return NextResponse.json({message: "please enter token"},{status: 401});
    }
    const decoded = verifyJwt(accessToken)
    if (!decoded) {
        return NextResponse.json({message: "unauthorized"},{status: 401});
    }
    const {description} = await req.json() as {description: string}
    await db.post.create({
        data: {description,  userId: decoded.id},
        include: {
            user: true,
        }
    })
    return NextResponse.json({post: 'seccess created'},{status: 201})
}
