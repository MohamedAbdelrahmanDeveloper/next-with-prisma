import React from 'react'
import RecommentFriends from '../user/RecommentFriends'
import { db } from '@/lib/db'
import { UserType } from '@/types'
import axios from 'axios'
import { urlServer } from '@/lib/axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function SideNavRight() {
    const session = await getServerSession(authOptions)  
    try {
        const users: UserType[] = await axios.get(`${urlServer}/api/users`, {
            headers: {
                'Authorization': session?.user.accessToken
            }
        })
        console.log(users);
        
        return (
            <div className="hidden md:block col-span-2 h-64 sticky top-0 p-3 space-y-2">
                {
                    users.map(user=> (
                        <RecommentFriends user={user}/>
                    ))
                }
            </div>
        )
    } catch (error) {
        console.log(error);
        
        return <div>Error</div>
    }
}
