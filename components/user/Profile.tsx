import { Avatar, AvatarFallback } from '../ui/avatar'
import { moment_timeAge } from '@/lib/moment'
import { UserType } from '@/types'

export default function ProfileComponent({user}: {user: UserType}) {
  
  return (
    <section className='max-w-5xl mx-auto bg-background'>
        <div className='h-64 bg-black relative flex flex-col items-center justify-end'>
          <span className='absolute bottom-2 end-2 text-xs'>{moment_timeAge(user?.createdAt)}</span>
          <Avatar className='h-24 w-24 ring-4 ring-primary md:absolute md:bottom-2 start-2'>
              <AvatarFallback>dn</AvatarFallback>
          </Avatar>
          <div className='md:absolute bottom-2 start-32 flex flex-col items-center'>
              <h1 className='text-xl font-semibold'>{user?.name}</h1>
              <h2 className='text-sm'>@{user?.username}</h2>
          </div>
        </div>
        <div className='flex justify-end pe-2'>
            <span>{user?.email}</span>
        </div>
    </section>
  )
}
