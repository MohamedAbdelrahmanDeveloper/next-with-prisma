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
    const users = await db.user.findMany({
        select: {
            id: true,
            name:true,
            username:true,
            isAdmin: true,
            email:true,
        }
    })
    if (!users) {
        return NextResponse.json({message: "Not found user"},{status: 404});
    }
    // const {password, ...newUser} = user
    return NextResponse.json({users: users},{status: 200});
}
