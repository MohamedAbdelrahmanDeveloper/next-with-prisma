import { Card } from "@/components/ui/card";
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
        <Card className="hidden md:block col-span-2 h-64 sticky top-0">
          start
        </Card>
       <div className="col-span-4">
       {children}
       </div>
       <Card className="hidden md:block col-span-2 h-64 sticky top-0">
          end
        </Card>
    </div>
  );
}
