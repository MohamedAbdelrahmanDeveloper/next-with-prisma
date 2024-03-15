import AddPostPage from '@/components/AddPost'
import Post from '@/components/Post'
import { authOptions } from '@/lib/auth'
import { urlServer } from '@/lib/axios'
import { PostType } from '@/types'
import axios from 'axios'
import { getServerSession } from 'next-auth'



export default async function PostsOfUser() {
  const session = await getServerSession(authOptions)
    try {
      const posts = await axios.get(`${urlServer}/api/user/${session?.user.id}/posts`, {
        headers: {
          'Authorization': session?.token
        }
      })
      return (
        <div className='max-w-5xl mx-auto'>
            <AddPostPage />
            <div className='text-6xl'>Posts</div>
            <div className='flex flex-col space-y-5 max-w-2xl'>
              {
                posts.data.posts && posts.data.posts.map((post:PostType) => <Post key={post.id} post={post}/>)
              }
            </div>
        </div>
      )
  } catch (error) {    
    return <div>Error</div>
  }
}
