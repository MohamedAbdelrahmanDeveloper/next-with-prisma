import { navLinks } from '@/constant/navLinks'
import { NavLinks } from '@/types'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'


const LinkComponent = ({link}: {link: NavLinks}) => {
    const {text, href, icon: Icon} = link
    return (
        <Link key={text} href={href} className='size-10 grid place-content-center hover:text-primary'>
            <div className='flex flex-col items-center gap-y-1'>
                {Icon && <Icon />}
                {text}
            </div>
        </Link>
    )
}

export default async  function MobileNav() {
    const session = await getServerSession()
  return (
    <div className='container mx-auto fixed md:hidden bottom-0 inset-x-0 bg-white border-t w-full py-3'>
        <nav className='flex items-center justify-around gap-x-4 text-black'>
            {navLinks.map((link, index) => {
                const {visible} = link
                if (session?.user && visible === 'user') {
                    return <LinkComponent key={index} link={link} />
                }
                else if (!session?.user.name && visible === 'not-user') {
                    return <LinkComponent key={index} link={link} />
                }
                else if (!link.visible) {
                    return <LinkComponent key={index} link={link} />
                }
            })}
        </nav>
    </div>
  )
}
