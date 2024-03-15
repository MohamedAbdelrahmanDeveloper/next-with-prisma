'use client'
import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'

export default function Logout() {
  return (
    <Button variant={'ghost'} className='px-2' onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`
    })}><LogOutIcon size={20} /></Button>
  )
}
