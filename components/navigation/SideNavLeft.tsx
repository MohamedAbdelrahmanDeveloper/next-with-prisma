import React from 'react'
import RecommentFriends from '../user/RecommentFriends'
import { db } from '@/lib/db'
import { UserType } from '@/types'
import axios from 'axios'
import { urlServer } from '@/lib/axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function SideNavLeft() {
    const session = await getServerSession(authOptions)  
    try {
        const {data}: {data: {users: UserType[]}} = await axios.get(`${urlServer}/api/users`, {
            headers: {
                'Authorization': session?.user.accessToken
            }
        })       
        
        return (
            <div className="hidden md:block col-span-2 h-64 sticky top-0 p-3 space-y-3">
                <h4 className='font-bold text-lg'>new users</h4>
                {
                    data.users.slice(-5).map(user=> (
                        <RecommentFriends key={user.id} user={user}/>
                    ))
                }
            </div>
        )
    } catch (error) {
        console.log(error);
        
        return <div>Error</div>
    }
}
