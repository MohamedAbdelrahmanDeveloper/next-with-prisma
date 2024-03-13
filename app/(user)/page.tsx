import Post from '@/components/Post'
import { authOptions } from '@/lib/auth'
import { urlServer } from '@/lib/axios'
import { PostType } from '@/types'
import axios from 'axios'
import { getServerSession } from 'next-auth'

export default async function PostsOfUser() {
  const session = await getServerSession(authOptions)
    try {
      const posts = await axios.get(`${urlServer}/api/posts`, {
        headers: {
          'Authorization': session?.token
        }
      })
      return (
        <div className='max-w-5xl mx-auto'>
            <div className='text-6xl'>Timeline</div>
            <div className='flex flex-col space-y-5'>
              {
                posts.data.posts && posts.data.posts.map((post:PostType) => <Post key={post.id} post={post}/>)
              }
            </div>
        </div>
      )
  } catch (error) { 
    console.log(error);
       
    return <div>Error</div>
  }
}
