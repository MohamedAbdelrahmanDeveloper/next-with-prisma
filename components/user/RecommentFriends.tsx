import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { UserType } from '@/types'
import Link from 'next/link'

export default function RecommentFriends({user}: {user: UserType}) {
  return (
    <Link href={`/user/${user.id}`} className='flex items-center gap-x-2 bg-background shadow p-2 rounded'>
        <Avatar>
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <h1 className='text-primary'>{user.name}</h1>
          <span className='text-xs'>@{user.username}</span>
        </div>
    </Link>
  )
}
