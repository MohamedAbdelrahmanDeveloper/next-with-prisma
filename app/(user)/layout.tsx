import SideNavLeft from "@/components/navigation/SideNavLeft";
import SideNavRight from "@/components/navigation/SideNavRight";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootAuthLayout({children}: Readonly<{children: React.ReactNode;}>) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect('/login')
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-8 w-full container mx-auto gap-x-2">
       <SideNavLeft />
       <div className="col-span-4 rounded-t-2xl overflow-hidden">
        {children}
       </div>
      <SideNavRight />
    </div>
  );
}
