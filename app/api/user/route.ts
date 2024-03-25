import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { UserUpdateZodSchema } from "@/lib/zodSchema";
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
    const user = await db.user.findUnique({
        where: {
            id: decoded.id
        }
    })
    if (!user) {
        return NextResponse.json({message: "Not found user"},{status: 404});
    }
    const {password, ...newUser} = user
    return NextResponse.json({user: newUser},{status: 200});
}

export async function PUT(req: NextRequest) {
    const accessToken = req.headers.get("authorization");
    if (!accessToken) {
        return NextResponse.json({message: "please enter token"},{status: 401});
    }
    const decoded = verifyJwt(accessToken)
    if (!decoded) {
        return NextResponse.json({message: "unauthorized"},{status: 401});
    }
    const user = await db.user.findUnique({
        where: {
            id: decoded.id
        }
    })
    if (!user) {
        return NextResponse.json({message: "Not found user"},{status: 404});
    }
    try {
        const body = await req.json()
        const {name, username} = UserUpdateZodSchema.parse(body)
        const existingUserByUsername = await db.user.findUnique({
            where: {
                username
            }
        })
        if (existingUserByUsername) {
            return NextResponse.json({message: 'username is taken'},{status: 400});
        }
        await db.user.update({
            where: {
                id: decoded.id
            },
            data: {
                name,
                username
            }
        })
        return NextResponse.json({user: 'updated'},{status: 200});
    } catch (error) {
        return NextResponse.json({message: error},{status: 400});
    }
}