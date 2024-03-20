import NextAuth from "next-auth"

export interface TypeUserData {
  id: string,
  name: string,
  username: string,
  email: string,
  createdAt: string,
  updatedAt: string,
  accessToken: string,
  name: string,
}
declare module "next-auth" {
    interface User {
      accessToken: string
    }
    interface Session {
      user: TypeUserData 
      token: string
    }
}