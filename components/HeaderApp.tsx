import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import Logout from './Logout'

export default async function HeaderApp() {
    const session = await getServerSession()

  return (
    <div className='flex justify-around items-center h-16 shadow'>
        <div>logo</div>
        <div>
            <ul className='flex space-x-3 [&>li>a:hover]:underline'>
                <li><Link href='/' >Home</Link></li>
                {
                    !session?.user ? <>
                        <li><Link href='/sign-in' >Sign in</Link></li>
                        <li><Link href='/sign-up' >Sign up</Link></li>
                    </>: <>
                        <li><Link href='/user' >Profile</Link></li>
                        <li><Link href='/posts' >Posts</Link></li>
                        <Logout />
                    </>
                }
            </ul>
        </div>
        <div>logo</div>
    </div>
  )
}
