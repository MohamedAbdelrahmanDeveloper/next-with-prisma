import Post from '@/components/Post'
import PostDetails from '@/components/PostDetails'
import { authOptions } from '@/lib/auth'
import { urlServer } from '@/lib/axios'
import axios from 'axios'
import { getServerSession } from 'next-auth'

export default async function PostID({params}: {params: {id: string}}) {
  const session = await getServerSession(authOptions)
    try {      
      const post = await axios.get(`${urlServer}/api/posts/${params.id}`, {
        headers: {
          'Authorization': session?.token
        }
      })
      return (
        <div className='max-w-5xl mx-auto'>
            <div className='text-6xl'>Posts</div>
            <div className='flex flex-col space-y-5'>
              {
                post.data.post && <PostDetails key={post.data.post.id + 'd'} post={post.data.post}/>
              }
            </div>
        </div>
      )
  } catch (error) {    
    return <div>Error</div>
  }
}
