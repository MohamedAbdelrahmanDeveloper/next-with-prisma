import { Card } from "@/components/ui/card";
import RecommentFriends from "@/components/user/RecommentFriends";
import { authOptions } from "@/lib/auth";
import { UserType } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootAuthLayout({children}: Readonly<{children: React.ReactNode;}>) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect('/login')
    }

    //  User
// Mohamed
// m7md0a
// 2 days ago
// Just now

    const users:UserType[] = [{
      name:'namee',
      createdAt: '2d',
      id: '9673ff96-8c19-46ca-9790-6f2361d45d26',
      isAdmin: false,
      updatedAt: 'd',
      username: 'm7md0a'
    }]
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-8 w-full container mx-auto gap-x-2">
        <div className="hidden md:block col-span-2 h-64 sticky top-0 p-3 space-y-2">
          <RecommentFriends user={users[0]}/>
          <RecommentFriends user={users[0]}/>
          <RecommentFriends user={users[0]}/>
          <RecommentFriends user={users[0]}/>
          <RecommentFriends user={users[0]}/>
          <RecommentFriends user={users[0]}/>
        </div>
       <div className="col-span-4 rounded-t-2xl overflow-hidden">
        {children}
       </div>
       <Card className="hidden md:block col-span-2 h-64 sticky top-0">
          end
        </Card>
    </div>
  );
}
