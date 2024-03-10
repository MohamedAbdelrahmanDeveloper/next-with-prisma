import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";
import { signJwtAccessToken } from "./jwt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages:{
      signIn: '/sign-in'
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
        const existingUser = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!existingUser) {
          throw new Error("No user found");
        }
        const checkPassword = await compare(
          credentials.password,
          existingUser.password
        );
        if (!checkPassword) {
          throw new Error("Incorrect password");
        }

        const { password, ...userWithoutPass } = existingUser;

        const accessToken = signJwtAccessToken(userWithoutPass);
        return {
          ...userWithoutPass,
          id: `${existingUser.id}`,
          name: `${existingUser.firstName} ${existingUser.lastName}`,
          accessToken,
        };
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
