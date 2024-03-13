import User from '@/components/User';
import { authOptions } from '@/lib/auth'
import { urlServer } from '@/lib/axios';
import axios from 'axios';
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function UserDataById({params}: {params: {id: string}}) {
    const session = await getServerSession(authOptions)
    try {
        let res = await axios.get(`${urlServer}/api/user/${params.id}`, {
            headers: {
                Authorization: session?.token
            }
        })
        return <User user={res.data.user} />
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
