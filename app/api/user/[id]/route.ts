import { db } from "@/lib/db"
import { verifyJwt } from "@/lib/jwt";
import { PropsMethodParamsType } from "@/types";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, {params}: PropsMethodParamsType) {
    const accessToken = req.headers.get("authorization");
    if (!accessToken || !verifyJwt(accessToken)) {
        return NextResponse.json({message: "unauthorized"},{status: 401});
    }
    const user = await db.user.findUnique({
        where: {
            id: params.id
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            isAdmin: true,
            createdAt: true,
            updatedAt: true,
        }
    })
    if (!user) {
        return NextResponse.json({message: "Not found"},{status: 404});
    }
    return NextResponse.json({user},{status: 200})
}