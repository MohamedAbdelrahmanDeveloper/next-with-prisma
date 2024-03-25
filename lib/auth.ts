import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";
import { signJwtAccessToken } from "./jwt";
import axios from "axios";
import { urlServer } from "./axios";
import { CustomError } from "./CustomError";

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
          throw new CustomError("Please enter an email and password", 400);
        }
        try {
          const res = await axios.post(`${urlServer}/api/auth/login`, {
            email: credentials?.email,
            password: credentials?.password
          })
  
          if (res.data.user) {
            return res?.data?.user
          }
        } catch (error) {
          // @ts-ignore
          if (error?.response) {
            // @ts-ignore
            throw new CustomError(`${error.response.data.message}`, error.response.status)
          }
          throw new CustomError(`${error}`, 500)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session}) {
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user
        };
      }
      if (user) {
        return {
          ...token,
          ...user
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
};
