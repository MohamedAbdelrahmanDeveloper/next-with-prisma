import React from 'react'
import Logo from './Logo'
import { navLinks } from '@/constant/navLinks'
import Link from 'next/link'
import { ModeToggle } from './modeToggle'
import { getServerSession } from 'next-auth'
import Logout from '../Logout'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'

export default async function NavBarApp() {
    const session = await getServerSession()    
  return (
    <header className='fixed top-0 w-full bg-background/50 backdrop-blur-md z-20'>
        <div className='container h-full py-4 mx-aut flex items-center justify-between'>
            <Logo />
            <nav className='hidden md:flex items-center gap-x-4'>
                {navLinks.map((link, index) => {
                    if (session?.user && link.visible === 'user') {
                        return <Link key={index} href={link.href}>{link.text}</Link>
                    }
                    else if (!session?.user.name && link.visible === 'not-user') {
                        return <Link key={index} href={link.href}>{link.text}</Link>
                    }
                    else if (!link.visible) {
                        return <Link key={index} href={link.href}>{link.text}</Link>
                    }
                })}
            </nav>
            <div className='flex space-x-2'>
                {session?.user && <>
                    <Avatar >
                        <AvatarFallback>{session?.user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <Logout />
                </>}
                <ModeToggle />
            </div>
        </div>
    </header>
  )
}
