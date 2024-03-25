import AddPostPage from '@/components/post/AddPost'
import Post from '@/components/post/Post'
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
          'Authorization': session?.user.accessToken
        }
      })
      return (
        <div className='max-w-5xl mx-auto space-y-4'>
            <AddPostPage session={session} />
            <div className='flex flex-col space-y-5'>
              {
                posts.data.posts && posts.data.posts.map((post:PostType) => <Post key={post.id} post={post}/>)
              }
            </div>
        </div>
      )
  } catch (error) { 
    // console.log(error);
       
    return <div>Error</div>
  }
}
