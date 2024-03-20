import PostsProfile from '@/components/user/PostsProfile';
import ProfileComponent from '@/components/user/Profile';
import { authOptions } from '@/lib/auth'
import { urlServer } from '@/lib/axios';
import axios from 'axios';
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation';
import React from 'react'

export default async function UserDataById({params}: {params: {id: string}}) {
    const session = await getServerSession(authOptions)
    if (session?.user.id === params.id) {
        redirect('/user')
    }
    try {
        let res = await axios.get(`${urlServer}/api/user/${params.id}`, {
            headers: {
                Authorization: session?.user.accessToken
            }
        })        
        return (
            <main className='space-y-3'>
                <ProfileComponent user={res.data.user}/>
                <PostsProfile userId={res.data.user.id} session={session}/>
            </main>
        )
    } catch (error: any) {
        if (error.response.status === 401) {
            return <div>error - {error.response.status} - {error.response.data.message}</div>
        }
        if (error.response.status === 404) {
            return notFound()
        }
        return <div>error</div>
    }
}
