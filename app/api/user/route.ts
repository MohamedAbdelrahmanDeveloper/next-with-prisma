import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { UserZodSchema } from "@/lib/zodSchema";


export async function GET() {
    try {
        const users = await db.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
            }
        })
        return NextResponse.json({users: users},{status: 200})
        
    } catch (error) {
        return NextResponse.json({error: error},{status: 200})
    }
}

export async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        const {firstName, lastName, username, email, password} = UserZodSchema.parse(body)
        
        const isEmailExists = await db.user.findUnique({
            where: {email}
        })
        if (isEmailExists) {            
            return NextResponse.json({user: null, message: 'User with this email is exists'},{status: 209})
        }
        const isUserNameExists = await db.user.findUnique({
            where: {username}
        })
        if (isUserNameExists) {
            return NextResponse.json({user: null, message: 'User with this username is exists'},{status: 209})
        }
        const encryptPassword = await hash(password , 10)

        const newUser = await db.user.create({
            data: {firstName, lastName, username, email, password: encryptPassword}
        })
    
        const {password: newPassword, ...restUser} = newUser
    
        return NextResponse.json({user: restUser},{status: 201})
        
    } catch (error) {
        return NextResponse.json({error: error},{status: 500})
    }
}
