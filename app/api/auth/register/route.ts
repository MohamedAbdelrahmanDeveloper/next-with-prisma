import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { UserZodSchema } from "@/lib/zodSchema";

export async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        const validation = UserZodSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({message: validation.error.errors[0].message},{status: 400})
        }
        const {name, username, email, password}  = body;
        const isEmailExists = await db.user.findUnique({
            where: {email}
        })
        if (isEmailExists) {            
            return NextResponse.json({message: 'User with this email is exists'},{status: 400})
        }
        const isUserNameExists = await db.user.findUnique({
            where: {username}
        })
        if (isUserNameExists) {
            return NextResponse.json({message: 'User with this username is exists'},{status: 400})
        }
        const encryptPassword = await hash(password , 10)

        const newUser = await db.user.create({
            data: {name , username, email, password: encryptPassword}
        })
        
        const {password: newPassword, ...restUser} = newUser
        return NextResponse.json({user: restUser, message: 'Created seccesfuly'},{status: 201})
    } catch (error) {
        return NextResponse.json({message: error},{status: 500})
    }
}
