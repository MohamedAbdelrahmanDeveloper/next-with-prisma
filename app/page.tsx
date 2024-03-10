import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Homee() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect('/sign-in');
    }
  return (
    <div>page

      <h1 className='text-6xl'>{session?.user?.id}</h1>
      <h1 className='text-6xl'>{session?.user?.username}</h1>
      <h1 className='text-6xl'>{session?.user?.name}</h1>
      <h1 className='text-6xl'>{session?.user?.email}</h1>
    </div>
  )
}
