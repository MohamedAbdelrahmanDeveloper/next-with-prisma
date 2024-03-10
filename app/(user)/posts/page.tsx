'use client'
import AddPostPage from '@/components/AddPost'
import { moment_timeAge } from '@/lib/moment'
import { PostType } from '@/types'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'



export default function page() {
  const [posts, setPosts] = useState<PostType[]>()
  const [session, setSession] = useState<any>()
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    getSession().then(res => {  
      setSession(res)
    })
  }, [])
  
  useEffect(() => {
    if (session) {      
      axios.get(`/api/user/${session.user.id}/posts`, {
        headers: {
          'Authorization': session.token
        }
      }).then(e =>{
        setPosts(e.data.posts)
      })
    }
  }, [session, refresh])    
  return (
    <div className='max-w-5xl mx-auto'>
        <AddPostPage setRefresh={setRefresh}/>
        <div className='text-6xl'>Posts</div>
        <div className='flex flex-col space-y-5'>
          {
            posts && posts.map((post:PostType) =>(
              <div key={post.id} className='shadow rounded p-4 bg-white'>
                <Link href={`/posts/${post.id}`} >
                  <p className='text-lg'>{post.description}</p>
                </Link>
                <time className='text-sm'>{`${new Date(post.createdAt)}`}</time>
                <time className='text-sm text-red-600 block'>{`${moment_timeAge(post.createdAt)}`}</time>
              </div>
            ))
          }
        </div>
    </div>
  )
}
