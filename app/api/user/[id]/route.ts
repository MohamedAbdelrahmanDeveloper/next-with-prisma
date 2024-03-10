import { db } from "@/lib/db"
import { PropsMethodParamsType } from "@/types";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, {params}: PropsMethodParamsType) {
    const user = await db.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    return NextResponse.json({user},{status: 200})
}