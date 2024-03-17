import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootAuthLayout({children}: Readonly<{children: React.ReactNode;}>) {
    const session = await getServerSession(authOptions)
    if (session?.user) {
        redirect('/')
    }
  return (
    <div className="flex justify-between md:[&>*]:wd-2/4 -mt-20 pt-20">
        <div className="bg-black w-full hidden md:block"></div>
        <div className="min-h-[calc(100vh-5rem)] w-full flex justify-center items-center">
          {children}
        </div>
    </div>
  );
}
