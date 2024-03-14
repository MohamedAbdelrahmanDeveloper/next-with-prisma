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
        }
    })
    if (!user) {
        return NextResponse.json({message: "Not found"},{status: 404});
    }
    const {password, email, updatedAt, ...newUser} = user
    return NextResponse.json({user: newUser},{status: 200})
}