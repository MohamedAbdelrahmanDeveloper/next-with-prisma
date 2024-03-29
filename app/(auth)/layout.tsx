import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootAuthLayout({children}: Readonly<{children: React.ReactNode;}>) {
    const session = await getServerSession(authOptions)
    if (session?.user) {
        redirect('/')
    }
  return (
    <div className="flex justify-between md:[&>*]:wd-2/4 absolute w-full min-h-screen top-0 z-50 bg-background">
        <div className="w-full hidden md:block relative">
          <Image className="w-full h-full dark:opacity-70" src='/images/background.webp' width={250} height={300} alt="login image"/>
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl text-primary-foreground">Welcome to my website</h1>
            <p className="text-center text-primary-foreground/60 w-3/4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt tempora iste itaque enim. Quis, ea ipsum, voluptatem delectus dignissimos sequi molestias odit iste nobis odio nihil, cum error fugit dicta.</p>
          </div>
        </div>
        <div className="min-h-[calc(100vh-5rem)] w-full flex justify-center items-center">
          {children}
        </div>
    </div>
  );
}
