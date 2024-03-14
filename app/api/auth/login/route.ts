import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { compare } from "bcrypt";
import { LoginZodSchema } from "@/lib/zodSchema";
import { signJwtAccessToken } from "@/lib/jwt";

export async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        const {email, password: passwordSchema} = LoginZodSchema.parse(body)

        const existingUser = await db.user.findUnique({
            where: {email}
        })

        if (!existingUser) {            
            return NextResponse.json({user: null, message: 'User not found please register'},{status: 404})
        }
        const checkPassword = await compare(
            passwordSchema,
            existingUser.password
        );

        if (!checkPassword) {
            return NextResponse.json({user: null, message: "Incorrect password"},{status: 209})
        }
  
        const { password, ...userWithoutPass } = existingUser;

        const accessToken = signJwtAccessToken(userWithoutPass);
        const user =  {
            ...userWithoutPass,
            id: `${existingUser.id}`,
            name: existingUser.name,
            accessToken,
        };
        // const {password: newPassword, ...restUser} = newUser
        return NextResponse.json({user},{status: 201})
    } catch (error) {
        return NextResponse.json({error: error},{status: 500})
    }
}
