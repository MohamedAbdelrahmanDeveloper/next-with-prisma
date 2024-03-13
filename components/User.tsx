import { moment_timeAge } from '@/lib/moment'
import { UserType } from '@/types'
import React from 'react'

export default function User({user}: {user: UserType}) {
  return (
    <div>User
        <h1>{user.name}</h1>
        <h1>{user.username}</h1>
        <h1>{user.email}</h1>
        <h1>{moment_timeAge(user.createdAt)}</h1>
        <h1>{moment_timeAge(user.updatedAt)}</h1>
    </div>
  )
}
