import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";
import { signJwtAccessToken } from "./jwt";
import axios from "axios";
import { urlServer } from "./axios";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages:{
      signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }
        try {
          const res = await axios.post(`${urlServer}/api/auth/login`, {
            email: credentials?.email,
            password: credentials?.password
          })
  
          if (res.data.user) {
            return res?.data?.user
          }

          throw new Error(res.data.message)
        } catch (error) {
          // @ts-ignore
          if (error?.response) {
            // @ts-ignore
            throw new Error(`${error.response.data.message}`)
          }
          throw new Error(`${error}`)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          token: user.accessToken,
          user: {...user}
        };
      }
      return token;
    },
    async session({ session, token }) { 
                
      return {
        ...session,
        token: token.token,
        user: {
          ...session.user,
          ...token.user as {},
        },
      };
    },
  },
};
