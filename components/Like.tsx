'use client'

import { PostType } from '@/types'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Like({post, isLiked}: {post: PostType, isLiked: any}) {
    const router = useRouter()
    const likeHandeler = () => {
        getSession().then((tok) => {
            axios.post(`/api/posts/${post.id}/like`, {},{
                headers: {
                    Authorization: tok?.token
                }
            }).then(res=>{
                router.refresh();
            }).catch(err => console.log(err))
        })
    }
  return (
    <button onClick={likeHandeler}  className={`flex items-center ${isLiked ? 'text-blue-600' : 'text-gray-500'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
        </svg>
        <span><span className='pe-2'>{post.likes.length}</span>Like</span>
    </button>
  )
}
