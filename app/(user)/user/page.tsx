import AddPostPage from '@/components/AddPost'
import PostsProfile from '@/components/user/PostsProfile'
import ProfileComponent from '@/components/user/Profile'
import { authOptions } from '@/lib/auth'
import { urlServer } from '@/lib/axios'
import axios from 'axios'
import { getServerSession } from 'next-auth'

export default async function Profile() {
  const session = await getServerSession(authOptions)
    try {
      const res = await axios.get(`${urlServer}/api/user`, {
        headers: {
          'Authorization': session?.user.accessToken
        }
      })
      return res.data.user && (
        <main className='space-y-3'>
          <ProfileComponent user={res.data.user}/>
          <AddPostPage />
          <PostsProfile userId={res.data.user.id} session={session}/>
        </main>
      )
  } catch (error) { 
    console.log(error);
       
    return <div>Error</div>
  }
}
