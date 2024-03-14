import Post from '@/components/Post'
import { authOptions } from '@/lib/auth'
import { urlServer } from '@/lib/axios'
import { moment_timeAge } from '@/lib/moment'
import { PostType, UserType } from '@/types'
import axios from 'axios'
import { getServerSession } from 'next-auth'

export default async function Profile() {
  const session = await getServerSession(authOptions)
    try {
      const res = await axios.get(`${urlServer}/api/user`, {
        headers: {
          'Authorization': session?.token
        }
      })
      return (
        <div className='max-w-5xl mx-auto'>
            <div className='text-6xl'>profile</div>
            <div className='flex flex-col mt-4'>
              {res?.data?.user?.name}
              <br />
              {res?.data?.user?.username}
              <br />
              {res?.data?.user?.email}
              <br />
              {res?.data?.user?.isAdmin}
              <br />
              {moment_timeAge(res?.data?.user?.createdAt)}
              <br />
              {moment_timeAge(res?.data?.user?.updatedAt)}
            </div>
        </div>
      )
  } catch (error) { 
    console.log(error);
       
    return <div>Error</div>
  }
}
