'use client'
import AddPostPage from '@/components/AddPost'
import { moment_timeAge } from '@/lib/moment'
import { PostType } from '@/types'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function page({params}: {params: {id: string}}) {
    const router = useRouter()
  const [post, setPost] = useState<PostType>()
  const [session, setSession] = useState<any>()
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    getSession().then(res => {  
      setSession(res)
    })
  }, [])
  
  useEffect(() => {
    if (session) {      
      axios.get(`/api/posts/${params.id}`, {
        headers: {
          'Authorization': session.token
        }
      }).then(e =>{        
        if (e.status === 200) {
            setPost(e.data.post)
        }
        else {
            router.push('/not-found')
        }        
    }).catch(error => {
          router.push('/not-found')
      })
    }
  }, [session, refresh])    
  return (
    <div className='max-w-5xl mx-auto'>
        <div className='text-6xl'>Post</div>
        <div className='flex flex-col space-y-5'>
          {
            post && 
              <div key={post.id} className='shadow rounded p-4 bg-white'>
                <p className='text-lg'>{post.description}</p>
                <time className='text-sm'>{`${new Date(post.createdAt)}`}</time>
                <time className='text-sm text-red-600 block'>{`${moment_timeAge(post.createdAt)}`}</time>
              </div>
            
          }
        </div>
    </div>
  )
}
