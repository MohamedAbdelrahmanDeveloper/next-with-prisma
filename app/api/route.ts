import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession()
    // if (!session?.user) {
    //     return NextResponse.json({message: 'Please login'},{status: 500})
    // }

    return NextResponse.json({authenticated: !!session})
}