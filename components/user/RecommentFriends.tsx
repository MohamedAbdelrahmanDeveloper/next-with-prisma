import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { UserType } from '@/types'
import Link from 'next/link'

export default function RecommentFriends({user}: {user: UserType}) {
  return (
    <Link href={`/user/${user.id}`} className='flex items-center gap-x-2'>
        <Avatar>
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <h1>{user.name}</h1>
    </Link>
  )
}
