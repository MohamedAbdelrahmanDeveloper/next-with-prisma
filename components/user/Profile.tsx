import { Avatar, AvatarFallback } from '../ui/avatar'
import { moment_timeAge } from '@/lib/moment'
import { UserType } from '@/types'
import Image from 'next/image'
import { UpdateProfile } from './UpdateProfile'
import { Session } from 'next-auth'

export default function ProfileComponent({user, session}: {user: UserType, session: Session | null}) {
  return (
    <section className='max-w-5xl mx-auto bg-background'>
        <div className='h-64 bg-black relative flex flex-col items-center justify-end'>
          <Image className="w-full h-full dark:opacity-70" src='/images/login.avif' width={250} height={300} alt="profile image"/>
          {user.id === session?.user.id && <span className='absolute top-2 end-2 text-xs text-white'><UpdateProfile /></span>}
          <span className='absolute bottom-2 end-2 text-xs'>{moment_timeAge(user?.createdAt)}</span>
          <Avatar className='h-24 w-24 ring-4 ring-primary md:absolute md:bottom-2 start-2'>
              <AvatarFallback>dn</AvatarFallback>
          </Avatar>
          <div className='md:absolute bottom-2 start-32 flex flex-col items-center'>
              <h1 className='text-xl font-semibold text-primary-foreground'>{user?.name}</h1>
              <h2 className='text-sm text-primary-foreground/70'>@{user?.username}</h2>
          </div>
        </div>
    </section>
  )
}
